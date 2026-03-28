const axios = require('axios');
require('dotenv').config();
const User = require('../models/User'); 

// get access token from safaricom daraja API
exports.getAccessToken = async () => {
  try {
    const consumerKey = process.env.DARAJA_CONSUMER_KEY;
    const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (err) {
    console.error('Error getting access token:', err.response?.data || err.message);
    throw new Error('Failed to get access token');
  }
};

//initiate stk push (sandbox)
exports.initiateStkPush = async (req, res) => {
  try {
    const accessToken = await exports.getAccessToken();
    const { phone, amount, accountReference, description } = req.body;

    // Ensure phone is in sandbox format
    const formattedPhone = phone.startsWith('254') ? phone : `254${phone.slice(-9)}`;

    const timestamp = getTimestamp();
    const password = Buffer.from(
      process.env.DARAJA_SHORTCODE + process.env.DARAJA_PASSKEY + timestamp
    ).toString('base64');

    const payload = {
      BusinessShortCode: process.env.DARAJA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: process.env.DARAJA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.DARAJA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: description,
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('STK Push error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Payment initiation failed', error: err.response?.data || err.message });
  }
};

//callback URL must be publicly accessible (use ngrok for local testing)
exports.handleCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log('M-PESA Callback received:', JSON.stringify(callbackData, null, 2));

    const resultCode = callbackData?.Body?.stkCallback?.ResultCode;

    if (resultCode === 0) {
      const metadata = callbackData.Body.stkCallback.CallbackMetadata;
      let paidAmount = 0;
      let accountReference = '';

      if (metadata && metadata.Item) {
        for (const item of metadata.Item) {
          if (item.Name === 'Amount') paidAmount = item.Value;
          if (item.Name === 'AccountReference') accountReference = item.Value;
        }
      }

      if (accountReference && paidAmount > 0) {
        const user = await User.findOne({ accountNumber: accountReference });
        if (user) {
          user.balance += paidAmount;
          await user.save();
          console.log(`User ${user.accountNumber} balance updated by ${paidAmount}`);
        } else {
          console.warn('No user found for AccountReference:', accountReference);
        }
      }
    }

    res.status(200).json({ message: 'Callback received' });
  } catch (err) {
    console.error('Callback handler error:', err.message);
    res.status(500).json({ message: 'Callback processing failed' });
  }
};

// get timestamp in YYYYMMDDHHmmss (UTC)
function getTimestamp() {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}${hh}${min}${ss}`;
}
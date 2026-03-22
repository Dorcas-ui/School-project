const axios = require('axios');
require('dotenv').config();

// Get access token from Safaricom Daraja API
exports.getAccessToken = async () => {
  const consumerKey = process.env.DARAJA_CONSUMER_KEY;
  const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
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

// Initiate STK Push
exports.initiateStkPush = async (req, res) => {
  try {
    const accessToken = await exports.getAccessToken();
    const { phone, amount, accountReference, description } = req.body;
    const payload = {
      BusinessShortCode: process.env.DARAJA_SHORTCODE,
      Password: Buffer.from(
        process.env.DARAJA_SHORTCODE + process.env.DARAJA_PASSKEY + getTimestamp()
      ).toString('base64'),
      Timestamp: getTimestamp(),
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.DARAJA_SHORTCODE,
      PhoneNumber: phone,
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
    res.status(500).json({ message: 'Payment initiation failed', error: err.message });
  }
};

// Callback handler for M-PESA payment result
exports.handleCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log('M-PESA Callback received:', JSON.stringify(callbackData, null, 2));
    // Check if payment was successful
    const resultCode = callbackData?.Body?.stkCallback?.ResultCode;
    if (resultCode === 0) {
      // Payment successful
      const metadata = callbackData.Body.stkCallback.CallbackMetadata;
      let paidAmount = 0;
      let accountReference = '';
      // Extract amount and account reference
      if (metadata && metadata.Item) {
        for (const item of metadata.Item) {
          if (item.Name === 'Amount') paidAmount = item.Value;
          if (item.Name === 'AccountReference') accountReference = item.Value;
        }
      }
      // Find user by account reference and update balance
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

// Helper to get timestamp in YYYYMMDDHHmmss
function getTimestamp() {
  const date = new Date();
  return (
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0') +
    String(date.getHours()).padStart(2, '0') +
    String(date.getMinutes()).padStart(2, '0') +
    String(date.getSeconds()).padStart(2, '0')
  );
}

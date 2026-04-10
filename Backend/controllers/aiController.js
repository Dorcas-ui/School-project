
// OpenAI integration (latest SDK)
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Fallback FAQ answers (all keys lowercase for case-insensitive matching)
const faqAnswers = {
  'hi': 'Hello! How can I assist you today?',
  'hello': 'Hello! How can I assist you today?',
  'good morning': 'Good morning! How can I assist you today?',
  'what is my current wifi package?': 'You can check your current Wi-Fi package in the self-service portal under "My Account".',
  'how do i upgrade my wifi package?': 'To upgrade your Wi-Fi package, go to the self-service section and select the desired package.',
  'how do i reset my wifi username?': 'You can reset your Wi-Fi username from the self-service portal under "My Account".',
  'how do i reboot my router?': 'You can reboot your router from the self-service portal under "My Account".',
  'how do i change my wifi password': 'To change your Wi-Fi password, go to the self-service section and update your credentials.',
  'how do i pay': 'You can pay your bill using the M-PESA payment option in the portal.',
  'why is my internet slow': 'Try restarting your router. If the problem persists, contact support.',
  'how do i contact support': 'You can escalate your issue to a human agent from the chat or call our support line(0741396784/0115582552).',
  'thankyou': 'You\'re welcome! If you have any more questions, feel free to ask.',
  'thanks': 'You\'re welcome! If you have any more questions, feel free to ask.',
  'bye': 'Goodbye! Have a great day!',
  'goodbye': 'Goodbye! Have a great day!'
};

const Interaction = require('../models/Interaction');

exports.chat = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ answer: 'Please provide a message.' });
  }
  const lowerMsg = message.trim().toLowerCase();

  let answer = '';
  try {
    // Call OpenAI API (latest SDK)
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful customer support assistant for an Internet Service Provider. Answer clearly and concisely.' },
        { role: 'user', content: message }
      ],
      max_tokens: 200
    });
    answer = completion.choices[0].message.content.trim();
  } catch (err) {
    // Fallback to FAQ/static answer if OpenAI fails
    console.error('OpenAI error:', err.message);
    if (faqAnswers[lowerMsg]) {
      answer = faqAnswers[lowerMsg];
    } else {
      answer = 'Sorry, I did not understand your question. Please try rephrasing or contact human agent.';
    }
  }


  // Log the interaction for analytics (if user is authenticated)
  try {
    if (req.user && req.user.id) {
      await Interaction.create({
        user: req.user.id,
        type: 'ai',
        message: lowerMsg,
        aiAnswer: answer
      });
    }
  } catch (err) {
    // Log error but don't block response
    console.error('Failed to log AI interaction:', err.message);
  }

  res.json({ answer });
};

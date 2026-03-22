// controllers/aiController.js

// Simple FAQ-based AI bot for demonstration
const faqAnswers = {
  'how do i change my wifi password': 'To change your Wi-Fi password, go to the self-service section and update your credentials.',
  'how do i pay my bill': 'You can pay your bill using the M-PESA payment option in the portal.',
  'why is my internet slow': 'Try restarting your router. If the problem persists, contact support.',
  'how do i contact support': 'You can escalate your issue to a human agent from the chat or call our support line.'
};

exports.chat = (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ answer: 'Please provide a message.' });
  }
  const lowerMsg = message.trim().toLowerCase();
  // Find a matching FAQ answer
  const answer = faqAnswers[lowerMsg] ||
    'Sorry, I did not understand your question. Please try rephrasing or contact support.';
  res.json({ answer });
};

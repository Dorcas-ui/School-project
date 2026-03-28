import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    const userMsg = input;
    setInput('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/ai/chat',
        { message: userMsg },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((msgs) => [...msgs, { sender: 'bot', text: res.data.answer }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, there was a problem connecting to the AI.' }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">AI Chatbot</h2>
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 h-80 border rounded bg-blue-50 p-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full shadow transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

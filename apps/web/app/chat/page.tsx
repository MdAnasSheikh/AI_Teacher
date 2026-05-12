'use client';

import { AppLayout } from '../../components/ui/AppLayout';
import { useState } from 'react';

type Message = { role: 'user' | 'ai'; text: string };

const suggestions = [
  'Explain the Pythagorean theorem',
  'What is machine learning?',
  'Help me understand photosynthesis',
  'Give me 5 study tips',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hi! I\'m your AI mentor. Ask me anything — maths, science, history, coding, or any subject you\'re studying!' },
  ]);
  const [input, setInput] = useState('');

  function send(text?: string) {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: msg },
      { role: 'ai', text: `Great question! This feature will connect to the AI backend soon. You asked: "${msg}"` },
    ]);
    setInput('');
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">AI Mentor Chat</h1>
      <p className="text-slate-400 mb-6">Ask your AI teacher anything.</p>

      <div className="flex flex-col h-[calc(100vh-220px)] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-purple-700 text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-slate-700">
          <div className="flex gap-2 mb-3 flex-wrap">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-purple-800 hover:text-white border border-slate-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask anything…"
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={() => send()}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-600 rounded-lg text-sm font-semibold transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
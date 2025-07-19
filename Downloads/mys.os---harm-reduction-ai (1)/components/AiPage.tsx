import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';

const AiPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'HOLLOWPOINT AI interface online. Awaiting query...' },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      const stream = await streamChatResponse(input);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              text: lastMessage.text + chunkText,
            };
            return newMessages;
          }
          return prev;
        });
      }
    } catch (err) {
        console.error(err);
        let errorMessage = "An unexpected error occurred.";
        if (err instanceof Error) {
            errorMessage = `API Error: ${err.message}`;
        }
        setError(errorMessage);
        setMessages(prev => [...prev.slice(0, -1), { role: 'model', text: `// ERROR // ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-white">HOLLOWPOINT AI</h1>
        <p className="text-green-500">Real-time Intelligence & Triage</p>
      </header>

      <div className="flex-grow overflow-y-auto bg-black/50 border-2 border-green-900/50 p-4 mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xl p-3 rounded-lg whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-green-900/80 text-white'
                    : 'bg-gray-800/50 text-green-300'
                }`}
              >
                {msg.text}
                {isLoading && msg.role === 'model' && index === messages.length -1 && (
                    <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-2" />
                )}
              </div>
            </div>
          ))}
          {error && <div className="text-red-500 p-3 bg-red-900/20 rounded-lg">{error}</div>}
        </div>
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoading ? "Awaiting response..." : "Enter query..."}
          disabled={isLoading}
          className="flex-grow p-3 bg-gray-900/80 border-2 border-green-900/50 rounded-md text-white placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 bg-green-600 text-black font-bold rounded-md hover:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          Transmit
        </button>
      </form>
    </div>
  );
};

export default AiPage;
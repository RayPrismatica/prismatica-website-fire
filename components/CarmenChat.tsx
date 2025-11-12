'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CarmenChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Most people think they know what they need. Let's find out if you're one of them. What's the challenge?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputFocus = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const chatContent = (
    <div className={`carmen-chat-container ${isModalOpen ? 'carmen-modal-active' : ''}`}>
      <div className="carmen-header">
        <div className="flex items-center gap-2">
          <div className="carmen-avatar">
            <Image
              src="/images/carmen-advisor.jpg"
              alt="Carmen"
              width={40}
              height={40}
              className="carmen-avatar-image"
            />
          </div>
          <div>
            <div className="carmen-name">Carmen</div>
            <div className="carmen-status" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
              }}></span>
              Online
            </div>
          </div>
        </div>
        {isModalOpen && (
          <button
            onClick={handleCloseModal}
            className="carmen-close-button"
            aria-label="Close chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div ref={messagesContainerRef} className="carmen-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`carmen-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className={`message-bubble ${message.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
              <p className="message-text">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="carmen-message assistant-message">
            <div className="message-bubble assistant-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="carmen-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          placeholder="Ask Carmen anything..."
          className="carmen-input"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="carmen-send-button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isModalOpen && <div className="carmen-modal-overlay" onClick={handleCloseModal} />}
      {chatContent}
    </>
  );
}

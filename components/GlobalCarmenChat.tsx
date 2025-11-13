'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { useCarmenChat } from '@/contexts/CarmenChatContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function GlobalCarmenChat() {
  const { isOpen, closeChat } = useCarmenChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "You start."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Preload Carmen's avatar image for instant display
  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/carmen-advisor.jpg';
  }, []);

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

  return (
    <>
      {/* Drawer Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={closeChat} className="relative z-30">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/30 transition-opacity"
              style={{ left: 'var(--sidebar-width, 0px)', transform: 'translateZ(0)' }}
              onClick={closeChat}
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 overflow-hidden" style={{ left: 'var(--sidebar-width, 0px)' }}>
            <div className="absolute inset-0 overflow-hidden">
              {/* Full-width drawer starting from sidebar edge */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-500"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto h-full w-full absolute inset-0" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
                    <div className="flex h-full flex-col bg-white pt-[60px] md:pt-0" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                      {/* Header */}
                      <div className="flex flex-shrink-0 justify-center border-b border-gray-200 bg-gradient-to-b from-white to-gray-50/30 shadow-sm relative" style={{ paddingTop: '1.8rem', paddingBottom: '1.8rem', transform: 'translateZ(0)' }}>
                        {/* Desktop Header */}
                        <div className="hidden md:block w-full max-w-3xl" style={{ paddingLeft: '3rem', paddingRight: '3rem', paddingTop: '1.8rem', paddingBottom: '1.8rem' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Image
                                  src="/images/carmen-advisor.jpg"
                                  alt="Carmen"
                                  width={48}
                                  height={48}
                                  className="ring-2 ring-gray-100 shadow-md"
                                  priority
                                  loading="eager"
                                  quality={95}
                                  style={{ transform: 'translateZ(0)' }}
                                />
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white animate-pulse"></span>
                              </div>
                              <div className="flex flex-col justify-center">
                                <Dialog.Title
                                  className="text-[#222]"
                                  style={{
                                    fontFamily: '"Noto Sans", sans-serif',
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '0.25rem'
                                  }}
                                >
                                  Carmen
                                </Dialog.Title>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-gray-600" style={{ fontFamily: '"Noto Sans", sans-serif', fontWeight: 400 }}>Strategic AI Advisor</p>
                                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                                    Online
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Messages Area - Enhanced chat layout */}
                      <div ref={messagesContainerRef} className="flex flex-1 justify-center overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
                        <div className="w-full max-w-3xl px-4 md:px-12 lg:px-16" style={{ paddingLeft: 'clamp(1rem, 2vw, 3rem)', paddingRight: 'clamp(1rem, 2vw, 3rem)' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {messages.map((message, index) => (
                              <div key={index} className="group">
                                {message.role === 'assistant' ? (
                                  <div className="flex gap-3 md:gap-4">
                                    <div className="flex-shrink-0">
                                      <div className="relative flex items-center justify-center" style={{ width: 'clamp(28px, 5vw, 36px)', height: 'clamp(28px, 5vw, 36px)', transform: 'translateZ(0)' }}>
                                        <Image
                                          src="/images/carmen-advisor.jpg"
                                          alt="Carmen"
                                          width={36}
                                          height={36}
                                          className="rounded-full ring-2 ring-gray-100 shadow-sm"
                                          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translateZ(0)' }}
                                          priority
                                          loading="eager"
                                          quality={95}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                      <div className="flex items-baseline gap-2 md:gap-3">
                                        <span
                                          className="font-semibold text-gray-900"
                                          style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: 'clamp(12px, 2vw, 14px)' }}
                                        >
                                          Carmen
                                        </span>
                                        <span className="text-gray-400" style={{ fontSize: 'clamp(10px, 1.5vw, 12px)' }}>Strategic Advisor</span>
                                      </div>
                                      <div
                                        className="prose prose-sm max-w-none text-gray-800"
                                        style={{
                                          fontFamily: '"Noto Sans", sans-serif',
                                          fontSize: 'clamp(14px, 2.5vw, 15px)',
                                          lineHeight: '1.7',
                                          fontWeight: 400
                                        }}
                                      >
                                        {message.content}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex justify-end">
                                    <div
                                      style={{
                                        fontFamily: '"Noto Sans", sans-serif',
                                        fontSize: 'clamp(14px, 2.5vw, 15px)',
                                        lineHeight: '1.6',
                                        fontWeight: 400,
                                        color: '#D43225',
                                        textAlign: 'right',
                                        maxWidth: '85%'
                                      }}
                                    >
                                      {message.content}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}

                            {isLoading && (
                              <div className="flex gap-3 md:gap-4">
                                <div className="flex-shrink-0">
                                  <div className="relative flex items-center justify-center" style={{ width: 'clamp(28px, 5vw, 36px)', height: 'clamp(28px, 5vw, 36px)', transform: 'translateZ(0)' }}>
                                    <Image
                                      src="/images/carmen-advisor.jpg"
                                      alt="Carmen"
                                      width={36}
                                      height={36}
                                      className="rounded-full ring-2 ring-gray-100 shadow-sm"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translateZ(0)' }}
                                      priority
                                      loading="eager"
                                      quality={95}
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 pt-2">
                                  <div className="flex items-center gap-2">
                                    <div className="flex space-x-1.5">
                                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D43225] [animation-delay:-0.3s]"></div>
                                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D43225] [animation-delay:-0.15s]"></div>
                                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D43225]"></div>
                                    </div>
                                    <span className="text-gray-400 italic" style={{ fontSize: 'clamp(11px, 2vw, 12px)' }}>Carmen is thinking...</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div ref={messagesEndRef} />
                          </div>
                        </div>
                      </div>

                      {/* Input Area */}
                      <div className="flex flex-shrink-0 justify-center border-t border-gray-200 bg-gradient-to-t from-gray-50/50 to-white" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
                        <div className="w-full max-w-3xl" style={{ paddingLeft: 'clamp(1rem, 2vw, 3rem)', paddingRight: 'clamp(1rem, 2vw, 3rem)' }}>
                          <div className="relative">
                            <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 shadow-sm transition-all focus-within:border-[#D43225] focus-within:shadow-md">
                              <div className="flex-1 flex items-center">
                                <textarea
                                  value={input}
                                  onChange={(e) => {
                                    setInput(e.target.value);
                                    // Auto-resize
                                    e.target.style.height = 'auto';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      sendMessage();
                                    }
                                  }}
                                  placeholder="Your text here..."
                                  disabled={isLoading}
                                  rows={1}
                                  className="block w-full resize-none border-0 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 disabled:text-gray-400"
                                  style={{
                                    fontFamily: '"Noto Sans", sans-serif',
                                    fontSize: 'clamp(14px, 2.5vw, 15px)',
                                    fontWeight: 400,
                                    maxHeight: '200px',
                                    lineHeight: '1.6',
                                    paddingLeft: '18px',
                                    paddingRight: '18px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                  }}
                                />
                              </div>
                              <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D43225] to-[#B82B1F] text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D43225] focus:ring-offset-2 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 disabled:opacity-50 disabled:hover:scale-100"
                              >
                                {isLoading ? (
                                  <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10L18 2L10 18L8 11L2 10Z" />
                                  </svg>
                                )}
                                <span className="sr-only">Send</span>
                              </button>
                            </div>

                            {/* Mobile Close Button */}
                            <div className="md:hidden flex items-center justify-center" style={{ marginTop: '24px' }}>
                              <button
                                type="button"
                                onClick={closeChat}
                                className="flex items-center gap-2 rounded-md px-4 py-2 text-gray-700 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D43225]"
                                style={{
                                  fontFamily: '"Noto Sans", sans-serif',
                                  fontSize: 'clamp(13px, 2.5vw, 14px)',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Close
                              </button>
                            </div>

                            <div className="hidden md:flex items-center justify-center px-2" style={{ marginTop: '42px' }}>
                              <p style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: 'clamp(10px, 1.5vw, 12px)', fontWeight: 300, letterSpacing: '0.3px', color: '#6b7280' }}>
                                Press <kbd className="rounded bg-gray-50 px-2 py-1 font-normal border border-gray-200" style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: 'clamp(10px, 1.5vw, 12px)' }}>Enter</kbd> to send, <kbd className="rounded bg-gray-50 px-2 py-1 font-normal border border-gray-200" style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: 'clamp(10px, 1.5vw, 12px)' }}>Shift + Enter</kbd> for new line
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { useAthenaChat } from '@/contexts/AthenaChatContext';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type DrawerState = 'collapsed' | 'expanded' | 'chat';

interface ContextualPrompt {
  question: string;
  context: string;
}

// Desktop contextual prompts (matches mobile exactly)
const PAGE_PROMPTS: Record<string, ContextualPrompt> = {
  '/': {
    question: 'Are you solving for the right variable?',
    context: 'landing page'
  },
  '/products': {
    question: 'Which intelligence gap are you solving for?',
    context: 'product suite page'
  },
  '/about': {
    question: 'Think this matches how you see the world?',
    context: 'about page'
  },
  '/consulting': {
    question: 'Which one solves your actual problem?',
    context: 'consulting services'
  },
  '/solutions': {
    question: 'Which one solves your actual problem?',
    context: 'solutions page'
  },
  '/contact': {
    question: 'What variable are you trying to solve for?',
    context: 'contact page'
  },
  '/triptych': {
    question: 'Which channel are you ignoring?',
    context: 'strategic triptych'
  },
  '/prismatic': {
    question: 'Where is value hiding in your system?',
    context: 'prismatic value'
  },
  '/agentic': {
    question: 'Ready to make intelligence compound?',
    context: 'agentic intelligence'
  },
  '/demand': {
    question: 'What creates pull in your market?',
    context: 'demand generation'
  },
  '/incentives': {
    question: 'What behavior are you actually rewarding?',
    context: 'incentive design'
  },
  '/articles': {
    question: 'Want the thinking behind the thinking?',
    context: 'articles page'
  },
  '/terms': {
    question: 'Questions about how we work together?',
    context: 'terms page'
  },
  '/privacy': {
    question: 'Questions about how we handle your data?',
    context: 'privacy page'
  }
};

const DEFAULT_PROMPT: ContextualPrompt = {
  question: 'Have a question about what you just read?',
  context: 'General inquiry'
};

export default function GlobalAthenaChat() {
  const { isOpen, closeChat } = useAthenaChat();
  const pathname = usePathname();
  const [drawerState, setDrawerState] = useState<DrawerState>('collapsed');
  const [isChatActivated, setIsChatActivated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showExpandedContent, setShowExpandedContent] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastBoxPromptRef = useRef<string | null>(null);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const lastScrollYRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const resetPromptTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialPageLoadRef = useRef<boolean>(true);

  // Get contextual prompt based on current page or active section
  const currentPrompt = {
    question: activeSection || PAGE_PROMPTS[pathname]?.question || DEFAULT_PROMPT.question,
    context: PAGE_PROMPTS[pathname]?.context || DEFAULT_PROMPT.context
  };

  // Preload Athena's avatar image for instant display
  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/athena-advisor.jpg';
  }, []);

  // Reset to page prompt on pathname change
  useEffect(() => {
    isInitialPageLoadRef.current = true;
    setActiveSection(null);
    lastBoxPromptRef.current = null;
  }, [pathname]);

  // Manage expanded content visibility
  useEffect(() => {
    if (drawerState === 'expanded') {
      const timer = setTimeout(() => setShowExpandedContent(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowExpandedContent(false);
    }
  }, [drawerState]);

  // Watch for elements with .in-viewport class to update prompt based on scroll position
  useEffect(() => {
    const checkActiveSection = () => {
      // On initial page load, always use page prompt (ignore bentos)
      if (isInitialPageLoadRef.current) {
        return;
      }

      // Track scroll position for fast scroll detection
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = now - lastScrollTimeRef.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);

      if (timeDelta > 0) {
        scrollVelocityRef.current = scrollDelta / timeDelta; // pixels per millisecond
      }

      lastScrollTimeRef.current = now;
      lastScrollYRef.current = currentScrollY;

      // Only ONE element should have .in-viewport at a time (enforced by MobileAnimations)
      const inViewportElement = document.querySelector('.in-viewport');

      if (inViewportElement) {
        // Clear any pending reset
        if (resetPromptTimeoutRef.current) {
          clearTimeout(resetPromptTimeoutRef.current);
          resetPromptTimeoutRef.current = null;
        }

        // Check for explicit data-athena-prompt attribute
        const prompt = inViewportElement.getAttribute('data-athena-prompt');

        if (prompt) {
          // Only update if it's different from current
          if (lastBoxPromptRef.current !== prompt) {
            lastBoxPromptRef.current = prompt;
            setActiveSection(prompt);
          }
        } else {
          // Element has no prompt - keep the last bento prompt (sticky behavior)
          // Don't reset unless we're clearly out of the bento section
        }
      } else {
        // No box in viewport - STICKY BEHAVIOR
        // Keep the last bento prompt unless user scrolled to top (before first bento)
        // or past the last bento significantly

        const allBentos = document.querySelectorAll('.bento-box, .service-bento, .product-bento, .bento-link, [data-athena-prompt]');

        if (allBentos.length > 0) {
          const firstBento = allBentos[0];
          const lastBento = allBentos[allBentos.length - 1];

          const firstBentoTop = firstBento.getBoundingClientRect().top + window.scrollY;
          const lastBentoBottom = lastBento.getBoundingClientRect().bottom + window.scrollY;

          // If we're above the first bento (at the top of the page), reset to page prompt
          if (currentScrollY < firstBentoTop - 200) {
            if (lastBoxPromptRef.current !== null) {
              lastBoxPromptRef.current = null;
              setActiveSection(null);
            }
          }
          // If we're significantly below the last bento (scrolled past all bentos), reset to page prompt
          else if (currentScrollY > lastBentoBottom + 200) {
            if (lastBoxPromptRef.current !== null) {
              lastBoxPromptRef.current = null;
              setActiveSection(null);
            }
          }
          // Otherwise, keep the last bento prompt (sticky behavior)
        } else {
          // No bentos on page, always use page prompt
          if (lastBoxPromptRef.current !== null) {
            lastBoxPromptRef.current = null;
            setActiveSection(null);
          }
        }
      }
    };

    // Enable bento tracking on first scroll OR after short delay (for desktop)
    const handleFirstScroll = () => {
      isInitialPageLoadRef.current = false;
      window.removeEventListener('scroll', handleFirstScroll);
    };

    // Desktop: Enable tracking immediately after 1 second if no scroll happens
    // Mobile: Wait for first scroll (prevents issues with mobile chrome hiding)
    const isDesktop = window.innerWidth > 768;
    let desktopEnableTimer: NodeJS.Timeout | null = null;

    if (isDesktop) {
      // On desktop, auto-enable tracking after 1 second
      desktopEnableTimer = setTimeout(() => {
        isInitialPageLoadRef.current = false;
        checkActiveSection(); // Immediately check after enabling
      }, 1000);
    } else {
      // On mobile, wait for first scroll
      window.addEventListener('scroll', handleFirstScroll, { passive: true, once: true });
    }

    // Check on mount and scroll
    checkActiveSection();
    window.addEventListener('scroll', checkActiveSection, { passive: true });

    // Also check on resize and dom changes
    const observer = new MutationObserver(checkActiveSection);
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

    return () => {
      if (desktopEnableTimer) {
        clearTimeout(desktopEnableTimer);
      }
      window.removeEventListener('scroll', handleFirstScroll);
      window.removeEventListener('scroll', checkActiveSection);
      observer.disconnect();
      if (resetPromptTimeoutRef.current) {
        clearTimeout(resetPromptTimeoutRef.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Esc key to collapse (not close completely)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerState !== 'collapsed') {
        setDrawerState('collapsed');
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [drawerState]);

  const handleBannerClick = () => {
    // If chat has been activated, skip expanded and go directly to chat
    const nextState = isChatActivated ? 'chat' : 'expanded';
    setDrawerState(nextState);
  };

  const handleStartConversation = () => {
    // Initialize conversation with just Athena's greeting (like mobile)
    if (messages.length === 0) {
      const initialMessage: Message = {
        role: 'assistant',
        content: 'You start.'
      };
      setMessages([initialMessage]);
    }

    setDrawerState('chat');
  };

  const sendContextMessage = async (contextMessage: Message) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pathname,
          messages: [contextMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending context:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Mark chat as activated when user sends their first message
    setIsChatActivated(true);

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
          })),
          pathname,
          conversationId: currentConversationId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = data.retryAfter || 60;
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `You're moving fast. Slow down for ${retryAfter} seconds.`
          }]);
          return;
        }
        throw new Error('Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.conversationId) {
        setCurrentConversationId(data.conversationId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection issue. Try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Collapse to banner (don't reset state - preserve conversation)
  const handleCollapse = () => {
    setDrawerState('collapsed');
  };

  // Trigger post-conversation analysis when chat is truly closed (not just minimized)
  const handleClose = () => {
    // Only trigger analysis if conversation has substance (6+ messages = 3+ real exchanges)
    if (messages.length >= 6 && currentConversationId) {
      // Non-blocking call to analysis endpoint
      fetch('/api/chat/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: currentConversationId })
      }).catch(err => console.error('Analysis failed:', err));
    }

    // Close chat immediately (don't wait for analysis)
    closeChat();
    setDrawerState('collapsed');
    // Optionally reset conversation state
    // setMessages([]);
    // setCurrentConversationId(null);
  };

  // Don't render on Focus homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <>
      {/* Desktop: 3-state banner system (collapsed → expanded → chat) */}

      {/* Collapsed Banner - Always visible bottom-right (desktop only) */}
      {drawerState === 'collapsed' && (
        <div className="hidden md:block">
          <div
            onClick={handleBannerClick}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '360px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              borderTop: isChatActivated ? '3px solid #10b981' : '3px solid #D43225',
              padding: '16px 20px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              zIndex: 50,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateZ(0)',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.transform = 'translateY(-2px) translateZ(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
            }}
          >
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              margin: 0,
              padding: 0,
              color: '#222',
              lineHeight: 1.4,
              fontFamily: '"Noto Sans", sans-serif'
            }}>
              {currentPrompt.question}
            </p>
          </div>
        </div>
      )}

      {/* Expanded State - Explanation card (desktop only) */}
      {drawerState === 'expanded' && (
        <div className="hidden md:block">
          <div
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '420px',
              maxHeight: 'calc(100vh - 120px)',
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              transform: 'translateZ(0)',
              animation: 'expandUp 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          >
            <style jsx>{`
              @keyframes expandUp {
                from {
                  opacity: 0;
                  transform: translateY(20px) translateZ(0);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) translateZ(0);
                }
              }
            `}</style>

            {/* Prompt banner */}
            <div style={{
              borderTop: '3px solid #D43225',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              padding: '16px 20px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                margin: 0,
                padding: 0,
                color: '#222',
                lineHeight: 1.4,
                fontFamily: '"Noto Sans", sans-serif'
              }}>
                {currentPrompt.question}
              </p>
            </div>

            {/* Expanded content */}
            {showExpandedContent && (
              <div style={{
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                flex: 1,
                overflow: 'auto'
              }}>
                {/* Explanation card */}
                <div style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.7)',
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: '3px solid #D43225'
                }}>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    margin: '0 0 12px',
                    color: '#222',
                    lineHeight: 1.3,
                    fontFamily: '"Noto Sans", sans-serif'
                  }}>
                    Athena knows Prismatica.
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#444',
                    margin: '0 0 12px 0',
                    lineHeight: 1.6,
                    fontFamily: '"Noto Sans", sans-serif'
                  }}>
                    She's studied everything we do, how we think, and what we've built. Ask her anything about our work, your situation, or whether this matches how you see problems.
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#444',
                    margin: 0,
                    lineHeight: 1.6,
                    fontFamily: '"Noto Sans", sans-serif'
                  }}>
                    Once you start, she stays with you. Collapse this, explore the site, come back—she'll know where you've been and what you're considering.
                  </p>
                </div>

                {/* Athena profile */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Image
                      src="/images/athena-advisor.jpg"
                      alt="Athena"
                      width={48}
                      height={48}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      display: 'block',
                      height: '12px',
                      width: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      border: '2px solid white'
                    }}></span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#222',
                      fontFamily: '"Noto Sans", sans-serif'
                    }}>
                      Athena
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      fontFamily: '"Noto Sans", sans-serif'
                    }}>
                      Strategic Advisor
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={handleStartConversation}
                    style={{
                      backgroundColor: '#D43225',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px 24px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'background-color 0.2s',
                      fontFamily: '"Noto Sans", sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#B82919';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#D43225';
                    }}
                  >
                    Start Conversation
                  </button>

                  <button
                    onClick={() => setDrawerState('collapsed')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      fontSize: '24px',
                      cursor: 'pointer',
                      padding: '8px 0',
                      display: 'block',
                      lineHeight: 1,
                      fontWeight: 300,
                      marginTop: '12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D43225';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#999';
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat State - Full drawer (all desktop sizes) */}
      {drawerState === 'chat' && (
        <Transition show={true} as={Fragment}>
            <Dialog onClose={handleCollapse} className="relative z-30">
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
                  onClick={handleCollapse}
                  aria-hidden="true"
                />
              </Transition.Child>

              <div className="fixed inset-y-0 right-0 overflow-hidden" style={{ left: 'var(--sidebar-width, 0px)', zIndex: 9999 }}>
                <div className="absolute inset-0 overflow-hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform transition ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel className="pointer-events-auto w-full absolute inset-0" style={{ willChange: 'transform', backfaceVisibility: 'hidden', height: '100vh', backgroundColor: '#fff' }}>
                      <div className="flex flex-col bg-white h-full" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                        {/* Header */}
                        <div className="flex flex-shrink-0 justify-center border-b border-gray-200 bg-white">
                          <div className="flex w-full items-center justify-between" style={{ padding: '24px 32px' }}>
                            <Dialog.Title
                              style={{
                                fontFamily: '"Noto Sans", sans-serif',
                                fontSize: '20px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                color: '#222',
                                margin: 0
                              }}
                            >
                              Athena
                            </Dialog.Title>
                            <button
                              type="button"
                              onClick={handleCollapse}
                              aria-label="Collapse chat"
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                fontSize: '24px',
                                fontWeight: 300,
                                color: '#999',
                                lineHeight: 1,
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                            >
                              ×
                            </button>
                          </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={messagesContainerRef} className="flex flex-1 justify-center overflow-y-auto bg-[#fafafa] overscroll-contain" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                          <div className="w-full max-w-3xl px-4 md:px-12 lg:px-16" style={{ paddingLeft: 'clamp(1rem, 2vw, 3rem)', paddingRight: 'clamp(1rem, 2vw, 3rem)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                              {messages.map((message, index) => (
                                <div key={index} className="group">
                                  {message.role === 'assistant' ? (
                                    <div className="flex gap-4">
                                      <div className="flex-shrink-0">
                                        <div className="relative flex items-center justify-center" style={{ width: '36px', height: '36px', transform: 'translateZ(0)' }}>
                                          <Image
                                            src="/images/athena-advisor.jpg"
                                            alt="Athena"
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
                                        <div className="flex items-baseline gap-3">
                                          <span
                                            className="font-semibold text-gray-900"
                                            style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '14px' }}
                                          >
                                            Athena
                                          </span>
                                          <span className="text-gray-400" style={{ fontSize: '12px' }}>Strategic AI Advisor</span>
                                        </div>
                                        <div
                                          className="prose prose-sm max-w-none text-gray-800"
                                          style={{
                                            fontFamily: '"Noto Sans", sans-serif',
                                            fontSize: '15px',
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
                                          fontSize: '15px',
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
                                <div className="flex gap-4">
                                  <div className="flex-shrink-0">
                                    <div className="relative flex items-center justify-center" style={{ width: '36px', height: '36px', transform: 'translateZ(0)' }}>
                                      <Image
                                        src="/images/athena-advisor.jpg"
                                        alt="Athena"
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
                                    <div className="flex items-baseline gap-3">
                                      <span
                                        className="font-semibold text-gray-900"
                                        style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '14px' }}
                                      >
                                        Athena
                                      </span>
                                      <span className="text-gray-400" style={{ fontSize: '12px' }}>Strategic AI Advisor</span>
                                      <div
                                        className="animate-pulse"
                                        style={{
                                          width: '8px',
                                          height: '8px',
                                          borderRadius: '50%',
                                          backgroundColor: '#D43225',
                                          marginLeft: '4px'
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div ref={messagesEndRef} />
                            </div>
                          </div>
                        </div>

                        {/* Input Area */}
                        <div className="flex flex-shrink-0 justify-center border-t border-gray-200 bg-white" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                          <div className="w-full max-w-3xl" style={{ paddingLeft: 'clamp(1rem, 2vw, 3rem)', paddingRight: 'clamp(1rem, 2vw, 3rem)' }}>
                            <div className="relative">
                              <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 shadow-sm transition-all focus-within:border-[#D43225] focus-within:shadow-md">
                                <div className="flex-1 flex items-center">
                                  <textarea
                                    value={input}
                                    onChange={(e) => {
                                      setInput(e.target.value);
                                      e.target.style.height = 'auto';
                                      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
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
                                      fontSize: '16px',
                                      fontWeight: 400,
                                      maxHeight: '120px',
                                      lineHeight: '1.5',
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
                                  className="group relative flex flex-shrink-0 items-center justify-center rounded-xl text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#D43225] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                                  style={{
                                    minWidth: '44px',
                                    minHeight: '44px',
                                    backgroundColor: isLoading || !input.trim() ? '#e0e0e0' : '#D43225',
                                    transform: 'translateZ(0)',
                                    boxShadow: '0 2px 8px rgba(212, 50, 37, 0.2)'
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isLoading && input.trim()) {
                                      e.currentTarget.style.backgroundColor = '#B82919';
                                      e.currentTarget.style.transform = 'scale(1.05) translateZ(0)';
                                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 50, 37, 0.3)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = isLoading || !input.trim() ? '#e0e0e0' : '#D43225';
                                    e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 50, 37, 0.2)';
                                  }}
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
      )}
    </>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Contextual prompts based on current page
const PAGE_PROMPTS: Record<string, { question: string; context: string }> = {
  '/': {
    question: 'Are you solving for the right variable?',
    context: 'landing page'
  },
  '/what': {
    question: 'Want to see new questions at work?',
    context: 'services overview'
  },
  '/products': {
    question: 'Which intelligence gap are you solving for?',
    context: 'product suite page'
  },
  '/who-we-are': {
    question: 'Think this matches how you see the world?',
    context: 'about page'
  },
  '/consulting': {
    question: 'Which one solves your actual problem?',
    context: 'consulting services'
  },
  '/contact': {
    question: 'What variable are you trying to solve for?',
    context: 'contact page'
  },
  '/mental-models': {
    question: 'Where does your market thinking break down?',
    context: 'mental models service'
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

// Service-specific prompts for consulting page
const SERVICE_PROMPTS: Record<string, string> = {
  'Pioneers of Purpose Assessment': 'Imagine culture and message perfectly aligned. Chat?',
  'The ESI Framework': 'Picture insights flowing straight into execution. Ask Athena.',
  'The Secret Agency': 'What if software adapted to you, not the other way? Talk?',
  'The Transaction Architecture': 'See engagement converting at the rate it should. Curious?',
  'Knowledge Search Optimisation (KSO) Workshop': 'Imagine AI citing you as the authority. Explore this?',
  'The Strategic Triptych Assessment': 'What if you could see exactly where value leaks? Ask now.',
  'Go-to-Market': 'Launch once, launch right, no budget burned. Questions?',
  'Creative That Converts': 'Picture your brand driving pricing power, not just presence. Chat?',
  'Design Thinking': 'Reframe the problem and watch solutions appear. Want to know how?',
  'AI Without the Hallucination': 'Clear ROI from AI, zero hype required. Discuss?',
  'Process Surgery': 'Imagine work getting easier, not just documented. Ask Athena now.',
  'Marketing Reality Check': 'See what actually moves the needle in your market. Ready?'
};

// Parse markdown links and render them with red styling
function renderMessageWithLinks(text: string, onLinkClick: () => void) {
  // Regex to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link with red styling
    const linkText = match[1];
    const url = match[2];
    parts.push(
      <Link
        key={key++}
        href={url}
        onClick={onLinkClick}
        style={{
          color: '#D43225',
          textDecoration: 'underline',
          fontWeight: 600,
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        {linkText}
      </Link>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type DrawerState = 'collapsed' | 'expanded' | 'chat';

export default function MobileBottomSheetAthena() {
  const pathname = usePathname();
  const [drawerState, setDrawerState] = useState<DrawerState>('collapsed');
  const [previousState, setPreviousState] = useState<DrawerState>('collapsed');
  const [showExpandedContent, setShowExpandedContent] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "You start."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [displayedPrompt, setDisplayedPrompt] = useState<string | null>(null);
  const [isPromptTransitioning, setIsPromptTransitioning] = useState(false);
  const lastBoxPromptRef = useRef<string | null>(null);
  const promptTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCloseFading, setIsCloseFading] = useState(false);
  const [isChatActivated, setIsChatActivated] = useState(false);

  // Track state changes for transition direction
  useEffect(() => {
    setPreviousState(drawerState);
  }, [drawerState]);

  // Reset close button fade only when explicitly going to expanded (not collapsed)
  useEffect(() => {
    if (drawerState === 'expanded' && previousState === 'collapsed') {
      setIsCloseFading(false);
    }
  }, [drawerState, previousState]);

  // Manage expanded content visibility - show immediately when expanded
  useEffect(() => {
    if (drawerState === 'expanded') {
      setShowExpandedContent(true);
    } else if (drawerState === 'chat') {
      // When transitioning to chat
      if (previousState === 'expanded') {
        // Coming from expanded: Keep content visible, schedule hiding after animation
        // Don't set to false immediately - it's already true and should stay that way
        const timer = setTimeout(() => {
          setShowExpandedContent(false);
        }, 1500);
        return () => clearTimeout(timer);
      } else if (previousState === 'collapsed') {
        // Coming directly from collapsed (chat already activated): Hide immediately
        setShowExpandedContent(false);
      }
      // Note: if previousState === 'chat', do nothing (content already in correct state)
    } else if (drawerState === 'collapsed') {
      // If coming from chat, hide immediately
      // If coming from expanded, delay until transition completes
      if (previousState === 'chat') {
        setShowExpandedContent(false);
      } else if (previousState === 'expanded') {
        const timer = setTimeout(() => {
          setShowExpandedContent(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [drawerState, previousState]);

  // Check if mobile on client side and mark as mounted
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable body scroll when drawer is expanded or in chat state
  useEffect(() => {
    if (!isMobile) return;

    if (drawerState === 'expanded' || drawerState === 'chat') {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent body scroll - more aggressive approach for iOS
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';

      // Also prevent touch move on document (iOS Safari fallback)
      const preventTouch = (e: TouchEvent) => {
        // Allow scrolling within the drawer itself
        const target = e.target as HTMLElement;
        const drawerElement = document.querySelector('[data-drawer="true"]');
        if (drawerElement?.contains(target)) {
          return; // Allow touch within drawer
        }
        e.preventDefault();
      };

      document.addEventListener('touchmove', preventTouch, { passive: false });

      return () => {
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';

        // Remove touch listener
        document.removeEventListener('touchmove', preventTouch);

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [drawerState, isMobile]);

  // Track which section is currently in view - syncs with existing in-viewport system
  useEffect(() => {
    if (!isMobile) return;

    const checkActiveSection = () => {
      // Look for elements that already have the 'in-viewport' class (from existing animation system)
      const inViewportElement = document.querySelector('.in-viewport');

      if (inViewportElement) {
        // Try to extract a meaningful prompt from the element
        let prompt = null;

        // Check for explicit data-athena-prompt attribute first
        prompt = inViewportElement.getAttribute('data-athena-prompt');

        // If no explicit prompt, auto-generate based on content
        if (!prompt) {
          // For service bentos, extract the h3 title
          const heading = inViewportElement.querySelector('h3');
          if (heading) {
            // Try to get just the text content, excluding badge spans
            let title = '';

            // Clone the heading to avoid modifying the actual DOM
            const clone = heading.cloneNode(true) as HTMLElement;

            // Remove all badge spans (they have background styling)
            const badges = clone.querySelectorAll('span[style*="background"]');
            badges.forEach(badge => badge.remove());

            // Get remaining text content
            title = clone.textContent?.trim() || '';

            if (title) {
              // Check if we have a custom service prompt
              const customPrompt = SERVICE_PROMPTS[title];
              if (customPrompt) {
                prompt = customPrompt;
              } else {
                // Default fallback for services without custom prompts
                prompt = `Want to explore ${title} for your situation?`;
              }
            }
          }

          // For product bentos, check for title
          if (!prompt) {
            const productTitle = inViewportElement.querySelector('h4, .product-title');
            if (productTitle) {
              const title = productTitle.textContent?.trim();
              if (title) {
                prompt = `How would ${title} work in your context?`;
              }
            }
          }
        }

        if (prompt) {
          // Store this as the last box prompt and update active section
          lastBoxPromptRef.current = prompt;
          setActiveSection(prompt);
        }
      } else {
        // No specific element in focus - always revert to page-level prompt
        setActiveSection(null);
      }
    };

    // Check initially
    checkActiveSection();

    // Re-check when in-viewport class changes (triggered by MobilePrototypeAnimations)
    const observer = new MutationObserver(() => {
      checkActiveSection();
    });

    // Observe class changes on all bento boxes
    const bentos = document.querySelectorAll('.bento-box, .service-bento, .product-bento, .bento-link');
    bentos.forEach((bento) => {
      observer.observe(bento, {
        attributes: true,
        attributeFilter: ['class']
      });
    });

    // Also listen to scroll events as fallback
    const handleScroll = () => {
      requestAnimationFrame(checkActiveSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (promptTransitionTimeoutRef.current) {
        clearTimeout(promptTransitionTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // Determine what prompt should be shown
  const targetPrompt = activeSection
    ? activeSection
    : (PAGE_PROMPTS[pathname]?.question || 'Have a question about what you just read?');

  // Trigger transition when target prompt changes
  useEffect(() => {
    if (targetPrompt !== displayedPrompt) {
      // Start transition
      setIsPromptTransitioning(true);

      // Clear any existing timeout
      if (promptTransitionTimeoutRef.current) {
        clearTimeout(promptTransitionTimeoutRef.current);
      }

      // Wait for fade out to complete, then switch text and fade in
      promptTransitionTimeoutRef.current = setTimeout(() => {
        setDisplayedPrompt(targetPrompt);
        setIsPromptTransitioning(false);
      }, 1000); // Full 1 second - wait for complete fade out before switching
    }
  }, [targetPrompt, displayedPrompt]);

  // Initialize displayed prompt on mount
  useEffect(() => {
    if (displayedPrompt === null) {
      setDisplayedPrompt(targetPrompt);
    }
  }, []);

  const currentPrompt = { question: displayedPrompt || targetPrompt, context: 'current section' };

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Preload Athena avatar
  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/athena-advisor.jpg';
  }, []);

  // Prevent body scroll only in chat mode (allow scrolling in expanded state)
  useEffect(() => {
    if (drawerState === 'chat') {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [drawerState]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (drawerState === 'chat') {
      scrollToBottom();
    }
  }, [messages, drawerState]);

  const handleAskAthena = () => {
    // Don't trigger close button fade - we want expanded content visible during transition
    // setIsCloseFading(true); // Removed to preserve upward slide animation

    // Initialize conversation with the contextual prompt as context
    if (messages.length === 0) {
      const contextMessage: Message = {
        role: 'user',
        content: `I'm interested in: ${currentPrompt.question}`
      };
      setMessages([contextMessage]);

      // Auto-send the context to get Athena's response
      setTimeout(() => {
        sendContextMessage(contextMessage);
      }, 100);
    }

    setDrawerState('chat');

    // Mark chat as activated after state change to preserve animation
    // Delay ensures expanded content stays visible during transition
    setTimeout(() => {
      setIsChatActivated(true);
    }, 100);
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

  // Don't render on server or if not mobile
  // Wait for client-side mount to prevent hydration mismatch
  if (!isMounted || !isMobile) {
    return null;
  }

  // Drawer heights based on state
  const getDrawerHeight = () => {
    switch (drawerState) {
      case 'collapsed': return '80px';
      case 'expanded': return '100dvh';
      case 'chat': return '100dvh';
    }
  };

  // Determine if opening or closing based on state transition
  const isOpening = () => {
    const stateOrder = { collapsed: 0, expanded: 1, chat: 2 };
    return stateOrder[drawerState] > stateOrder[previousState];
  };

  // Get timing curve based on direction
  const getTimingCurve = () => {
    if (isOpening()) {
      // Opening: starts fast, ends slow (ease-out)
      return 'cubic-bezier(0.2, 0, 0, 1)';
    } else {
      // Closing: starts slow, speeds up (ease-in)
      return 'cubic-bezier(0.6, 0, 0.8, 0.2)';
    }
  };

  return (
    <div
      ref={sheetRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: getDrawerHeight(),
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        transition: `height 1.5s ${getTimingCurve()}`,
        willChange: 'height',
        overflow: 'visible',
        maxHeight: '100dvh'
      }}
    >
      {/* Content container that slides up */}
      <div
        data-drawer="true"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transform: drawerState === 'chat' ? 'translateY(-100dvh)' : 'translateY(0)',
          transition: `transform 1.5s ${getTimingCurve()}`
        }}
      >
        {/* Prompt banner and expanded content */}
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 1)',
            border: '0.5px solid rgba(0, 0, 0, 0.1)',
            borderBottom: 'none',
            borderTopLeftRadius: drawerState === 'chat' ? '0' : '20px',
            borderTopRightRadius: drawerState === 'chat' ? '0' : '20px',
            paddingBottom: drawerState !== 'collapsed' ? 'env(safe-area-inset-bottom)' : '0',
            boxShadow: drawerState === 'collapsed'
              ? '0 -4px 16px rgba(0, 0, 0, 0.08), 0 -2px 4px rgba(0, 0, 0, 0.04)'
              : '0 -2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Prompt banner - always visible in collapsed/expanded */}
          <div
            onClick={() => {
              if (drawerState === 'collapsed') {
                // If chat has been activated, skip expanded view and go directly to chat
                setDrawerState(isChatActivated ? 'chat' : 'expanded');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              height: '80px',
              cursor: drawerState === 'collapsed' ? 'pointer' : 'default',
              flexShrink: 0,
              padding: '0 40px',
              borderTop: isChatActivated ? '1px solid #10b981' : '1px solid #D43225',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              transition: 'border-color 0.4s ease'
            }}
          >
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              margin: 0,
              color: '#222',
              lineHeight: 1.3,
              opacity: isPromptTransitioning ? 0 : (drawerState === 'chat' ? 0 : 1),
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {currentPrompt.question}
            </p>
          </div>

          {/* Expanded content */}
          {showExpandedContent && (
            <div
              onTouchMove={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '0 20px 20px 20px',
                overflow: 'hidden'
              }}>
              <div
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.7)',
                  backdropFilter: 'blur(10px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                  borderRadius: '12px',
                  padding: '16px',
                  borderLeft: '3px solid #D43225'
                }}
              >
                <p style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  margin: '0 0 8px',
                  color: '#222'
                }}>
                  Athena is our strategic AI advisor
                </p>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: 1.5 }}>
                  She can help you understand how this applies to your specific situation, industry, or challenge.
                </p>
              </div>

              {/* Athena Profile */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0'
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
                <div style={{ flex: 1, minWidth: 0 }}>
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
                    Strategic AI Advisor
                  </div>
                </div>
              </div>

              {/* Push button section to bottom */}
              <div style={{ marginTop: 'auto' }}>
                <button
                  onClick={handleAskAthena}
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
                    transition: 'background-color 0.2s'
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = '#b8281e';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.backgroundColor = '#D43225';
                  }}
                >
                  Start Conversation
                </button>

                <div style={{ paddingTop: '8px', borderTop: '1px solid #e0e0e0', marginTop: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', margin: 0 }}>
                    Powered by Claude • Contextual intelligence
                  </p>
                </div>

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
                    textAlign: 'left',
                    opacity: isCloseFading ? 0 : 1,
                    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isCloseFading ? 'none' : 'auto',
                    lineHeight: 1,
                    fontWeight: 300,
                    marginTop: '12px'
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chat interface - positioned below the expanded content */}
        <div style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '60px',
          background: 'rgba(255, 255, 255, 1)'
        }}>
            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {messages.map((message, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  {message.role === 'assistant' ? (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flexShrink: 0 }}>
                        <Image
                          src="/images/athena-advisor.jpg"
                          alt="Athena"
                          width={32}
                          height={32}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          margin: '0 0 6px',
                          color: '#222'
                        }}>
                          Athena
                        </p>
                        <p style={{
                          fontSize: '15px',
                          lineHeight: '1.6',
                          margin: 0,
                          color: '#333'
                        }}>
                          {renderMessageWithLinks(message.content, () => {
                            // Collapse drawer when user clicks a link
                            setDrawerState('collapsed');
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#D43225',
                        margin: 0,
                        display: 'inline-block',
                        maxWidth: '85%',
                        textAlign: 'right'
                      }}>
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ flexShrink: 0 }}>
                    <Image
                      src="/images/athena-advisor.jpg"
                      alt="Athena"
                      width={32}
                      height={32}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, paddingTop: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#D43225',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '-0.32s'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#D43225',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '-0.16s'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#D43225',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out both'
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div style={{
              borderTop: '1px solid #e0e0e0',
              padding: '16px 20px',
              paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              flexShrink: 0
            }}>
              {/* Close button */}
              <button
                onClick={() => setDrawerState('collapsed')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '0 0 12px 0',
                  display: 'block',
                  transition: 'color 0.2s'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.color = '#D43225';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.color = '#666';
                }}
              >
                Collapse
              </button>

              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-end'
              }}>
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
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    resize: 'none',
                    maxHeight: '120px',
                    outline: 'none',
                    fontFamily: '"Noto Sans", sans-serif'
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  style={{
                    minWidth: '44px',
                    minHeight: '44px',
                    backgroundColor: (isLoading || !input.trim()) ? '#ccc' : '#D43225',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10L18 2L10 18L8 11L2 10Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

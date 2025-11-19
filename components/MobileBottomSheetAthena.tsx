'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useAthenaChat } from '@/contexts/AthenaChatContext';

// Contextual prompts based on current page
const PAGE_PROMPTS: Record<string, { question: string; context: string }> = {
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
  const { getViewingContext } = useAthenaChat();
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [displayedPrompt, setDisplayedPrompt] = useState<string | null>(null);
  const [isPromptTransitioning, setIsPromptTransitioning] = useState(false);
  const lastBoxPromptRef = useRef<string | null>(null);
  const promptTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSendingRef = useRef<boolean>(false); // Synchronous guard against React Strict Mode double-invocation
  const [isCloseFading, setIsCloseFading] = useState(false);
  const [isChatActivated, setIsChatActivated] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const pendingPromptRef = useRef<string | null>(null);
  const isInitialLoadRef = useRef(true);

  // Track state changes for transition direction
  useEffect(() => {
    setPreviousState(drawerState);
  }, [drawerState]);

  // Debug: Log when isChatActivated changes
  useEffect(() => {
    console.log('🔵 isChatActivated changed to:', isChatActivated);
  }, [isChatActivated]);

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

  // Detect scrolling to disable transitions and prevent choppy browser chrome adjustments
  useEffect(() => {
    if (!isMobile || drawerState !== 'collapsed') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate scroll velocity
          const currentY = window.scrollY;
          const currentTime = Date.now();
          const deltaY = Math.abs(currentY - lastScrollY.current);
          const deltaTime = currentTime - lastScrollTime.current;
          const velocity = deltaTime > 0 ? deltaY / deltaTime : 0; // pixels per millisecond

          lastScrollY.current = currentY;
          lastScrollTime.current = currentTime;
          setScrollVelocity(velocity);

          // Set scrolling state immediately
          setIsScrolling(true);

          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Re-enable transitions after scrolling stops (150ms debounce)
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
            setScrollVelocity(0);

            // Apply pending prompt change if there is one
            if (pendingPromptRef.current) {
              setActiveSection(pendingPromptRef.current);
              pendingPromptRef.current = null;
            }
          }, 150);

          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile, drawerState]);

  // Reset textarea height when input is cleared
  useEffect(() => {
    if (input === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input]);

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
          // Store this as the last box prompt
          lastBoxPromptRef.current = prompt;

          // Only update active section if scroll velocity is low (< 0.5 px/ms)
          // During fast scroll, queue the change for later
          if (scrollVelocity < 0.5) {
            setActiveSection(prompt);
            pendingPromptRef.current = null; // Clear any pending change
          } else {
            // Queue this prompt change for when scroll slows down
            pendingPromptRef.current = prompt;
          }
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
          const currentScrollY = window.scrollY;

          // If we're above the first bento (at the top of the page), reset to page prompt
          if (currentScrollY < firstBentoTop - 200) {
            if (lastBoxPromptRef.current !== null && scrollVelocity < 0.5) {
              lastBoxPromptRef.current = null;
              setActiveSection(null);
              pendingPromptRef.current = null;
            }
          }
          // If we're significantly below the last bento (scrolled past all bentos), reset to page prompt
          else if (currentScrollY > lastBentoBottom + 200) {
            if (lastBoxPromptRef.current !== null && scrollVelocity < 0.5) {
              lastBoxPromptRef.current = null;
              setActiveSection(null);
              pendingPromptRef.current = null;
            }
          }
          // Otherwise, keep the last bento prompt (sticky behavior)
        } else {
          // No bentos on page, always use page prompt
          if (scrollVelocity < 0.5) {
            if (lastBoxPromptRef.current !== null) {
              lastBoxPromptRef.current = null;
              setActiveSection(null);
              pendingPromptRef.current = null;
            }
          }
        }
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
  }, [isMobile, scrollVelocity]);

  // Determine what prompt should be shown
  const targetPrompt = activeSection
    ? activeSection
    : (PAGE_PROMPTS[pathname]?.question || 'Have a question about what you just read?');

  // Update displayed prompt when target changes (instant, no transition)
  useEffect(() => {
    // Skip if displayedPrompt hasn't been set yet (initial render)
    if (displayedPrompt === null) return;

    if (targetPrompt !== displayedPrompt) {
      // Instant text change - no fade transition
      setDisplayedPrompt(targetPrompt);
    }
  }, [targetPrompt, displayedPrompt]);

  // Initialize displayed prompt on mount and when pathname changes
  useEffect(() => {
    // On page load or page change, immediately set the page prompt
    const pagePrompt = PAGE_PROMPTS[pathname]?.question || 'Have a question about what you just read?';
    setDisplayedPrompt(pagePrompt);
    // Clear any pending prompt changes and reset active section
    pendingPromptRef.current = null;
    setActiveSection(null);
  }, [pathname]);

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
    // Use functional update to prevent React Strict Mode from creating duplicates
    const contextMessage: Message = {
      role: 'user',
      content: `I'm interested in: ${currentPrompt.question}`
    };

    setMessages(prev => {
      if (prev.length === 0) {
        // Auto-send the context to get Athena's response
        setTimeout(() => {
          sendContextMessage(contextMessage);
        }, 100);
        return [contextMessage];
      }
      return prev;
    });

    setDrawerState('chat');
  };

  const sendContextMessage = async (contextMessage: Message) => {
    setIsLoading(true);

    // Create a placeholder for the streaming response
    const streamingMessageIndex = messages.length;
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

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
          })),
          viewingContext: getViewingContext()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const eventMatch = line.match(/^event: (.+)\ndata: ([\s\S]+)$/);
          if (!eventMatch) continue;

          const [, eventType, dataStr] = eventMatch;
          const data = JSON.parse(dataStr);

          if (eventType === 'text') {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastAssistantIndex = newMessages.length - 1;
              if (newMessages[lastAssistantIndex]?.role === 'assistant') {
                newMessages[lastAssistantIndex] = {
                role: 'assistant',
                content: data.accumulated
              };
              }
              return newMessages;
            });
          } else if (eventType === 'done') {
            setIsLoading(false);
          } else if (eventType === 'error') {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastAssistantIndex = newMessages.length - 1;
              if (newMessages[lastAssistantIndex]?.role === 'assistant') {
                newMessages[lastAssistantIndex] = {
                role: 'assistant',
                content: data.message || 'Connection issue. Try again.'
              };
              }
              return newMessages;
            });
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error('Error sending context:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[streamingMessageIndex] = {
          role: 'assistant',
          content: 'Connection issue. Try again.'
        };
        return newMessages;
      });
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isSendingRef.current) {
      return;
    }

    // Set synchronous guard FIRST - prevents React Strict Mode from double-invoking entire function
    isSendingRef.current = true;

    // Mark chat as activated when user sends their first message
    setIsChatActivated(true);

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    // Create assistant placeholder ONCE (outside updater) to prevent React Strict Mode from creating duplicates
    const assistantPlaceholder: Message = {
      role: 'assistant',
      content: ''
    };

    // Clear input and set loading FIRST to prevent double-submission
    setInput('');
    setIsLoading(true);

    // Add user message and placeholder in one update
    // React Strict Mode will call setMessages twice, but using same object references prevents duplicates
    // IMPORTANT: Capture the index BEFORE adding to prevent race conditions
    const streamingMessageIndex = messages.length + 1; // +1 because we're adding user message first
    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pathname,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          viewingContext: getViewingContext()
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          const retryAfter = data.retryAfter || 60;
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[streamingMessageIndex]?.role === 'assistant') {
              newMessages[streamingMessageIndex] = {
                role: 'assistant',
                content: `You're moving fast. Slow down for ${retryAfter} seconds.`
              };
            }
            return newMessages;
          });
          setIsLoading(false);
          return;
        }
        throw new Error('Failed to get response');
      }

      // Handle streaming response with smooth buffering
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';
      let accumulatedContent = '';
      let pendingUpdate = false;

      // Batch React updates using requestAnimationFrame (no throttling, just efficient batching)
      const scheduleUpdate = () => {
        if (!pendingUpdate) {
          pendingUpdate = true;
          requestAnimationFrame(() => {
            setMessages(prev => {
              const newMessages = [...prev];
              if (newMessages[streamingMessageIndex]?.role === 'assistant') {
                newMessages[streamingMessageIndex] = {
                  role: 'assistant',
                  content: accumulatedContent
                };
              }
              return newMessages;
            });
            pendingUpdate = false;
          });
        }
      };

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // Ensure final update is applied immediately
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[streamingMessageIndex]?.role === 'assistant') {
              newMessages[streamingMessageIndex] = {
                role: 'assistant',
                content: accumulatedContent
              };
            }
            return newMessages;
          });
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const eventMatch = line.match(/^event: (.+)\ndata: ([\s\S]+)$/);
          if (!eventMatch) continue;

          const [, eventType, dataStr] = eventMatch;
          const data = JSON.parse(dataStr);

          if (eventType === 'text') {
            accumulatedContent = data.accumulated;
            scheduleUpdate();
          } else if (eventType === 'tool_start') {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastAssistantIndex = newMessages.length - 1;
              if (newMessages[lastAssistantIndex]?.role === 'assistant') {
                newMessages[lastAssistantIndex] = {
                role: 'assistant',
                content: `_Searching..._`
              };
              }
              return newMessages;
            });
          } else if (eventType === 'tool_executing') {
            const toolName = data.tool === 'search_web' ? 'Searching' : 'Reading';
            setMessages(prev => {
              const newMessages = [...prev];
              const lastAssistantIndex = newMessages.length - 1;
              if (newMessages[lastAssistantIndex]?.role === 'assistant') {
                newMessages[lastAssistantIndex] = {
                role: 'assistant',
                content: `_${toolName}..._`
              };
              }
              return newMessages;
            });
          } else if (eventType === 'done') {
            setIsLoading(false);
          } else if (eventType === 'error') {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastAssistantIndex = newMessages.length - 1;
              if (newMessages[lastAssistantIndex]?.role === 'assistant') {
                newMessages[lastAssistantIndex] = {
                role: 'assistant',
                content: data.message || 'Connection issue. Try again.'
              };
              }
              return newMessages;
            });
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastAssistantIndex = newMessages.length - 1;
        if (newMessages[lastAssistantIndex]?.role === 'assistant') {
          newMessages[lastAssistantIndex] = {
            role: 'assistant',
            content: "Connection issue. Try again."
          };
        }
        return newMessages;
      });
      setIsLoading(false);
    } finally {
      // Always reset the guard and loading state, even if there was an error or stream was cancelled
      isSendingRef.current = false;
      setIsLoading(false);
    }
  };

  // Don't render on server, if not mobile, on Focus homepage, or on 404 pages
  // Wait for client-side mount to prevent hydration mismatch
  const is404Page = pathname === '/not-found' || !pathname;

  if (!isMounted || !isMobile || pathname === '/' || is404Page) {
    return null;
  }

  // Drawer heights based on state
  const getDrawerHeight = () => {
    switch (drawerState) {
      case 'collapsed': return '80px';
      case 'expanded': return '100vh';
      case 'chat': return '100vh';
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
        height: '100vh', // Static viewport height - doesn't change when browser chrome hides
        zIndex: 1001, // Higher than mobile-header (1000) to cover it
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        pointerEvents: drawerState === 'collapsed' ? 'auto' : 'auto',
        transform: drawerState === 'collapsed'
          ? 'translate3d(0, calc(100vh - 80px), 0)'
          : 'translate3d(0, 0, 0)',
        // Disable transitions during scroll to prevent choppy browser chrome adjustments
        transition: isScrolling
          ? 'none'
          : drawerState === 'collapsed'
            ? 'transform 0.25s cubic-bezier(0.4, 0, 1, 1)' // Fast collapse
            : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)', // Slow, elegant expand
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        // More aggressive containment to prevent layout recalculation
        contain: 'layout style paint',
        isolation: 'isolate'
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
          transform: drawerState === 'chat' ? 'translate3d(0, -100vh, 0)' : 'translate3d(0, 0, 0)',
          transition: drawerState === 'chat'
            ? 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' // Slow, elegant slide to chat
            : 'transform 0.25s cubic-bezier(0.4, 0, 1, 1)', // Fast return
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
          overflow: drawerState === 'expanded' ? 'hidden' : 'visible', // Prevent scroll in expanded state
          touchAction: drawerState === 'expanded' ? 'none' : 'auto' // Disable touch scrolling in expanded
        }}
      >
        {/* Prompt banner and expanded content */}
        <div
          style={{
            height: '100vh',
            minHeight: '100vh',
            maxHeight: '100vh',
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
              : '0 -2px 8px rgba(0, 0, 0, 0.04)',
            contain: 'layout style'
          }}
        >
          {/* Prompt banner - always visible in collapsed/expanded */}
          <div
            onClick={() => {
              if (drawerState === 'collapsed') {
                console.log('🔴 Banner clicked. isChatActivated:', isChatActivated);
                // If chat has been activated, skip expanded view and go directly to chat
                const nextState = isChatActivated ? 'chat' : 'expanded';
                console.log('🔴 Going to state:', nextState);
                setDrawerState(nextState);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              height: '80px',
              minHeight: '80px',
              maxHeight: '80px',
              cursor: drawerState === 'collapsed' ? 'pointer' : 'default',
              flexShrink: 0,
              padding: '0 40px',
              backgroundColor: '#ffffff',
              borderTop: isChatActivated ? '1px solid #10b981' : '1px solid #D43225',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              // Disable border transition during scroll
              transition: isScrolling ? 'none' : 'border-color 0.4s ease',
              overflow: 'hidden',
              position: 'relative',
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              contain: 'layout style paint',
              isolation: 'isolate'
            }}
          >
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              margin: 0,
              padding: 0,
              color: '#222',
              lineHeight: '20px',
              height: '20px',
              flex: '0 0 auto',
              opacity: drawerState === 'chat' ? 0 : 1,
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              transform: 'translateZ(0)',
              willChange: 'opacity'
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
                  padding: '20px',
                  borderLeft: '3px solid #D43225'
                }}
              >
                <p style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  margin: '0 0 16px',
                  color: '#222',
                  lineHeight: 1.3
                }}>
                  Athena knows Prismatica.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#444',
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 400
                }}>
                  She's studied everything we do, how we think, and what we've built. Ask her anything about our work, your situation, or whether this matches how you see problems.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#444',
                  margin: '12px 0 0 0',
                  lineHeight: 1.6,
                  fontWeight: 400
                }}>
                  Once you start, she stays with you. Collapse this, explore the site, come back—she'll know where you've been and what you're considering.
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
                    Strategic Advisor
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
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '0', // No padding needed - drawer covers entire screen with z-index 1001
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
                        <div
                          className="prose prose-sm max-w-none text-gray-800"
                          style={{
                            fontFamily: '"Noto Sans", sans-serif',
                            fontSize: '15px',
                            lineHeight: '1.7',
                            fontWeight: 400
                          }}
                        >
                          {!message.content ? (
                            <div style={{ display: 'flex', gap: '6px', paddingTop: '4px' }}>
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                animation: 'pulse-green-purple 1.4s ease-in-out infinite',
                                animationDelay: '0s'
                              }}></div>
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                animation: 'pulse-green-purple 1.4s ease-in-out infinite',
                                animationDelay: '0.2s'
                              }}></div>
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                animation: 'pulse-green-purple 1.4s ease-in-out infinite',
                                animationDelay: '0.4s'
                              }}></div>
                            </div>
                          ) : (
                            <div style={{ position: 'relative', display: 'inline' }}>
                              {/* Render plain text during streaming, markdown when complete */}
                              {isLoading && index === messages.length - 1 ? (
                                <>
                                  <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
                                  <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '16px',
                                    backgroundColor: '#222',
                                    marginLeft: '2px',
                                    animation: 'cursorBlink 1s step-end infinite',
                                    verticalAlign: 'text-bottom'
                                  }}></span>
                                </>
                              ) : (
                              <ReactMarkdown
                                components={{
                                // Style links
                                a: ({ node, ...props }) => (
                                <Link
                                  href={props.href || '#'}
                                  onClick={() => setDrawerState('collapsed')}
                                  style={{
                                    color: '#D43225',
                                    textDecoration: 'underline',
                                    fontWeight: 600,
                                    transition: 'opacity 0.2s'
                                  }}
                                  onTouchStart={(e) => e.currentTarget.style.opacity = '0.7'}
                                  onTouchEnd={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                  {props.children}
                                </Link>
                              ),
                              // Style strong/bold text
                              strong: ({ node, ...props }) => (
                                <strong style={{ fontWeight: 700, color: '#222' }}>
                                  {props.children}
                                </strong>
                              ),
                              // Style paragraphs
                              p: ({ node, ...props }) => (
                                <p style={{ margin: '0 0 12px 0' }}>
                                  {props.children}
                                </p>
                              ),
                              // Style unordered lists
                              ul: ({ node, ...props }) => (
                                <ul style={{ margin: '8px 0', paddingLeft: '24px', listStyleType: 'disc' }}>
                                  {props.children}
                                </ul>
                              ),
                              // Style ordered lists
                              ol: ({ node, ...props }) => (
                                <ol style={{ margin: '8px 0', paddingLeft: '24px', listStyleType: 'decimal' }}>
                                  {props.children}
                                </ol>
                              ),
                              // Style list items
                              li: ({ node, ...props }) => (
                                <li style={{ margin: '4px 0' }}>
                                  {props.children}
                                </li>
                              ),
                              // Style code blocks
                              code: ({ node, ...props }) => {
                                const isInline = !props.className;
                                return isInline ?
                                  <code style={{
                                    backgroundColor: '#f5f5f5',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    fontFamily: 'monospace',
                                    color: '#D43225'
                                  }}>
                                    {props.children}
                                  </code>
                                :
                                  <code style={{
                                    display: 'block',
                                    backgroundColor: '#f5f5f5',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontFamily: 'monospace',
                                    overflowX: 'auto',
                                    margin: '8px 0'
                                  }}>
                                    {props.children}
                                  </code>;
                              },
                              // Style headings
                              h1: ({ node, ...props }) => (
                                <h1 style={{ fontSize: '18px', fontWeight: 700, margin: '16px 0 8px', color: '#222' }}>
                                  {props.children}
                                </h1>
                              ),
                              h2: ({ node, ...props }) => (
                                <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '14px 0 6px', color: '#222' }}>
                                  {props.children}
                                </h2>
                              ),
                              h3: ({ node, ...props }) => (
                                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '12px 0 6px', color: '#222' }}>
                                  {props.children}
                                </h3>
                              )
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <p style={{
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#D43225',
                        margin: 0,
                        maxWidth: '85%',
                        textAlign: 'left'
                      }}>
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Your text here..."
                  rows={1}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    resize: 'none',
                    minHeight: '44px',
                    maxHeight: '200px',
                    outline: 'none',
                    fontFamily: '"Noto Sans", sans-serif',
                    lineHeight: '1.5',
                    overflow: 'auto',
                    backgroundColor: '#f5f5f5'
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

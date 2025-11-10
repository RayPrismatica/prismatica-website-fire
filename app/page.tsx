'use client';

import { useState } from 'react';
import Image from 'next/image';
import CarmenChat from '@/components/CarmenChat';

export default function Home() {
  const [activeSection, setActiveSection] = useState('manifesto');
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({
    howWeWork: false,
    services: false,
    products: false
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emailRevealed, setEmailRevealed] = useState(false);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const navigateToSection = (section: string, parentMenu?: string) => {
    setActiveSection(section);
    if (parentMenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [parentMenu]: true
      }));
    }
    window.scrollTo(0, 0);
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  const testimonials = [
    {
      text: '"Absolutely transformative. Strategic thinking at its finest. A true partner in growth."',
      author: '— Every Consulting Testimonial Ever'
    },
    {
      text: '"Five stars matter when you\'re buying a blender. Not when you need thinking."',
      author: '— Different Purchase'
    },
    {
      text: '"You\'re not verifying the bathroom is clean. You\'re evaluating whether we see what you\'ve missed."',
      author: '— Different Evaluation'
    },
    {
      text: '"30 minutes tells you more than 30 testimonials."',
      author: '— Not A Testimonial'
    }
  ];

  const briefs = {
    'brief-warehouse': {
      title: 'The Warehouse That Wasn\'t',
      category: 'Food Distribution',
      problem: 'A food distribution company had 10% adoption across their network. They thought it was a sales problem. More reps. Better pitches. The usual.',
      howWeSawIt: 'They were partnering with suppliers. We shifted them to partner with retailers instead. Gathered data from 100+ touchpoints. Sourced high-volume products with volume leverage.\n\nThen we borrowed the Walmart model and did something unexpected: Instead of maintaining a warehouse in the suburbs of London, we distributed inventory across all retail stores. Store owners invest zero. We display our product where the final buying decision happens. The store isn\'t our client—it\'s our warehouse.',
      result: '100% adoption. Not because we sold harder. Because we redesigned how the pieces connected.\n\nWhat we didn\'t touch: Their products. Their people. Their relationships. What we changed: The game they were playing. Blue ocean.'
    },
    'brief-search': {
      title: 'The Search Paradigm',
      category: 'Tech Company',
      problem: 'A tech company asked us what AI meant for their business. Everyone was talking about implementation. Features. Capabilities. The noise was deafening.',
      howWeSawIt: 'We weren\'t watching AI. We were watching adoption dynamics. History repeats. YouTube got massive when smartphones detached streaming from home-time. The bus ride became a couch in front of the TV.\n\nSearch used to be about hyperlink validity. With AI, it becomes about relevance and authority. The question shifts. The game shifts. We recognized the pattern six months before the market caught up.',
      result: 'We introduced "Knowledge Search Optimization" to replace their SEO model. They pivoted before their competitors understood the shift was happening.\n\nWhat we did: Pattern recognition across adoption curves. What we didn\'t reveal: How to execute the shift.'
    },
    'brief-push-pull': {
      title: 'From Push to Pull',
      category: 'Fashion B2B',
      problem: 'A fashion B2B company operated supply-strong: "We have these brands to sell you." Representatives were responsible for suppliers, not geography. They were pushing what they had, not what customers wanted. Revenue was flat.',
      howWeSawIt: 'We flipped it. Built tools that let sales teams profile segments for their B2B stores. Started from "what does your customer want?" Representatives became responsible for geographic areas instead of suppliers.\n\nThey could now stack brands based on segment profiles rather than "these are the brands I\'m trying to push." The question they started with every morning changed everything.',
      result: 'Revenue grew 25%. But the real shift was incentive alignment. They weren\'t suppliers anymore. They were partners.\n\nWhat we changed: The game from zero-sum to positive-sum.'
    },
    'brief-bottleneck': {
      title: 'The Misdiagnosed Bottleneck',
      category: 'Tech Company',
      problem: 'A tech company was struggling with delivery times. Customers were frustrated. The team was burning out. They thought it was a capacity issue. More people. More hours. The usual solution.',
      howWeSawIt: 'We found a tech bottleneck masked as a delivery promise. The constraint wasn\'t capacity. It was where decisions happened in the system.\n\nRedesigned the tech. Placed it in a completely different funnel. Shifted decision-making bottlenecks from client-side to agent-side. The system opened up.',
      result: 'Delivery time reduced 87%. Not through working harder. Through working on the right constraint.\n\nWhat we saw: They were solving the wrong problem. The bottleneck wasn\'t where they thought it was.'
    },
    'brief-friction': {
      title: 'Removing Existential Friction',
      category: 'Legal Tech Startup',
      problem: 'A creative executive spent hours every day on tasks they hated. Not because the tasks were hard. Because doing them reduced time spent on what they loved. Existential friction. The kind that slowly drains you.',
      howWeSawIt: 'We mapped what drained energy versus what gave energy. Then built a system that handles the painful parts autonomously.\n\nNot automation—the system makes decisions the way they make decisions. It doesn\'t follow rules. It thinks. Cognitive augmentation, not productivity software.',
      result: 'Now they can\'t wait to engage with their work. The friction is gone. The energy is back.\n\nWhat we built: Technology that adapts to humans, not humans adapting to technology.'
    },
    'brief-platform': {
      title: 'From Retail to Platform',
      category: 'Longevity Company',
      problem: 'A longevity company was operating as "supplement retail." One-off decisions. Transactional relationships. Customers bought once, disappeared. No retention. No ecosystem.',
      howWeSawIt: 'We transformed them into an aggregator platform for credibility and option offering. Not selling supplements. Orchestrating outcomes.\n\nCovered the entire flow: supplements → membership → premium doctor visits. Not separate products. One ecosystem. Borrowed models. Blended them. Built something new from existing pieces.',
      result: 'They went from selling products to orchestrating outcomes. Retention transformed. Lifetime value transformed.\n\nWhat shifted: The business they were actually in.'
    },
    'brief-music': {
      title: 'Extraordinary in Ordinary Context',
      category: 'Music Company',
      problem: 'A music company came to us with a business model problem. Music in the music industry is expected. Ordinary. Commoditized. They were competing on the same terms as everyone else.',
      howWeSawIt: 'We asked a different question: Where would music NOT be expected but still be accepted as relevant?\n\nAdjacent industry. Blend extraordinary with ordinary. Take your extraordinary and find where it becomes someone else\'s ordinary necessity. Completely redesigned their model. Took them out of their industry without leaving music behind.',
      result: 'They stopped competing in the music industry. They created a new category where music was essential but unexpected.\n\nThe question changed everything: Where does your extraordinary become someone else\'s ordinary necessity?'
    },
    'brief-coaching': {
      title: 'The Coaching Wave',
      category: 'Leadership Coaching',
      problem: 'A leadership coaching company was successful. But they sensed something shifting in the market. They couldn\'t articulate what. Just a feeling that the ground was moving.',
      howWeSawIt: 'We noticed massive growth in the "coaching galaxy." Not just volume—type. Strategic leadership coaching was about to shift from efficiency-focused to ownership and accountability at the internal human level.\n\nThe wave was coming. History repeats. AI adoption dynamics mirror smartphone adoption dynamics. We just watch for the patterns.',
      result: 'Our client pivoted their entire service model before the wave arrived. They rode it instead of scrambling to catch up.\n\nThey weren\'t reacting to the shift. They were positioned for it.'
    }
  };

  return (
    <div className="container flex min-h-screen">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-content">
          <button onClick={() => navigateToSection('manifesto')} className={`nav-item block w-full text-left ${activeSection === 'manifesto' ? 'active' : ''}`} style={{ padding: '8px 0', color: activeSection === 'manifesto' ? '#D43225' : '#222', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>
            Focus
          </button>

          <button onClick={() => navigateToSection('what')} className={`nav-item block w-full text-left ${activeSection === 'what' ? 'active' : ''}`} style={{ padding: '8px 0', color: activeSection === 'what' ? '#D43225' : '#222', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>
            What We Do
          </button>

          {/* Mental Models - Expandable */}
          <div className={`nav-item-expandable ${expandedMenus.howWeWork ? 'expanded' : ''}`} style={{ margin: 0 }}>
            <button
              onClick={() => {
                navigateToSection('how');
                toggleMenu('howWeWork');
              }}
              className={`nav-item-header how-we-work-nav ${activeSection === 'how' || activeSection === 'trinity' || activeSection === 'demand' || activeSection === 'incentives' || activeSection === 'agents' || activeSection === 'parallels' || activeSection === 'articles' ? 'active' : ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: (activeSection === 'how' || activeSection === 'trinity' || activeSection === 'demand' || activeSection === 'incentives' || activeSection === 'agents' || activeSection === 'parallels' || activeSection === 'articles') ? '#EA9336' : '#222',
                fontSize: '11px',
                fontFamily: '"Noto Sans", sans-serif',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '8px 0',
                margin: 0,
                lineHeight: 1.6,
                transition: 'opacity 0.2s',
                background: 'none',
                border: 'none',
                width: '100%',
                textAlign: 'left'
              }}
            >
              <span>Mental Models</span>
              <span className="chevron" style={{ transition: 'transform 0.2s', fontSize: '20px', fontWeight: 'bold', lineHeight: 1, transform: expandedMenus.howWeWork ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>
            <div className="nav-subitems" style={{
              maxHeight: expandedMenus.howWeWork ? '500px' : '0',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
              transition: 'max-height 0.3s ease'
            }}>
              <button onClick={() => navigateToSection('trinity', 'howWeWork')} className={`nav-subitem how-we-work-nav ${activeSection === 'trinity' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'trinity' ? '#EA9336' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Trinity</button>
              <button onClick={() => navigateToSection('demand', 'howWeWork')} className={`nav-subitem how-we-work-nav ${activeSection === 'demand' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'demand' ? '#EA9336' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Demand</button>
              <button onClick={() => navigateToSection('incentives', 'howWeWork')} className={`nav-subitem how-we-work-nav ${activeSection === 'incentives' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'incentives' ? '#EA9336' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Incentives</button>
              <button onClick={() => navigateToSection('agents', 'howWeWork')} className={`nav-subitem how-we-work-nav ${activeSection === 'agents' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'agents' ? '#EA9336' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Agentic</button>
              <button onClick={() => navigateToSection('parallels', 'howWeWork')} className={`nav-subitem how-we-work-nav ${activeSection === 'parallels' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'parallels' ? '#EA9336' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Prismatic</button>
            </div>
          </div>

          {/* Services - Expandable */}
          <div className={`nav-item-expandable ${expandedMenus.services ? 'expanded' : ''}`} style={{ marginTop: '24px' }}>
            <button
              onClick={() => {
                navigateToSection('services');
                toggleMenu('services');
              }}
              className={`nav-item-header services-nav ${activeSection === 'services' || activeSection === 'consulting' || activeSection === 'agile-rd' || activeSection === 'secret-agency' ? 'active' : ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: (activeSection === 'services' || activeSection === 'consulting' || activeSection === 'agile-rd' || activeSection === 'secret-agency') ? '#10B981' : '#222',
                fontSize: '11px',
                fontFamily: '"Noto Sans", sans-serif',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '8px 0',
                margin: 0,
                lineHeight: 1.6,
                transition: 'opacity 0.2s',
                background: 'none',
                border: 'none',
                width: '100%',
                textAlign: 'left'
              }}
            >
              <span>Services</span>
              <span className="chevron" style={{ transition: 'transform 0.2s', fontSize: '20px', fontWeight: 'bold', lineHeight: 1, transform: expandedMenus.services ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>
            <div className="nav-subitems" style={{
              maxHeight: expandedMenus.services ? '500px' : '0',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
              transition: 'max-height 0.3s ease'
            }}>
              <button onClick={() => navigateToSection('consulting', 'services')} className={`nav-subitem services-nav ${activeSection === 'consulting' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'consulting' ? '#10B981' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Consulting</button>
              <button onClick={() => navigateToSection('agile-rd', 'services')} className={`nav-subitem services-nav ${activeSection === 'agile-rd' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'agile-rd' ? '#10B981' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Offensive R&D</button>
              <button onClick={() => navigateToSection('secret-agency', 'services')} className={`nav-subitem services-nav ${activeSection === 'secret-agency' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'secret-agency' ? '#10B981' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Secret Agency</button>
            </div>
          </div>

          {/* Products - Expandable */}
          <div className={`nav-item-expandable ${expandedMenus.products ? 'expanded' : ''}`}>
            <button
              onClick={() => {
                navigateToSection('products');
                toggleMenu('products');
              }}
              className={`nav-item-header products-nav ${activeSection === 'products' || activeSection === 'sir-alfie' || activeSection === 'advisory-labs' || activeSection === 'sandbox' || activeSection === 'market-value-test' || activeSection === 'social-navigator' || activeSection === 'focus-matrix' ? 'active' : ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: (activeSection === 'products' || activeSection === 'sir-alfie' || activeSection === 'advisory-labs' || activeSection === 'sandbox' || activeSection === 'market-value-test' || activeSection === 'social-navigator' || activeSection === 'focus-matrix') ? '#6C5CE7' : '#222',
                fontSize: '11px',
                fontFamily: '"Noto Sans", sans-serif',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '8px 0',
                margin: 0,
                lineHeight: 1.6,
                transition: 'opacity 0.2s',
                background: 'none',
                border: 'none',
                width: '100%',
                textAlign: 'left'
              }}
            >
              <span>Products</span>
              <span className="chevron" style={{ transition: 'transform 0.2s', fontSize: '20px', fontWeight: 'bold', lineHeight: 1, transform: expandedMenus.products ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>
            <div className="nav-subitems" style={{
              maxHeight: expandedMenus.products ? '500px' : '0',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
              transition: 'max-height 0.3s ease'
            }}>
              <button onClick={() => navigateToSection('sir-alfie', 'products')} className={`nav-subitem products-nav ${activeSection === 'sir-alfie' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'sir-alfie' ? '#6C5CE7' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Sir Alfie</button>
              <button onClick={() => navigateToSection('advisory-labs', 'products')} className={`nav-subitem products-nav ${activeSection === 'advisory-labs' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'advisory-labs' ? '#6C5CE7' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Advisory Labs</button>
              <button onClick={() => navigateToSection('sandbox', 'products')} className={`nav-subitem products-nav ${activeSection === 'sandbox' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'sandbox' ? '#6C5CE7' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Sandbox</button>
              <button onClick={() => navigateToSection('market-value-test', 'products')} className={`nav-subitem products-nav ${activeSection === 'market-value-test' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'market-value-test' ? '#6C5CE7' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Market Value Test</button>
              <button onClick={() => navigateToSection('social-navigator', 'products')} className={`nav-subitem products-nav ${activeSection === 'social-navigator' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'social-navigator' ? '#6C5CE7' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Social Navigator</button>
              <button onClick={() => navigateToSection('focus-matrix', 'products')} className={`nav-subitem products-nav ${activeSection === 'focus-matrix' ? 'active' : ''}`} style={{ display: 'block', padding: '6px 0 6px 16px', color: activeSection === 'focus-matrix' ? '#6C5CE7' : '#666', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', margin: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Focus Matrix</button>
            </div>
          </div>

          <button onClick={() => navigateToSection('articles')} className={`nav-item block w-full text-left ${activeSection === 'articles' ? 'active' : ''}`} style={{ padding: '8px 0', color: '#222', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer', marginTop: '24px' }}>
            Articles
          </button>

          <button onClick={() => navigateToSection('who')} className={`nav-item block w-full text-left ${activeSection === 'who' ? 'active' : ''}`} style={{ padding: '8px 0', color: '#222', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>
            Who We Are
          </button>

          <button onClick={() => navigateToSection('contact')} className={`nav-item block w-full text-left ${activeSection === 'contact' ? 'active' : ''}`} style={{ padding: '8px 0', color: '#222', textDecoration: 'none', fontSize: '11px', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>
            Contact
          </button>
        </div>
        <div style={{ flexGrow: 1, minHeight: '24px' }} />
        <div className="sidebar-logo" style={{ flexShrink: 0, paddingBottom: 0 }}>
          <Image
            src="/images/logowebp.webp"
            alt="Prismatica Labs Logo"
            width={1840}
            height={1691}
            style={{ width: '40px', height: 'auto', marginBottom: '8px' }}
          />
          <h1 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.5px', margin: 0, textAlign: 'left' }}>PRISMATICA LABS</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        {/* Manifesto */}
        {activeSection === 'manifesto' && (
          <section id="manifesto" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>FINALLY.<br/>THINKING AS A SERVICE.<br/>NO PERFORMANCE.<br/><span style={{ color: '#D43225' }}>JUST</span> PERFORMANCE.</h2>

            <p>We work with adults who don't need to be entertained.</p>

            <p>This is a website. It loads fast, tells you what we do. No cognitive candy. No design theatre. No emotional manipulation through carefully crafted user journeys.</p>

            <p>We believe the internet has enough noise. Enough brands "delighting" you. Enough experiences trying to "engage" you. Enough companies treating you like you need shiny things to maintain focus.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Want beauty? Museums.</p>
            <p>Want surprise? Nature.</p>
            <p>Want stories? Books.</p>
            <p>Want clarity?</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>We're Prismatica Labs. We solve problems with thinking, not themes.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Focus is the only currency that matters. You get it when you remove noise.</p>

            <p>Welcome to the quietest room on the internet.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>We work on two levels. You have options.</p>

            <button onClick={() => navigateToSection('what')} className="cta-button red">See What We Do</button>
          </section>
        )}

        {/* What We Do */}
        {activeSection === 'what' && (
          <section id="what" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>WHAT WE DO</h2>
            <div className="section-label" style={{ color: '#D43225' }}>Prismatica Labs</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>The rise of AI has made one thing clear: intelligence lives in questions, not answers. Because answers only require knowledge. And knowledge has become the ultimate commodity.</p>

            <p>Google has answers. ChatGPT has answers. Your competitor's intern has answers.</p>

            <p>But ask the wrong question and all that knowledge is useless. Ask the right question and everything changes.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>We know which questions matter most. We've built two paths. Choose based on stakes.</p>

            <h3>You Can Hire Us</h3>

            <p>When the problem evolves mid-conversation. When you need someone who reads what's not being said. When the real answer is "we're asking the wrong question."</p>

            <p>We pivot when the problem reveals itself. We see patterns across domains you haven't considered. We think with you, not for you.</p>

            <p>We go deep.</p>

            <p style={{ fontStyle: 'italic', color: '#666' }}>For problems that keep you up at night.</p>

            <button onClick={() => navigateToSection('services', 'services')} className="cta-button green">View Services</button>

            <h3>You Can Hire Our Products</h3>

            <p>When you need to test hypotheses daily. When your team wants to explore challenges independently. When operational speed and convenience matter.</p>

            <p>Our products give you question patterns at scale. Map incentives across your chain. Spot blind spots. Run scenarios. All without scheduling a call.</p>

            <p>Built for team conversations. For testing ideas fast. For the kind of thinking that moves work forward every day, not just during crisis.</p>

            <p style={{ fontStyle: 'italic', color: '#666' }}>For problems that show up every day.</p>

            <button onClick={() => navigateToSection('products', 'products')} className="cta-button purple">Explore Products</button>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Not sure which path? Chat with Carmen. Ask her to help you think through your stakes.</p>

            {/* Carmen Section */}
            <div style={{ margin: '32px 0', maxWidth: '700px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <Image
                src="/images/carmen-advisor.jpg"
                alt="Carmen - Strategic Advisor"
                width={160}
                height={200}
                className="flex-shrink-0"
                style={{ width: '160px', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 12px 0', fontWeight: 600, fontSize: '16px' }}>Carmen</p>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#666' }}>
                  Strategic advisor who's guided 200+ founders from vision to viable business. She won't tell you what to do. She'll ask the questions that help you see which path actually fits your problem.
                </p>
              </div>
            </div>

            {/* Carmen Chat Component */}
            <CarmenChat />

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Problems We've Thought About</h3>

            <p style={{ marginBottom: '24px' }}>Each problem is unique. Each required thinking differently. No frameworks. Just intelligence applied to specific situations.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '32px' }}>
              <button onClick={() => openModal('brief-warehouse')} className="cta-button" style={{ marginTop: 0 }}>The Warehouse That Wasn't</button>
              <button onClick={() => openModal('brief-search')} className="cta-button" style={{ marginTop: 0 }}>The Search Paradigm</button>
              <button onClick={() => openModal('brief-push-pull')} className="cta-button" style={{ marginTop: 0 }}>From Push to Pull</button>
              <button onClick={() => openModal('brief-bottleneck')} className="cta-button" style={{ marginTop: 0 }}>The Misdiagnosed Bottleneck</button>
              <button onClick={() => openModal('brief-friction')} className="cta-button" style={{ marginTop: 0 }}>Removing Existential Friction</button>
              <button onClick={() => openModal('brief-platform')} className="cta-button" style={{ marginTop: 0 }}>From Retail to Platform</button>
              <button onClick={() => openModal('brief-music')} className="cta-button" style={{ marginTop: 0 }}>Extraordinary in Ordinary Context</button>
              <button onClick={() => openModal('brief-coaching')} className="cta-button" style={{ marginTop: 0 }}>The Coaching Wave</button>
            </div>
          </section>
        )}

        {/* Who We Are */}
        {activeSection === 'who' && (
          <section id="who" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>WHO WE ARE</h2>
            <div className="section-label" style={{ color: '#D43225' }}>Prismatica Labs</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>A small team that thinks first and decorates never.</p>

            <p>We're not an agency. Agencies have account managers, creative directors, and people whose job is to make you feel important. We have people who do the work.</p>

            <p>Founded in London. Operating globally. Small by design, not by accident.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Our Background</h3>
            <p>We've worked with everyone from individual artists to Fortune 500s. The size doesn't matter. The problem does.</p>

            <p>We've seen enough innovation theatre to know the difference between motion and progress. We've sat through enough strategy decks to know that most strategy is procrastination with charts.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>We believe in:</p>
            <p>• Showing rather than telling</p>
            <p>• Testing rather than assuming</p>
            <p>• Building rather than presenting</p>
            <p>• Solving rather than discussing</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The 5% we work with</h3>

            <p>Most companies hire consultants for credibility or convenience. Shareholder confidence. Framework delivery. Someone else to blame.</p>

            <p>We work with the ones who hire for intelligence. Who want their thinking challenged, not their egos managed. Who need allies, not authorities.</p>

            <p>95% of businesses need consulting. 5% need what we do.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Want to work with people who do the work? Start here.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Mental Models */}
        {activeSection === 'how' && (
          <section id="how" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>MENTAL MODELS</h2>
            <div className="section-label how-we-work"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | MENTAL MODELS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Every business problem is physics. Forces trying to move through constraints. Energy seeking equilibrium. Parts colliding until something breaks or something works.</p>

            <p>The details change. The structure doesn't.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>First Principles</h3>

            <p>Every problem contains the same components:</p>

            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Time</span><br/><span style={{ color: '#666' }}>The window narrows. Momentum builds or dies. Opportunity decays.</span></p>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Actors</span><br/><span style={{ color: '#666' }}>Who can say yes. Who can say no. Who just gets affected.</span></p>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Resources</span><br/><span style={{ color: '#666' }}>What you have to work with. Energy, money, attention, people, materials.</span></p>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Objectives</span><br/><span style={{ color: '#666' }}>What everyone's actually after. Surprisingly identical across industries.</span></p>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Constraints</span><br/><span style={{ color: '#666' }}>The edges of possibility. Physics, budgets, regulations, human nature.</span></p>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Information</span><br/><span style={{ color: '#666' }}>What you know, what they know, what nobody knows yet.</span></p>
              <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '15px' }}>Incentives</span><br/><span style={{ color: '#666' }}>What people say drives them. What actually drives them.</span></p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Emergent Patterns</h3>

            <p>When parts collide, they form molecules. Structures with mass, direction, momentum. These patterns have velocity. They want to move:</p>

            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <p style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>Demand</span><br/>
                <span style={{ color: '#666' }}>People who want something, know something, need something.</span><br/>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Actors + Objectives + Information</span>
              </p>
              <p style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>Supply</span><br/>
                <span style={{ color: '#666' }}>What's possible to deliver, given what you have and how long you have it.</span><br/>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Resources + Constraints + Time</span>
              </p>
              <p style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>Friction</span><br/>
                <span style={{ color: '#666' }}>Everything that slows you down. Rules, misaligned incentives, missing information.</span><br/>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Constraints + Information + Incentives</span>
              </p>
              <p style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>Value</span><br/>
                <span style={{ color: '#666' }}>What you can create when resources meet real objectives for real people.</span><br/>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Resources + Objectives + Actors</span>
              </p>
              <p style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>Risk</span><br/>
                <span style={{ color: '#666' }}>The gap between what you're betting on and what you actually know. Ticking.</span><br/>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Time + Information + Objectives</span>
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The Models</h3>

            <p>We've built systems to see these parts clearly and move them:</p>

            <div style={{ marginTop: '32px', marginBottom: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ marginBottom: '12px', color: '#444' }}>Most companies fight the wrong battle. They add supply when friction is the problem. Remove friction when demand doesn't exist. Build features when distribution is broken. Stop guessing. Map the forces. Fix what's actually stuck.</p>
                <button onClick={() => navigateToSection('trinity', 'howWeWork')} className="cta-button orange" style={{ marginTop: '8px' }}>Trinity</button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ marginBottom: '12px', color: '#444' }}>Rolex doesn't sell watches. Peloton doesn't sell bikes. Slack doesn't sell chat. They sell status, tribe membership, professional identity. Your product is the excuse. The demand is primal. Miss this and your marketing is just noise.</p>
                <button onClick={() => navigateToSection('demand', 'howWeWork')} className="cta-button orange" style={{ marginTop: '8px' }}>Demand</button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ marginBottom: '12px', color: '#444' }}>Sales says they want better leads. What they optimize for is easy closes. Product says they want user feedback. What they optimize for is no complaints. Executives say they want innovation. What they optimize for is no surprises. Watch what they do, not what they say.</p>
                <button onClick={() => navigateToSection('incentives', 'howWeWork')} className="cta-button orange" style={{ marginTop: '8px' }}>Incentives</button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ marginBottom: '12px', color: '#444' }}>Humans need meetings, check-ins, approvals, reassurance. AI doesn't. Give it clear objectives, hard constraints, quality thresholds, and kill switches. Then let it run while you sleep. The bottleneck isn't the AI. It's your need to feel in control.</p>
                <button onClick={() => navigateToSection('agents', 'howWeWork')} className="cta-button orange" style={{ marginTop: '8px' }}>Agentic</button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ marginBottom: '12px', color: '#444' }}>Every industry thinks it's special. None of them are. Nightclubs and enterprise sales are both gatekeeping. Museums and Netflix are both attention retention. Airports and emergency rooms are both triage under constraints. See structure, not surface, and solutions transfer instantly.</p>
                <button onClick={() => navigateToSection('parallels', 'howWeWork')} className="cta-button orange" style={{ marginTop: '8px' }}>Prismatic</button>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>These aren't solutions. They're the palette. Once you see the structure, the path becomes obvious.</p>

            <p>Most objectives are identical across industries. Most friction is predictable. Most energy is wasted fighting the wrong constraint.</p>

            <p>We start with demand. Always. Because understanding what people actually want eliminates most strategy debates before they start.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Case Studies</h3>

            <p style={{ marginBottom: '24px' }}>
              Real problems where these principles and systems did the work. Each one started with parts, revealed patterns, required different models.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '32px' }}>
              <button onClick={() => openModal('brief-warehouse')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>The Warehouse That Wasn't</button>
              <button onClick={() => openModal('brief-search')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>The Search Paradigm</button>
              <button onClick={() => openModal('brief-push-pull')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>From Push to Pull</button>
              <button onClick={() => openModal('brief-bottleneck')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>The Misdiagnosed Bottleneck</button>
              <button onClick={() => openModal('brief-friction')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>Removing Existential Friction</button>
              <button onClick={() => openModal('brief-platform')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>From Retail to Platform</button>
              <button onClick={() => openModal('brief-music')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>Extraordinary in Ordinary Context</button>
              <button onClick={() => openModal('brief-coaching')} className="brief-button" style={{ background: '#222', color: '#fafafa', border: 'none', padding: '16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 600, transition: 'opacity 0.2s' }}>The Coaching Wave</button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Got a problem that needs solving? Let's fix it.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Contact */}
        {activeSection === 'contact' && (
          <section id="contact" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>CONTACT</h2>
            <div className="section-label" style={{ color: '#D43225' }}>Prismatica Labs</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Ready to skip the foreplay?</p>

            <p>Simple. Direct. No theatre.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>1. We Listen</h3>
            <p>You explain the actual problem. Not the problem you think sounds strategic. Not the problem that got budget approval. The real problem.</p>

            <h3>2. We Think</h3>
            <p>We go away and actually think about it. No workshops. No ideation sessions. Just clear, focused thinking about what would actually solve your problem.</p>

            <h3>3. We Propose</h3>
            <p>We come back with a solution. Not a 'strategic framework'. Not a 'holistic approach'. A solution. With a price. And a timeline.</p>

            <h3>4. We Execute</h3>
            <p>If you like what we propose, we do it. No account management layer. No weekly status calls. We do the work and show you the progress.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Our pricing is transparent:</p>
            <p>We tell you what it costs. You decide if it's worth it. No hidden fees. No scope creep. No surprise invoices.</p>

            <p>We don't pitch. We don't do free work. We don't compete in beauty contests. If you want to see what we can do, look at what we've done. If you want references, we'll connect you with past clients.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>No contact form. No newsletter signup. No 'let's grab coffee'. Just email us with your actual problem.</p>

            {/* Email Slider */}
            <div style={{ height: '40px', width: '330px', position: 'relative', margin: '16px 0 20px 0' }}>
              {!emailRevealed ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '240px',
                    height: '40px',
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setEmailRevealed(true)}
                >
                  <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '14px', fontWeight: 400, color: '#666' }}>click for email</span>
                </div>
              ) : (
                <>
                  <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, border: '1px solid #222', padding: '8px 16px', borderRadius: '4px', minWidth: '240px', textAlign: 'center' }}>work@prismaticalabs.com</span>
                  </div>
                  <div style={{ position: 'absolute', left: '248px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText('work@prismaticalabs.com')}
                      style={{ background: 'none', border: '1px solid #222', padding: '8px', cursor: 'pointer', borderRadius: '4px', color: '#222', transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px' }}
                      title="Copy email"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button
                      onClick={() => window.location.href = 'mailto:work@prismaticalabs.com'}
                      style={{ background: '#222', border: '1px solid #222', padding: '8px', cursor: 'pointer', borderRadius: '4px', color: '#fafafa', transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px' }}
                      title="Open in mail app"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </button>
                  </div>
                </>
              )}
            </div>

            <p>Response time: Within 24 hours</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Before you email:</p>
            <p>• Have a real problem that needs solving</p>
            <p>• Know your budget (roughly)</p>
            <p>• Be ready to make decisions</p>
            <p>• Don't need your hand held</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>If you're looking for an agency to make you feel good about your choices, we're not it. If you're looking for someone to solve a problem and move on, hello.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            {/* Testimonial Carousel */}
            <div style={{ margin: '64px auto', position: 'relative', maxWidth: '600px', padding: '0 70px' }}>
              <button
                onClick={() => setCurrentSlide((currentSlide - 1 + testimonials.length) % testimonials.length)}
                style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: '#222', color: '#fafafa', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s', zIndex: 10 }}
              >‹</button>

              <div style={{ overflow: 'hidden', position: 'relative', height: '280px' }}>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    style={{
                      display: currentSlide === index ? 'flex' : 'none',
                      background: '#222',
                      borderRadius: '8px',
                      padding: '48px 40px',
                      textAlign: 'center',
                      height: '280px',
                      position: 'relative',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ position: 'absolute', top: '48px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '20px', color: '#FFB800' }}>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#fafafa', lineHeight: 1.5, maxWidth: '500px', margin: '48px 0 24px 0' }}>
                      {testimonial.text}
                    </p>
                    <p style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                      {testimonial.author}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((currentSlide + 1) % testimonials.length)}
                style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: '#222', color: '#fafafa', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s', zIndex: 10 }}
              >›</button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', border: 'none', background: currentSlide === index ? '#222' : '#ccc', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trinity - Three Forces */}
        {activeSection === 'trinity' && (
          <section id="trinity" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>TRINITY</h2>
            <div className="section-label how-we-work"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | MENTAL MODELS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Three forces. One system. No boundaries.</p>

            <p>Everyone else divides to conquer. We unite to understand.</p>

            <p>Marketing is how you're found. Technology is how you deliver. Game theory is how you win. Separate them and you get corporate theatre. Unite them and you get unfair advantages.</p>

            <p>The boundaries were always fake anyway.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Marketing</h3>
            <p>Marketing is the space between who you are and who knows you exist. Stories made wisdom portable. Symbols made belonging visible. Money made value exchangeable. We're working on making truth profitable.</p>

            <p>Stories that reach the right people at the right time. Not spray and pray. Not growth hacking. Just clear communication that respects intelligence and accelerates decisions.</p>

            <p>The only rule that matters: Meet people where they are, learn what moves them, then trigger the change they're already considering. That's not marketing. That's respect with a business model.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Technology</h3>
            <p>Technology is anything that makes impossible things boring. Writing made memory optional. Wheels made distance negotiable. Internet made geography irrelevant. We're working on making complexity invisible.</p>

            <p>We build tomorrow's solutions with today's constraints. Innovation isn't about what's possible, it's about what's useful. Every line of code serves the strategy. Every feature serves a purpose.</p>

            <p>The only rule that matters: When given the choice between using humans to improve technology or technology to improve being human, choose human. Every time. That's not idealism. That's sustainable business.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Game Theory</h3>
            <p>Game theory is how finite beings navigate infinite possibilities. War made strategy necessary. Trade made trust profitable. Democracy made consensus valuable. Internet made reputation everything. We're working on making competition collaborative.</p>

            <p>Markets are games. People are players. We think three moves ahead because everyone else is looking at their shoes. We map real behaviour, not wishful thinking. We hunt for patterns in chaos.</p>

            <p>The only rule that matters: Every decision creates the next game. Know what game you're playing. Know what game they think they're playing. Play the game that hasn't started yet.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>The convergence is where the magic lives.</p>

            <p>Marketing without technology is just noise. Technology without strategy is just toys. Strategy without execution is just expensive thinking.</p>

            <p>When all three work as one system, you get something rare: Solutions that actually work.</p>

            <p>Not because they're clever. Not because they're beautiful. Because they understand how the world actually operates, not how we wish it would.</p>

            <p>This isn't interdisciplinary. It's anti-disciplinary.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Ready to stop separating what should never be divided? Let's build something unified.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Demand Mechanics */}
        {activeSection === 'demand' && (
          <section id="demand" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>DEMAND</h2>
            <div className="section-label how-we-work"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | MENTAL MODELS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>We're obsessed with unearthing what people will actually want, not what they say they want.</p>

            <p>Here's the dynamic most companies refuse to see.</p>

            <p>Growth is demand driven. Not supply driven. Not product driven. Not business driven. Demand driven.</p>

            <h3>The Reversal</h3>
            <p>We keep watching companies build products then hunt for buyers. Create systems that serve themselves. Design experiences that fit their processes.</p>

            <p>They have it backward. Completely backward.</p>

            <p>The companies that thrive look at their business through customer eyes, not at customers through business eyes.</p>

            <p>This isn't philosophy. It's survival.</p>

            <h3>The Abundance Problem</h3>
            <p>We live in the age of too much. Too much information. Too much selection. Too much noise.</p>

            <p>Every market is saturated. Every niche is crowded. Every customer is overwhelmed.</p>

            <p>Creating what nobody wants isn't business. It's waste. And markets punish waste brutally.</p>

            <p>The question isn't "can we build it?" The question is "does anyone actually want this enough to change their behavior?"</p>

            <h3>The Mirror Principle</h3>
            <p>Most companies look at customers through their own lens. Their processes. Their logic. Their convenience.</p>

            <p>Then they wonder why conversion rates stay low. Why churn stays high. Why growth plateaus.</p>

            <p>Demand-driven companies flip the mirror. They see themselves through customer eyes. Every assumption gets tested. Every process gets questioned.</p>

            <p>The view from the other side reveals truths you can't see from inside the building.</p>

            <h3>The Signal Truth</h3>
            <p>Demand sends signals. Constantly. Clearly. Most companies just aren't listening.</p>

            <p>They're too busy broadcasting. Too focused on their message. Too invested in their plan.</p>

            <p>Smart companies listen first, speak second. They read the signals. They follow the data. They adapt to what demand actually is, not what they hoped it would be.</p>

            <h3>The Friction Map</h3>
            <p>Every business has friction. The gap between what customers want and what you deliver.</p>

            <p>Most companies add friction without realizing it. Complex pricing. Confusing navigation. Unnecessary steps. Death by a thousand paper cuts.</p>

            <p>Demand-driven companies obsess over friction. They map it. Measure it. Eliminate it.</p>

            <p>Because demand flows like water. It takes the path of least resistance. Always.</p>

            <h3>The Elephant Force</h3>
            <p>Demand is the elephant in the room. Massive. Unmistakable. Unstoppable.</p>

            <p>You can ignore it. Fight it. Wish it were different.</p>

            <p>Or you can study it. Understand it. Ride it.</p>

            <h3>The Transformation</h3>
            <p>When you view your company through demand architecture, everything shifts.</p>

            <p>Product roadmaps change. Priorities realign. Blind spots vanish. Opportunities emerge where none existed.</p>

            <p>This isn't incremental change. It's seeing the system differently.</p>

            <p>Because when demand leads, growth follows.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Want to see your business through demand's eyes? Let's flip the mirror.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Incentives */}
        {activeSection === 'incentives' && (
          <section id="incentives" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>INCENTIVES</h2>
            <div className="section-label how-we-work"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | MENTAL MODELS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>We like mapping how humans actually behave, not how they should.</p>

            <p>Here's what most leaders refuse to see about human behavior.</p>

            <p>Water always finds its way. So do incentives.</p>

            <h3>The Reality</h3>
            <p>We see the world through incentive architecture, not wishful thinking.</p>

            <p>Most organizations miss this completely. They draft policies then wonder why nobody follows them. Create systems nobody uses. Launch products nobody wants.</p>

            <p>They're fighting human nature instead of designing for it.</p>

            <h3>The Game Dynamic</h3>
            <p>We keep watching companies play two different games without realizing it.</p>

            <p>Finite games have winners, losers, endpoints. Quarterly battles. Market share wars. Traditional business thinking.</p>

            <p>But markets run on infinite games. Ongoing. Evolving. Never ending.</p>

            <p>Companies playing finite games against infinite players always lose. Eventually. Inevitably.</p>

            <h3>The Perception Truth</h3>
            <p>Value is never objective. The coffee tastes better in expensive mugs. The medicine works better with colorful pills.</p>

            <p>This isn't manipulation. This is human reality.</p>

            <p>We call this psycho-logic. The actual logic of how people operate, not how economists wish they operated.</p>

            <h3>The Invisible Force</h3>
            <p>Smart leaders don't focus on what people say. They focus on what gets rewarded, what gets punished, what gets celebrated.</p>

            <p>Boeing built planes that crashed because their incentives prioritized speed over safety. Wells Fargo created fake accounts because their incentives rewarded account creation over customer service.</p>

            <p>Not complicated. Completely predictable.</p>

            <h3>The Tribal Need</h3>
            <p>The greatest incentive structures tap our primal need for belonging. They create tribes, not customers.</p>

            <p>Apple users. Harley riders. CrossFit devotees.</p>

            <p>Weak companies sell products. Strong companies create identities.</p>

            <h3>The Water Force</h3>
            <p>Water never argues with gravity. Never fights the landscape. It adapts. Flows. Finds a way.</p>

            <p>Most businesses try to dam natural incentives with policies and procedures. Pointless.</p>

            <p>Water understands what executives miss. The path will be found. The flow cannot be stopped.</p>

            <h3>The Transformation</h3>
            <p>When you view your business through incentive architecture, everything shifts.</p>

            <p>Align incentives properly and friction vanishes. Resistance dissolves. Momentum builds.</p>

            <p>Not through control. Through alignment.</p>

            <p>Because when incentives shift, everything shifts.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Ready to design systems that flow with human nature, not against it? Let's align the forces.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Agentic Protocols */}
        {activeSection === 'agents' && (
          <section id="agents" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>AGENTIC</h2>
            <div className="section-label how-we-work"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | MENTAL MODELS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>We build intelligence that multiplies rather than replace human judgment.</p>

            <p>Here's the shift most organizations are missing.</p>

            <p>Technology is moving from tools that wait for commands to systems that act with purpose.</p>

            <h3>The Change</h3>
            <p>We're watching a fundamental transformation. Not incremental improvement, but a complete shift in how technology operates.</p>

            <p>Most systems still wait for instructions. Require constant supervision. Demand explicit commands.</p>

            <p>But agentic systems understand goals, not just commands. They navigate complexity, not just execute functions.</p>

            <p>This isn't evolution. It's revolution.</p>

            <h3>The Autonomy Reality</h3>
            <p>We're no longer building tools. We're creating partners that understand intent, context, constraints.</p>

            <p>Traditional software does what you tell it. Agentic systems do what you need.</p>

            <p>The difference is massive. One requires perfect instructions. The other requires clear objectives.</p>

            <p>This isn't delegation. This is multiplication.</p>

            <h3>The Fire Dynamic</h3>
            <p>Fire doesn't wait for permission. It adapts. Spreads. Transforms.</p>

            <p>Most businesses try to contain agentic capabilities with guardrails and restrictions. They're missing the point.</p>

            <p>You can't control fire by building smaller matches. You control it by understanding its nature and channeling its force.</p>

            <p>Fire understands what executives don't. Transformation can't be controlled, only channeled.</p>

            <h3>The Trust Barrier</h3>
            <p>The biggest obstacle isn't technical capability. It's organizational trust.</p>

            <p>Leaders want the benefits of autonomous systems without surrendering control. They want intelligence that doesn't make decisions. Power that doesn't act.</p>

            <p>Impossible.</p>

            <p>The value of agentic systems comes precisely from their ability to act independently, within defined boundaries.</p>

            <h3>The Design Principle</h3>
            <p>Smart organizations don't program every step. They establish boundaries, set objectives, define values.</p>

            <p>Then they let the systems act.</p>

            <p>This requires a different mindset. Less about control, more about guidance. Less about commands, more about constraints.</p>

            <p>Design the sandbox. Then let agents play.</p>

            <h3>The Scale Effect</h3>
            <p>Traditional systems scale linearly. More work requires more people. More complexity requires more management.</p>

            <p>Agentic systems scale exponentially. One well-designed agent can replicate across thousands of contexts. Handle millions of scenarios. Adapt to infinite variations.</p>

            <p>This isn't productivity improvement. This is fundamental transformation of what's possible.</p>

            <h3>The Implementation</h3>
            <p>Most organizations approach agentic systems wrong. They try to bolt autonomy onto existing processes.</p>

            <p>Won't work.</p>

            <p>Agentic systems require rethinking workflows from first principles. What should remain human? What can be autonomous? Where do they intersect?</p>

            <p>The companies that answer these questions correctly will dominate their markets. The ones that don't will wonder what happened.</p>

            <h3>The Transformation</h3>
            <p>When agency emerges within your systems, everything transforms.</p>

            <p>Speed increases. Costs decrease. Complexity becomes manageable. Scale becomes feasible.</p>

            <p>Not through harder work. Through fundamental architectural change.</p>

            <p>Because when systems act with purpose, they don't just execute faster. They solve problems you didn't know you had.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Ready to multiply human judgment instead of replacing it? Let's build intelligence that acts.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Parallels */}
        {activeSection === 'parallels' && (
          <section id="parallels" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>PRISMATIC</h2>
            <div className="section-label how-we-work"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | MENTAL MODELS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>The most valuable insights often come from outside your industry.</p>

            <p>We've noticed connections across luxury brands, startups, technology companies, and creative agencies that might apply to your situation in unexpected ways.</p>

            <h3>The Slime Mold Solution</h3>
            <p>Take Tokyo's railway optimization. Japanese researchers were struggling to improve the world's most complex transportation network when they noticed something extraordinary: slime mold.</p>

            <p>When this brainless, single-celled organism searches for food, it creates incredibly efficient networks that connect multiple sources through the shortest possible routes.</p>

            <p>The researchers placed oat flakes around a slime mold in the same pattern as Tokyo's major stations.</p>

            <p>The slime mold's network design was more efficient than human transportation engineers had achieved in decades.</p>

            <p>They used its biological intelligence to redesign parts of Tokyo's rail system.</p>

            <h3>The Adjacent Possible</h3>
            <p>Most companies search for solutions within their own walls. Same industry. Same competitors. Same reference points.</p>

            <p>This creates an innovation ceiling. You can't see solutions that don't exist in your frame of reference.</p>

            <p>The breakthrough moments come from adjacent spaces. Different industries solving similar problems. Different contexts revealing universal patterns.</p>

            <p>Formula 1 pit crews transformed hospital surgery protocols. Disney's queue management revolutionized airport security. Netflix's recommendation engine reshaped retail inventory systems.</p>

            <p>None of these connections are obvious. Until they are.</p>

            <h3>The Pattern Recognition</h3>
            <p>Smart organizations don't just borrow tactics. They recognize underlying patterns that transfer across contexts.</p>

            <p>Amazon didn't copy retail stores. They recognized patterns from logistics, software development, and data management that nobody else saw as connected.</p>

            <p>Airbnb didn't study hotels. They studied eBay's trust mechanisms, Craigslist's network effects, and Facebook's social proof.</p>

            <p>The competitive advantage comes from seeing connections others miss.</p>

            <h3>The Cross-Domain Intelligence</h3>
            <p>This isn't about random inspiration. It's systematic pattern recognition across domains.</p>

            <p>We map principles, not tactics. Mechanisms, not methods. Systems, not solutions.</p>

            <p>A luxury brand's scarcity strategy might solve a SaaS pricing problem. A military's logistics framework might transform a supply chain. A gaming company's retention mechanics might fix a fintech's churn.</p>

            <p>The answers exist. Just not where you're looking.</p>

            <h3>The Translation Layer</h3>
            <p>Finding parallels is one skill. Translating them is another.</p>

            <p>Most cross-industry insights fail in translation. The mechanism works in one context but breaks in another because the underlying conditions differ.</p>

            <p>Smart translation requires understanding why something works, not just what works.</p>

            <p>The slime mold worked because optimization problems share fundamental mathematics regardless of domain. Tokyo's trains and food-seeking organisms face identical network efficiency challenges.</p>

            <p>Same principle. Different context. Translatable insight.</p>

            <h3>The Industry Blindness</h3>
            <p>Every industry has blind spots. Assumptions so deeply embedded they become invisible.</p>

            <p>"That's not how we do things here."</p>

            <p>"Our industry is different."</p>

            <p>"That wouldn't work for us."</p>

            <p>These phrases signal opportunity. When everyone in an industry agrees something is impossible, it usually just means nobody has imported the solution from elsewhere yet.</p>

            <h3>The Borrowed Genius</h3>
            <p>Larry Page built Google's secret weapon understanding what was happening in research papers. He recognized that academic citations were essentially hyperlinks. The same mechanism that ranked academic authority could rank web pages.</p>

            <p>PageRank didn't come from studying search engines. It came from studying how academics establish credibility.</p>

            <p>The billion-dollar insight was borrowed from a completely different domain.</p>

            <h3>The Recognition Practice</h3>
            <p>Agnostic intelligence recognition is where the most interesting opportunities hide.</p>

            <p>We don't care where the solution comes from. Biology. Gaming. Military strategy. Architecture. Physics.</p>

            <p>If the underlying pattern transfers, the domain is irrelevant.</p>

            <p>This requires a different approach to research. Less about competitive analysis. More about pattern recognition across fields.</p>

            <h3>The Transformation</h3>
            <p>When you start seeing parallels, your competitive landscape expands infinitely.</p>

            <p>Your real competitors aren't in your industry. They're whoever solves your type of problem better, regardless of domain.</p>

            <p>Your real teachers aren't your peers. They're whoever masters your type of challenge, regardless of field.</p>

            <p>The question shifts from "what are our competitors doing?" to "who else has solved this class of problem?"</p>

            <p>That question opens doors most companies don't know exist.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Want to find solutions where your competitors aren't looking? Let's hunt patterns across domains.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Articles */}
        {activeSection === 'articles' && (
          <section id="articles" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>ARTICLES</h2>
            <div className="section-label how-we-work">How We Work</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}

        {/* Services Overview */}
        {activeSection === 'services' && (
          <section id="services" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>SERVICES</h2>
            <div className="section-label services"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | SERVICES</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>We fix things. Then we leave.</p>

            <p>No retainers. No scope creep. No relationship managers whose job is to keep you dependent.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>How We Work</h3>

            <p>You bring the problem. We bring the thinking. Together we build the solution. Then you own it.</p>

            <p>We don't gatekeep knowledge. We don't create dependency. We solve your problem and make sure you understand it deeply enough to never need us again.</p>

            <p>That's the deal.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Three Ways We Help</h3>

            <p><span style={{ fontWeight: 700 }}>Consulting</span><br/>You have a specific problem. We fix it. Strategy, positioning, go-to-market, pricing, messaging. The hard decisions nobody else will make for you.</p>

            <p><span style={{ fontWeight: 700 }}>Offensive R&D</span><br/>You need to see around corners. We track what's changing before it becomes obvious. Competitive intelligence, market shifts, strategic foresight.</p>

            <p><span style={{ fontWeight: 700 }}>Secret Agency</span><br/>You want your own thinking infrastructure. We build custom AI systems that work exactly how your brain works. Your personal intelligence layer.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Who This Is For</h3>

            <p>People who value outcomes over process. Who want thinking, not theater. Who measure results in what changed, not what got documented.</p>

            <p>If you need someone to make you feel smart, hire a consultant. If you need someone to make you look busy, hire an agency.</p>

            <p>If you need someone to solve your problem, talk to us.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Services: Offensive R&D */}
        {activeSection === 'agile-rd' && (
          <section id="agile-rd" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>OFFENSIVE R&D</h2>
            <div className="section-label services"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | SERVICES</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>We watch so you can move first.</p>

            <p>Most companies are brilliant at solving today's problems. Then tomorrow arrives and embarrasses them.</p>

            <p>We track the signals that happen before the shifts. Not trend reports. Not innovation theatre. Just disciplined observation of what's actually changing and what it means for your business.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>How This Actually Works</h3>

            <p>Marketing Intelligence</p>

            <p>We watch what your customers do at 3am, not what they say in focus groups. Behaviour patterns that predict shifts. Weak signals that become strong trends. The stuff happening at the edges while everyone stares at the centre.</p>

            <p>Technology Foresight</p>

            <p>Every technology is revolutionary until it isn't. We separate tools that solve real problems from tools looking for problems. No breathless AI predictions. No blockchain for everything. Just clear analysis of what will actually affect your business in the next 18 months.</p>

            <p>Competitive Dynamics</p>

            <p>Your market is a game with rules nobody wrote down. We map how it really works. Who moves first. Who can't. What triggers cascades. Why Tuesday's announcement causes Thursday's panic. The mechanics behind the press releases.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>What Shows Up in Your Inbox</h3>

            <p>Monthly briefing: Here's what changed. Here's what it means. Here's what you might do about it.</p>

            <p>Signal alerts when something actually matters (not everything is urgent)</p>

            <p>Quarterly sessions where we discuss what's coming and what to ignore</p>

            <p>Zero PowerPoints with arrows pointing up and to the right</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The Honest Part</h3>

            <p>This is expensive overhead. We won't pretend it's not. But finding out about shifts three months early tends to pay for itself. Finding out three months late tends to cost everything.</p>

            <p>You need this if: Tomorrow keeps surprising you. Your planning cycles are slower than market changes. You're tired of consultants who explain what happened instead of what's happening.</p>

            <p>You don't need this if: Your market moves like geology. You already know what next year looks like. You prefer certainty to accuracy.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Price</h3>

            <p>Monthly retainer. No setup fees. No exit fees. When you stop finding value, you stop paying.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Tired of being surprised by tomorrow? Let's watch the signals together.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Services: Consulting */}
        {activeSection === 'consulting' && (
          <section id="consulting" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>CONSULTING</h2>
            <div className="section-label services"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | SERVICES</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>We fix things. Then we leave.</p>

            <p>Most consultants are in the business of creating dependency. Six-month engagements that become twelve. Frameworks that need interpreters. Solutions that require more consultants.</p>

            <p>We're allergic to that model.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The Strategic Trinity Assessment</h3>

            <p>Our only framework. We look at your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too.</p>

            <p>Takes two weeks. Costs what it costs. Shows you exactly where you're leaving money on the table.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Focused Fixes</h3>

            <p>When you know the problem but need fresh eyes:</p>

            <p>Marketing Reality Check</p>

            <p>We watch how customers actually behave, not how your research says they behave. Shopping at 2am looks different from focus groups at 2pm.</p>

            <p>AI Without the Hallucination</p>

            <p>Everyone's rushing to implement AI. Most are solving problems that don't exist. We help you find the boring, profitable applications that actually matter.</p>

            <p>Creative That Counts</p>

            <p>Brand work that increases revenue, not just brand tracking scores. Pretty is nice. Profitable is better.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Implementation Support</h3>

            <p>Sometimes you know what to do but need someone who's done it before:</p>

            <p>Design Thinking (when you need new answers, not new meetings)</p>

            <p>Go-to-Market (when launching wrong costs more than waiting)</p>

            <p>Process Surgery (when fixing workflows beats hiring more people)</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>How This Works</h3>

            <p>Tell us the problem. We'll tell you if we can fix it, how long it takes, and what it costs.</p>

            <p>No retainers. No phases. No "it depends."</p>

            <p>Some fixes take two weeks. Some take two months. None take two years.</p>

            <p>We're good at: Spotting what others miss. Fixing what's actually broken. Leaving when we're done.</p>

            <p>We're bad at: Politics. Patience for process. Pretending problems are more complex than they are.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The Test</h3>

            <p>If your last consultant left you with a framework but no fix, call us. If they're still there, definitely call us.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Know the problem? Need it fixed, not studied? Let's get to work.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Services: Secret Agency */}
        {activeSection === 'secret-agency' && (
          <section id="secret-agency" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>SECRET AGENCY</h2>
            <div className="section-label services"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | SERVICES</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>While the world uses humans to improve technology, we use technology to improve being human.</p>

            <p>Most people adapt to their tools. We build tools that adapt to you.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The Problem Nobody Talks About</h3>

            <p>You've spent years learning software that doesn't care how you think. Forcing your brain into boxes designed by engineers who never met you. Compromising your workflow to fit someone else's feature list.</p>

            <p>Process thinking: Take existing tools. Learn the workarounds. Squeeze your life into their constraints.</p>

            <p>That's adaptation. Most people don't realize there's another option.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>System Thinking</h3>

            <p>Start with your perfect Tuesday. How you want to feel at 6pm. What your ideal workflow looks like when nobody's watching.</p>

            <p>Then engineer backwards from there.</p>

            <p>Custom AI agents that understand exactly how your brain works. Workflows designed around your goals, not generic productivity frameworks. An entire digital ecosystem built specifically for you.</p>

            <p>Zero generic solutions. Zero compromise.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>What We Actually Build</h3>

            <p>Your personal AI army. Agents that know you hate meetings. Understand you need deep work blocks. Remember your family commitments. Track what drains your energy and what gives you life.</p>

            <p>We don't ask "what software do you need?" We ask "how do you want to feel every day?" Then we build the system that makes it inevitable.</p>

            <p>Bespoke. Taylor-made. Built from scratch around how you actually operate.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Who This Is For</h3>

            <p>People who are done adapting. Done with generic productivity apps. Done with "just learn this workflow" advice.</p>

            <p>You know exactly how you want your life to work. You just need someone to engineer it.</p>

            <p>We're not consultants. We're life systems architects.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>How It Works</h3>

            <p>You describe your vision. Your perfect day. Your ideal week. What matters. What doesn't. How your brain actually works.</p>

            <p>We engineer your ecosystem. Custom agents. Bespoke workflows. Everything designed specifically for your goals, your schedule, your personality.</p>

            <p>Life becomes effortless. Your ideal day happens automatically. Every day.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>The Honest Part</h3>

            <p>This is invite-only. Not because we're pretentious. Because this level of customization requires deep understanding of how you operate. We work with people who know what they want and can articulate it clearly.</p>

            <p>This isn't cheap. Building bespoke AI systems takes time. But fitting your life into generic tools costs more in the long run. Time. Energy. Sanity.</p>

            <p>Most people don't even know system thinking is an option. That's why we're secret.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Access</h3>

            <p>If you're ready to stop adapting and start evolving, reach out. We'll discuss whether this makes sense for your situation.</p>

            <p>No demos. No sales calls. Just an honest conversation about whether we can engineer what you're envisioning.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>Done adapting to generic tools? Ready for systems built around how you actually think? Let's engineer your ecosystem.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Reach Out</button>
          </section>
        )}

        {/* Products Overview */}
        {activeSection === 'products' && (
          <section id="products" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>PRODUCTS</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Thinking tools for teams who think for a living.</p>

            <p>No onboarding calls. No implementation consultants. No account managers checking in to make sure you're "getting value."</p>

            <p>You subscribe. You use it. It works.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Built Different</h3>

            <p>Most software tries to change how you work. Ours adapts to how you already think.</p>

            <p>We don't believe in "best practices" or "proven methodologies." We believe in giving smart people smart tools and getting out of the way.</p>

            <p>Every product is built on the same philosophy: Intelligence over automation. Questions over answers. Thinking over doing.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>What We've Built</h3>

            <p><span style={{ fontWeight: 700 }}>Sir Alfie</span><br/>Your personal chief of staff. Manages everything so you can focus on what matters.</p>

            <p><span style={{ fontWeight: 700 }}>Advisory Labs</span><br/>Strategic intelligence on demand. Ask better questions, get better answers.</p>

            <p><span style={{ fontWeight: 700 }}>Sandbox</span><br/>A place to test ideas fast. Build prototypes, run experiments, kill bad ideas early.</p>

            <p><span style={{ fontWeight: 700 }}>Market Value Test</span><br/>Find out what your idea is actually worth. Before you waste time building it.</p>

            <p><span style={{ fontWeight: 700 }}>Social Navigator</span><br/>Make sense of your network. See connections, opportunities, and dead weight.</p>

            <p><span style={{ fontWeight: 700 }}>Focus Matrix</span><br/>See what actually matters. Filter signal from noise. Work on the right things.</p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <h3>Who This Is For</h3>

            <p>Teams who value speed over perfection. Leaders who trust their people to think. Companies where intelligence is the actual product, not a nice-to-have.</p>

            <p>If you need training wheels, look elsewhere. If you need someone to tell you how to use a tool, these aren't for you.</p>

            <p>But if you already know what you're doing and just need better equipment, welcome.</p>

            <button onClick={() => navigateToSection('contact')} className="cta-button red">Get Started</button>
          </section>
        )}

        {/* Products: Sir Alfie */}
        {activeSection === 'sir-alfie' && (
          <section id="sir-alfie" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>SIR ALFIE</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}

        {/* Products: Advisory Labs */}
        {activeSection === 'advisory-labs' && (
          <section id="advisory-labs" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>ADVISORY LABS</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}

        {/* Products: Sandbox */}
        {activeSection === 'sandbox' && (
          <section id="sandbox" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>SANDBOX</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}

        {/* Products: Market Value Test */}
        {activeSection === 'market-value-test' && (
          <section id="market-value-test" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>MARKET VALUE TEST</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}

        {/* Products: Social Navigator */}
        {activeSection === 'social-navigator' && (
          <section id="social-navigator" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>SOCIAL NAVIGATOR</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}

        {/* Products: Focus Matrix */}
        {activeSection === 'focus-matrix' && (
          <section id="focus-matrix" className="section active">
            <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>FOCUS MATRIX</h2>
            <div className="section-label products"><span style={{ color: '#D43225' }}>PRISMATICA LABS</span> | PRODUCTS</div>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

            <p>Content coming soon...</p>
          </section>
        )}
      </main>

      {/* Brief Modals */}
      {activeModal && (
        <div
          className="modal active"
          style={{
            display: 'flex',
            position: 'fixed',
            zIndex: 1000,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: '#fafafa',
              padding: '48px',
              borderRadius: '8px',
              maxWidth: '700px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="modal-close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                fontSize: '32px',
                fontWeight: 300,
                color: '#666',
                cursor: 'pointer',
                lineHeight: 1,
                transition: 'color 0.2s'
              }}
              onClick={closeModal}
            >&times;</span>

            {briefs[activeModal as keyof typeof briefs] && (
              <>
                <h3 style={{ fontFamily: '"Passion One", sans-serif', fontSize: '32px', marginBottom: '8px' }}>
                  {briefs[activeModal as keyof typeof briefs].title}
                </h3>
                <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '32px' }}>
                  {briefs[activeModal as keyof typeof briefs].category}
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: '#666' }}>Problem</h4>
                <p style={{ marginBottom: '24px' }}>{briefs[activeModal as keyof typeof briefs].problem}</p>

                <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: '#666' }}>How We Saw It</h4>
                {briefs[activeModal as keyof typeof briefs].howWeSawIt.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: i === briefs[activeModal as keyof typeof briefs].howWeSawIt.split('\n\n').length - 1 ? '24px' : '16px' }}>{para}</p>
                ))}

                <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: '#666' }}>Result</h4>
                {briefs[activeModal as keyof typeof briefs].result.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: i === briefs[activeModal as keyof typeof briefs].result.split('\n\n').length - 1 ? '0' : '16px' }}>{para}</p>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

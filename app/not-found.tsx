/**
 * 404 Not Found Page
 *
 * Design Philosophy:
 * - Jony Ive: Simplicity as complexity resolved, care in details, honest communication
 * - Rory Sutherland: Behavioral psychology, turn frustration into curiosity
 * - Prismatica: Quiet confidence, zero noise, maximum clarity
 *
 * This error page doesn't apologize. It reframes the moment.
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NotFound() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'rgb(245, 245, 247)',
      padding: '120px 20px 40px 20px', // Top padding to clear mobile header
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
      }}>
        {/* The 404 - Matches standard page title style */}
        <div style={{
          marginBottom: '80px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-passion), sans-serif',
            fontSize: '56px',
            letterSpacing: '0.005em',
            margin: '0',
            color: '#222',
          }}>
            <span style={{ borderBottom: '4px solid #D43225' }}>404</span>
          </h2>
        </div>

        {/* Rory Sutherland-style reframe: The problem isn't the 404 */}
        <div style={{
          marginBottom: '48px',
        }}>
          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#444',
            margin: '0 0 32px 0',
          }}>
            This page doesn't exist. Actually it does.
          </p>

          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#999',
            margin: '0 0 32px 0',
            fontStyle: 'italic',
          }}>
            What doesn't exist is a current representation of what you were expecting.
          </p>

          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#999',
            margin: '0 0 32px 0',
            fontStyle: 'italic',
          }}>
            But that's philosophy.
          </p>

          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#444',
            margin: '0',
            fontWeight: '600',
          }}>
            The actual problem is the one that you need help with.
          </p>
        </div>

        {/* Easter egg: Complete navigation tree */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '0px',
            padding: '32px',
            marginBottom: '32px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'border-color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#D43225'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
        >
          <div style={{
            marginBottom: isExpanded ? '24px' : '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '17px',
                lineHeight: '1.6',
                color: '#444',
                margin: '0 0 8px 0',
              }}>
                <strong style={{ color: '#222', fontWeight: '600' }}>Let's help you find a solution.</strong>
              </p>

              <p style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#999',
                margin: '0',
                fontStyle: 'italic',
              }}>
                {isExpanded
                  ? 'Click any link in the tree below ↓'
                  : 'Reveal complete site architecture'
                }
              </p>
            </div>

            {/* Chevron */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D43225"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
                marginLeft: '16px',
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {/* Navigation Tree - Collapsible */}
          {isExpanded && (
          <nav style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '15px',
            lineHeight: '1.8',
            animation: 'fadeIn 0.4s ease-in-out',
          }}>
            {/* Landing Page */}
            <div style={{ marginBottom: '20px' }}>
              <Link href="/" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                /home
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>Sets the tone, but you probably saw it and don't need it now.</div>
            </div>

            {/* About */}
            <div className="nav-section" style={{ marginBottom: '24px' }}>
              <Link href="/about" className="section-link" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>
                /about
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>Philosophy and examples. Takes 8 minutes. Saves you 8 months of guessing how we think. It also contains:</div>

              {/* 30 Modals - Organized by category */}
              <div style={{ marginLeft: '16px', marginTop: '12px', paddingLeft: '12px', borderLeft: '1px solid #e0e0e0' }}>

                {/* Case Studies */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#888', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Case Studies (8)</div>
                  <div style={{ color: '#999', fontSize: '12px', fontStyle: 'italic', marginBottom: '6px' }}>Real problems. Real solutions. Worth reading if you want to see how we work. No big brand names or client specifics. We take NDAs seriously. It's about the mindset.</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div>→ <Link href="/about#warehouse" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Warehouse That Wasn't</Link></div>
                    <div>→ <Link href="/about#search" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Search Nobody Needed</Link></div>
                    <div>→ <Link href="/about#push-pull" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>From Push to Pull</Link></div>
                    <div>→ <Link href="/about#bottleneck" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Misdiagnosed Bottleneck</Link></div>
                    <div>→ <Link href="/about#canyon" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The £15K Canyon</Link></div>
                    <div>→ <Link href="/about#platform" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>From Retail to Platform</Link></div>
                    <div>→ <Link href="/about#music" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Classical Music for Running</Link></div>
                    <div>→ <Link href="/about#coaching" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Coaching Wave</Link></div>
                  </div>
                </div>

                {/* Particles */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#888', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Particles (7)</div>
                  <div style={{ color: '#999', fontSize: '12px', fontStyle: 'italic', marginBottom: '6px' }}>The physics of business. A little nerdy. Honestly? Overkill if you're just browsing or useless if you're in a rush. Fun if you're actually stuck and feel like exploring reframes.</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div>→ <Link href="/about#particle-time" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Time</Link> <span style={{ color: '#888' }}>(When things happen matters)</span></div>
                    <div>→ <Link href="/about#particle-actors" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Actors</Link> <span style={{ color: '#888' }}>(Who does what)</span></div>
                    <div>→ <Link href="/about#particle-resources" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Resources</Link> <span style={{ color: '#888' }}>(What's available, what's scarce)</span></div>
                    <div>→ <Link href="/about#particle-objectives" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Objectives</Link> <span style={{ color: '#888' }}>(What people actually want)</span></div>
                    <div>→ <Link href="/about#particle-constraints" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Constraints</Link> <span style={{ color: '#888' }}>(What limits behaviour)</span></div>
                    <div>→ <Link href="/about#particle-information" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Information</Link> <span style={{ color: '#888' }}>(What people know vs. what they need)</span></div>
                    <div>→ <Link href="/about#particle-incentives" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Incentives</Link> <span style={{ color: '#888' }}>(What drives them)</span></div>
                  </div>
                </div>

                {/* Molecules */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#888', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Molecules (5)</div>
                  <div style={{ color: '#999', fontSize: '12px', fontStyle: 'italic', marginBottom: '6px' }}>The words you already know, defined the way they actually work instead of how business schools teach. Long reads. Worth it if you're making decisions that involve those concepts.</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div>→ <Link href="/about#molecule-demand" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Demand</Link> <span style={{ color: '#888' }}>(Want + ability to act)</span></div>
                    <div>→ <Link href="/about#molecule-supply" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Supply</Link> <span style={{ color: '#888' }}>(Capability + willingness)</span></div>
                    <div>→ <Link href="/about#molecule-friction" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Friction</Link> <span style={{ color: '#888' }}>(Resistance to flow)</span></div>
                    <div>→ <Link href="/about#molecule-value" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Value</Link> <span style={{ color: '#888' }}>(Perception of benefit)</span></div>
                    <div>→ <Link href="/about#molecule-risk" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Risk</Link> <span style={{ color: '#888' }}>(Uncertainty × consequence)</span></div>
                  </div>
                </div>

                {/* Patterns */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#888', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Patterns (5)</div>
                  <div style={{ color: '#999', fontSize: '12px', fontStyle: 'italic', marginBottom: '6px' }}>How systems behave over time. Dense. Useful if you're diagnosing why something won't move or can't stop moving.</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div>→ <Link href="/about#pattern-inertia" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Inertia</Link> <span style={{ color: '#888' }}>(Resistance to change)</span></div>
                    <div>→ <Link href="/about#pattern-momentum" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Momentum</Link> <span style={{ color: '#888' }}>(Force in motion)</span></div>
                    <div>→ <Link href="/about#pattern-growth" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Growth</Link> <span style={{ color: '#888' }}>(Expansion dynamics)</span></div>
                    <div>→ <Link href="/about#pattern-decay" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Decay</Link> <span style={{ color: '#888' }}>(Deterioration over time)</span></div>
                    <div>→ <Link href="/about#pattern-equilibrium" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Equilibrium</Link> <span style={{ color: '#888' }}>(Balance points)</span></div>
                  </div>
                </div>

                {/* Mental Models */}
                <div>
                  <div style={{ color: '#888', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Mental Models (5)</div>
                  <div style={{ color: '#999', fontSize: '12px', fontStyle: 'italic', marginBottom: '6px' }}>The frameworks we use to diagnose problems and design solutions. Start here if you want the thinking tools, not just the case studies.</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div>→ <Link href="/demand" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Demand Flywheel</Link></div>
                    <div>→ <Link href="/incentives" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Incentive Polarity</Link></div>
                    <div>→ <Link href="/agentic" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Agentic Edge</Link></div>
                    <div>→ <Link href="/prismatic" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Prismatic Mindset</Link></div>
                    <div>→ <Link href="/triptych" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>The Triptych Nexus</Link></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Solutions */}
            <div className="nav-section" style={{ marginBottom: '24px' }}>
              <Link href="/solutions" className="section-link" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>
                /solutions
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>15 consulting services and products. Fixed prices. Fixed timelines. No retainers. If you're shopping, this is the shop.</div>

              <div style={{ marginLeft: '16px', marginTop: '12px', paddingLeft: '12px', borderLeft: '1px solid #e0e0e0' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#888', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Services & Products (15)</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div>→ <Link href="/solutions#pioneers-of-purpose" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If culture and message collide...</Link></div>
                    <div>→ <Link href="/solutions#esi-framework" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If insights don't execute...</Link></div>
                    <div>→ <Link href="/solutions#secret-agency" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If software should adapt to you...</Link></div>
                    <div>→ <Link href="/solutions#transaction-architecture" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If engagement doesn't convert...</Link></div>
                    <div>→ <Link href="/solutions#kso-workshop" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If AI decides who finds you...</Link></div>
                    <div>→ <Link href="/solutions#strategic-triptych" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If something's off but where...</Link></div>
                    <div>→ <Link href="/solutions#go-to-market" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If launch can't be wrong...</Link></div>
                    <div>→ <Link href="/solutions#creative-converts" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If brand lacks pricing power...</Link></div>
                    <div>→ <Link href="/solutions#design-thinking" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If same problem needs different answer...</Link></div>
                    <div>→ <Link href="/solutions#ai-without-hallucination" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If AI potential but zero clarity...</Link></div>
                    <div>→ <Link href="/solutions#process-surgery" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If hiring faster than fixing...</Link></div>
                    <div>→ <Link href="/solutions#marketing-reality-check" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If busy but random...</Link></div>
                    <div>→ <Link href="/solutions#focus-matrix" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If yes to all achieves nothing...</Link></div>
                    <div>→ <Link href="/solutions#sir-alfie" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If CRM's dead and pipeline's hope...</Link></div>
                    <div>→ <Link href="/solutions#value-channel-matrix" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>If competing on price alone...</Link></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div style={{ marginBottom: '24px' }}>
              <Link href="/products" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                /products
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>
                25+ AI products. Consulting methods coded into tools. £299/month gets you everything. No waitlists. Real constraints based on market saturation. We cap access so your competitors don't get the same edge. Minimum 25 interactions monthly required. If you're not using them hard, we give your spot to someone who will.
              </div>
            </div>

            {/* Contact */}
            <div style={{ marginBottom: '24px' }}>
              <Link href="/contact" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                /contact
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>
                No calendar. No chatbot. Just email. We filter before we engage. If you want validation, skip this. If you want clarity, read it. Then decide if you're part of the 5%.
              </div>
            </div>

            {/* Articles */}
            <div style={{ marginBottom: '20px' }}>
              <Link href="/articles" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                /articles
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>
                Long-form thinking. AGI, strategy, systems, business physics. Not blog posts. Not thought leadership. Just ideas that needed more than 280 characters. Read if you've got 6 minutes and actually want to think with us.
              </div>
            </div>

            {/* Privacy */}
            <div style={{ marginBottom: '20px' }}>
              <Link href="/privacy" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                /privacy
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>
                Written for humans, not lawyers. No trackers. No analytics. No selling your data. Honest about what we collect and why. If you're paranoid, read it. If you trust us, don't.
              </div>
            </div>

            {/* Terms */}
            <div style={{ marginBottom: '20px' }}>
              <Link href="/terms" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                /terms
              </Link>
              <div style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}>
                The rules. Use our stuff, you agree. Minimum 25 meaningful interactions per month or we'll refund you and kick you out. We limit clients per industry so your competitors don't get the same advantage. Liability capped at what you paid. Read before you subscribe.
              </div>
            </div>
          </nav>
          )}
        </button>

        {/* Add keyframes for fadeIn animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .nav-section:has(a:hover) .section-link {
            color: #D43225 !important;
          }

          .nav-section .section-link:hover {
            color: #D43225 !important;
          }
        `}</style>


        {/* The reveal about the reveal */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#444',
            margin: '0 0 16px 0',
          }}>
            404s create frustration. This one is designed to minimise it.
          </p>

          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#444',
            margin: '0 0 24px 0',
          }}>
            Would you call that innovation? Creativity? Boredom?
          </p>

          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#222',
            margin: '0',
            fontWeight: '500',
          }}>
            Or just what happens when the questions you ask have different colours by default?
          </p>
        </div>

        {/* Ive-style detail: The back button alternative */}
        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid #e0e0e0',
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '15px',
              color: '#666',
              background: 'none',
              border: 'none',
              padding: '0',
              cursor: 'pointer',
              textDecoration: 'underline',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            ← Go back to where you were
          </button>
        </div>
      </div>
    </div>
  );
}

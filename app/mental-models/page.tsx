'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function MentalModelsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (briefId: string) => {
    setActiveModal(briefId);
  };

  const briefs: { [key: string]: { title: string; category: string; problem: string; howWeSawIt: string; result: string } } = {
    'brief-warehouse': {
      title: 'The Warehouse That Wasn\'t',
      category: 'Supply Chain Diagnostics',
      problem: 'A logistics company was losing money. Everyone blamed the warehouse. "Too slow, too many mistakes, too expensive."',
      howWeSawIt: 'We watched the warehouse for three days. It wasn\'t slow. It was waiting. Orders arrived in bursts. Staff stood idle, then got slammed. The problem wasn\'t the warehouse. It was upstream.\n\nPoor demand forecasting created chaos. The warehouse was just where the chaos became visible.',
      result: 'Fixed forecasting. Smoothed order flow. Warehouse performance improved 40% without hiring anyone or changing a single process.\n\nThe bottleneck wasn\'t where everyone was looking.'
    },
    'brief-search': {
      title: 'The Search Paradigm',
      category: 'Product Strategy',
      problem: 'A SaaS company had feature requests stacking up. "Better search" was at the top. Six months of dev time estimated. Significant cost.',
      howWeSawIt: 'We asked why users needed better search. Turns out they didn\'t. They needed better organization. They were searching because they couldn\'t find things. Different problem entirely.\n\nSearch would have made a broken system slightly more tolerable. We solved the actual problem instead.',
      result: 'Redesigned information architecture in two weeks. Search volume dropped 60%. User satisfaction went up. Saved six months of development time and built something that actually worked.\n\nSometimes the feature request is a symptom, not the cure.'
    },
    'brief-push-pull': {
      title: 'From Push to Pull',
      category: 'Market Positioning',
      problem: 'A B2B service was spending heavily on outbound sales. High effort, low conversion. "Our market doesn\'t understand what we do."',
      howWeSawIt: 'The market understood fine. They just didn\'t care yet. The company was pushing a solution before prospects felt the problem.\n\nWe shifted strategy: make the problem visible first. Then let prospects come to them.',
      result: 'Built a diagnostic tool that showed companies where they were losing money. Didn\'t sell anything. Just made the problem impossible to ignore.\n\nInbound requests tripled. Sales cycle shortened by half. Same product. Different approach.'
    },
    'brief-bottleneck': {
      title: 'The Misdiagnosed Bottleneck',
      category: 'Operational Efficiency',
      problem: 'A manufacturing company had a "slow approval process." Projects stalled waiting for sign-off. Frustration everywhere.',
      howWeSawIt: 'Approvals weren\'t slow. They were being asked to approve things that weren\'t ready. Incomplete briefs, unclear requirements, missing data.\n\nThe approval step was where poor preparation became visible. Fixing "the approval process" would have made it faster to approve bad work.',
      result: 'Implemented a pre-approval checklist. Nothing reached approval until it met minimum standards. Approvals got faster because the work got better.\n\nThe bottleneck wasn\'t the gate. It was everything before it.'
    },
    'brief-friction': {
      title: 'Removing Existential Friction',
      category: 'Customer Experience',
      problem: 'A professional services firm had high consultation show-up rates but low conversion to paid work. "People like talking to us but won\'t commit."',
      howWeSawIt: 'The consultation was free. The next step was £15K. That\'s not a gap. That\'s a canyon.\n\nProspects liked the conversation but couldn\'t justify the jump. They needed a middle step. Something that proved value before the big commitment.',
      result: 'Created a £2K diagnostic engagement. Small enough to say yes to. Valuable enough to demonstrate capability. Converted 60% of diagnostics to full projects.\n\nRemoved the existential leap. Built a bridge instead.'
    },
    'brief-platform': {
      title: 'From Retail to Platform',
      category: 'Business Model Evolution',
      problem: 'A specialized retailer was competing on price and losing. "Amazon has everything cheaper. How do we compete?"',
      howWeSawIt: 'They couldn\'t compete on price. But they had something Amazon didn\'t: expertise. Their customers were enthusiasts who valued knowledge, not just products.\n\nWe saw an opportunity to stop selling things and start enabling people.',
      result: 'Transformed from retailer to platform. Added forums, guides, expert Q&A. Products became tools within a knowledge ecosystem.\n\nRevenue shifted from margin on goods to platform subscriptions. Customer lifetime value tripled. Amazon became irrelevant to their model.'
    },
    'brief-music': {
      title: 'Extraordinary in Ordinary Context',
      category: 'Brand Positioning',
      problem: 'A classical musician was incredibly talented but unknown. "Nobody cares about classical music anymore."',
      howWeSawIt: 'Classical music hadn\'t changed. Context had. People stream music while working, exercising, or commuting. Concert halls felt formal and inaccessible.\n\nThe music was beautiful. The context was wrong. We moved it.',
      result: 'Launched curated playlists: "Classical for Focus," "Classical for Sleep," "Classical for Running."\n\nStreams went from hundreds to hundreds of thousands. Same music. Different frame. Extraordinary became accessible by meeting people where they already were.'
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
    <PageLayout>
      <section id="how" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>MENTAL MODELS</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>Before we explain how we think, let's show you what we've done.</p>

        <p>Real problems. Real companies. Real results.</p>

        <h3>Problems We've Thought About</h3>

        <p style={{ marginBottom: '24px' }}>
          Each problem is unique. Each required thinking differently. No frameworks. Just intelligence applied to specific situations.
        </p>

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

        <p>See? Different industries. Different contexts. Different surface problems.</p>

        <p>But look closer. They're all the same underneath.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

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
            <Link href="/trinity" className="cta-button orange" style={{ marginTop: '8px' }}>Trinity</Link>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ marginBottom: '12px', color: '#444' }}>Rolex doesn't sell watches. Peloton doesn't sell bikes. Slack doesn't sell chat. They sell status, tribe membership, professional identity. Your product is the excuse. The demand is primal. Miss this and your marketing is just noise.</p>
            <Link href="/demand" className="cta-button orange" style={{ marginTop: '8px' }}>Demand</Link>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ marginBottom: '12px', color: '#444' }}>Sales says they want better leads. What they optimize for is easy closes. Product says they want user feedback. What they optimize for is no complaints. Executives say they want innovation. What they optimize for is no surprises. Watch what they do, not what they say.</p>
            <Link href="/incentives" className="cta-button orange" style={{ marginTop: '8px' }}>Incentives</Link>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ marginBottom: '12px', color: '#444' }}>Humans need meetings, check-ins, approvals, reassurance. AI doesn't. Give it clear objectives, hard constraints, quality thresholds, and kill switches. Then let it run while you sleep. The bottleneck isn't the AI. It's your need to feel in control.</p>
            <Link href="/agentic" className="cta-button orange" style={{ marginTop: '8px' }}>Agentic</Link>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ marginBottom: '12px', color: '#444' }}>Every industry thinks it's special. None of them are. Nightclubs and enterprise sales are both gatekeeping. Museums and Netflix are both attention retention. Airports and emergency rooms are both triage under constraints. See structure, not surface, and solutions transfer instantly.</p>
            <Link href="/prismatic" className="cta-button orange" style={{ marginTop: '8px' }}>Prismatic</Link>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>These aren't solutions. They're the palette. Once you see the structure, the path becomes obvious.</p>

        <p>Most objectives are identical across industries. Most friction is predictable. Most energy is wasted fighting the wrong constraint.</p>

        <p>We start with demand. Always. Because understanding what people actually want eliminates most strategy debates before they start.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Got a problem that needs solving? Let's apply these models to your situation.</p>

        <Link href="/contact" className="cta-button red">Reach Out</Link>
      </section>

      {/* Brief Modal */}
      {activeModal && briefs[activeModal] && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                padding: '4px 8px',
                lineHeight: 1
              }}
            >
              ×
            </button>

            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
              {briefs[activeModal].category}
            </div>

            <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '24px' }}>{briefs[activeModal].title}</h3>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>The Problem</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{briefs[activeModal].problem}</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>How We Saw It</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{briefs[activeModal].howWeSawIt}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>The Result</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{briefs[activeModal].result}</p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

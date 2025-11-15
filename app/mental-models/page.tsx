'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { Dialog, Transition } from '@headlessui/react';

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
      title: 'The Search Nobody Needed',
      category: 'Product Strategy',
      problem: 'A SaaS company had feature requests stacking up. "Better search" was at the top. Six months of dev time estimated. Significant cost.',
      howWeSawIt: 'We asked why users needed better search. Turns out they didn\'t. They needed better organisation. They were searching because they couldn\'t find things. Different problem entirely.\n\nSearch would have made a broken system slightly more tolerable. We solved the actual problem instead.',
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
      title: 'The £15K Canyon',
      category: 'Customer Experience',
      problem: 'A professional services firm had high consultation show-up rates but low conversion to paid work. "People like talking to us but won\'t commit."',
      howWeSawIt: 'The consultation was free. The next step was £15K. That\'s not a gap. That\'s a canyon.\n\nProspects liked the conversation but couldn\'t justify the jump. They needed a middle step. Something that proved value before the big commitment.',
      result: 'Created a £2K diagnostic engagement. Small enough to say yes to. Valuable enough to demonstrate capability. Converted 60% of diagnostics to full projects.\n\nRemoved the existential leap. Built a bridge instead.'
    },
    'brief-platform': {
      title: 'From Retail to Platform',
      category: 'Business Model Evolution',
      problem: 'A specialised retailer was competing on price and losing. "Amazon has everything cheaper. How do we compete?"',
      howWeSawIt: 'They couldn\'t compete on price. But they had something Amazon didn\'t: expertise. Their customers were enthusiasts who valued knowledge, not just products.\n\nWe saw an opportunity to stop selling things and start enabling people.',
      result: 'Transformed from retailer to platform. Added forums, guides, expert Q&A. Products became tools within a knowledge ecosystem.\n\nRevenue shifted from margin on goods to platform subscriptions. Customer lifetime value tripled. Amazon became irrelevant to their model.'
    },
    'brief-music': {
      title: 'Classical Music for Running',
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
        <div style={{ maxWidth: '700px' }}>
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', fontWeight: 600, lineHeight: 0.9, letterSpacing: '0.005em', marginBottom: '32px' }}>MENTAL <span style={{ borderBottom: '4px solid #D43225' }}>MODELS</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Most consultancies explain their frameworks. We show you what happened when we used them.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Eight problems. Eight different industries. Same way of seeing.</p>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Problems We've Thought About</h3>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>
          Details are vague by design. Not just NDAs. We don't trade client specifics for marketing material.
        </p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>
          What matters: the problem structure, how we saw it, what changed.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-warehouse')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            The Warehouse That Wasn&apos;t &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-search')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            The Search Nobody Needed &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-push-pull')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            From Push to Pull &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-bottleneck')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            The Misdiagnosed Bottleneck &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-friction')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            The £15K Canyon &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-platform')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            From Retail to Platform &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-music')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            Classical Music for Running &gt;
          </button>
          <button
            className="service-cta-btn"
            onClick={() => openModal('brief-coaching')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#666',
              fontSize: '17px',
              fontWeight: 400,
              transition: 'color 0.2s',
              textAlign: 'left'
            }}
          >
            The Coaching Wave &gt;
          </button>
        </div>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>See? Different industries. Different contexts. Different surface problems.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>But look closer. They're all the same underneath.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Every business problem is physics. Forces trying to move through constraints. Energy seeking equilibrium. Parts colliding until something breaks or something works.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>The details change. The structure doesn't.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Physics governs reality. So it should govern how we think. Light through a prism reveals what was always there but invisible. That's what we are passionate about. The tangible invisible. That's why we're called Prismatica.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>First Principles</h3>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Strip away the details. Seven components remain:</p>

        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Time</span><br/><span style={{ color: '#666' }}>The window narrows. Momentum builds or dies. Opportunity decays.</span></p>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Actors</span><br/><span style={{ color: '#666' }}>Who can say yes. Who can say no. Who just gets affected.</span></p>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Resources</span><br/><span style={{ color: '#666' }}>What you have to work with. Never enough of what matters.</span></p>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Objectives</span><br/><span style={{ color: '#666' }}>What everyone's actually after. Surprisingly identical across industries.</span></p>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Constraints</span><br/><span style={{ color: '#666' }}>The edges of possibility. Physics, budgets, regulations, human nature.</span></p>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Information</span><br/><span style={{ color: '#666' }}>What you know, what they know, what nobody knows yet.</span></p>
          <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Incentives</span><br/><span style={{ color: '#666' }}>What people say drives them. What actually drives them.</span></p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Emergent Patterns</h3>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>When parts collide, they form molecules. Structures with mass, direction, momentum. These patterns have velocity. They want to move:</p>

        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <p style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Demand</span><br/>
            <span style={{ color: '#666' }}>People who want something, know something, need something.</span><br/>
            <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Actors + Objectives + Information</span>
          </p>
          <p style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Supply</span><br/>
            <span style={{ color: '#666' }}>What's possible to deliver, given what you have and how long you have it.</span><br/>
            <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Resources + Constraints + Time</span>
          </p>
          <p style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Friction</span><br/>
            <span style={{ color: '#666' }}>Everything that slows you down. Rules, misaligned incentives, missing information.</span><br/>
            <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Constraints + Information + Incentives</span>
          </p>
          <p style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Value</span><br/>
            <span style={{ color: '#666' }}>What you can create when resources meet real objectives for real people.</span><br/>
            <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Resources + Objectives + Actors</span>
          </p>
          <p style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Risk</span><br/>
            <span style={{ color: '#666' }}>The gap between what you're betting on and what you actually know. Ticking.</span><br/>
            <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Time + Information + Objectives</span>
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The Models</h3>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Five systems for seeing what's actually happening:</p>

        <div style={{ marginTop: '32px', marginBottom: '24px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Demand</h4>
            <p style={{ marginBottom: '8px', color: '#444' }}>Rolex doesn't sell watches. Peloton doesn't sell bikes. Slack doesn't sell chat. They sell status, tribe membership, professional identity. Your product is the excuse. The demand is primal. Miss this and your marketing is just noise.</p>
            <Link
              href="/demand"
              className="mental-models-cta-button"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#D43225',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '17px',
                fontWeight: 600,
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Explore Demand
            </Link>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Incentives</h4>
            <p style={{ marginBottom: '8px', color: '#444' }}>Sales says they want better leads. What they optimize for is easy closes. Product says they want user feedback. What they optimize for is no complaints. Executives say they want innovation. What they optimize for is no surprises. Watch what they do, not what they say.</p>
            <Link
              href="/incentives"
              className="mental-models-cta-button"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#D43225',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '17px',
                fontWeight: 600,
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Explore Incentives
            </Link>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Agentic</h4>
            <p style={{ marginBottom: '8px', color: '#444' }}>Humans need meetings, check-ins, approvals, reassurance. AI doesn't. Give it clear objectives, hard constraints, quality thresholds, and kill switches. Then let it run while you sleep. The bottleneck isn't the AI. It's your need to feel in control.</p>
            <Link
              href="/agentic"
              className="mental-models-cta-button"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#D43225',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '17px',
                fontWeight: 600,
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Explore Agentic
            </Link>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Prismatic</h4>
            <p style={{ marginBottom: '8px', color: '#444' }}>Every industry thinks it's special. None of them are. Nightclubs and enterprise sales are both gatekeeping. Museums and Netflix are both attention retention. Airports and emergency rooms are both triage under constraints. See structure, not surface, and solutions transfer instantly.</p>
            <Link
              href="/prismatic"
              className="mental-models-cta-button"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#D43225',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '17px',
                fontWeight: 600,
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Explore Prismatic
            </Link>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Triptych</h4>
            <p style={{ marginBottom: '8px', color: '#444' }}>Most companies fight the wrong battle. They add supply when friction is the problem. Remove friction when demand doesn't exist. Build features when distribution is broken. Stop guessing. Map the forces. Fix what's actually stuck.</p>
            <Link
              href="/triptych"
              className="mental-models-cta-button"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#D43225',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '17px',
                fontWeight: 600,
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Explore Triptych
            </Link>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>These aren't solutions. They're the palette. Once you see the structure, the path becomes obvious.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Most objectives are identical across industries. Most friction is predictable. Most energy is wasted fighting the wrong constraint.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>We start with demand. Always. Because understanding what people actually want eliminates most strategy debates before they start.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', marginBottom: '16px' }}>Ready to see the structure in your problem?</p>

        <Link
          href="/contact"
          className="mental-models-cta-button"
          style={{
            display: 'inline-block',
            padding: '14px 28px',
            backgroundColor: '#D43225',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '17px',
            fontWeight: 600,
            transition: 'all 0.2s',
            border: 'none',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Reach Out
        </Link>
        </div>
      </section>

      {/* Brief Modal */}
      <Transition appear show={activeModal !== null} as={Fragment}>
        <Dialog as="div" className="modal active" onClose={() => setActiveModal(null)}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 z-[1000]"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            />
          </Transition.Child>

          {/* Modal Container */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel
                className="modal-content"
                style={{
                  backgroundColor: '#fafafa',
                  padding: '48px',
                  borderRadius: '8px',
                  maxWidth: '700px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative',
                }}
              >
                <button
                  type="button"
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

                {activeModal && briefs[activeModal] && (
                  <>
                    <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {briefs[activeModal].category}
                    </div>

                    <Dialog.Title as="h3" style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '1.2', marginTop: 0, marginBottom: '24px', color: '#222' }}>
                      {briefs[activeModal].title}
                    </Dialog.Title>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>The Problem</h4>
                      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line' }}>{briefs[activeModal].problem}</p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>How We Saw It</h4>
                      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line' }}>{briefs[activeModal].howWeSawIt}</p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>The Result</h4>
                      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line' }}>{briefs[activeModal].result}</p>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </PageLayout>
  );
}

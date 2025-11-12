'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import EnquiryModal from '@/components/EnquiryModal';
import TrademarkModal from '@/components/TrademarkModal';

// Service configuration with duration and pricing
const serviceConfig: Record<string, { duration: number; price: string }> = {
  'pioneers-of-purpose': { duration: 8, price: '30000' },
  'esi-framework': { duration: 6, price: '25000' },
  'the-secret-agency': { duration: 12, price: '25000' },
  'kso-workshop': { duration: 4, price: '18500' },
  'transaction-architecture': { duration: 5, price: '15000' },
  'strategic-triptych': { duration: 4, price: '12000' },
  'go-to-market': { duration: 7, price: '8000' },
  'design-thinking': { duration: 3, price: '6000' },
  'ai-without-hallucination': { duration: 5, price: '5000' },
  'creative-converts': { duration: 7, price: '5000' },
  'marketing-reality-check': { duration: 4, price: '5000' },
  'process-surgery': { duration: 5, price: '5000' },
};

export default function ConsultingPage() {
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<string | null>(null);
  const [trademarkModalOpen, setTrademarkModalOpen] = useState(false);

  return (
    <PageLayout>
      <section id="consulting" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>DIRECT ENGAGEMENT</h2>

        <p>We fix things. Then we leave.</p>

        <p>Most consultants optimize for retention. We optimize for resolution.</p>

        <div style={{ margin: '32px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setServiceFilter('all')}
            style={{
              padding: '8px 16px',
              fontSize: '11px',
              fontFamily: '"Noto Sans", sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              border: serviceFilter === 'all' ? '2px solid #D43225' : '2px solid #e0e0e0',
              background: serviceFilter === 'all' ? '#D43225' : 'white',
              color: serviceFilter === 'all' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              if (serviceFilter !== 'all') {
                e.currentTarget.style.borderColor = '#D43225';
                e.currentTarget.style.color = '#D43225';
              }
            }}
            onMouseLeave={(e) => {
              if (serviceFilter !== 'all') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            All
          </button>
          <button
            onClick={() => setServiceFilter('strategy')}
            style={{
              padding: '8px 16px',
              fontSize: '11px',
              fontFamily: '"Noto Sans", sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              border: serviceFilter === 'strategy' ? '2px solid #D43225' : '2px solid #e0e0e0',
              background: serviceFilter === 'strategy' ? '#D43225' : 'white',
              color: serviceFilter === 'strategy' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              if (serviceFilter !== 'strategy') {
                e.currentTarget.style.borderColor = '#D43225';
                e.currentTarget.style.color = '#D43225';
              }
            }}
            onMouseLeave={(e) => {
              if (serviceFilter !== 'strategy') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            Strategy
          </button>
          <button
            onClick={() => setServiceFilter('marketing')}
            style={{
              padding: '8px 16px',
              fontSize: '11px',
              fontFamily: '"Noto Sans", sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              border: serviceFilter === 'marketing' ? '2px solid #D43225' : '2px solid #e0e0e0',
              background: serviceFilter === 'marketing' ? '#D43225' : 'white',
              color: serviceFilter === 'marketing' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              if (serviceFilter !== 'marketing') {
                e.currentTarget.style.borderColor = '#D43225';
                e.currentTarget.style.color = '#D43225';
              }
            }}
            onMouseLeave={(e) => {
              if (serviceFilter !== 'marketing') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            Marketing
          </button>
          <button
            onClick={() => setServiceFilter('technology')}
            style={{
              padding: '8px 16px',
              fontSize: '11px',
              fontFamily: '"Noto Sans", sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              border: serviceFilter === 'technology' ? '2px solid #D43225' : '2px solid #e0e0e0',
              background: serviceFilter === 'technology' ? '#D43225' : 'white',
              color: serviceFilter === 'technology' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              if (serviceFilter !== 'technology') {
                e.currentTarget.style.borderColor = '#D43225';
                e.currentTarget.style.color = '#D43225';
              }
            }}
            onMouseLeave={(e) => {
              if (serviceFilter !== 'technology') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            Technology
          </button>
          <button
            onClick={() => setServiceFilter('process')}
            style={{
              padding: '8px 16px',
              fontSize: '11px',
              fontFamily: '"Noto Sans", sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              border: serviceFilter === 'process' ? '2px solid #D43225' : '2px solid #e0e0e0',
              background: serviceFilter === 'process' ? '#D43225' : 'white',
              color: serviceFilter === 'process' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              if (serviceFilter !== 'process') {
                e.currentTarget.style.borderColor = '#D43225';
                e.currentTarget.style.color = '#D43225';
              }
            }}
            onMouseLeave={(e) => {
              if (serviceFilter !== 'process') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            Process
          </button>
        </div>

        <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

        {(serviceFilter === 'all' || serviceFilter === 'strategy') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If your internal culture and external message feel misaligned...</p>

        <h3 id="pioneers-of-purpose" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Pioneers of Purpose Assessment<span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>™</span>
            <button
              onClick={() => setTrademarkModalOpen(true)}
              title="Why the ™ matters"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Strategy</span>
        </h3>

        <p>Dissect your business from its root reason to exist. Then cascade that purpose through every system and touchpoint. Inside-out authenticity that strengthens both internal culture and external message. Purpose as operating system, not marketing tagline.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £30,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Give us four to eight weeks and you'll have purpose architecture mapped across every system and touchpoint by <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (9 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span>. That's operating system, not marketing fluff.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Pioneers of Purpose Assessment')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Pioneers of Purpose - they dissect your business from its core reason to exist and cascade that purpose through every system and customer touchpoint. Inside-out authenticity that actually strengthens both culture and message.\n\nFour to eight weeks, starts at £30,000. They map purpose as operating system, not marketing tagline.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (9 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'} or earlier.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#pioneers-of-purpose' : 'https://prismaticalabs.com/services#pioneers-of-purpose'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('pioneers-of-purpose')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If you have insights but struggle to execute them systematically...</p>

        <h3 id="esi-framework" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            The ESI Framework<span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>™</span>
            <button
              onClick={() => setTrademarkModalOpen(true)}
              title="Why the ™ matters"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Strategy</span>
        </h3>

        <p>Explore, Synthesize, Ignite. Our operating system for transformation. Explore uncovers truth. Synthesize turns discovery into clarity. Ignite makes clarity executable. Research, strategy, and execution as a continuous loop.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £25,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Three to six weeks. Start Monday, and by <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (7 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> you'll have a roadmap that actually gets executed instead of gathering dust.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: ESI Framework from Prismatica Labs')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called the ESI Framework - basically a system that connects insights to actual implementation. Explore uncovers truth, Synthesize turns it into strategy, Ignite makes it executable.\n\nThree to six weeks, starts at £25,000. They map the whole thing from research through execution.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (7 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'} or earlier.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#esi-framework' : 'https://prismaticalabs.com/services#esi-framework'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('esi-framework')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'technology') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If you're done adapting to generic software and want technology built around how you actually think...</p>

        <h3 id="secret-agency" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            The Secret Agency<span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>™</span>
            <button
              onClick={() => setTrademarkModalOpen(true)}
              title="Why the ™ matters"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Technology</span>
        </h3>

        <p>Your thinking, systematized. Custom AI infrastructure built exactly around how your brain works. Not productivity apps you adapt to, but systems that adapt to you. We engineer your perfect workflow from scratch. Bespoke intelligence layers that multiply your capacity.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £25,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Invitation only. Deep discovery, custom architecture, ongoing refinement.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: The Secret Agency')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called The Secret Agency - custom AI infrastructure built exactly around how your brain works. Not productivity apps you adapt to, but systems that adapt to you. They engineer your perfect workflow from scratch. Bespoke intelligence layers that multiply capacity.\n\nInvitation only, starting at £25,000.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#secret-agency' : 'https://prismaticalabs.com/services#secret-agency'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('the-secret-agency')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'marketing') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If AI systems are mediating how customers discover you...</p>

        <h3 id="kso-workshop" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>Knowledge Search Optimisation (KSO) Workshop</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Marketing</span>
        </h3>

        <p>The future of discoverability isn't about links. It's about ideas. In a world where AI systems index knowledge instead of URLs, authority belongs to those who own the narrative. We dissect your business DNA and rebuild it as a knowledge graph of authority. Purpose, values, USP, and intellectual territory mapped into content that AI systems recognise, learn from, and cite.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>£18,500</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Four weeks. Workshop next week and by <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (4 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> you'll have a KSO blueprint showing what intellectual space you own and how to operationalise it. SEO makes you searchable. KSO makes you unforgettable.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: KSO Workshop from Prismatica Labs')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called the KSO Workshop - Knowledge Search Optimisation. The future of discoverability isn't about links, it's about ideas. They map your business DNA into a knowledge graph that AI systems recognise and cite.\n\nFour weeks, £18,500. They position you as a recognised source in your space, not just another site.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (4 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#kso-workshop' : 'https://prismaticalabs.com/services#kso-workshop'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('kso-workshop')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'strategy') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If engagement is high but conversions don't match...</p>

        <h3 id="transaction-architecture" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            The Transaction Architecture<span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>™</span>
            <button
              onClick={() => setTrademarkModalOpen(true)}
              title="Why the ™ matters"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Strategy</span>
        </h3>

        <p>Vision to transaction to validation. Map how value exchanges actually happen across three dimensions: spiritual (emotional resonance), cognitive (understanding shifts), and tangible (measurable actions). Then design every touchpoint to trigger those transactions. Surface-level appeal meets deep-level truth. Conversion through understanding, not manipulation.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £15,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Give us three to five weeks and by <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (6 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> you'll know exactly how value flows through your business and where to increase conversion velocity.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Transaction Architecture')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Transaction Architecture - they map how value actually flows through your business across three dimensions: emotional, cognitive, and tangible. Then they design every touchpoint to trigger those transactions. Conversion through understanding, not manipulation.\n\nThree to five weeks, starts at £15,000.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (6 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#transaction-architecture' : 'https://prismaticalabs.com/services#transaction-architecture'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('transaction-architecture')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If you know something's off but can't pinpoint where...</p>

        <h3 id="strategic-triptych" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            The Strategic Triptych Assessment<span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>™</span>
            <button
              onClick={() => setTrademarkModalOpen(true)}
              title="Why the ™ matters"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Strategy</span>
        </h3>

        <p>We examine your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £12,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Two to four weeks. By <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (5 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> you'll know exactly where you're leaving money on the table and what to do about it.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Strategic Triptych Assessment')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Strategic Triptych - they examine your business through three lenses at once: how you market, compete, and build. Most problems live in the gaps between these. Most opportunities too.\n\nTwo to four weeks, starts at £12,000. They show you exactly where you're leaving money on the table.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (5 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#strategic-triptych' : 'https://prismaticalabs.com/services#strategic-triptych'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('strategic-triptych')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'marketing') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If you're launching something new and can't afford to get it wrong...</p>

        <h3 id="go-to-market" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>Go-to-Market</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Marketing</span>
        </h3>

        <p>Launch right the first time. We build your complete go-to-market strategy from positioning to channels to messaging to timeline. Who you're targeting, what you're saying, where you're saying it, and in what sequence. Everything mapped before you spend a pound on execution.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £8,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Four to six weeks now beats six months of "let's try this and see." Launch strategy ready by <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (7 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span>, budget intact.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Go-to-Market Strategy')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's a complete go-to-market strategy service. They map everything from positioning to channels to messaging to timeline. Who you're targeting, what you're saying, where, and when. Everything mapped before you spend a pound on execution.\n\nFour to six weeks, starts at £8,000.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (7 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#go-to-market' : 'https://prismaticalabs.com/services#go-to-market'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('go-to-market')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'process') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If traditional solutions keep failing on the same recurring problem...</p>

        <h3 id="design-thinking" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>Design Thinking</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Process</span>
        </h3>

        <p>New answers to old problems. When traditional approaches keep failing, we reframe the problem entirely. Rapid prototyping, user testing, iteration. We work in sprints to test assumptions quickly and cheaply before you commit to expensive solutions. Fail fast, learn faster.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £6,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          First sprint done by <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (3 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span>. Real users, real prototypes, real learning. Then we iterate or pivot. No six-month waterfall nonsense.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Design Thinking')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's a design thinking approach for problems that traditional solutions can't fix. They reframe the problem, rapid prototype, and test with real users. Fast iteration before you commit to expensive solutions.\n\nStarts at £6,000, first sprint done in 3 weeks.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (3 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#design-thinking' : 'https://prismaticalabs.com/services#design-thinking'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('design-thinking')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'technology') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If your team sees AI potential everywhere but can't identify clear use cases...</p>

        <h3 id="ai-without-hallucination" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>AI Without the Hallucination</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Technology</span>
        </h3>

        <p>Cut through the hype and find the boring, profitable AI applications that actually matter. We map your workflows, identify where AI adds real value, and prioritize implementations by ROI. Not the flashy demos everyone's chasing. The practical automations that save hours and generate revenue.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £5,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          We'll cut through the hype in two to four weeks. By <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (5 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> you'll have AI use cases with actual ROI, not just ChatGPT screenshots in your deck.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: AI Without the Hallucination')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called AI Without the Hallucination. They cut through the hype to find the boring, profitable AI applications. They map your workflows, identify real value, and prioritize by ROI. Practical automations, not flashy demos.\n\nTwo to four weeks, starts at £5,000.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (5 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#ai-without-hallucination' : 'https://prismaticalabs.com/services#ai-without-hallucination'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('ai-without-hallucination')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'marketing') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If your brand looks professional but doesn't drive sales or premium pricing...</p>

        <h3 id="creative-converts" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>Creative That Converts</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Marketing</span>
        </h3>

        <p>Brand work measured in revenue, not awards. We rebuild your positioning from the ground up based on what actually shifts customer perception and pricing power. Every design decision, every message, every touchpoint gets tested against one question: does this make people willing to pay more or buy faster?</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £5,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Three to six weeks from now, call it <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (7 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span>, your brand actually drives revenue instead of just looking pretty.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Creative That Converts')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Creative That Converts. They rebuild brand positioning based on what actually shifts customer perception and pricing power. Every design decision gets tested: does this make people pay more or buy faster?\n\nThree to six weeks, starts at £5,000.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (7 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#creative-converts' : 'https://prismaticalabs.com/services#creative-converts'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('creative-converts')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If your marketing looks busy but results feel random...</p>

        <h3 id="marketing-reality-check" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>Marketing Reality Check</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Marketing</span>
        </h3>

        <p>We watch how customers actually behave, not how your research says they behave. Shopping at 2am looks different from focus groups at 2pm. We track real patterns, identify what's working despite your strategy (not because of it), and show you where budget should actually go.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £5,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Two to three weeks. By <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (4 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> you'll know what's actually moving the needle and what's just moving budget around.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Marketing Reality Check')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's a marketing reality check based on actual customer behavior, not research reports. They track real patterns and show you what's working despite your strategy, not because of it.\n\nTwo to three weeks, starts at £5,000.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (4 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#marketing-reality-check' : 'https://prismaticalabs.com/services#marketing-reality-check'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('marketing-reality-check')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        {(serviceFilter === 'all' || serviceFilter === 'process') && (
          <>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px', marginBottom: '4px' }}>If you're hiring faster than you're fixing processes...</p>

        <h3 id="process-surgery" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>Process Surgery</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Process</span>
        </h3>

        <p>Cut what's broken. Fix what matters. Leave the rest alone. We find the 20% of processes causing 80% of your pain, eliminate unnecessary steps, and rebuild the critical paths. Not process for process sake. Process that actually makes work easier.</p>

        <p style={{ fontWeight: 600, marginTop: '8px' }}>From £5,000</p>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
          Two to four weeks. By <span style={{ fontWeight: 'bold' }}>{typeof window !== 'undefined' ? new Date(Date.now() + (5 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}</span> your team will spend less time managing workflows and more time doing actual work.
        </p>

        <p style={{ marginTop: '12px', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={`mailto:?subject=${encodeURIComponent('Worth looking at: Process Surgery')}&body=${encodeURIComponent(`Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Process Surgery. They find the 20% of processes causing 80% of pain, eliminate unnecessary steps, and rebuild critical paths. Process that makes work easier, not just documented.\n\nTwo to four weeks, starts at £5,000.\n\nIf we talk to them next week, we could have results by ${typeof window !== 'undefined' ? new Date(Date.now() + (5 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '[DATE]'}.\n\nHere's the link: ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname + '#process-surgery' : 'https://prismaticalabs.com/services#process-surgery'}\n\nWorth a conversation?`)}`}
            title="Share with your team"
            style={{ color: '#666', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </a>
          <button
            onClick={() => setEnquiryModalOpen('process-surgery')}
            title="Enquire about this service"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666', display: 'flex', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </>
        )}

        <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Who Gets Special Terms</h3>

        <p><strong>B-Corps</strong> get 20% off because you're accountable to more than shareholders, and so are we. <strong>NGOs</strong> get 50% off or pro-bono for the right project, impact over income. <strong>Startups</strong> can do equity deals, we bet on futurists, not just futures.</p>

        <p>Limited spots monthly, as we balance impact work with commercial projects to keep both sustainable. No forms. No committees. Just tell us what you're building and why it matters.</p>

        <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>How This Works</h3>

        <p>Tell us the problem. We'll quote a fixed price and timeline. No surprises.</p>

        <p>Some fixes take two weeks. Some take two months. None take two years.</p>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The Test</h3>

        <p>If you want a study, hire someone else. If you want a solution, let's talk.</p>

        <Link href="/" className="cta-button red">Reach Out</Link>
      </section>

      {enquiryModalOpen && serviceConfig[enquiryModalOpen] && (
        <EnquiryModal
          serviceName={enquiryModalOpen}
          serviceDurationWeeks={serviceConfig[enquiryModalOpen].duration}
          basePrice={serviceConfig[enquiryModalOpen].price}
          onClose={() => setEnquiryModalOpen(null)}
        />
      )}

      {trademarkModalOpen && (
        <TrademarkModal onClose={() => setTrademarkModalOpen(false)} />
      )}
    </PageLayout>
  );
}

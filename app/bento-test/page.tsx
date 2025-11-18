'use client';

/**
 * BentoBox Component Test Page
 *
 * This page is for testing the BentoBox component in isolation.
 * Visit /bento-test to see the component rendered.
 *
 * DELETE THIS FILE after confirming the component works correctly.
 */

import { useState } from 'react';
import BentoBox from '@/components/BentoBox';

export default function BentoTestPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const getDeliveryDate = () => {
    return new Date(Date.now() + (10 * 7 * 24 * 60 * 60 * 1000))
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', marginBottom: '48px' }}>
        BentoBox Component Test
      </h1>

      <p style={{ marginBottom: '32px', color: '#666' }}>
        Testing the BentoBox component with all three variants. This page should be deleted after testing.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', marginTop: '48px' }}>
        Variant: Service (Default)
      </h2>

      <BentoBox
        variant="service"
        prompt="If your internal culture and external message feel misaligned..."
        title="Pioneers of Purpose Assessment"
        badge="Strategy"
        metadata={
          <>
            Eight weeks. Purpose architecture mapped across every system and touchpoint by{' '}
            <span className="delivery-date">{getDeliveryDate()}</span>.
          </>
        }
        price="From £50,000"
        shareEmail={{
          subject: 'Worth looking at: Pioneers of Purpose Assessment',
          body: `Hey,\n\nI came across this and thought it might help.\n\nIt's called Pioneers of Purpose - they dissect your business from its core reason to exist and cascade that purpose through every system and customer touchpoint.\n\nEight weeks, starts at £50,000.\n\nWorth a conversation?`
        }}
        onEnquire={() => {
          setModalOpen(true);
          console.log('Enquire clicked for pioneers-of-purpose');
        }}
      >
        <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          Most companies treat purpose like a poster on the wall. We treat it like the operating system.
          We dissect your business from its core reason to exist and cascade that purpose through every
          decision, system, and customer touchpoint. Inside-out authenticity that strengthens both internal
          culture and external message. Purpose as infrastructure, not inspiration.
        </p>
      </BentoBox>

      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', marginTop: '48px' }}>
        Variant: Link
      </h2>

      <BentoBox
        variant="link"
        prompt="If you're launching something new and can't afford to get it wrong..."
        title="Go-to-Market"
        badge="Marketing"
        metadata={
          <>
            Six weeks beats six months of "let's try this and see." Launch strategy ready by{' '}
            <span className="delivery-date">{getDeliveryDate()}</span>, budget intact.
          </>
        }
        price="From £15,000"
        shareEmail={{
          subject: 'Worth looking at: Go-to-Market Strategy',
          body: `Hey,\n\nI came across this go-to-market strategy service.\n\nThey map everything from positioning to channels to messaging to timeline.\n\nSix weeks, starts at £15,000.\n\nWorth a conversation?`
        }}
        onEnquire={() => {
          setModalOpen(true);
          console.log('Enquire clicked for go-to-market');
        }}
      >
        <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          Launch right the first time. We build your complete go-to-market strategy from positioning
          to channels to messaging to timeline. Who you're targeting, what you're saying, where you're
          saying it, and in what sequence. Everything mapped before you spend a pound on execution.
        </p>
      </BentoBox>

      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', marginTop: '48px' }}>
        Variant: Product
      </h2>

      <BentoBox
        variant="product"
        prompt="If you're saying yes to everything and achieving nothing..."
        title="The Focus Matrix"
        customFooter={
          <div>
            <p style={{ fontWeight: 600, fontSize: '17px', marginBottom: '0', color: '#222' }}>
              Turns "busy" into "lethal".
            </p>
            <p style={{ fontSize: '17px', color: '#666', marginTop: '4px' }}>
              Stop drowning. Start compounding.
            </p>
          </div>
        }
      >
        <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          Poker players calculate expected value on every bet. You should too. But for your hours, not your chips.
        </p>
        <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          This runs game theory on your entire calendar. EV vs. CV for every commitment. Accounts for global
          shifts that kill projects or create asymmetric opportunities. Shows you where to go all-in and what to fold.
        </p>
        <p style={{ marginBottom: '20px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          Your time is finite. Most people spend it on what screams loudest. This shows you where it compounds.
          Pushes to calendar. Shares the math with others so they understand your no's.
        </p>
      </BentoBox>

      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', marginTop: '48px' }}>
        Test: Navigation Card (Primary Variant)
      </h2>

      <BentoBox
        variant="link"
        title="Consulting Services"
        customFooter={
          <div>
            <p style={{ fontWeight: 600, fontSize: '17px', marginBottom: '4px', color: '#222' }}>
              We fix things. Then we leave.
            </p>
            <p style={{ fontSize: '17px', color: '#666', marginBottom: '16px' }}>
              No retainers. No dependency.
            </p>
            <a
              href="/solutions"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#D43225',
                color: '#ffffff',
                fontSize: '17px',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.3px',
              }}
            >
              Explore Services
            </a>
          </div>
        }
        style={{
          border: '1px solid #D43225',
          padding: '40px 32px',
        }}
      >
        <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          <strong>Some problems need custom work.</strong> Every consultancy, SaaS pitch deck, and agency
          website uses the same words. 'Transformation over transaction.' 'Strategic partnerships.' 'Solutions.'
          We won't.
        </p>
        <p style={{ marginBottom: '20px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          We work directly with you and adapt as the problem reveals itself. First call is diagnostic.
          If we're not finding new angles within 30 minutes, walk away.
        </p>
      </BentoBox>

      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', marginTop: '48px' }}>
        Test: Minimal Bento
      </h2>

      <BentoBox
        variant="link"
        title="Simple Title Only"
      >
        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
          Just a title and body content. No prompt, no badge, no footer.
        </p>
      </BentoBox>

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0' }} />

      <div style={{ padding: '32px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginTop: '48px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Testing Checklist</h3>
        <ul style={{ lineHeight: '1.8', color: '#444' }}>
          <li>✓ All three variants render correctly</li>
          <li>✓ Hover states work (scale on service/link, translateY on product)</li>
          <li>✓ Divider turns red on hover</li>
          <li>✓ Delivery date turns red on hover</li>
          <li>✓ Share links open mailto with correct subject/body</li>
          <li>✓ Enquire buttons trigger onClick handler</li>
          <li>✓ Typography matches spec (17px body, 15px CTAs, etc.)</li>
          <li>✓ Red accent bar appears on prompt lines (left: -20px, 3px width)</li>
          <li>✓ Badge styling correct (#f5f5f5 background, 10px font)</li>
          <li>✓ Custom footer works for navigation cards</li>
        </ul>
      </div>

      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '32px',
              borderRadius: '8px',
              maxWidth: '400px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: '16px' }}>Enquiry Modal Triggered</h3>
            <p style={{ marginBottom: '24px', color: '#666' }}>
              This confirms the onClick handler is working correctly.
            </p>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#D43225',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '48px', padding: '24px', backgroundColor: '#fffbea', borderRadius: '8px', border: '1px solid #f0e68c' }}>
        <p style={{ fontWeight: 600, marginBottom: '8px' }}>⚠️ Remember to delete this test page</p>
        <p style={{ fontSize: '17px', color: '#666' }}>
          This page is for testing only. Delete <code>/app/bento-test/page.tsx</code> when you're done.
        </p>
      </div>
    </div>
  );
}

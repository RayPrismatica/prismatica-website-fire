/**
 * BentoBox Component - Usage Examples
 *
 * This file demonstrates how to use the BentoBox component
 * to replace existing inline bento box implementations.
 *
 * DO NOT import this file in production code - it's for reference only.
 */

import BentoBox from './BentoBox';

// ============================================================================
// Example 1: Service Bento (High-tier service from consulting page)
// ============================================================================

export function ServiceBentoExample() {
  const getDeliveryDate = (serviceKey: string) => {
    // Your delivery date calculation logic
    return '15 March';
  };

  return (
    <BentoBox
      variant="service"
      prompt="If your internal culture and external message feel misaligned..."
      title="Pioneers of Purpose Assessment"
      badge="Strategy"
      metadata={
        <>
          Eight weeks. Purpose architecture mapped across every system and touchpoint by{' '}
          <span className="delivery-date">{getDeliveryDate('pioneers-of-purpose')}</span>.
        </>
      }
      price="From £50,000"
      shareEmail={{
        subject: 'Worth looking at: Pioneers of Purpose Assessment',
        body: `Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Pioneers of Purpose - they dissect your business from its core reason to exist and cascade that purpose through every system and customer touchpoint. Inside-out authenticity that actually strengthens both culture and message.\n\nEight weeks, starts at £50,000. They map purpose as operating system, not marketing tagline.\n\nWorth a conversation?`
      }}
      onEnquire={() => {
        // Open enquiry modal
        console.log('Opening enquiry modal for pioneers-of-purpose');
      }}
    >
      <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
        Most companies treat purpose like a poster on the wall. We treat it like the operating system.
        We dissect your business from its core reason to exist and cascade that purpose through every
        decision, system, and customer touchpoint. Inside-out authenticity that strengthens both internal
        culture and external message. Purpose as infrastructure, not inspiration.
      </p>
    </BentoBox>
  );
}

// ============================================================================
// Example 2: Bento Link (Lower-tier service from consulting page)
// ============================================================================

export function BentoLinkExample() {
  return (
    <BentoBox
      variant="link"
      prompt="If you're launching something new and can't afford to get it wrong..."
      title="Go-to-Market"
      badge="Marketing"
      metadata={
        <>
          Six weeks beats six months of "let's try this and see." Launch strategy ready by{' '}
          <span className="delivery-date">22 February</span>, budget intact.
        </>
      }
      price="From £15,000"
      shareEmail={{
        subject: 'Worth looking at: Go-to-Market Strategy',
        body: `Hey,\n\nI came across this and thought it might help.\n\nIt's a complete go-to-market strategy service. They map everything from positioning to channels to messaging to timeline. Who you're targeting, what you're saying, where, and when. Everything mapped before you spend a pound on execution.\n\nSix weeks, starts at £15,000.\n\nWorth a conversation?`
      }}
      onEnquire={() => {
        console.log('Opening enquiry for go-to-market');
      }}
    >
      <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
        Launch right the first time. We build your complete go-to-market strategy from positioning
        to channels to messaging to timeline. Who you're targeting, what you're saying, where you're
        saying it, and in what sequence. Everything mapped before you spend a pound on execution.
      </p>
    </BentoBox>
  );
}

// ============================================================================
// Example 3: Product Bento (Product page variant)
// ============================================================================

export function ProductBentoExample() {
  return (
    <BentoBox
      variant="product"
      prompt="If you're saying yes to everything and achieving nothing..."
      title="The Focus Matrix"
      customFooter={
        <div>
          <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '0', color: '#222' }}>
            Turns "busy" into "lethal".
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
            Stop drowning. Start compounding.
          </p>
        </div>
      }
    >
      <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
        Poker players calculate expected value on every bet. You should too. But for your hours, not your chips.
      </p>
      <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
        This runs game theory on your entire calendar. EV vs. CV for every commitment. Accounts for global
        shifts that kill projects or create asymmetric opportunities. Shows you where to go all-in and what to fold.
      </p>
      <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
        Your time is finite. Most people spend it on what screams loudest. This shows you where it compounds.
        Pushes to calendar. Shares the math with others so they understand your no's.
      </p>
    </BentoBox>
  );
}

// ============================================================================
// Example 4: With Dynamic Content Component
// ============================================================================

export function DynamicContentExample({ dynamicContent }: { dynamicContent?: string }) {
  return (
    <BentoBox
      variant="service"
      prompt="If you have insights but struggle to execute them systematically..."
      title="The ESI Framework"
      badge="Strategy"
      metadata="Six weeks. Roadmap delivered by 1 April."
      price="From £40,000"
      onEnquire={() => console.log('Enquiry for ESI Framework')}
    >
      <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
        {dynamicContent || 'Fallback content if dynamic content fails to load...'}
      </p>
    </BentoBox>
  );
}

// ============================================================================
// Example 5: Navigation/Link Bento (from /what page)
// ============================================================================

export function NavigationBentoExample() {
  return (
    <BentoBox
      variant="link"
      title="Consulting Services"
      price="We fix things. Then we leave."
      customFooter={
        <div>
          <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px', color: '#222' }}>
            We fix things. Then we leave.
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            No retainers. No dependency.
          </p>
          <a
            href="/consulting"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#D43225',
              color: '#ffffff',
              fontSize: '15px',
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
        border: '1px solid #D43225', // Primary emphasis
        padding: '40px 32px', // Slightly more padding for emphasis
      }}
    >
      <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
        <strong>Some problems need custom work.</strong> Every consultancy, SaaS pitch deck, and agency
        website uses the same words. 'Transformation over transaction.' 'Strategic partnerships.' 'Solutions.'
        We won't.
      </p>
      <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
        We work directly with you and adapt as the problem reveals itself. First call is diagnostic.
        If we're not finding new angles within 30 minutes, walk away.
      </p>
    </BentoBox>
  );
}

// ============================================================================
// Example 6: Minimal Bento (title and body only)
// ============================================================================

export function MinimalBentoExample() {
  return (
    <BentoBox
      title="Simple Title"
      variant="link"
    >
      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
        Just a title and body content. No prompt, no badge, no footer.
      </p>
    </BentoBox>
  );
}

// ============================================================================
// Migration Guide: Before → After
// ============================================================================

/*

BEFORE (from EngagementClient.tsx):
=====================================

<div
  className="service-bento"
  style={{
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    marginBottom: '24px',
    transition: 'transform 0.3s ease'
  }}
>
  <p style={{ position: 'relative', fontSize: '16px', marginBottom: '16px' }}>
    <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
    If your internal culture and external message feel misaligned...
  </p>

  <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#222', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
    Pioneers of Purpose Assessment
    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', padding: '4px 8px', background: '#f5f5f5', color: '#666', borderRadius: '4px', textTransform: 'uppercase' }}>Strategy</span>
  </h3>

  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    <DynamicServiceDescription content={serviceDescription} />
  </p>

  <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
    Eight weeks. Purpose architecture mapped across every system and touchpoint by <span className="delivery-date">{getDeliveryDate('pioneers-of-purpose')}</span>.
  </p>

  <div className="cta-divider" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', transition: 'border-color 0.3s ease' }}>
    <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '12px', color: '#222' }}>From £50,000</p>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <a href={...} className="service-cta-link" style={...}>Share</a>
      <span style={{ color: '#e0e0e0' }}>·</span>
      <button className="service-cta-btn" style={...} onClick={...}>Enquire</button>
    </div>
  </div>
</div>


AFTER (using BentoBox component):
==================================

<BentoBox
  variant="service"
  prompt="If your internal culture and external message feel misaligned..."
  title="Pioneers of Purpose Assessment"
  badge="Strategy"
  metadata={
    <>
      Eight weeks. Purpose architecture mapped across every system and touchpoint by{' '}
      <span className="delivery-date">{getDeliveryDate('pioneers-of-purpose')}</span>.
    </>
  }
  price="From £50,000"
  shareEmail={{
    subject: 'Worth looking at: Pioneers of Purpose Assessment',
    body: `...full email body...`
  }}
  onEnquire={() => setEnquiryModalOpen('pioneers-of-purpose')}
>
  <DynamicServiceDescription content={serviceDescription} />
</BentoBox>


REDUCTION:
==========
- From ~50 lines → 18 lines
- From 800+ characters → 350 characters
- 100% type-safe with TypeScript
- All styling handled by component
- Hover states automatic
- Consistent spacing/sizing guaranteed

*/

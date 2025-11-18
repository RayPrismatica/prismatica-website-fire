'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ProductsEnquiryModal from '@/components/ProductsEnquiryModal';
import { BentoBoxFromContent } from '@/components/BentoBox';

// Import JSON content files
import focusMatrixContent from '@/components/BentoBox/content/focus-matrix.json';
import sirAlfieContent from '@/components/BentoBox/content/sir-alfie.json';
import valueChannelContent from '@/components/BentoBox/content/value-channel-matrix.json';

// Import as any to avoid TypeScript issues with JSON imports
const focusMatrix = focusMatrixContent as any;
const sirAlfie = sirAlfieContent as any;
const valueChannel = valueChannelContent as any;

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageLayout>
      <section id="products" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}><span style={{ borderBottom: '4px solid #D43225' }}>PRODUCT</span> SUITE</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>Most product pages show you what's coming. Launch dates. Beta programs. Waitlists. They're selling you on waiting.</p>

        <p>This isn't that.</p>

        <p><strong>We built these products because we needed them. Then our friends wanted a go. Then people started asking how much. Hold on. We're all having the same problems.</strong></p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          The world uses humans to make tech better. We use tech to make being human better.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The Method</h3>

        <p>You know the old saying. Give a man a fish, feed him for a day. Teach a man to fish, feed him for life.</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          This is different. This is <em>send a guy who knows how to fish and will stick around</em>.
        </p>

        <p>We've taken consulting methods, global business wisdom, and proven tactics (the stuff that costs £50k in a workshop) and embedded them into multi-layered system prompts and code. Not surface-level AI wrappers. Deep methodology that reasons through your specific situation.</p>

        <p><strong>25+ live products. New ones launching monthly. Strategic thinking codified into tools ranging from consulting frameworks to AI advisors. Some you'll use every day. Some ten minutes a month.</strong></p>

        <p>Three examples:</p>

        <div style={{ marginTop: '32px', marginBottom: '32px' }}>

          {/* Products - Content-Driven BentoBox (from JSON files) */}
          <BentoBoxFromContent content={focusMatrix} />
          <BentoBoxFromContent content={sirAlfie} />
          <BentoBoxFromContent content={valueChannel} />

        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Or just keep using your basic ChatGPT subscription for random LinkedIn posts. That's also fine. Your potential, your choice.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Real Constraints</h3>

        <p>Most products say they're 'exclusive' to sound premium. That's not this.</p>

        <p><strong>We filter access because selling the same advantage to competing firms destroys the advantage. If every law firm in London has the same tools, nobody has an edge. That's not strategy. That's just noise at scale.</strong></p>

        <p>Tell us your industry, your challenge, your region. We'll tell you if there's capacity. We cap based on market saturation.</p>

        <p>Real constraints, not manufactured scarcity.</p>

        <p>Active monthly usage required (minimum 25 interactions). We're not building for max scale. We're building for max impact. The products get better when real users push them hard.</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          You get tools that compound. We get feedback that matters. That's the deal.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>How pricing works</h3>

        <p><strong>£299/month per seat gets you access to all 25+ products. API costs are separate and fully under your control.</strong></p>

        <p>Every product uses AI models. You choose which model for each task. Faster models cost less. Smarter models cost more. Simple tasks use cheap models. Complex problems use expensive ones. You decide the quality/cost trade-off.</p>

        <p>API credits work like phone minutes. Buy what you need. Use what you want. Track everything in real-time. Most users spend £50-200/month depending on usage intensity and model choices. Heavy strategic work might hit £500/month.</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          You're always in control.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>We're not doing beta programs or waitlists. If these tools solve problems you're actually facing, let's talk about how they apply to what you're building.</p>

        <button
          onClick={() => setModalOpen(true)}
          className="products-cta-button"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: '#D43225',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '17px',
            letterSpacing: '0.3px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(212, 50, 37, 0.2)',
            marginTop: '8px',
            transform: 'translateY(0)'
          }}
        >
          Check Capacity
        </button>

        {modalOpen && <ProductsEnquiryModal onClose={() => setModalOpen(false)} />}
        </div>
      </section>
    </PageLayout>
  );
}

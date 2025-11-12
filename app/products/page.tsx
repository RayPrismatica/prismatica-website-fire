'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ProductsEnquiryModal from '@/components/ProductsEnquiryModal';

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageLayout>
      <section id="products" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>PRODUCT SUITE</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>Most product pages show you what's coming. Launch dates. Beta programs. Waitlists. They're selling you on waiting.</p>

        <p>This isn't that.</p>

        <p>We built these because we needed them. Then our friends wanted a go. Then people started asking how much. Hold on. We're all having the same problems.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>The world uses humans to make tech better. We use tech to make being human better.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>You know the old saying. Give a man a fish, feed him for a day. Teach a man to fish, feed him for life.</p>

        <p>This is different. This is send a guy who knows how to fish and will just stick around.</p>

        <p>We've taken consulting methods, global business wisdom, and proven tactics (the stuff that costs £50k in a workshop) and embedded them into multi-layered system prompts and code. Not surface-level AI wrappers. Deep methodology that reasons through your specific situation.</p>

        <p>25+ live products. New ones launching monthly. Strategic thinking codified into tools ranging from consulting frameworks to AI advisors. Some you'll use every day. Some ten minutes a month. Three examples:</p>

        <div style={{ marginTop: '32px', marginBottom: '32px' }}>
          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '24px',
            borderLeft: '3px solid #D43225',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px',
              letterSpacing: '0.5px'
            }}>
              The Focus Matrix
            </h4>
            <p>Poker players calculate expected value on every bet. You should too. But for your hours, not your chips.</p>
            <p style={{ marginTop: '12px' }}>This runs game theory on your entire calendar. EV vs. CV for every commitment. Accounts for global shifts that kill projects or create asymmetric opportunities. Shows you where to go all-in and what to fold.</p>
            <p style={{ marginTop: '12px' }}>Your time is finite. Most people spend it on what screams loudest. This shows you where it compounds. Pushes to calendar. Shares the math with others so they understand your no's.</p>
          </div>

          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '24px',
            borderLeft: '3px solid #EA9336',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px',
              letterSpacing: '0.5px'
            }}>
              Sir Alfie
            </h4>
            <p>Most CRMs are graveyards. Data sitting still. Sir Alfie is hunting.</p>
            <p style={{ marginTop: '12px' }}>Agents browse the internet for real opportunities. Build GTM strategy based on your objectives and constraints. Dashboard shows value drops at every conversion step. Dynamic tactic shifts when the numbers move. Strategy reassessment based on what's actually working.</p>
            <p style={{ marginTop: '12px' }}>Maximum human in the loop. Maximum heavy lifting. You make the calls. It gives you superhuman pattern recognition and does the impossible parts. Being the human inside this thing feels like having an unfair advantage.</p>
          </div>

          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '24px',
            borderLeft: '3px solid #10B981',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px',
              letterSpacing: '0.5px'
            }}>
              Value Channel Matrix
            </h4>
            <p>Value is the cast iron that forms between what's given and what's received. That's what makes deals strong. That's what scales.</p>
            <p style={{ marginTop: '12px' }}>This maps every channel in the exchange. Tangible and intangible forces. Customer psychology from Maslow to Jung. What particles actually move people. Makes sure whoever takes the hardest step forward gets more than they put in. 10% more? Good. 30% more? They'll never leave you.</p>
            <p style={{ marginTop: '12px' }}>Offering architecture they can't refuse. Overdelivery by design. This isn't marketing tactics. This is value engineering.</p>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Or just keep using your basic ChatGPT subscription for random LinkedIn posts. That's also fine. Your potential, your choice.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Most products say they're 'exclusive' to sound premium. That's not this.</p>

        <p>We filter access because selling the same advantage to competing firms destroys the advantage. If every law firm in London has the same tools, nobody has an edge. That's not strategy. That's just noise at scale.</p>

        <p>Tell us your industry, your challenge, your region. We'll tell you if there's capacity. We cap based on market saturation. Real constraints, not manufactured scarcity.</p>

        <p>Active monthly usage required (minimum 25 interactions). We're not building for max scale. We're building for max impact. The products get better when real users push them hard. You get tools that compound. We get feedback that matters. That's the deal.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>How pricing works</p>

        <p>£299/month per seat gets you access to all 25+ products. API costs are separate and fully under your control.</p>

        <p>Every product uses AI models. You choose which model for each task. Faster models cost less. Smarter models cost more. Simple tasks use cheap models. Complex problems use expensive ones. You decide the quality/cost trade-off.</p>

        <p>API credits work like phone minutes. Buy what you need. Use what you want. Track everything in real-time. Most users spend £50-200/month depending on usage intensity and model choices. Heavy strategic work might hit £500/month. You're always in control.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>We're not doing beta programs or waitlists. If these tools solve problems you're actually facing, let's talk about how they apply to what you're building.</p>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: '#D43225',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '15px',
            letterSpacing: '0.3px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(212, 50, 37, 0.2)',
            marginTop: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#B82919';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 50, 37, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D43225';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 50, 37, 0.2)';
          }}
        >
          Check Capacity
        </button>

        <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginTop: '16px', marginBottom: '32px' }}>
          Noticed this is red? Same reason as the contact page button. <span style={{ color: '#D43225' }}>Red draws the eye.</span> We promised no tricks, so here's one we used twice: big red button right when you're deciding. If it made you want to click, good. You already decided. We just made it easier.
        </p>

        {modalOpen && <ProductsEnquiryModal onClose={() => setModalOpen(false)} />}
      </section>
    </PageLayout>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { BentoBoxFromContent, ConsultingBentoProvider } from '@/components/BentoBox';

// Import all consulting service JSON files
import pioneersContent from '@/components/BentoBox/content/pioneers-of-purpose.json';
import esiContent from '@/components/BentoBox/content/esi-framework.json';
import secretAgencyContent from '@/components/BentoBox/content/secret-agency.json';
import transactionContent from '@/components/BentoBox/content/transaction-architecture.json';
import ksoContent from '@/components/BentoBox/content/kso-workshop.json';
import triptychContent from '@/components/BentoBox/content/strategic-triptych.json';
import gtmContent from '@/components/BentoBox/content/go-to-market.json';
import creativeContent from '@/components/BentoBox/content/creative-converts.json';
import designContent from '@/components/BentoBox/content/design-thinking.json';
import aiContent from '@/components/BentoBox/content/ai-without-hallucination.json';
import processContent from '@/components/BentoBox/content/process-surgery.json';
import marketingContent from '@/components/BentoBox/content/marketing-reality-check.json';

// Cast to any to avoid TypeScript issues
const pioneers = pioneersContent as any;
const esi = esiContent as any;
const secretAgency = secretAgencyContent as any;
const transaction = transactionContent as any;
const kso = ksoContent as any;
const triptych = triptychContent as any;
const gtm = gtmContent as any;
const creative = creativeContent as any;
const design = designContent as any;
const ai = aiContent as any;
const process = processContent as any;
const marketing = marketingContent as any;

export default function ConsultingPage() {
  // Array of all bentos for the provider
  const bentos = [
    pioneers, esi, secretAgency, transaction, kso, triptych,
    gtm, creative, design, ai, process, marketing
  ];

  return (
    <PageLayout>
      <ConsultingBentoProvider bentos={bentos}>
        {({ dynamicContent, functionRegistry, onEnquire }) => (
          <section id="consulting" className="section active">
            <div style={{ maxWidth: '700px' }}>
              <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}>
                <span style={{ borderBottom: '4px solid #D43225' }}>CONSULTING</span> SERVICES
              </h2>

              <p>We fix things. Then we leave.</p>

              <p>Most consultants optimise for retention. We optimise for resolution.</p>

              <p><strong>No retainers. No dependency. Every engagement has an end date.</strong></p>

              <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

              <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>
                The Big Picture
              </h3>

              {/* Big Picture Services - £40k-50k */}
              <BentoBoxFromContent content={pioneers} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={esi} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={secretAgency} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />

              {/* Mid-tier Services - £18k-25k */}
              <BentoBoxFromContent content={transaction} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={kso} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={triptych} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />

              <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>
                Tactical Steps Forward
              </h3>

              {/* Tactical Services - £8k-15k */}
              <BentoBoxFromContent content={gtm} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={creative} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={design} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={ai} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={process} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />
              <BentoBoxFromContent content={marketing} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={onEnquire} />

              <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

              <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>
                Who Gets Special Terms
              </h3>

              <p><strong>B-Corps</strong> get 20% off because you're accountable to more than shareholders, and so are we. <strong>NGOs</strong> get 50% off or pro-bono for the right project, impact over income. <strong>Startups</strong> can do equity deals, we bet on futurists, not just futures.</p>

              <p>Limited spots monthly, as we balance impact work with commercial projects to keep both sustainable. No forms. No committees. Just tell us what you're building and why it matters.</p>

              <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

              <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>
                How This Works
              </h3>

              <p>Tell us the problem. We'll quote a fixed price and timeline. No surprises.</p>

              <p>Some fixes take two weeks. Some take two months. None take two years.</p>

              <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>
                The Test
              </h3>

              <p>If you want a study, hire someone else. If you want a solution...</p>

              <Link
                href="/contact"
                className="what-cta-button"
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
                  marginTop: '48px'
                }}
              >
                Reach Out
              </Link>
            </div>
          </section>
        )}
      </ConsultingBentoProvider>
    </PageLayout>
  );
}

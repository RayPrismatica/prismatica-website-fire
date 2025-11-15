import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout>
      <section id="terms" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}>TERMS OF <span style={{ borderBottom: '4px solid #D43225' }}>SERVICE</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p style={{ fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Last updated: January 2025</p>

        <p>These are the rules. Read them before you use our services.</p>

        <p>Using our products or services means you agree to these terms. If you don't agree, don't use them.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>What we offer</h3>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Product Suite</h4>
        <p>Access to 25+ strategic thinking tools. AI-powered. Built for real business problems. Subscription-based. You pay monthly. You get access to everything.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Direct Engagement</h4>
        <p>Custom consulting work. Fixed-price projects. Starting at £5,000. Terms agreed case by case before we start.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Free stuff</h4>
        <p>Athena (the AI chat), the website, articles. These come with no guarantees. Use at your own risk.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Product Suite Terms</h3>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Pricing</h4>
        <p>£299/month per seat for yearly subscriptions. API costs are separate. You control API usage. Most users spend £50-200/month on API costs. Heavy usage can hit £500/month. You're responsible for all API charges.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Trial Period</h4>
        <p>30 days. If it doesn't work for you, email us within 30 days. We'll refund the subscription fee. API costs are non-refundable (you used the service, you pay for compute).</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Usage Requirements</h4>
        <p>Minimum 25 meaningful interactions per month. We're not building a product for tire-kickers. If you don't use it, we'll terminate your access and refund the remaining period.</p>

        <p style={{ marginTop: '16px' }}>What counts as meaningful? Actually using the tools to solve problems. Not logging in once to look around. We track usage. It's obvious when someone's engaged vs. when they forgot they have an account.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Capacity Limits</h4>
        <p>We limit how many clients we take per industry and region. Why? If every competitor in your market has the same tools, nobody has an advantage. We assess fit before onboarding. We might say no if your space is saturated.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>What You Can't Do</h4>
        <p>• Resell access to others<br/>
        • Reverse engineer the products<br/>
        • Use the tools to build competing products<br/>
        • Share your login credentials<br/>
        • Scrape or download our prompts/methodology in bulk<br/>
        • Use output to train AI models<br/>
        • Violate laws, obviously</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Termination</h4>
        <p>Either of us can end this. You can cancel anytime (no penalties after trial). We can terminate if you breach these terms, don't meet usage minimums, or if we're shutting down. If we terminate without cause, we'll refund the unused portion of your subscription.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Your Data and IP</h3>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Your Work</h4>
        <p>Anything you create using our tools is yours. We don't claim ownership. We don't train models on your data. Your strategies stay your strategies.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Our IP</h4>
        <p>The products, methodologies, prompts, frameworks—all ours. You get a license to use them. You don't get to copy them.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>Confidentiality</h4>
        <p>We won't share what you're working on. You don't share how our tools work. Mutual respect.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Liability</h3>

        <p>We provide tools. You make decisions. We're not responsible for:</p>

        <p style={{ marginTop: '16px' }}>• Business outcomes based on our products<br/>
        • Decisions you make using our tools<br/>
        • Third-party service failures (Anthropic, Vercel, etc.)<br/>
        • Data loss (back up important work)<br/>
        • Downtime or bugs (we'll fix them, but shit happens)</p>

        <p style={{ marginTop: '24px' }}><strong>Our maximum liability to you is the amount you paid us in the last 12 months.</strong> That's it. We're not covering your lost revenue or consequential damages.</p>

        <p style={{ marginTop: '24px' }}>Some jurisdictions don't allow these limitations. If you're in one, the minimum allowed by law applies.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Service Availability</h3>

        <p>We aim for high uptime. We can't guarantee 100%. Things break. APIs go down. We don't offer SLAs at this pricing tier.</p>

        <p style={{ marginTop: '16px' }}>If there's extended downtime (more than 48 hours), we'll credit your account proportionally. But we're not paying damages.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Payment Terms</h3>

        <p>Subscriptions are billed monthly or yearly (depending on plan). Payment via Stripe. If payment fails, we'll try once more. If it fails again, your access gets suspended.</p>

        <p style={{ marginTop: '16px' }}>Prices can change. We'll give you 30 days notice. If you don't like the new price, cancel before it takes effect.</p>

        <p style={{ marginTop: '16px' }}>No refunds except during the trial period or if we screw up significantly.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Changes to These Terms</h3>

        <p>We might update these. When we do, we'll update the date at the top and email active clients. Major changes get 30 days notice.</p>

        <p style={{ marginTop: '16px' }}>Keep using the service after changes? You've accepted the new terms.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Governing Law</h3>

        <p>These terms are governed by the laws of England and Wales. Disputes go to UK courts.</p>

        <p style={{ marginTop: '16px' }}>If we end up in a legal fight, we'll try mediation first. If that fails, courts.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Contact</h3>

        <p>Questions about these terms? Email: <a href="mailto:legal@prismaticalab.com" style={{ color: '#D43225', textDecoration: 'none', borderBottom: '1px solid #D43225' }}>legal@prismaticalab.com</a></p>

        <p style={{ marginTop: '24px' }}>Prismatica Labs Limited<br/>
        Company Number: 15595850<br/>
        Registered Office: 48 Pembroke Road, London, England, W8 6NU</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <Link
          href="/"
          className="terms-cta-button"
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
          Back to Home
        </Link>
        </div>
      </section>
    </PageLayout>
  );
}

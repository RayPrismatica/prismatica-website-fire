import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout>
      <section id="privacy" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}>PRIVACY <span style={{ borderBottom: '4px solid #D43225' }}>POLICY</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p style={{ fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Last updated: January 2025</p>

        <p>Most privacy policies are written by lawyers for lawyers. This one's written for humans.</p>

        <p>We collect data. We process it. We protect it. Here's what actually happens.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>What we collect</h3>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>When you use Athena (our AI chat)</h4>
        <p>Everything you type goes to Anthropic's Claude API. That's how AI works. Your questions, our responses, the full conversation. Anthropic processes it according to their terms. We don't store chat logs on our servers. When you close the chat, it's gone from our side.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>When you contact us</h4>
        <p>Email address, name, whatever context you provide. We store this in our email system (Google Workspace). We use it to respond to you. That's it.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>When you enquire about products</h4>
        <p>Name, email, company, what you're trying to solve. Same as above. Stored in email. Used to assess fit and respond.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>When you become a client</h4>
        <p>Payment details (processed by Stripe, we never see your full card number), usage data (what products you use, how often, API consumption), any work you create in the tools.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '24px' }}>What we don't collect</h4>
        <p>We don't use analytics trackers. No Google Analytics. No Facebook Pixel. No tracking cookies. We don't sell data. We don't share it with advertisers. We're not in the data business.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>How we use it</h3>

        <p>We use your data to:</p>
        <p>• Respond to your enquiries<br/>
        • Provide the services you paid for<br/>
        • Improve our products based on usage patterns<br/>
        • Send service updates (downtime, new features, billing issues)<br/>
        • Enforce our terms (usage requirements, capacity limits)</p>

        <p style={{ marginTop: '24px' }}>We don't use your data to:</p>
        <p>• Train AI models (your work stays yours)<br/>
        • Market to you endlessly (we'll email about service stuff, not sales)<br/>
        • Build profiles for advertising<br/>
        • Sell to third parties</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Who sees it</h3>

        <p>Your data lives in three places:</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '24px', marginBottom: '8px' }}>Our team</h4>
        <p>The people who need to see it to help you. Support requests, account issues, product feedback.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '24px', marginBottom: '8px' }}>Service providers</h4>
        <p>• Anthropic (Claude API for Athena and product tools)<br/>
        • Google (email hosting)<br/>
        • Stripe (payment processing)<br/>
        • Vercel (hosting infrastructure)</p>

        <p style={{ marginTop: '16px' }}>These companies have their own privacy policies. We chose them because they're serious about security. But read their terms if you want to know what they do.</p>

        <h4 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '24px', marginBottom: '8px' }}>Nobody else</h4>
        <p>We don't sell data. We don't trade it. We don't give it to marketing platforms. If law enforcement shows up with a valid warrant, we'll comply. Otherwise, your data stays with us.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>How long we keep it</h3>

        <p>• Contact enquiries: Until we respond, then archived. Deleted after 2 years unless you become a client.<br/>
        • Active client data: As long as you're a client, plus 7 years for accounting/legal requirements.<br/>
        • Usage logs: 90 days for debugging, then deleted.<br/>
        • Chat with Athena: Not stored on our servers. Anthropic's retention policies apply.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Your rights (GDPR)</h3>

        <p>If you're in the EU/UK, you have rights:</p>

        <p style={{ marginTop: '24px' }}>• <strong>Access:</strong> Ask what data we have on you. We'll send it within 30 days.<br/>
        • <strong>Correction:</strong> Wrong email? Outdated info? Tell us. We'll fix it.<br/>
        • <strong>Deletion:</strong> Want us to delete everything? We will, except what we legally must keep.<br/>
        • <strong>Portability:</strong> Want your data in a usable format? We'll export it.<br/>
        • <strong>Object:</strong> Don't want us processing your data for a specific purpose? Say so.<br/>
        • <strong>Complain:</strong> Think we're breaking the rules? Contact your data protection authority.</p>

        <p style={{ marginTop: '24px' }}>To exercise these rights, email: <a href="mailto:privacy@prismaticalab.com" style={{ color: '#D43225', textDecoration: 'none', borderBottom: '1px solid #D43225' }}>privacy@prismaticalab.com</a></p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Security</h3>

        <p>We use industry-standard security:</p>

        <p style={{ marginTop: '16px' }}>• HTTPS everywhere (encrypted connections)<br/>
        • Secure hosting infrastructure (Vercel)<br/>
        • API keys rotated regularly<br/>
        • Access controls (only authorized team members see client data)<br/>
        • Regular security audits</p>

        <p style={{ marginTop: '24px' }}>Perfect security doesn't exist. If something goes wrong, we'll tell you immediately.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Changes to this policy</h3>

        <p>We might update this. When we do, we'll change the date at the top. Major changes? We'll email active clients.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Questions?</h3>

        <p>Email: <a href="mailto:privacy@prismaticalab.com" style={{ color: '#D43225', textDecoration: 'none', borderBottom: '1px solid #D43225' }}>privacy@prismaticalab.com</a></p>

        <p style={{ marginTop: '24px' }}>Prismatica Labs Limited<br/>
        Company Number: 15595850<br/>
        Registered Office: 48 Pembroke Road, London, England, W8 6NU</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <Link
          href="/"
          className="privacy-cta-button"
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

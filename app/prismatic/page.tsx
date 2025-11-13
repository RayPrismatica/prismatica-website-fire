import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ModelNav from '@/components/ModelNav';

export default function PrismaticPage() {
  return (
    <PageLayout>
      <section id="parallels" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>MENTAL <span style={{ borderBottom: '4px solid #D43225' }}>MODELS</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <ModelNav currentModel="prismatic" />

        <p>Every industry thinks it's special. None of them are.</p>

        <p>Nightclubs and enterprise sales are both gatekeeping. Museums and Netflix are both attention retention. Airports and emergency rooms are both triage under constraints.</p>

        <p>See structure, not surface, and solutions transfer instantly.</p>

        <h3>The Reversal</h3>
        <p>Companies search for solutions within their own walls. Same industry. Same competitors. Same reference points.</p>

        <p>This creates an innovation ceiling. You can't see solutions that don't exist in your frame of reference.</p>

        <p>The breakthrough moments come from adjacent spaces. Different industries solving similar problems. Different contexts revealing universal patterns.</p>

        <h3>Pattern Recognition</h3>
        <p>Tokyo's railway engineers couldn't optimize their network. Then they looked at slime mold.</p>

        <p>This brainless organism creates incredibly efficient networks when searching for food. They placed oat flakes in the pattern of Tokyo's major stations. The slime mold's network was more efficient than decades of human engineering.</p>

        <p>Larry Page didn't build search by studying search engines. He recognized that academic citations were essentially hyperlinks. The same mechanism that ranked academic authority could rank web pages.</p>

        <p>The answers exist. Just not where you're looking.</p>

        <h3>The Translation Layer</h3>
        <p>Finding parallels is one skill. Translating them is another.</p>

        <p>Most cross-industry insights fail in translation. The mechanism works in one context but breaks in another because the underlying conditions differ.</p>

        <p>Smart translation requires understanding why something works, not just what works. F1 pit crews transformed hospital surgery protocols. Disney's queue management revolutionized airport security. Netflix's recommendation engine reshaped retail inventory.</p>

        <p>None of these connections are obvious. Until they are.</p>

        <h3>What Changes</h3>
        <p>Stop asking "what are our competitors doing?" Start asking "who else has solved this class of problem?"</p>

        <p>Your real competitors aren't in your industry. They're whoever solves your type of problem better, regardless of domain.</p>

        <p>A luxury brand's scarcity strategy might solve a SaaS pricing problem. A military's logistics framework might transform a supply chain. A gaming company's retention mechanics might fix fintech churn.</p>

        <p>The competitive landscape expands infinitely when you stop looking at surfaces and start seeing structures.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to find solutions where your competitors aren't looking?</p>

        <Link href="/contact" className="cta-button red">Let's Talk</Link>
      </section>
    </PageLayout>
  );
}

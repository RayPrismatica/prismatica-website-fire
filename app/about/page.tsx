'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { Dialog, Transition } from '@headlessui/react';
import EmailButton from '@/components/EmailButton';

// Import mental model JSON files
import demandModel from '@/components/BentoBox/content/demand-model.json';
import incentivesModel from '@/components/BentoBox/content/incentives-model.json';
import agenticModel from '@/components/BentoBox/content/agentic-model.json';
import prismaticModel from '@/components/BentoBox/content/prismatic-model.json';
import triptychModel from '@/components/BentoBox/content/triptych-model.json';
import { BentoBoxFromContent } from '@/components/BentoBox';

// Cast to any to avoid TypeScript issues
const demand = demandModel as any;
const incentives = incentivesModel as any;
const agentic = agenticModel as any;
const prismatic = prismaticModel as any;
const triptych = triptychModel as any;

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Email setup
  const emailSubject = "Let's talk";
  const emailBody = `Hi,

I came across your site. I want to talk about [YOUR CHALLENGE HERE].

Best,
[Your name]`;

  const mailtoLink = `mailto:hello@prismaticalab.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const openModal = (briefId: string) => {
    setActiveModal(briefId);
  };

  const briefs: { [key: string]: { title: string; category: string; problem: string; howWeSawIt: string; result: string } } = {
    'warehouse': {
      title: 'The Warehouse That Wasn\'t',
      category: 'Supply Chain Diagnostics',
      problem: 'A logistics company was losing money. Everyone blamed the warehouse. "Too slow, too many mistakes, too expensive."',
      howWeSawIt: 'We watched the warehouse for three days. It wasn\'t slow. It was waiting. Orders arrived in bursts. Staff stood idle, then got slammed. The problem wasn\'t the warehouse. It was upstream.\n\nPoor demand forecasting created chaos. The warehouse was just where the chaos became visible.',
      result: 'Fixed forecasting. Smoothed order flow. Warehouse performance improved 40% without hiring anyone or changing a single process.\n\nThe bottleneck wasn\'t where everyone was looking.'
    },
    'search': {
      title: 'The Search Nobody Needed',
      category: 'Product Strategy',
      problem: 'A SaaS company had feature requests stacking up. "Better search" was at the top. Six months of dev time estimated. Significant cost.',
      howWeSawIt: 'We asked why users needed better search. Turns out they didn\'t. They needed better organisation. They were searching because they couldn\'t find things. Different problem entirely.\n\nSearch would have made a broken system slightly more tolerable. We solved the actual problem instead.',
      result: 'Redesigned information architecture in two weeks. Search volume dropped 60%. User satisfaction went up. Saved six months of development time and built something that actually worked.\n\nSometimes the feature request is a symptom, not the cure.'
    },
    'push-pull': {
      title: 'From Push to Pull',
      category: 'Market Positioning',
      problem: 'A B2B service was spending heavily on outbound sales. High effort, low conversion. "Our market doesn\'t understand what we do."',
      howWeSawIt: 'The market understood fine. They just didn\'t care yet. The company was pushing a solution before prospects felt the problem.\n\nWe shifted strategy: make the problem visible first. Then let prospects come to them.',
      result: 'Built a diagnostic tool that showed companies where they were losing money. Didn\'t sell anything. Just made the problem impossible to ignore.\n\nInbound requests tripled. Sales cycle shortened by half. Same product. Different approach.'
    },
    'bottleneck': {
      title: 'The Misdiagnosed Bottleneck',
      category: 'Operational Efficiency',
      problem: 'A manufacturing company had a "slow approval process." Projects stalled waiting for sign-off. Frustration everywhere.',
      howWeSawIt: 'Approvals weren\'t slow. They were being asked to approve things that weren\'t ready. Incomplete briefs, unclear requirements, missing data.\n\nThe approval step was where poor preparation became visible. Fixing "the approval process" would have made it faster to approve bad work.',
      result: 'Implemented a pre-approval checklist. Nothing reached approval until it met minimum standards. Approvals got faster because the work got better.\n\nThe bottleneck wasn\'t the gate. It was everything before it.'
    },
    'canyon': {
      title: 'The £15K Canyon',
      category: 'Customer Experience',
      problem: 'A professional services firm had high consultation show-up rates but low conversion to paid work. "People like talking to us but won\'t commit."',
      howWeSawIt: 'The consultation was free. The next step was £15K. That\'s not a gap. That\'s a canyon.\n\nProspects liked the conversation but couldn\'t justify the jump. They needed a middle step. Something that proved value before the big commitment.',
      result: 'Created a £2K diagnostic engagement. Small enough to say yes to. Valuable enough to demonstrate capability. Converted 60% of diagnostics to full projects.\n\nRemoved the existential leap. Built a bridge instead.'
    },
    'platform': {
      title: 'From Retail to Platform',
      category: 'Business Model Evolution',
      problem: 'A specialised retailer was competing on price and losing. "Amazon has everything cheaper. How do we compete?"',
      howWeSawIt: 'They couldn\'t compete on price. But they had something Amazon didn\'t: expertise. Their customers were enthusiasts who valued knowledge, not just products.\n\nWe saw an opportunity to stop selling things and start enabling people.',
      result: 'Transformed from retailer to platform. Added forums, guides, expert Q&A. Products became tools within a knowledge ecosystem.\n\nRevenue shifted from margin on goods to platform subscriptions. Customer lifetime value tripled. Amazon became irrelevant to their model.'
    },
    'music': {
      title: 'Classical Music for Running',
      category: 'Brand Positioning',
      problem: 'A classical musician was incredibly talented but unknown. "Nobody cares about classical music anymore."',
      howWeSawIt: 'Classical music hadn\'t changed. Context had. People stream music while working, exercising, or commuting. Concert halls felt formal and inaccessible.\n\nThe music was beautiful. The context was wrong. We moved it.',
      result: 'Launched curated playlists: "Classical for Focus," "Classical for Sleep," "Classical for Running."\n\nStreams went from hundreds to hundreds of thousands. Same music. Different frame. Extraordinary became accessible by meeting people where they already were.'
    },
    'coaching': {
      title: 'The Coaching Wave',
      category: 'Leadership Coaching',
      problem: 'A leadership coaching company was successful. But they sensed something shifting in the market. They couldn\'t articulate what. Just a feeling that the ground was moving.',
      howWeSawIt: 'We noticed massive growth in the "coaching galaxy." Not just volume—type. Strategic leadership coaching was about to shift from efficiency-focused to ownership and accountability at the internal human level.\n\nThe wave was coming. History repeats. AI adoption dynamics mirror smartphone adoption dynamics. We just watch for the patterns.',
      result: 'Our client pivoted their entire service model before the wave arrived. They rode it instead of scrambling to catch up.\n\nThey weren\'t reacting to the shift. They were positioned for it.'
    },
    'particle-time': {
      title: 'Time',
      category: 'Business Particle',
      problem: 'Time isn\'t a resource you manage. It\'s a force that acts on everything.\n\nMost businesses treat time as something to fight. Rush to market. Delay to perfect. Miss the window entirely.\n\nThen they wonder why competitors moved, markets shifted, and opportunities closed while they were still debating timelines.',
      howWeSawIt: 'Time creates different physics depending on velocity.\n\nTOO SLOW: Opportunity closes. Competitors move. What was viable becomes impossible.\n\nTOO FAST: Quality suffers. Foundation cracks. You ship something that creates more problems than it solves.\n\nJUST RIGHT: Momentum builds. Compounding kicks in. Timing advantage becomes structural advantage.\n\nThe question isn\'t "how fast can we move?" It\'s "what velocity matches the physics of this specific problem?"',
      result: 'Understanding time dynamics reveals:\n\n• Which advantages are temporary vs. structural\n• When speed matters more than perfection (and vice versa)\n• Where delay creates optionality vs. where it destroys value\n• Why some problems require patient capital and others require sprint thinking\n\nTime is the dimension where all other forces play out. Get the tempo wrong and everything else fails.'
    },
    'particle-actors': {
      title: 'Actors',
      category: 'Business Particle',
      problem: 'People aren\'t rational agents. They\'re actors with incentives, constraints, and competing priorities.\n\nMost businesses take stated preferences at face value. "Customers want feature X. Sales needs better leads. Execs want innovation."\n\nThen they build what was requested and wonder why nobody uses it, conversion stays flat, and innovation dies in committee.',
      howWeSawIt: 'Watch what actors optimize for, not what they say they want.\n\nCUSTOMERS don\'t buy products. They buy the story they tell themselves about buying the product.\n\nEMPLOYEES don\'t want purpose. They want clarity, autonomy, and proof their work matters.\n\nEXECUTIVES don\'t want data. They want cover for decisions they\'ve already made.\n\nCOMPETITORS don\'t want market share. They want to survive, grow, and avoid existential threats.\n\nEvery actor is solving their own optimization problem. Strategy fails when you mistake stated preferences for actual objectives.',
      result: 'Predicting behavior becomes simple:\n\n• Map the forces acting on each actor\n• Identify what they\'re actually optimizing for\n• Understand their constraints and alternatives\n• Watch where incentives misalign with stated objectives\n\nOnce you see the physics, behavior becomes predictable. Not because actors are simple, but because forces are consistent.'
    },
    'particle-resources': {
      title: 'Resources',
      category: 'Business Particle',
      problem: 'Every business has finite resources. Capital. Attention. Talent. Infrastructure.\n\nMost businesses assume more resources solve problems. More budget. More headcount. More tools.\n\nThen they wonder why adding resources created more complexity instead of more output.',
      howWeSawIt: 'Resources aren\'t things you have. They\'re constraints that determine what\'s possible.\n\nAdding capital doesn\'t solve execution problems.\nAdding headcount doesn\'t solve coordination problems.\nAdding tools doesn\'t solve process problems.\nAdding data doesn\'t solve decision problems.\n\nThe bottleneck is rarely the resource everyone is focused on. It\'s usually three steps upstream, invisible, and structural.\n\nWe don\'t ask "what resources do you need?" We ask "what\'s actually constraining throughput?"',
      result: 'Resource mapping reveals:\n\n• Where adding more creates leverage vs. where it creates drag\n• Which constraints are binding vs. which are red herrings\n• Where you\'re resource-rich but capability-poor\n• Why throwing money at problems often makes them worse\n\nThe bottleneck is never where you think it is. Find it. Fix it. Ignore everything else.'
    },
    'particle-objectives': {
      title: 'Objectives',
      category: 'Business Particle',
      problem: 'Every business has objectives. Revenue. Growth. Market share. Customer satisfaction. Innovation.\n\nMost businesses declare all of them simultaneously. Then wonder why teams pull in opposite directions.\n\nYou can\'t optimize for everything at once. Physics doesn\'t work that way.',
      howWeSawIt: 'Objectives aren\'t destinations. They\'re forces pulling behavior in specific directions.\n\nWhen objectives conflict, energy gets wasted:\n\nSales wants revenue now. Product wants sustainable growth.\nMarketing wants brand consistency. Growth wants rapid experimentation.\nEngineering wants technical excellence. Operations wants speed.\n\nEveryone is optimizing correctly for their stated objective. The system is broken because the objectives haven\'t been stack-ranked.\n\nMost businesses avoid choosing. We force the choice.',
      result: 'Objective clarity eliminates coordination problems:\n\n• Teams stop fighting over resources\n• Trade-offs become obvious\n• Decisions accelerate\n• Energy stops getting wasted on internal politics\n\nYou can\'t have it all. Pick what matters. Optimize for that. Accept the trade-offs.'
    },
    'particle-constraints': {
      title: 'Constraints',
      category: 'Business Particle',
      problem: 'Every business operates within constraints. Regulatory. Technical. Economic. Cultural.\n\nMost businesses see constraints as problems to overcome. Limitations to fight. Obstacles to remove.\n\nThen they waste energy fighting physics instead of using it.',
      howWeSawIt: 'Constraints aren\'t obstacles. They\'re the shape of possibility.\n\nA constraint eliminates infinite bad options and reveals finite good ones. It forces clarity. It creates moats. It determines which strategies are viable and which advantages are defensible.\n\nTwitter\'s 140-character limit wasn\'t a limitation. It was the product.\nNetflix\'s bandwidth constraint forced better compression. That became their technical moat.\nAmazon\'s "two pizza teams" constraint forced better APIs. That became AWS.\n\nMost businesses fight constraints. We identify which to embrace and which to route around.',
      result: 'Constraint mapping reveals:\n\n• Where you\'re fighting physics vs. where you can use physics\n• Which limitations create differentiation\n• Where the constraint is actually your advantage\n• Which problems disappear when you accept the constraint\n\nThe constraint isn\'t the problem. Fighting the wrong constraint is the problem.'
    },
    'particle-information': {
      title: 'Information',
      category: 'Business Particle',
      problem: 'Every business runs on information. Market signals. Customer feedback. Competitor moves. Internal metrics.\n\nMost businesses collect data. Lots of data. Then wonder why they still make bad decisions.\n\nInformation isn\'t data. It\'s who knows what, when, with what confidence, and whether they can act on it.',
      howWeSawIt: 'Information creates three types of advantage:\n\nASYMMETRY: You know something others don\'t. That\'s arbitrage.\nSPEED: You know something before others do. That\'s timing.\nCLARITY: You know the right thing while others drown in noise. That\'s focus.\n\nMost businesses try to collect more information. We map information flow:\n\nWhere is it blocked?\nWhere is it distorted?\nWhere does it arrive too late to matter?\n\nInformation problems look like strategy problems, execution problems, or culture problems. They\'re not. They\'re physics problems.',
      result: 'Information mapping reveals:\n\n• Where asymmetry creates opportunity\n• Where information flow is broken\n• Why coordination fails (someone doesn\'t know what someone else knows)\n• Where signal is being drowned by noise\n\nMost coordination problems disappear when you fix information flow. No meetings required.'
    },
    'particle-incentives': {
      title: 'Incentives',
      category: 'Business Particle',
      problem: 'Every business runs on incentives. Compensation. Promotion. Recognition. Status. Avoiding blame.\n\nMost businesses say they want one thing. Then they incentivize the opposite.\n\nThen they wonder why innovation dies, collaboration fails, and short-term thinking dominates despite all the mission statements.',
      howWeSawIt: 'Incentives aren\'t motivations. They\'re forces that shape behavior whether anyone is conscious of them or not.\n\nPeople optimize for what they\'re measured on. Always. Even when they disagree with the measurement. Even when it contradicts stated values.\n\nYou want to know what a business actually optimizes for?\n\nLook at compensation structure. Promotion criteria. What gets celebrated. What gets punished.\n\nThen compare that to stated objectives. The gap explains most organizational dysfunction.\n\nWe don\'t ask "how do we motivate people?" We ask "what are people currently incentivized to do?"',
      result: 'When you fix incentives:\n\n• Behavior changes without mandates\n• Culture changes without initiatives\n• Strategy changes without retreats\n• Execution changes without processes\n\nYou don\'t need to convince people. You don\'t need to inspire them. You don\'t need to manage them harder. You need to stop paying them to do the wrong thing.\n\nPeople follow physics. Change the forces. Behavior follows.'
    },
    'molecule-demand': {
      title: 'Demand',
      category: 'Business Molecule',
      problem: 'Demand isn\'t what people say they want. It\'s what they\'ll actually pay for, use, or change behavior to get.\n\nMost businesses confuse expressed interest with real demand. Survey responses with purchase intent. Clicks with commitment.\n\nThen they build for phantom demand and wonder why adoption fails despite "overwhelming interest."',
      howWeSawIt: 'Demand has three states:\n\nLATENT: The problem exists but people don\'t know it yet. You have to make the problem visible before you can sell the solution.\n\nEXPRESSED: People say they want it. But saying and paying are different physics. Most expressed demand evaporates at the point of transaction.\n\nREVEALED: People vote with money, time, or behavior change. This is the only demand that matters.\n\nMost businesses optimize for expressed demand. We only trust revealed demand. Watch what people do, not what they say.',
      result: 'Demand mapping reveals:\n\n• Where phantom demand is wasting resources\n• Which customer segments have revealed vs. expressed demand\n• What makes latent demand become revealed demand\n• Why product-market fit is about revealed demand physics\n\nDemand isn\'t what people want. It\'s what they\'ll sacrifice something else to get.'
    },
    'molecule-supply': {
      title: 'Supply',
      category: 'Business Molecule',
      problem: 'Supply isn\'t how much you can produce. It\'s how much reaches the customer at the moment they want it.\n\nMost businesses optimize production capacity. More inventory. Faster manufacturing. Better logistics.\n\nThen they wonder why oversupply creates waste while customers still experience scarcity.',
      howWeSawIt: 'Supply has three failure modes:\n\nTOO LITTLE: Demand exists but supply can\'t meet it. You lose revenue. Competitors fill the gap.\n\nTOO MUCH: Supply exceeds demand. Inventory costs kill you. Prices collapse. Value destruction.\n\nWRONG PLACE/TIME: Supply exists but isn\'t where customers need it when they need it. Might as well not exist.\n\nThe bottleneck is rarely production. It\'s usually distribution, timing, or information flow between demand signals and supply decisions.\n\nMost businesses solve supply problems by adding capacity. We solve them by matching supply physics to demand physics.',
      result: 'Supply mapping reveals:\n\n• Where supply constraints are real vs. artificial\n• Why adding capacity often makes the problem worse\n• Where timing and distribution matter more than volume\n• Which supply problems are actually demand problems in disguise\n\nSupply isn\'t about how much you make. It\'s about matching production to consumption in time and space.'
    },
    'molecule-friction': {
      title: 'Friction',
      category: 'Business Molecule',
      problem: 'Friction is anything that makes desired behavior harder than it needs to be. Steps. Delays. Confusion. Uncertainty.\n\nMost businesses know friction exists. They run "optimization" projects. Remove steps. Improve UX. Speed things up.\n\nThen they wonder why conversion barely moves despite all the "improvements."',
      howWeSawIt: 'Not all friction is equal. There are three types:\n\nGOOD FRICTION: Slows down bad actors. Creates quality gates. Forces deliberation where it matters. This friction is a feature.\n\nBAD FRICTION: Slows down good actors. Creates unnecessary steps. Adds cognitive load. This friction kills conversion.\n\nCOMPETITIVE FRICTION: Your friction vs. competitor friction. The gap determines switching behavior.\n\nMost businesses try to remove all friction. We identify which friction protects value and which destroys it.\n\nThe goal isn\'t zero friction. It\'s optimal friction for the desired outcome.',
      result: 'Friction mapping reveals:\n\n• Where you\'re adding friction that protects vs. friction that repels\n• Why removing friction sometimes reduces quality\n• Which friction points cause abandonment vs. which create commitment\n• Where competitor friction is lower and why that matters\n\nFriction isn\'t the enemy. Misplaced friction is the enemy.'
    },
    'molecule-value': {
      title: 'Value',
      category: 'Business Molecule',
      problem: 'Value isn\'t what you deliver. It\'s what the customer perceives they\'re getting relative to what they\'re giving up.\n\nMost businesses focus on features, quality, and capabilities. "We deliver X better than competitors."\n\nThen they wonder why customers choose cheaper alternatives or don\'t choose at all.',
      howWeSawIt: 'Value is a ratio. What they get divided by what they give up.\n\nWHAT THEY GET: Not features. Not quality. The specific problem solved or outcome achieved.\n\nWHAT THEY GIVE UP: Not just price. Time. Effort. Switching costs. Uncertainty. Status. Opportunity cost.\n\nMost businesses try to increase the numerator (add features). We work both sides:\n\nIncrease perceived value OR decrease perceived cost.\n\nSometimes removing features increases value. Sometimes raising price increases value. Physics depends on what the customer is actually optimizing for.',
      result: 'Value mapping reveals:\n\n• What customers are actually trading off (not what you think they\'re buying)\n• Where perceived value and delivered value diverge\n• Why cheaper competitors win despite inferior products\n• Which value levers move customer behavior\n\nValue isn\'t what you build. It\'s the gap between what they get and what they give up.'
    },
    'molecule-risk': {
      title: 'Risk',
      category: 'Business Molecule',
      problem: 'Risk isn\'t uncertainty. It\'s the probability and magnitude of outcomes you don\'t want.\n\nMost businesses either ignore risk (move fast, break things) or overweight it (analysis paralysis).\n\nThen they either fail catastrophically or miss opportunities while competitors move.',
      howWeSawIt: 'Risk has two dimensions that matter:\n\nPROBABILITY: How likely is the bad outcome?\n\nMAGNITUDE: If it happens, does it hurt or does it kill you?\n\nLow probability, low magnitude: Ignore it.\nLow probability, high magnitude: Insure against it or design it out.\nHigh probability, low magnitude: Accept it and move on.\nHigh probability, high magnitude: Don\'t do it or change the physics.\n\nMost businesses treat all risk the same. We map which risks are existential and which are noise.',
      result: 'Risk mapping reveals:\n\n• Which risks are worth avoiding vs. which are worth taking\n• Where you\'re optimizing for the wrong risk (legal vs. existential)\n• Why perfect information doesn\'t eliminate risk\n• Which risks compound and which are independent\n\nRisk isn\'t something to eliminate. It\'s something to map, price, and decide whether to take.'
    },
    'pattern-inertia': {
      title: 'Inertia',
      category: 'Business Pattern',
      problem: 'Organizations resist change. Not because people are lazy or stupid. Because change has real costs.\n\nSwitching systems breaks workflows. Reorganizing teams destroys institutional knowledge. New processes require training, mistakes, adjustment periods.\n\nMost businesses underestimate inertia. They announce change, expect instant adoption, then blame culture when nothing moves.',
      howWeSawIt: 'Inertia isn\'t resistance. It\'s physics.\n\nEvery system has momentum in its current direction. Changing direction requires energy exceeding current momentum. Not matching it. Exceeding it.\n\nThe cost of staying still must exceed the cost of moving. Until that threshold is crossed, nothing happens. No amount of communication, inspiration, or mandate changes this.\n\nWe don\'t fight inertia. We either increase the pain of staying still or decrease the friction of moving. Usually both.',
      result: 'Understanding inertia reveals:\n\n• Why change initiatives fail despite leadership support\n• Where you need forcing functions vs. where you need incentives\n• Which changes require crisis and which require patience\n• Why early wins matter more than perfect plans\n\nInertia isn\'t the enemy. It\'s the operating reality. Work with it or waste energy fighting physics.'
    },
    'pattern-momentum': {
      title: 'Momentum',
      category: 'Business Pattern',
      problem: 'Early wins compound. Early losses spiral. Direction matters more than speed.\n\nMost businesses treat every quarter identically. Same planning cycle. Same review process. Same resource allocation.\n\nThen they wonder why winning teams keep winning and struggling teams keep struggling despite "equal" support.',
      howWeSawIt: 'Momentum is asymmetric.\n\nWINNING MOMENTUM: Success attracts resources, talent, attention. Best people want to join. Customers want in early. Partners prioritize you. Each win makes the next win easier.\n\nLOSING MOMENTUM: Failure repels resources. Talent leaves. Customers wait. Partners deprioritize. Each loss makes the next loss more likely.\n\nThe gap between winning and losing momentum isn\'t linear. It\'s exponential. Small advantages compound into structural dominance. Small setbacks compound into irrelevance.\n\nWe identify which direction momentum is actually flowing. Then we either accelerate it or break it.',
      result: 'Momentum mapping reveals:\n\n• Where small investments create disproportionate returns\n• Which initiatives are building vs. which are bleeding momentum\n• Why killing failing projects early matters more than optimizing successful ones\n• Where you\'re throwing resources at losing momentum\n\nMomentum compounds. Recognize it early. Ride it or kill it. Never ignore it.'
    },
    'pattern-growth': {
      title: 'Growth',
      category: 'Business Pattern',
      problem: 'Growth isn\'t linear. It\'s exponential until it isn\'t.\n\nMost businesses assume growth continues. They scale teams, infrastructure, and costs based on yesterday\'s trajectory.\n\nThen growth stops. Not because they failed. Because they hit a constraint they didn\'t see coming.',
      howWeSawIt: 'Growth has phases. Each phase has different physics.\n\nEARLY: Exponential. Small numbers doubling feel like magic. Product-market fit creates compounding demand. Constraints aren\'t binding yet.\n\nMIDDLE: Linear. The easy growth is captured. You\'re optimizing, not discovering. Systems strain. Complexity increases faster than revenue.\n\nLATE: Plateau. You\'ve captured available demand. Further growth requires new markets, new products, or new physics. Fighting for marginal gains.\n\nMost businesses optimize for the phase they\'re leaving, not the phase they\'re entering.',
      result: 'Growth mapping reveals:\n\n• Which phase you\'re actually in vs. which you think you\'re in\n• Where your next constraint will bind\n• Why adding resources sometimes slows growth\n• When to optimize vs. when to explore\n\nGrowth isn\'t constant. Recognize the transition. Change strategy before the curve forces you to.'
    },
    'pattern-decay': {
      title: 'Decay',
      category: 'Business Pattern',
      problem: 'Advantages erode. Moats fill in. What worked yesterday stops working tomorrow.\n\nMost businesses mistake current success for permanent advantage. They optimize existing strengths while competitors change the game.\n\nThen they wake up irrelevant, wondering what happened.',
      howWeSawIt: 'Decay is constant. Not failure. Physics.\n\nTECHNOLOGY DECAY: Your tech stack ages. What was cutting-edge becomes legacy. Maintenance cost increases. Innovation cost increases faster.\n\nTALENT DECAY: Best people get recruited away. Institutional knowledge walks out the door. Team energy shifts from building to maintaining.\n\nMARKET DECAY: Competitors copy advantages. Customers expect more for less. Your differentiation becomes table stakes.\n\nCUSTOMER DECAY: Preferences shift. Alternatives multiply. Switching costs decrease. Loyalty is temporary.\n\nDecay isn\'t preventable. It\'s manageable. Maintenance isn\'t optional.',
      result: 'Decay mapping reveals:\n\n• Where advantages are eroding faster than you think\n• Which moats need constant reinforcement\n• Where you\'re optimizing dying advantages\n• Why standing still is moving backward\n\nDecay is the default. Build faster than it erodes or watch advantages disappear.'
    },
    'pattern-equilibrium': {
      title: 'Equilibrium',
      category: 'Business Pattern',
      problem: 'Markets find balance. Arbitrage opportunities close. Excess profits attract competition.\n\nMost businesses assume their edge is structural. They build long-term plans around temporary advantages.\n\nThen competition arrives and margins compress to normal. What looked like genius was just timing.',
      howWeSawIt: 'Equilibrium is inevitable. Not immediate.\n\nIMBALANCE: Opportunity exists. Demand exceeds supply or supply exceeds demand. Margins are abnormal. Profits signal opportunity.\n\nCOMPETITION ENTERS: Others see the opportunity. Capital flows in. New players emerge. Customers have alternatives.\n\nEQUILIBRIUM APPROACHES: Supply matches demand. Prices normalize. Margins compress. Advantage requires actual differentiation, not just being early.\n\nThe window between imbalance and equilibrium is your window to build structural advantages. After equilibrium, you\'re competing on execution, not opportunity.\n\nWe identify whether you\'re pre-equilibrium or post-equilibrium. Strategy is completely different.',
      result: 'Equilibrium mapping reveals:\n\n• Whether your advantage is structural or temporal\n• How long before competition closes the gap\n• Where to build moats before equilibrium arrives\n• Why high margins attract the competition that kills high margins\n\nEquilibrium is coming. Build before it arrives or compete after it does. Pretending it won\'t come is not a strategy.'
    },
    'model-demand': {
      title: 'The Demand Flywheel',
      category: 'Mental Model',
      problem: 'Rolex doesn\'t sell watches. Peloton doesn\'t sell bikes. Slack doesn\'t sell chat.\n\nThey sell status, tribe membership, professional identity. Your product is the excuse. The demand is primal.\n\nMiss this and your marketing is just noise.',
      howWeSawIt: 'Demand exists in three states:\n\nLATENT: The problem exists but people don\'t know it yet. Make the problem visible before you can sell the solution.\n\nEXPRESSED: People say they want it. But saying and paying are different physics. Most expressed demand evaporates at transaction.\n\nREVEALED: People vote with money, time, or behavior change. This is the only demand that matters.\n\nMost businesses optimize for expressed demand. We only trust revealed demand.\n\nThe Demand model maps what people actually want versus what they say they want. Watch behavior, not surveys.',
      result: 'Understanding demand reveals:\n\n• What customers are really buying (not what you\'re selling)\n• Why product-market fit is about revealed demand physics\n• Where phantom demand is wasting resources\n• Which customer segments have real vs. fake demand'
    },
    'model-incentives': {
      title: 'The Incentive Polarity',
      category: 'Mental Model',
      problem: 'Sales says they want better leads. What they optimize for is easy closes.\n\nProduct says they want user feedback. What they optimize for is no complaints.\n\nExecutives say they want innovation. What they optimize for is no surprises.\n\nWatch what they do, not what they say.',
      howWeSawIt: 'People optimize for what they\'re measured on. Always.\n\nEven when they disagree with the measurement. Even when it contradicts stated values.\n\nYou want to know what a business actually optimizes for? Look at compensation structure. Promotion criteria. What gets celebrated. What gets punished.\n\nThen compare that to stated objectives. The gap explains most organizational dysfunction.\n\nThe Incentives model maps actual optimization versus stated objectives. Fix the forces. Behavior follows.',
      result: 'When you fix incentives:\n\n• Behavior changes without mandates\n• Culture changes without initiatives\n• Strategy changes without retreats\n• Execution changes without processes'
    },
    'model-agentic': {
      title: 'The Agentic Edge',
      category: 'Mental Model',
      problem: 'Humans need meetings, check-ins, approvals, reassurance.\n\nAI doesn\'t.\n\nGive it clear objectives, hard constraints, quality thresholds, and kill switches. Then let it run while you sleep.\n\nThe bottleneck isn\'t the AI. It\'s your need to feel in control.',
      howWeSawIt: 'Agentic systems work differently than human systems.\n\nHUMANS: Need context, motivation, feedback loops, social dynamics. Coordination is expensive. Scaling is hard.\n\nAGENTS: Need clear objectives, constraints, and decision rules. Coordination is cheap. Scaling is trivial.\n\nMost businesses try to manage AI like humans. Meetings. Status updates. Approvals.\n\nThe Agentic model maps how to design systems that run autonomously. Define the physics. Let it operate.',
      result: 'Agentic thinking reveals:\n\n• Where human oversight adds value vs. where it adds friction\n• How to design objectives that scale without supervision\n• Why most AI deployments fail (treating AI like interns)\n• Where autonomous systems multiply capacity'
    },
    'model-prismatic': {
      title: 'The Prismatic Mindset',
      category: 'Mental Model',
      problem: 'Every industry thinks it\'s special. None of them are.\n\nNightclubs and enterprise sales are both gatekeeping. Museums and Netflix are both attention retention. Airports and emergency rooms are both triage under constraints.\n\nSee structure, not surface, and solutions transfer instantly.',
      howWeSawIt: 'Industries are different surfaces on identical physics.\n\nRetail, SaaS, consulting, manufacturing, healthcare. Different vocabularies. Different constraints. Same fundamental forces.\n\nSupply. Demand. Friction. Value. Risk. Time. Actors. Incentives.\n\nThe Prismatic model strips away industry-specific language to reveal universal structure. Once you see the pattern, solutions from completely unrelated domains become obviously applicable.',
      result: 'Prismatic thinking reveals:\n\n• Which "industry-specific" problems are actually universal\n• How solutions from unrelated fields solve your exact situation\n• Why best practices within your industry are often collectively stupid\n• Where cross-domain pattern matching creates unfair advantages'
    },
    'model-triptych': {
      title: 'The Triptych Nexus',
      category: 'Mental Model',
      problem: 'Most companies fight the wrong battle.\n\nThey add supply when friction is killing them. Remove friction when demand doesn\'t exist. Build features when distribution is broken.\n\nStop guessing. Map the forces. Fix what\'s actually stuck.',
      howWeSawIt: 'Every business problem is Supply, Demand, or Friction.\n\nSUPPLY PROBLEM: You can\'t deliver. Capacity, resources, or capabilities are the constraint.\n\nDEMAND PROBLEM: Nobody wants it. The problem isn\'t visible or the solution isn\'t compelling.\n\nFRICTION PROBLEM: They want it, you can deliver it, but something is blocking the transaction.\n\nMost businesses misdiagnose which problem they have. They optimize the wrong variable.\n\nThe Triptych model maps which force is actually constraining growth. Then you fix that. Not everything else.',
      result: 'Triptych mapping reveals:\n\n• Which of the three forces is actually binding\n• Why adding resources sometimes makes problems worse\n• Where you\'re solving the wrong constraint beautifully\n• What to fix first for maximum leverage'
    }
  };

  return (
    <PageLayout>
      <section id="about" className="section active">
        {/* HERO STATEMENT - 1200px container for desktop */}
        <div style={{ maxWidth: '1200px', marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: 'var(--font-passion), sans-serif',
            fontSize: 'clamp(32px, 9vw, 80px)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '0',
            marginTop: '0',
            letterSpacing: '0.005em',
            color: '#222'
          }}>
            PATTERNS ARE LIKE <span style={{ color: '#D43225' }}>GRAVITY.</span><br/>THEY EXIST WHETHER YOU SEE THEM OR NOT.
          </h1>
        </div>

        <div style={{ maxWidth: '700px' }}>
          {/* Opening statements */}
          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Physics governs the universe.<br/>
            It should govern how we think.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Light through a prism reveals what was always there but invisible. That's what we're passionate about. <strong>The tangible invisible.</strong>
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            That's why we're called Prismatica.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '120px', color: '#444' }}>
            And this is how we think.
          </p>

          {/* THE UNCOMFORTABLE TRUTH */}
          <h2 style={{
            position: 'relative',
            paddingLeft: '20px',
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            <span style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
            The Uncomfortable Truth
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            You are not here to fix success. You're here to fix problems.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            The less time you spend on the problem, the more time you have for solutions.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            The best way to save time is to map problems. Because at the end, for as unique as you may want to feel, all problems boil down to three very distinguishable parts.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            One class of Agent.<br/>
            One class of objective.<br/>
            One class of constraint.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444', fontWeight: 600 }}>
            That's all.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* THE STATUS QUO */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            The Status Quo
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Big consultancies charge seven figures to tell you what you already suspect. Agencies charge day rates to avoid solving your actual problem. Your internal team knows exactly what's wrong but can't say it.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Everyone sells you the same tired metaphor: "We don't give you a fish, we teach you to fish."
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            We coded the fisherman.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            We synthesised centuries of pattern recognition with sequential intelligence.<br/>
            Turned frameworks into functions.<br/>
            Made wisdom run while you sleep.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Now you don't need to learn to fish. You get a tireless expert that catches fish 24/7 for less than your team's coffee budget.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            £39.99 gets you started.<br/>
            £299/month gets you everything.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Compare that to a day rate from any consultancy. <strong>We'll wait.</strong>
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* WHY WE BUILD BOTH WAYS */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Why We Build Both Ways
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444', fontWeight: 600 }}>
            Some problems need human agility.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Complex politics. Delicate negotiations. Reading the room. Knowing when to break the rules. That's where we come in directly.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444', fontWeight: 600 }}>
            Some problems need relentless iteration.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Testing every permutation. Running scenarios at 3am. Analysing patterns across industries. Never getting tired or defensive. That's where our AI products live.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444', fontWeight: 600 }}>
            The freedom part?
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            When we work together directly, there's a deadline, then we're done.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            When you access our products, they're yours to deploy. No lock-in. No dependency.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Either way, you get independence. <strong>We want to be free. Like most.</strong>
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* BACK TO SOLUTIONS */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Back To Solutions
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Your competitors are solving the wrong problem beautifully.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            They're adding supply when friction is killing them. Removing friction when demand doesn't exist. Building features when distribution is broken.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Meanwhile, nightclubs and enterprise software use the same gatekeeping physics. Museums and Netflix fight the same attention retention battle. Airports and emergency rooms run the same triage algorithm.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            The pattern is right there. Most people don't notice.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444', fontWeight: 600 }}>
            That's your arbitrage.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* PARTICLES, MOLECULES, PATTERNS */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Particles, Molecules, Patterns
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Every business problem is physics. Forces trying to move through constraints. Energy seeking equilibrium. Parts colliding until something breaks or something works.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            We have seven particles that exist in every business…
          </p>

          <div style={{ marginTop: '24px', marginBottom: '48px' }}>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-time')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Time ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>The window narrows. Momentum builds or dies.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-actors')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Actors ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Who can say yes. Who can say no. Who just gets affected.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-resources')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Resources ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>What you have to work with. Never enough of what matters.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-objectives')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Objectives ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>What everyone's actually after. Surprisingly identical across industries.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-constraints')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Constraints ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>The edges of possibility. Physics, budgets, regulations, human nature.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-information')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Information ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>What you know, what they know, what nobody knows yet.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('particle-incentives')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Incentives ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>What people say drives them. What actually drives them.</span>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            They bond into five molecules…
          </p>

          <div style={{ marginTop: '24px', marginBottom: '48px' }}>
            <p style={{ marginBottom: '16px' }}>
              <button onClick={() => openModal('molecule-demand')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Demand ›</button>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Actors + Objectives + Information</span>
            </p>
            <p style={{ marginBottom: '16px' }}>
              <button onClick={() => openModal('molecule-supply')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Supply ›</button>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Resources + Constraints + Time</span>
            </p>
            <p style={{ marginBottom: '16px' }}>
              <button onClick={() => openModal('molecule-friction')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Friction ›</button>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Constraints + Information + Incentives</span>
            </p>
            <p style={{ marginBottom: '16px' }}>
              <button onClick={() => openModal('molecule-value')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Value ›</button>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Resources + Objectives + Actors</span>
            </p>
            <p style={{ marginBottom: '16px' }}>
              <button onClick={() => openModal('molecule-risk')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Risk ›</button>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px', display: 'inline-block' }}>Time + Information + Objectives</span>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            Which create predictable patterns…
          </p>

          <div style={{ marginTop: '24px', marginBottom: '48px' }}>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('pattern-inertia')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Inertia ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Change requires force exceeding current momentum.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('pattern-momentum')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Momentum ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Early wins compound. Early losses spiral.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('pattern-growth')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Growth ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Exponential until it isn't. Then constraints bind.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('pattern-decay')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Decay ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Advantages erode. Maintenance is never optional.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('pattern-equilibrium')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Equilibrium ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Arbitrage closes. Margins compress. Temporary becomes permanent.</span>
            </p>
          </div>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* MENTAL MODELS */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Mental Models
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            So we built models to manage the physics. Why guess when you can map the forces?
          </p>

          <div style={{ marginTop: '24px', marginBottom: '48px' }}>
            <p style={{ marginBottom: '12px' }}>
              <Link href="/demand" className="evidence-link" style={{ textDecoration: 'none', color: '#666', fontSize: '17px', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Demand Flywheel ›</Link>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>What people actually want vs. what they say they want.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <Link href="/incentives" className="evidence-link" style={{ textDecoration: 'none', color: '#666', fontSize: '17px', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Incentive Polarity ›</Link>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Watch what they optimize for, not what they say.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <Link href="/agentic" className="evidence-link" style={{ textDecoration: 'none', color: '#666', fontSize: '17px', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Agentic Edge ›</Link>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Clear objectives. Hard constraints. No meetings.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <Link href="/prismatic" className="evidence-link" style={{ textDecoration: 'none', color: '#666', fontSize: '17px', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Prismatic Mindset ›</Link>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Same physics. Different surfaces. Instant transfer.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <Link href="/triptych" className="evidence-link" style={{ textDecoration: 'none', color: '#666', fontSize: '17px', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Triptych Nexus ›</Link>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Supply, demand, or friction. Fix the right constraint.</span>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Five frameworks. Same physics. Different lenses.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            Explore each. Or don't.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            See? Patterns <strong>are</strong> like gravity. They exist whether you see them or not.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* IN PRACTICE */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            In Practice
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            Eight problems. Eight different industries. Same physics:
          </p>

          {/* Case study links */}
          <div style={{ marginTop: '24px', marginBottom: '48px' }}>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('warehouse')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Warehouse That Wasn't ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>The bottleneck wasn't where everyone was looking.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('search')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Search Nobody Needed ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>The feature request was a symptom, not the cure.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('push-pull')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>From Push to Pull ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Make the problem visible. Let prospects come to you.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('bottleneck')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Misdiagnosed Bottleneck ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Approvals weren't slow. The work wasn't ready.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('canyon')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The £15K Canyon ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Built a bridge instead of expecting the leap.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('platform')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>From Retail to Platform ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Couldn't compete on price. Won on expertise.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('music')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>Classical Music for Running ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Same music. Different context. Everything changed.</span>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <button onClick={() => openModal('coaching')} className="evidence-link" style={{ background: 'none', border: 'none', padding: 0, color: '#666', fontSize: '17px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', fontFamily: '"Noto Sans", sans-serif', fontWeight: 600, display: 'block' }}>The Coaching Wave ›</button>
              <span style={{ fontSize: '13px', color: '#888', display: 'block' }}>Positioned for the shift before it arrived.</span>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            Different surfaces. Same underlying laws.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* WHAT WE ACTUALLY DO */}
          <h2 style={{
            position: 'relative',
            paddingLeft: '20px',
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            <span style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
            What We Actually Do
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            <strong>Brave?</strong><br/>
            We'll tell you your real problem in under an hour. Not the problem you came with. The one that's actually killing you.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            <strong>Ambitious?</strong><br/>
            We'll show you how patterns from unrelated industries solve your exact situation. Because physics doesn't care about your industry vertical.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            <strong>Impatient?</strong><br/>
            We built AI that thinks like we do. It runs while you sleep. No meetings, no check-ins, no PowerPoints. Just solutions.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* OUR USP */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Our USP
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            We make invisible forces visible.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            That's it.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            That's the whole thing.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* THE BEHAVIOURAL REALITY */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            The Behavioural Reality
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            People don't buy your product. They buy the story they tell themselves about buying your product.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '12px', color: '#444' }}>
            Sales doesn't want better leads. They want deals that close themselves.
          </p>
          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '12px', color: '#444' }}>
            Product doesn't want user feedback. They want confirmation they're right.
          </p>
          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '48px', color: '#444' }}>
            Executives don't want innovation. They want innovation theatre with guaranteed outcomes.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Watch what they optimise for, not what they say they want.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            This isn't cynicism. It's physics. And physics doesn't judge.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* WHO WE'RE NOT FOR */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Who We're Not For
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            If you need…
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Someone to validate your existing strategy.<br/>
            Impressive slides for your board meeting.<br/>
            A prestigious logo on your vendor list.<br/>
            Someone who speaks fluent corporate.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444', fontWeight: 600 }}>
            We're not your people.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* WHO WE'RE ABSOLUTELY FOR */}
          <h2 style={{
            position: 'relative',
            paddingLeft: '20px',
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            <span style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
            Who We're Absolutely For
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '2.0', marginBottom: '0', color: '#444' }}>
            You know something's structurally wrong but can't articulate it.<br/>
            You're tired of fighting symptoms while root causes multiply.<br/>
            You suspect your industry's "best practices" are collectively stupid.<br/>
            You'd rather be uncomfortably right than comfortably wrong.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* TESTIMONIALS */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Testimonials?
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            We don't do testimonials.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Not because we couldn't get them. Because they're theatre. Five stars from people you'll never meet, solving problems you don't have, in contexts that aren't yours.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            The decision to work together isn't social, it's intellectual. You're not trying to choose a blender or checking if we're rated for basic competence.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Stars are for commodities.<br/>
            You're not a crowd. Our thinking isn't a product.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444', fontWeight: 600 }}>
            Respect works both ways.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            The work speaks or it doesn't.<br/>
            The thinking resonates or it doesn't.<br/>
            You get it or you don't.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#444' }}>
            And that's fine. We're not for everyone.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444', fontWeight: 600 }}>
            Are you?
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* COMPLEXITY IS EVERYWHERE */}
          <h2 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            Complexity is everywhere
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            Clarity is rare.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            We don't simplify by ignoring reality. We clarify by revealing structure.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            There's a difference between making something simple and making something clear. Simple lies. Clear illuminates.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            We do clear.
          </p>

          <div style={{ marginTop: '120px', marginBottom: '120px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
          </div>

          {/* READY? */}
          <h2 style={{
            position: 'relative',
            paddingLeft: '20px',
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '0',
            marginBottom: '40px',
            color: '#222'
          }}>
            <span style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
            Ready?
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '32px', color: '#444' }}>
            You already know if this is for you.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '0', color: '#444' }}>
            The question isn't whether we can help.
          </p>

          <a
            href={mailtoLink}
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
            Email Us
          </a>

          {/* Footer tagline */}
          <p className="about-footer-tagline" style={{
            fontSize: '13px',
            lineHeight: '1.8',
            marginTop: '80px',
            marginBottom: '0',
            color: '#666',
            fontStyle: 'italic'
          }}>
            Founded in London.<br/>
            Operating globally.<br/>
            Small by design, sharp by necessity.
          </p>

        </div>
      </section>

      {/* Evidence Modal */}
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
              className="fixed inset-0 z-[10000]"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            />
          </Transition.Child>

          {/* Modal Container */}
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-5">
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
                    fontSize: '17px',
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
                    <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '1px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"Noto Sans", sans-serif' }}>
                      {briefs[activeModal].category}
                    </div>

                    <Dialog.Title as="h3" style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '1.2', marginTop: 0, marginBottom: '24px', color: '#222' }}>
                      {briefs[activeModal].title}
                    </Dialog.Title>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px', fontFamily: '"Noto Sans", sans-serif' }}>The Problem</h4>
                      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line', fontFamily: '"Noto Sans", sans-serif' }}>{briefs[activeModal].problem}</p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px', fontFamily: '"Noto Sans", sans-serif' }}>How We Saw It</h4>
                      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line', fontFamily: '"Noto Sans", sans-serif' }}>{briefs[activeModal].howWeSawIt}</p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '8px', fontFamily: '"Noto Sans", sans-serif' }}>The Result</h4>
                      <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line', fontFamily: '"Noto Sans", sans-serif' }}>{briefs[activeModal].result}</p>

                      {/* Show link to page if it's a model modal */}
                      {activeModal && activeModal.startsWith('model-') && (
                        <Link
                          href={`/${activeModal.replace('model-', '')}`}
                          style={{
                            display: 'inline-block',
                            marginTop: '24px',
                            padding: '12px 24px',
                            backgroundColor: '#D43225',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '15px',
                            fontWeight: 600,
                            transition: 'all 0.2s'
                          }}
                        >
                          Explore {briefs[activeModal].title}
                        </Link>
                      )}
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

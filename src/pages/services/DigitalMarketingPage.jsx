import { useEffect } from 'react'
import ServicePage from '../../components/ServicePage'

const svc = {
  title: 'Digital Marketing',
  metaTitle: 'Digital Marketing Services — LauncherDesk',
  metaDesc: 'AI-powered SEO, Google & Meta Ads, social media management, branding and lead generation — fully managed digital marketing for Indian businesses.',
  eyebrow: 'Build — Branding',
  crumbCategory: 'Build',
  slug: 'digital-marketing',
  lead: 'Grow your business online with data-driven marketing — SEO, paid ads, social media and brand design all managed under one roof by LauncherDesk.',
  priceCard: { label: 'Professional fee from', price: 'Custom quote', sub: '+ taxes, shown separately' },
  helpCard: { title: 'Not sure where to start?', body: 'Tell us your business goals and we will recommend the right channels and budget.' },
  toc: [
    { href: '#overview',    label: 'Overview' },
    { href: '#who',         label: "Who it's for" },
    { href: '#included',    label: "What's included" },
    { href: '#process',     label: 'Process' },
    { href: '#pricing',     label: 'Pricing' },
    { href: '#faq',         label: 'FAQs' },
  ],
  sections: {
    overview: {
      heading: 'Overview',
      content: `<p>Your brand identity is how your business looks and feels to the world — logo, colours, typography and the visual language across all touchpoints. A strong brand builds credibility, trust and recognition from day one.</p>
<p>LauncherDesk delivers complete digital marketing packages: from AI-powered SEO and Google Ads to social media management, brand design and lead generation campaigns — all executed by a dedicated team accountable to your KPIs.</p>
<p>Whether you are a startup building your first online presence or an established business scaling up leads, we have a plan that fits your stage and budget.</p>`,
    },
    who: {
      heading: "Who it's for",
      items: [
        'Newly registered businesses that need a professional brand identity and online presence',
        'Startups looking to generate leads and drive qualified traffic from day one',
        'Existing businesses with an outdated website, inconsistent branding or low online visibility',
        'Founders preparing for fundraising who need investor-ready marketing collateral',
        'E-commerce businesses looking to scale revenue through paid ads and SEO',
        'Service businesses wanting to build authority and rank for high-intent local searches',
      ],
    },
    included: {
      heading: "What's included",
      content: `
<h3>AI-Powered SEO</h3>
<ul>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> AI Search Optimization (AEO) — get found on ChatGPT, Perplexity &amp; Gemini</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> LLM Visibility &amp; Citations</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Technical SEO Audits &amp; On-Page Fixes</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Content Strategy &amp; Creation</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Local &amp; International SEO</li>
</ul>
<h3>Lead Generation &amp; Paid Ads</h3>
<ul>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Google Ads Management (Search, Display, Shopping)</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Meta &amp; Instagram Ads</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> LinkedIn B2B Campaigns</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> YouTube Advertising</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Remarketing &amp; Retargeting</li>
</ul>
<h3>Social Media Marketing</h3>
<ul>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Social Media Strategy &amp; Audit</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Content Calendar &amp; Posting (Instagram, LinkedIn, Facebook)</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Community Management</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Ad Creative Design</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Reels &amp; Short-Form Video</li>
</ul>
<h3>Design &amp; Branding</h3>
<ul>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Brand Identity Design</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Logo &amp; Visual Identity</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Marketing Collaterals (brochures, decks, banners)</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Packaging Design</li>
  <li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"/></svg> Social Media Design Templates</li>
</ul>`,
    },
    process: {
      heading: 'How it works',
      steps: [
        { title: 'Discovery & Audit', body: 'We audit your current online presence, competitors and market to identify the highest-impact opportunities for your budget.' },
        { title: 'Strategy & Planning', body: 'A tailored marketing plan covering channels, budget allocation, content calendar and KPIs — reviewed and approved by you before anything goes live.' },
        { title: 'Launch & Execute', body: 'Campaigns go live. Content is created, ads are set up, SEO work begins and your brand assets are developed — all in parallel.' },
        { title: 'Optimise & Report', body: 'We track, test and improve every week. You receive a monthly plain-language performance report covering what is working and what is next.' },
      ],
    },
    pricing: {
      heading: 'Pricing',
      intro: 'We build custom packages based on your goals and channels. Indicative monthly retainers:',
      rows: [
        ['Starter', 'SEO + 2 social platforms + 8 posts/month + monthly report'],
        ['Growth', 'Everything in Starter + Google Ads + Meta Ads + 16 posts + 4 Reels'],
        ['Pro / Enterprise', 'Full-funnel — all channels, dedicated account manager, custom analytics'],
        ['Ad spend', 'Billed separately and transparently — goes directly to Google/Meta'],
      ],
      outro: `All packages are custom-quoted after a free discovery call. <a href="/company/contact" style="color:var(--blue-dark);font-weight:600">Book a free strategy call →</a>`,
    },
    faq: {
      heading: 'Frequently asked questions',
      items: [
        { q: 'How long before I see results?', a: 'SEO typically shows meaningful traction in 3–6 months as domain authority builds. Paid ads (Google, Meta) deliver traffic from day one — campaigns are optimised weekly. Social media growth is usually visible within 4–8 weeks of consistent posting.' },
        { q: 'Do you manage the ad spend as well?', a: 'Ad spend goes directly to Google or Meta from your own account — we never handle your money. We manage the campaigns, targeting, creative and optimisation on your behalf.' },
        { q: 'Can I choose only one service — say, just SEO?', a: 'Absolutely. You can start with a single channel and expand over time. We do not lock you into bundles you do not need. Most clients start with SEO or Ads and add more channels as they see results.' },
        { q: 'Will you create all the content and creatives?', a: 'Yes. Our team handles copywriting, graphic design, video scripts and ad creatives. You review and approve everything before it goes live.' },
        { q: 'How are results reported?', a: 'You receive a monthly performance report with plain-language insights — what moved, what did not, and what the plan is for the next month. Paid ad campaigns also get weekly quick updates.' },
        { q: 'Is there a minimum contract period?', a: 'We recommend a minimum of 3 months for any channel to show meaningful results, especially SEO. Paid ads can be started and paused more flexibly. We discuss this on the discovery call.' },
      ],
    },
  },
  related: [
    { href: '/services/branding-logo-design',          label: 'Branding & Logo Design',    note: 'Build a visual identity your marketing can stand behind.' },
    { href: '/services/seo-marketing',                 label: 'SEO & Search Marketing',     note: 'Rank higher on Google for the searches that matter.' },
    { href: '/services/google-ads-paid-marketing',     label: 'Google Ads',                 note: 'Performance campaigns that bring qualified leads fast.' },
    { href: '/services/social-media-management',       label: 'Social Media Management',    note: 'Build a following that actually converts.' },
  ],
}

export default function DigitalMarketingPage() {
  useEffect(() => {
    document.title = svc.metaTitle
    const m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', svc.metaDesc)
  }, [])

  return <ServicePage svc={svc} />
}
import express from 'express';
import fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;
const siteDir = path.join(__dirname, 'cloned-site');
const publicRoutes = [
  '/',
  '/about',
  '/products',
  '/pricing',
  '/contact-us',
  '/services',
  '/raw-material',
  '/certifications',
  '/terms-and-conditions',
  '/general-information',
  '/customer-satisfaction',
  '/blogs',
  '/blogs/article',
  '/features',
  '/addons',
];
const productMenu = [
  { id: 1, product_heading: 'Back Packs' },
  { id: 2, product_heading: 'Boat and Tote Bags' },
  { id: 3, product_heading: 'Drawstring Bags' },
  { id: 4, product_heading: 'Duffle' },
  { id: 5, product_heading: 'Fashion Bags' },
  { id: 6, product_heading: 'Kitchen Accessories' },
  { id: 7, product_heading: 'Messenger' },
  { id: 8, product_heading: 'Organic Bags' },
  { id: 9, product_heading: 'Recycle Bags' },
  { id: 10, product_heading: 'Shopper Tote' },
  { id: 11, product_heading: 'Utility Tote' },
];
const productCardsById = {
  1: [
    { id: 101, heading: 'Campus & Utility Packs', icon: 'FaBriefcase' },
    { id: 102, heading: 'Sampling & Branding', icon: 'FaPaintBrush' },
  ],
  2: [
    { id: 201, heading: 'Large Capacity Totes', icon: 'FaShoppingBag' },
    { id: 202, heading: 'Retail Presentation', icon: 'FaTags' },
  ],
  3: [
    { id: 301, heading: 'Event Drawstring Bags', icon: 'FaShoppingBasket' },
    { id: 302, heading: 'Lightweight Fulfillment', icon: 'FaBoxes' },
  ],
  4: [
    { id: 401, heading: 'Travel & Sports Duffles', icon: 'FaTruck' },
    { id: 402, heading: 'Structured Storage', icon: 'FaBoxOpen' },
  ],
  5: [
    { id: 501, heading: 'Lifestyle Fashion Bags', icon: 'FaShoppingBag' },
    { id: 502, heading: 'Custom Finishing', icon: 'FaPaintBrush' },
  ],
  6: [
    { id: 601, heading: 'Aprons & Mitts', icon: 'FaUtensils' },
    { id: 602, heading: 'Kitchen Gift Programs', icon: 'FaGift' },
  ],
  7: [
    { id: 701, heading: 'Messenger & Crossbody', icon: 'FaBriefcase' },
    { id: 702, heading: 'Office & Commute Use', icon: 'FaTruck' },
  ],
  8: [
    { id: 801, heading: 'Organic Cotton Bags', icon: 'FaLeaf' },
    { id: 802, heading: 'Eco Positioning', icon: 'FaCheckCircle' },
  ],
  9: [
    { id: 901, heading: 'Recycled Fabric Bags', icon: 'FaRecycle' },
    { id: 902, heading: 'Sustainability Programs', icon: 'FaLeaf' },
  ],
  10: [
    { id: 1001, heading: 'Retail Shopper Totes', icon: 'FaShoppingBasket' },
    { id: 1002, heading: 'Store & Event Supply', icon: 'FaBoxes' },
  ],
  11: [
    { id: 1101, heading: 'Multi-Pocket Utility Totes', icon: 'FaToolbox' },
    { id: 1102, heading: 'Heavy Duty Builds', icon: 'FaShieldAlt' },
  ],
};
const featureCardsById = {
  101: [
    { id: 1011, feature_heading: 'Reinforced straps', feature_icon: 'FaCheckCircle' },
    { id: 1012, feature_heading: 'Front pocket options', feature_icon: 'FaBoxOpen' },
    { id: 1013, feature_heading: 'Retail-ready sizing', feature_icon: 'FaTags' },
  ],
  102: [
    { id: 1021, feature_heading: 'Embroidery placement', feature_icon: 'FaPaintBrush' },
    { id: 1022, feature_heading: 'Screen print support', feature_icon: 'FaCheckCircle' },
    { id: 1023, feature_heading: 'Custom trims', feature_icon: 'FaToolbox' },
  ],
  201: [
    { id: 2011, feature_heading: 'Wide gussets', feature_icon: 'FaBoxes' },
    { id: 2012, feature_heading: 'Heavy canvas options', feature_icon: 'FaShieldAlt' },
    { id: 2013, feature_heading: 'Long handle variants', feature_icon: 'FaCheckCircle' },
  ],
  202: [
    { id: 2021, feature_heading: 'Contrast panels', feature_icon: 'FaTags' },
    { id: 2022, feature_heading: 'Boutique presentation', feature_icon: 'FaGift' },
    { id: 2023, feature_heading: 'Private label finishing', feature_icon: 'FaPaintBrush' },
  ],
  301: [
    { id: 3011, feature_heading: 'Event-friendly pack size', feature_icon: 'FaBoxes' },
    { id: 3012, feature_heading: 'Lightweight fabrics', feature_icon: 'FaLeaf' },
    { id: 3013, feature_heading: 'Quick branding area', feature_icon: 'FaPaintBrush' },
  ],
  302: [
    { id: 3021, feature_heading: 'Foldable construction', feature_icon: 'FaBoxOpen' },
    { id: 3022, feature_heading: 'Bulk dispatch support', feature_icon: 'FaTruck' },
    { id: 3023, feature_heading: 'Campaign color matching', feature_icon: 'FaTags' },
  ],
  401: [
    { id: 4011, feature_heading: 'Zip closure options', feature_icon: 'FaCheckCircle' },
    { id: 4012, feature_heading: 'Shoulder strap add-ons', feature_icon: 'FaToolbox' },
    { id: 4013, feature_heading: 'Travel-size formats', feature_icon: 'FaTruck' },
  ],
  402: [
    { id: 4021, feature_heading: 'Structured silhouettes', feature_icon: 'FaShieldAlt' },
    { id: 4022, feature_heading: 'Interior organizers', feature_icon: 'FaBoxes' },
    { id: 4023, feature_heading: 'Premium detailing', feature_icon: 'FaGift' },
  ],
  501: [
    { id: 5011, feature_heading: 'Lifestyle silhouettes', feature_icon: 'FaShoppingBag' },
    { id: 5012, feature_heading: 'Soft-lined interiors', feature_icon: 'FaCheckCircle' },
    { id: 5013, feature_heading: 'Retail color stories', feature_icon: 'FaTags' },
  ],
  502: [
    { id: 5021, feature_heading: 'Brand-specific trims', feature_icon: 'FaPaintBrush' },
    { id: 5022, feature_heading: 'Accessory coordination', feature_icon: 'FaGift' },
    { id: 5023, feature_heading: 'Packaging support', feature_icon: 'FaBoxes' },
  ],
  601: [
    { id: 6011, feature_heading: 'Apron programs', feature_icon: 'FaUtensils' },
    { id: 6012, feature_heading: 'Oven mitt production', feature_icon: 'FaShieldAlt' },
    { id: 6013, feature_heading: 'Potholder sets', feature_icon: 'FaGift' },
  ],
  602: [
    { id: 6021, feature_heading: 'Kitchen bundle packing', feature_icon: 'FaBoxes' },
    { id: 6022, feature_heading: 'Hospitality gifting', feature_icon: 'FaTruck' },
    { id: 6023, feature_heading: 'Custom recipe branding', feature_icon: 'FaPaintBrush' },
  ],
  701: [
    { id: 7011, feature_heading: 'Flap and zip styles', feature_icon: 'FaBriefcase' },
    { id: 7012, feature_heading: 'Crossbody strap options', feature_icon: 'FaCheckCircle' },
    { id: 7013, feature_heading: 'Document compartments', feature_icon: 'FaBoxes' },
  ],
  702: [
    { id: 7021, feature_heading: 'Daily carry formats', feature_icon: 'FaTruck' },
    { id: 7022, feature_heading: 'Executive gifting', feature_icon: 'FaGift' },
    { id: 7023, feature_heading: 'Workwear coordination', feature_icon: 'FaTags' },
  ],
  801: [
    { id: 8011, feature_heading: 'Certified organic options', feature_icon: 'FaLeaf' },
    { id: 8012, feature_heading: 'Natural finish programs', feature_icon: 'FaCheckCircle' },
    { id: 8013, feature_heading: 'Eco messaging support', feature_icon: 'FaPaintBrush' },
  ],
  802: [
    { id: 8021, feature_heading: 'Sustainability storytelling', feature_icon: 'FaLeaf' },
    { id: 8022, feature_heading: 'Responsible sourcing', feature_icon: 'FaShieldAlt' },
    { id: 8023, feature_heading: 'Long-term brand alignment', feature_icon: 'FaHandsHelping' },
  ],
  901: [
    { id: 9011, feature_heading: 'Recycled blends', feature_icon: 'FaRecycle' },
    { id: 9012, feature_heading: 'Repeat-use durability', feature_icon: 'FaShieldAlt' },
    { id: 9013, feature_heading: 'Retail-ready decoration', feature_icon: 'FaPaintBrush' },
  ],
  902: [
    { id: 9021, feature_heading: 'Sustainability campaigns', feature_icon: 'FaLeaf' },
    { id: 9022, feature_heading: 'Material traceability', feature_icon: 'FaCheckCircle' },
    { id: 9023, feature_heading: 'Buyer communication', feature_icon: 'FaHandsHelping' },
  ],
  1001: [
    { id: 10011, feature_heading: 'Store-ready sizes', feature_icon: 'FaShoppingBasket' },
    { id: 10012, feature_heading: 'Wide branding panels', feature_icon: 'FaPaintBrush' },
    { id: 10013, feature_heading: 'Strong carry handles', feature_icon: 'FaCheckCircle' },
  ],
  1002: [
    { id: 10021, feature_heading: 'Campaign fulfillment', feature_icon: 'FaBoxes' },
    { id: 10022, feature_heading: 'Retail replenishment', feature_icon: 'FaTruck' },
    { id: 10023, feature_heading: 'Bulk packing support', feature_icon: 'FaShieldAlt' },
  ],
  1101: [
    { id: 11011, feature_heading: 'Outer pocket layouts', feature_icon: 'FaToolbox' },
    { id: 11012, feature_heading: 'Organizer interiors', feature_icon: 'FaBoxes' },
    { id: 11013, feature_heading: 'High-capacity builds', feature_icon: 'FaShieldAlt' },
  ],
  1102: [
    { id: 11021, feature_heading: 'Heavy canvas options', feature_icon: 'FaShieldAlt' },
    { id: 11022, feature_heading: 'Industrial stitching', feature_icon: 'FaCheckCircle' },
    { id: 11023, feature_heading: 'Reliable export packing', feature_icon: 'FaTruck' },
  ],
};
const seoByPath = {
  '/': {
    title: 'Crestline | Custom Promotional Textiles Manufacturer',
    description:
      'Crestline (SMC-PVT) Limited manufactures custom promotional textiles, cotton bags, aprons, oven mitts, and export-ready products for global brands.',
  },
  '/about': {
    title: 'About Us | Crestline',
    description:
      'Learn about Crestline (SMC-PVT) Limited, a trusted manufacturer and exporter of custom promotional textiles founded in 1982.',
  },
  '/products': {
    title: 'Products & Custom Manufacturing | Crestline',
    description:
      'Explore Crestline textile products, including cotton bags, aprons, oven mitts, potholders, and custom promotional manufacturing solutions.',
  },
  '/pricing': {
    title: 'Pricing & Lead Times | Crestline',
    description:
      'Request competitive pricing, MOQ details, and lead times from Crestline for custom promotional textile orders.',
  },
  '/contact-us': {
    title: 'Contact Us | Crestline',
    description:
      'Contact Crestline (SMC-PVT) Limited for quotations, production timelines, and custom promotional textile inquiries.',
  },
  '/services': {
    title: 'Services | Crestline',
    description:
      'Discover Crestline manufacturing, sampling, sourcing, and branding services for custom promotional textile programs.',
  },
  '/raw-material': {
    title: 'Raw Materials | Crestline',
    description:
      'Review Crestline raw material capabilities for cotton, poly/cotton, dyed, and export-ready promotional textile production.',
  },
  '/certifications': {
    title: 'Certifications | Crestline',
    description:
      'See Crestline certifications, compliance standards, and responsible production credentials for global textile buyers.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Crestline',
    description:
      'Read Crestline commercial terms, production conditions, and quotation policies for custom promotional textile orders.',
  },
  '/general-information': {
    title: 'General Information | Crestline',
    description:
      'Get general company information about Crestline, its manufacturing process, export background, and buyer support.',
  },
  '/customer-satisfaction': {
    title: 'Customer Satisfaction | Crestline',
    description:
      'Learn how Crestline supports customer satisfaction through quality control, dependable timelines, and responsive communication.',
  },
  '/blogs': {
    title: 'Blogs | Crestline',
    description:
      'Read Crestline insights on promotional textiles, manufacturing quality, sourcing, compliance, and export production.',
  },
  '/blogs/article': {
    title: 'Article | Crestline',
    description:
      'Read Crestline articles covering custom promotional textile manufacturing, sourcing, compliance, and production guidance.',
  },
  '/features': {
    title: 'Manufacturing Features | Crestline',
    description:
      'Explore Crestline manufacturing features, production visibility, quality control systems, and export support capabilities.',
  },
  '/addons': {
    title: 'Capabilities | Crestline',
    description:
      'Review Crestline operational capabilities, manufacturing support, and custom textile production advantages for global buyers.',
  },
};

function normalizeRoute(requestPath = '/') {
  let route = (requestPath || '/').split('?')[0].split('#')[0];

  route = route.replace(/\/index\.html$/i, '/');

  if (!route.startsWith('/')) {
    route = `/${route}`;
  }

  route = route.replace(/\/{2,}/g, '/');

  if (route.length > 1 && route.endsWith('/')) {
    route = route.slice(0, -1);
  }

  return route.toLowerCase() || '/';
}

function resolvePageFile(requestPath) {
  const cleanedPath = decodeURIComponent((requestPath || '/').split('?')[0].split('#')[0]);
  const trimmedPath = cleanedPath.replace(/^\/+/, '').replace(/\/+$/, '');

  if (!trimmedPath) {
    return path.join(siteDir, 'index.html');
  }

  if (cleanedPath.toLowerCase().endsWith('.html')) {
    const directPath = path.join(siteDir, trimmedPath);
    return fs.existsSync(directPath) ? directPath : null;
  }

  const nestedIndexPath = path.join(siteDir, trimmedPath, 'index.html');
  return fs.existsSync(nestedIndexPath) ? nestedIndexPath : null;
}

function getSeoForRoute(route) {
  if (seoByPath[route]) {
    return seoByPath[route];
  }

  const label = route
    .replace(/^\//, '')
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '))
    .join(' | ');

  return {
    title: `${label || 'Crestline'} | Crestline`,
    description:
      'Crestline (SMC-PVT) Limited manufactures custom promotional textiles for global brands with quality, consistency, and responsible production.',
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeJson(value) {
  return JSON.stringify(String(value)).slice(1, -1);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function upsertTag(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace('</head>', `${replacement}\n</head>`);
}

function injectSeo(html, route, baseUrl) {
  const seo = getSeoForRoute(route);
  const canonicalUrl = new URL(route === '/' ? '/' : `${route}/`, baseUrl).toString();
  const imageUrl = new URL('/images/branding/crestline-logo.png?v=20260327a', baseUrl).toString();
  const iconPath = '/images/branding/crestline-logo.png?v=20260327a';
  const linkedinUrl = 'https://www.linkedin.com/company/crestline-smc-pvt-limited/';

  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(seo.title)}</title>`);
  html = upsertTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(seo.description)}">`
  );
  html = upsertTag(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, '<meta name="robots" content="index,follow">');
  html = upsertTag(
    html,
    /<meta\s+name="theme-color"\s+content="[^"]*"\s*\/?>/i,
    '<meta name="theme-color" content="#e8faff">'
  );
  html = upsertTag(
    html,
    /<meta\s+name="application-name"\s+content="[^"]*"\s*\/?>/i,
    '<meta name="application-name" content="Crestline">'
  );
  html = upsertTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/?>/i,
    '<meta property="og:site_name" content="Crestline (SMC-PVT) Limited">'
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    '<meta property="og:type" content="website">'
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(seo.title)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(seo.description)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    '<meta property="og:image:alt" content="Crestline (SMC-PVT) Limited logo">'
  );
  html = upsertTag(
    html,
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/i,
    '<meta name="twitter:card" content="summary_large_image">'
  );
  html = upsertTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`
  );
  html = upsertTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`
  );

  html = upsertTag(
    html,
    /<link\s+rel="me"\s+href="[^"]*linkedin[^"]*"\s*\/?>/i,
    `<link rel="me" href="${escapeHtml(linkedinUrl)}">`
  );

  html = upsertTag(
    html,
    /<link\s+rel="shortcut icon"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="shortcut icon" href="${escapeHtml(iconPath)}">`
  );

  html = upsertTag(
    html,
    /<link\s+rel="apple-touch-icon"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="apple-touch-icon" href="${escapeHtml(iconPath)}">`
  );

  html = html.replace(
    /(\["\$","title","[^"]+",\{"children":")[^"]*("\}\])/g,
    (_, start, end) => `${start}${escapeJson(seo.title)}${end}`
  );
  html = html.replace(
    /(\["\$","meta","[^"]+",\{"name":"description","content":")[^"]*("\}\])/g,
    (_, start, end) => `${start}${escapeJson(seo.description)}${end}`
  );

  html = html.replace(
    /(\[\\"\$\\",\\"title\\",\\"[^"]+\\",\{\\"children\\":\\")[^"]*(\\"\}\])/g,
    (_, start, end) => `${start}${escapeJson(seo.title)}${end}`
  );
  html = html.replace(
    /(\[\\"\$\\",\\"meta\\",\\"[^"]+\\",\{\\"name\\":\\"description\\",\\"content\\":\\")[^"]*(\\"\}\])/g,
    (_, start, end) => `${start}${escapeJson(seo.description)}${end}`
  );
  html = html.replace(
    /(\[\\"\$\\",\\"link\\",\\"[^"]+\\",\{\\"rel\\":\\"icon\\",\\"href\\":\\")[^"]*(\\"\}\])/g,
    (_, start, end) => `${start}${escapeJson(iconPath)}${end}`
  );

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Crestline (SMC-PVT) Limited',
    url: new URL('/', baseUrl).toString(),
    logo: imageUrl,
    sameAs: [linkedinUrl],
  };

  html = upsertTag(
    html,
    /<script\s+id="crestline-org-schema"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="crestline-org-schema" type="application/ld+json">${escapeHtml(JSON.stringify(organizationSchema))}</script>`
  );

  return html;
}

function injectWhatsApp(html) {
  if (html.includes('whatsapp-float-btn')) {
    return html;
  }

  const whatsappStyle = `
    <style>
      .whatsapp-float-btn {
        position: fixed !important;
        right: clamp(14px, 1.5vw, 24px) !important;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 16px) !important;
        width: 64px !important;
        height: 64px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-decoration: none !important;
        z-index: 9999999 !important;
        transition: transform 0.2s ease !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .whatsapp-float-btn:hover {
        transform: translateY(-2px) scale(1.05) !important;
      }
      .whatsapp-float-btn svg {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }
      @media (max-width: 768px) {
        .whatsapp-float-btn {
          right: 12px !important;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 12px) !important;
          width: 54px !important;
          height: 54px !important;
        }
      }
    </style>
  `;

  const whatsappScript = `
    <script>
      (function() {
        let delayedRefinementTimer = 0;

        function applyRefinements() {
          if (!document.querySelector('.whatsapp-float-btn')) {
            const a = document.createElement('a');
            a.className = 'whatsapp-float-btn';
            a.href = 'https://web.whatsapp.com/send?phone=+923212572225';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.ariaLabel = 'Chat on WhatsApp';
            a.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"/><path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"/><defs><linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#5BD066"/><stop offset="1" stop-color="#27B43E"/></linearGradient></defs></svg>';
            document.body.appendChild(a);
          }

          const heroBtnIcons = document.querySelectorAll('.wm-hero-button-icon');
          heroBtnIcons.forEach(icon => {
            icon.style.display = 'none';
          });
        }

        function runRefinementsOnce() {
          applyRefinements();
          window.clearTimeout(delayedRefinementTimer);
          delayedRefinementTimer = window.setTimeout(applyRefinements, 250);
        }

        if (document.readyState === 'complete') runRefinementsOnce();
        else window.addEventListener('load', runRefinementsOnce, { once: true });
      })();
    </script>
  `;

  return html
    .replace('</head>', `${whatsappStyle}\n</head>`)
    .replace('</body>', `${whatsappScript}\n</body>`);
}

function getBaseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/robots.txt', (req, res) => {
  const baseUrl = getBaseUrl(req);

  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const baseUrl = getBaseUrl(req);
  const today = new Date().toISOString().slice(0, 10);
  const urlEntries = publicRoutes
    .map((route) => {
      const loc = new URL(route === '/' ? '/' : `${route}/`, baseUrl).toString();
      return `<url><loc>${escapeXml(loc)}</loc><lastmod>${today}</lastmod></url>`;
    })
    .join('');

  res.type('application/xml');
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}</urlset>`
  );
});

app.get('/api/products.php', (req, res) => {
  res.json(productMenu);
});

app.get('/api/product_cards.php', (req, res) => {
  const productId = Number(req.query.product_id);
  res.json(productCardsById[productId] || []);
});

app.get('/api/features.php', (req, res) => {
  const cardId = Number(req.query.card_id);
  res.json(featureCardsById[cardId] || []);
});

app.get('*', async (req, res, next) => {
  const extension = path.extname(req.path).toLowerCase();

  if (extension && extension !== '.html') {
    return next();
  }

  const pageFile = resolvePageFile(req.path);

  if (!pageFile) {
    return next();
  }

  try {
    const route = normalizeRoute(req.path);
    const baseUrl = getBaseUrl(req);
    const html = await readFile(pageFile, 'utf8');
    const seoInjected = injectSeo(html, route, baseUrl);
    const injectedHtml = injectWhatsApp(seoInjected);

    res.type('html');
    res.send(injectedHtml);
  } catch (error) {
    next(error);
  }
});

app.use(
  express.static(siteDir, {
    extensions: ['html'],
    index: 'index.html',
  })
);

app.listen(port, () => {
  console.log(`Crestline site running at http://localhost:${port}`);
});

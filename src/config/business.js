// ─────────────────────────────────────────────────────────────
//  Business details — edit here and the whole site updates.
// ─────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: 'CB Catters & Sweet',
  tagline: 'Freshly Prepared Sweets on Order at Wholesale Rate',
  bulkNotice: 'WHOLESALE & BULK ORDERS ONLY',

  // Numbers as customers see them
  whatsappDisplay: '+91 98371 72497',
  phoneDisplay: '+91 74558 45671',

  // Numbers used in links: country code + number, digits only (no +, spaces or dashes)
  whatsappNumber: '919837172497',
  phoneNumber: '917455845671',
}

// Smallest order accepted, in kg. Applies to the TOTAL of an order —
// sweets can be mixed (e.g. 4 kg + 6 kg) to reach it.
export const MIN_ORDER_KG = 10

// Festive offer. Set active: false after the festival and the site goes
// back to regular prices everywhere (prices are set in src/data/products.js).
export const OFFER = {
  active: true,
  name: 'Diwali Offer',
}

export const PHONE_LINK = `tel:+${BUSINESS.phoneNumber}`

// Internal links (handled by the router). "#contact" is the footer, present on every page.
export const NAV_LINKS = [
  { to: '/sweets/cheena-sweets', label: 'Cheena' },
  { to: '/sweets/desi-ghee-sweets', label: 'Desi Ghee' },
  { to: '/sweets/kaju-sweets', label: 'Kaju' },
  { to: '/#bulk-orders', label: 'How to Order' },
  { to: '#contact', label: 'Contact' },
]

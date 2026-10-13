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

export const PHONE_LINK = `tel:+${BUSINESS.phoneNumber}`

// Internal links (handled by the router). "#contact" is the footer, present on every page.
export const NAV_LINKS = [
  { to: '/sweets/cheena-sweets', label: 'Cheena' },
  { to: '/sweets/desi-ghee-sweets', label: 'Desi Ghee' },
  { to: '/sweets/kaju-sweets', label: 'Kaju' },
  { to: '/#bulk-orders', label: 'How to Order' },
  { to: '#contact', label: 'Contact' },
]

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

export const NAV_LINKS = [
  { href: '#categories', label: 'Categories' },
  { href: '#sweets', label: 'Our Sweets' },
  { href: '#bulk-orders', label: 'Bulk Orders' },
  { href: '#contact', label: 'Contact' },
]

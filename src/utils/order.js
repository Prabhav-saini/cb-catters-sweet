import { BUSINESS, MIN_ORDER_KG, OFFER } from '../config/business.js'

// ── Money & quantity formatting ──────────────────────────────

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 })

/** 1500 → "₹1,500", 150000 → "₹1,50,000" (Indian grouping) */
export const formatINR = (amount) => `₹${inr.format(amount)}`

/** 2.5 → "2.5 kg" */
export const formatKg = (kg) => `${inr.format(kg)} kg`

export const MAX_KG = 10000

/**
 * Validates a quantity typed by the customer.
 * Returns { value } when valid, or { error } with a friendly message.
 */
export function parseQuantity(raw) {
  const text = String(raw ?? '').trim()
  if (text === '') return { error: 'Please enter a quantity in kg.' }
  if (/^-\s*\d/.test(text)) return { error: 'Quantity must be more than 0 kg.' }
  if (!/^\d*\.?\d+$/.test(text)) return { error: 'Enter a number, e.g. 5 or 2.5' }
  const value = Number(text)
  if (!(value > 0)) return { error: 'Quantity must be more than 0 kg.' }
  if (value > MAX_KG) return { error: `For more than ${inr.format(MAX_KG)} kg, please call us.` }
  if (!/^\d+(\.\d{1,2})?$/.test(String(value))) return { error: 'Use up to 2 decimal places.' }
  return { value }
}

/** Avoids floating-point noise like 0.1 * 3 = 0.30000000000000004 */
export const subtotal = (kg, pricePerKg) => Math.round(kg * pricePerKg * 100) / 100

const round2 = (n) => Math.round(n * 100) / 100

/** Amount saved versus the regular price (0 when no offer). */
export const savings = (kg, product) =>
  product.regularPricePerKg ? round2(kg * (product.regularPricePerKg - product.pricePerKg)) : 0

/** Returns a message if the order total is below the minimum, else null. */
export function minOrderError(totalKg) {
  if (totalKg >= MIN_ORDER_KG) return null
  const short = round2(MIN_ORDER_KG - totalKg)
  return `Minimum order is ${formatKg(MIN_ORDER_KG)} in total. Add ${formatKg(short)} more.`
}

const rateText = (p) =>
  `${formatINR(p.pricePerKg)}/kg` + (p.regularPricePerKg ? ` (${OFFER.name}, regular ${formatINR(p.regularPricePerKg)}/kg)` : '')

// ── WhatsApp messages ───────────────────────────────────────

const GREETING = `Hello ${BUSINESS.name},\n\nI would like to enquire about a bulk order.`
const SIGN_OFF = 'Please confirm availability and order details.'

export function buildProductMessage(product, kg) {
  return [
    GREETING,
    '',
    `Product: ${product.name}`,
    `Product Code: ${product.id}`,
    `Category: ${product.category}`,
    `Quantity: ${formatKg(kg)}`,
    `Rate: ${rateText(product)}`,
    `Estimated Subtotal: ${formatINR(subtotal(kg, product.pricePerKg))}`,
    ...(product.regularPricePerKg ? [`${OFFER.name} Saving: ${formatINR(savings(kg, product))}`] : []),
    '',
    SIGN_OFF,
  ].join('\n')
}

/** lines: [{ product, kg }] */
export function buildCartMessage(lines) {
  const items = lines.map(({ product, kg }, i) =>
    [
      `${i + 1}. ${product.name} (${product.id})`,
      `   Category: ${product.category}`,
      `   ${formatKg(kg)} × ${formatINR(product.pricePerKg)}/kg = ${formatINR(subtotal(kg, product.pricePerKg))}` +
        (product.regularPricePerKg ? ` (regular ${formatINR(product.regularPricePerKg)}/kg)` : ''),
    ].join('\n'),
  )
  const totalKg = lines.reduce((s, l) => s + l.kg, 0)
  const total = lines.reduce((s, l) => s + subtotal(l.kg, l.product.pricePerKg), 0)
  const saved = lines.reduce((s, l) => s + savings(l.kg, l.product), 0)
  return [
    GREETING,
    '',
    ...items,
    '',
    `Total Quantity: ${formatKg(Math.round(totalKg * 100) / 100)}`,
    `Estimated Total: ${formatINR(Math.round(total * 100) / 100)}`,
    ...(saved > 0 ? [`${OFFER.name} Saving: ${formatINR(round2(saved))}`] : []),
    '',
    SIGN_OFF,
  ].join('\n')
}

export const GENERAL_MESSAGE = `${GREETING}\n\nPlease share details of your sweets and wholesale rates.`

/** Builds a WhatsApp click-to-chat link with the message prefilled. */
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`
}

// ── Clipboard (free browser API, best effort) ────────────────

/**
 * Tries to copy text. Must be called directly inside a click handler.
 * Never throws; resolves true/false. The WhatsApp link works either way.
 */
export function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => legacyCopy(text),
      )
    }
  } catch {
    /* fall through to legacy copy */
  }
  return Promise.resolve(legacyCopy(text))
}

function legacyCopy(text) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  } catch {
    return false
  }
}

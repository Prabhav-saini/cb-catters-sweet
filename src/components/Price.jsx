import { Sparkles } from 'lucide-react'
import { OFFER } from '../config/business.js'
import { formatINR } from '../utils/order.js'

/**
 * Per-kg price. During an offer shows: ~~₹400~~ ₹300/kg  25% OFF
 * `item` is a category or product (pricePerKg, regularPricePerKg, discountPercent).
 */
export default function Price({ item, size = 'md', showOff = true, className = '' }) {
  const onOffer = Boolean(item.regularPricePerKg)
  return (
    <span className={`price price--${size} ${className}`}>
      {onOffer && (
        <s className="price__was">
          <span className="visually-hidden">Regular price </span>
          {formatINR(item.regularPricePerKg)}
        </s>
      )}
      <span className="price__now">
        {onOffer && <span className="visually-hidden">{OFFER.name} price </span>}
        {formatINR(item.pricePerKg)}
        <span className="price__unit">/kg</span>
      </span>
      {onOffer && showOff && <span className="price__off">{item.discountPercent}% OFF</span>}
    </span>
  )
}

/** Small festive label, e.g. "✦ Diwali Offer". Renders nothing when no offer is active. */
export function OfferTag({ children, className = '' }) {
  if (!OFFER.active) return null
  return (
    <span className={`offer-tag ${className}`}>
      <Sparkles size={14} aria-hidden="true" />
      {children ?? OFFER.name}
    </span>
  )
}

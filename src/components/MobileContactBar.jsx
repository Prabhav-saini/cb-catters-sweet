import { Phone, ShoppingBag } from 'lucide-react'
import { PHONE_LINK } from '../config/business.js'
import { buildWhatsAppUrl, GENERAL_MESSAGE } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'

/** Fixed bottom bar, visible on small screens only (see CSS). */
export default function MobileContactBar({ cartCount, onOpenCart }) {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick contact">
      <a href={PHONE_LINK}>
        <Phone size={20} aria-hidden="true" /> Call
      </a>
      <a href={buildWhatsAppUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className="mobile-bar__wa">
        <WhatsAppIcon size={20} /> WhatsApp
      </a>
      <button type="button" onClick={onOpenCart}>
        <ShoppingBag size={20} aria-hidden="true" /> My Order{cartCount > 0 ? ` (${cartCount})` : ''}
      </button>
    </div>
  )
}

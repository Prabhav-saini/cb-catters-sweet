import { ClipboardList, MessageCircle, PhoneCall, ShoppingBag } from 'lucide-react'
import { BUSINESS, MIN_ORDER_KG, PHONE_LINK } from '../config/business.js'
import SectionHead from './SectionHead.jsx'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Pick your sweets',
    text: `Browse the three categories and enter the kilograms you need. The minimum order is ${MIN_ORDER_KG} kg in total, and you can mix sweets.`,
  },
  {
    icon: MessageCircle,
    title: 'Send your enquiry',
    text: 'Order a single sweet straight from its card, or add several to your bulk order list and send them together on WhatsApp.',
  },
  {
    icon: PhoneCall,
    title: 'We confirm the details',
    text: 'We reply to confirm availability, final pricing and delivery before your sweets are prepared.',
  },
]

export default function BulkOrders({ cartCount, onOpenCart }) {
  return (
    <section id="bulk-orders" className="section bulk" aria-labelledby="bulk-title">
      <div className="container">
        <SectionHead id="bulk-title" script="Simple as one, two, three" title="How Bulk Ordering Works" sub={BUSINESS.bulkNotice} />

        <ol className="steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="step">
              <span className="step__icon" aria-hidden="true"><Icon size={24} /></span>
              <span className="step__num">Step {i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <div className="bulk__cta">
          <p>
            Prices shown are per kilogram and any totals on this site are <strong>estimates</strong>. Final pricing,
            availability and delivery terms are confirmed by {BUSINESS.name}. Minimum order: {MIN_ORDER_KG} kg in total.
          </p>
          <div className="bulk__buttons">
            <button type="button" className="btn btn--primary" onClick={onOpenCart}>
              <ShoppingBag size={18} aria-hidden="true" />
              {cartCount > 0 ? `Review My Bulk Order (${cartCount})` : 'View Bulk Order List'}
            </button>
            <a className="btn btn--outline" href={PHONE_LINK}>
              <PhoneCall size={18} aria-hidden="true" /> Call for Bulk Orders
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

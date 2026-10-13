import { ChefHat, IndianRupee, MessageCircle, Package } from 'lucide-react'
import { CATEGORIES } from '../data/products.js'
import { formatINR } from '../utils/order.js'

const prices = CATEGORIES.map((c) => c.pricePerKg)

// Only facts from the business brief — no invented claims.
const ITEMS = [
  { icon: ChefHat, title: 'Freshly Prepared', text: 'Every order is made fresh, on order' },
  { icon: IndianRupee, title: 'Wholesale Rates', text: `${formatINR(Math.min(...prices))} – ${formatINR(Math.max(...prices))} per kg` },
  { icon: Package, title: 'Bulk Orders Only', text: 'Wholesale quantities in kilograms' },
  { icon: MessageCircle, title: 'Order on WhatsApp', text: 'Send your full list in one tap' },
]

export default function Highlights() {
  return (
    <section className="highlights scallop-t scallop-b" aria-label="Why order from us">
      <ul className="container highlights__grid">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span className="highlights__icon" aria-hidden="true"><Icon size={30} strokeWidth={1.4} /></span>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

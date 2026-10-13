import { BUSINESS, MIN_ORDER_KG, OFFER } from '../config/business.js'
import { CATEGORIES } from '../data/products.js'
import { formatINR } from '../utils/order.js'
import SectionHead from './SectionHead.jsx'

// Answers use only facts given by the business. Edit freely as policies are decided.
const FAQS = [
  {
    q: 'Do you sell small quantities?',
    a: `No. ${BUSINESS.name} takes wholesale and bulk orders only. Quantities are ordered in kilograms.`,
  },
  {
    q: 'What is the minimum order?',
    a: `${MIN_ORDER_KG} kg in total per order. You can mix sweets to reach it, for example 4 kg Kaju Katli + 6 kg Rasgulla. A single sweet ordered on its own needs to be at least ${MIN_ORDER_KG} kg.`,
  },
  {
    q: 'How are prices calculated?',
    a:
      `Every sweet is priced per kilogram by category: ${CATEGORIES.map((c) => `${c.name} ${formatINR(c.pricePerKg)}/kg` + (c.regularPricePerKg ? ` (regular ${formatINR(c.regularPricePerKg)}/kg)` : '')).join(', ')}.` +
      (OFFER.active ? ` These are ${OFFER.name} prices.` : '') +
      ' Your estimate is simply quantity × rate.',
  },
  {
    q: 'Are the sweets made in advance?',
    a: 'Sweets are freshly prepared on order.',
  },
  {
    q: 'How do I place an order?',
    a: `Open a category, enter the kilograms you need and tap “Order on WhatsApp”. To order several sweets together, use “Add to Bulk Order” and send the full list in one message. You can also call ${BUSINESS.phoneDisplay}.`,
  },
  {
    q: 'Is the total shown on the website final?',
    a: 'No. It is an estimate. Final pricing, availability and delivery terms are confirmed with you directly on WhatsApp or by phone.',
  },
  {
    q: 'What do the product codes mean?',
    a: 'Each sweet has a unique code such as CB-CH-001 (CH = Cheena, DG = Desi Ghee, KJ = Kaju). The code is included in your WhatsApp message so your order is clear.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__inner">
        <SectionHead id="faq-title" script="Good to know" title="Frequently Asked Questions" />
        <div className="faq__list">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="faq__item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

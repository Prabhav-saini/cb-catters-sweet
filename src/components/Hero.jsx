import { ArrowDown, Phone } from 'lucide-react'
import { BUSINESS, PHONE_LINK } from '../config/business.js'
import { CATEGORIES } from '../data/products.js'
import { buildWhatsAppUrl, formatINR, GENERAL_MESSAGE } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'
import SmartImage from './SmartImage.jsx'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="badge badge--bulk">{BUSINESS.bulkNotice}</p>
          <h1 id="hero-title">
            Freshly Prepared Sweets on Order at <em>Wholesale Rate</em>
          </h1>
          <p className="hero__lead">
            Celebrate every occasion with delicious Indian sweets, freshly prepared to order and available at
            wholesale rates for bulk purchases.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href="#categories">
              Explore Our Sweets <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="btn btn--whatsapp btn--lg" href={buildWhatsAppUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} /> Order on WhatsApp
            </a>
          </div>
          <a className="hero__call" href={PHONE_LINK}>
            <Phone size={17} aria-hidden="true" /> Call for Bulk Orders: <strong>{BUSINESS.phoneDisplay}</strong>
          </a>
        </div>

        <div className="hero__media">
          <SmartImage src="images/site/hero.webp" alt="An assortment of Indian sweets and barfis in a gift box" width={1200} height={800} eager />
          <ul className="hero__prices" aria-label="Category prices">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <span>{c.name.replace(' Sweets', '')}</span> {formatINR(c.pricePerKg)}/kg
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

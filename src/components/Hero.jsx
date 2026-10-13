import { ArrowDown, Phone } from 'lucide-react'
import { BUSINESS, PHONE_LINK } from '../config/business.js'
import { CATEGORIES, categoryPath } from '../data/products.js'
import { Link } from '../router.jsx'
import { buildWhatsAppUrl, formatINR, GENERAL_MESSAGE } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'
import SmartImage from './SmartImage.jsx'

export default function Hero() {
  return (
    <section className="hero scallop-b" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="script">Mithai for every celebration</p>
          <h1 id="hero-title">
            Freshly Prepared Sweets on Order at <em>Wholesale Rate</em>
          </h1>
          <p className="badge badge--bulk">{BUSINESS.bulkNotice}</p>
          <p className="hero__lead">
            Celebrate every occasion with delicious Indian sweets, freshly prepared to order and available at
            wholesale rates for bulk purchases.
          </p>
          <div className="hero__ctas">
            <Link className="btn btn--primary btn--lg" to="/#categories">
              Explore Our Sweets <ArrowDown size={18} aria-hidden="true" />
            </Link>
            <a className="btn btn--whatsapp btn--lg" href={buildWhatsAppUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} /> Order on WhatsApp
            </a>
          </div>
          <a className="hero__call" href={PHONE_LINK}>
            <Phone size={17} aria-hidden="true" /> Call for Bulk Orders: <strong>{BUSINESS.phoneDisplay}</strong>
          </a>
        </div>

        <div className="hero__media">
          <div className="arch arch--hero">
            <SmartImage src="images/site/hero.webp" alt="An assortment of Indian sweets and barfis in a gift box" width={768} height={960} eager />
          </div>
          <ul className="hero__prices" aria-label="Category prices">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={categoryPath(c.id)}>
                  <span>{c.name.replace(' Sweets', '')}</span> {formatINR(c.pricePerKg)}/kg
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

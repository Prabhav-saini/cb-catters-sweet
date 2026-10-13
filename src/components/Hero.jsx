import { ArrowDown, Phone } from 'lucide-react'
import { BUSINESS, MIN_ORDER_KG, OFFER, PHONE_LINK } from '../config/business.js'
import { CATEGORIES, categoryPath, MAX_DISCOUNT } from '../data/products.js'
import Price, { OfferTag } from './Price.jsx'
import { Link } from '../router.jsx'
import { buildWhatsAppUrl, GENERAL_MESSAGE } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'
import SmartImage from './SmartImage.jsx'

export default function Hero() {
  return (
    <section className="hero scallop-b" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          {OFFER.active && MAX_DISCOUNT > 0 ? (
            <OfferTag className="offer-tag--lg">{OFFER.name} · up to {MAX_DISCOUNT}% off</OfferTag>
          ) : (
            <p className="script">Mithai for every celebration</p>
          )}
          <h1 id="hero-title">
            Freshly Prepared Sweets on Order at <em>Wholesale Rate</em>
          </h1>
          <div className="hero__badges">
            <p className="badge badge--bulk">{BUSINESS.bulkNotice}</p>
            <p className="badge badge--outline">Min. order {MIN_ORDER_KG} kg · mix any sweets</p>
          </div>
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
          <div className={`price-card ${OFFER.active ? 'price-card--offer' : ''}`}>
            <p className="price-card__title">{OFFER.active ? `✦ ${OFFER.name} Prices ✦` : 'Wholesale Prices'}</p>
            <ul aria-label="Category prices">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link to={categoryPath(c.id)}>
                    <span className="price-card__name">{c.name}</span>
                    <Price item={c} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

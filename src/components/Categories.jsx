import { ArrowRight } from 'lucide-react'
import { CATEGORIES, categoryPath, productsInCategory } from '../data/products.js'
import { Link } from '../router.jsx'
import { formatINR } from '../utils/order.js'
import SectionHead from './SectionHead.jsx'
import SmartImage from './SmartImage.jsx'

const PREVIEW_COUNT = 4

/** Home-page showcase: one rich row per category, linking to its own page. */
export default function Categories() {
  return (
    <section id="categories" className="section showcase" aria-labelledby="categories-title">
      <div className="container">
        <SectionHead
          id="categories-title"
          script="Three ranges, one rate each"
          title="Our Sweet Categories"
          sub="Choose a range to see every sweet in it, set quantities in kilograms and send your order on WhatsApp."
        />

        <div className="showcase__list">
          {CATEGORIES.map((cat, i) => {
            const items = productsInCategory(cat.id)
            const preview = items.slice(0, PREVIEW_COUNT)
            const to = categoryPath(cat.id)
            return (
              <article key={cat.id} className={`showcase-row showcase-row--${i % 3}`} aria-labelledby={`${cat.id}-heading`}>
                <Link to={to} className="showcase-row__media" tabIndex={-1} aria-hidden="true">
                  <div className="arch">
                    <SmartImage src={cat.image} alt="" width={768} height={960} />
                  </div>
                  <span className="showcase-row__count">{items.length} sweets</span>
                </Link>

                <div className="showcase-row__body">
                  <p className="script">{cat.script}</p>
                  <h3 id={`${cat.id}-heading`}>{cat.name}</h3>
                  <p className="showcase-row__price">
                    {formatINR(cat.pricePerKg)}
                    <span>per kg</span>
                  </p>
                  <p className="showcase-row__desc">{cat.description}</p>

                  <ul className="showcase-row__thumbs" aria-label={`A few ${cat.name}`}>
                    {preview.map((p) => (
                      <li key={p.id}>
                        <SmartImage src={p.image} alt={p.name} width={120} height={120} />
                        <span>{p.name}</span>
                      </li>
                    ))}
                    <li className="showcase-row__more" aria-hidden="true">
                      <span className="showcase-row__more-dot">+{items.length - PREVIEW_COUNT}</span>
                      <span>more</span>
                    </li>
                  </ul>

                  <p className="showcase-row__names">
                    <strong>Includes:</strong> {items.map((p) => p.name).join(' · ')}
                  </p>

                  <Link to={to} className="btn btn--primary btn--lg">
                    View all {items.length} {cat.name} <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

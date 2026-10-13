import { ArrowRight } from 'lucide-react'
import { CATEGORIES, productsInCategory } from '../data/products.js'
import { formatINR } from '../utils/order.js'
import SmartImage from './SmartImage.jsx'

export default function Categories() {
  return (
    <section id="categories" className="section categories" aria-labelledby="categories-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Three ranges, one wholesale rate each</p>
          <h2 id="categories-title">Our Sweet Categories</h2>
        </header>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <article key={cat.id} className="category-card">
              <div className="category-card__media">
                <SmartImage src={cat.image} alt={`${cat.name} (illustrative photo)`} width={900} height={675} />
              </div>
              <div className="category-card__body">
                <h3>{cat.name}</h3>
                <p className="category-card__price">
                  {formatINR(cat.pricePerKg)}
                  <span>/kg</span>
                </p>
                <p className="category-card__blurb">
                  {cat.blurb} <span className="muted">{productsInCategory(cat.id).length} varieties.</span>
                </p>
                <a className="btn btn--primary" href={`#${cat.id}`} aria-label={`View ${cat.name}`}>
                  View Sweets <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

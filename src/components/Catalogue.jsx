import { CATEGORIES, productsInCategory } from '../data/products.js'
import { formatINR } from '../utils/order.js'
import ProductCard from './ProductCard.jsx'

export default function Catalogue({ onAddToOrder, notify }) {
  return (
    <section id="sweets" className="section catalogue" aria-labelledby="sweets-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Choose a sweet, set the quantity, send on WhatsApp</p>
          <h2 id="sweets-title">Our Sweets</h2>
        </header>
      </div>

      <nav className="category-tabs" aria-label="Jump to category">
        <div className="container category-tabs__inner">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`}>
              {c.name} <span>{formatINR(c.pricePerKg)}/kg</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="container">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id} className="category-block" aria-labelledby={`${cat.id}-title`}>
            <div className="category-block__head">
              <h3 id={`${cat.id}-title`}>{cat.name}</h3>
              <p className="price-pill">
                All at {formatINR(cat.pricePerKg)}/kg
              </p>
            </div>
            <div className="product-grid">
              {productsInCategory(cat.id).map((p) => (
                <ProductCard key={p.id} product={p} onAddToOrder={onAddToOrder} notify={notify} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

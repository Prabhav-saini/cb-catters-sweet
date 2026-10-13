import { ArrowRight, ChevronRight, Phone, ShoppingBag } from 'lucide-react'
import { BUSINESS, PHONE_LINK } from '../config/business.js'
import { CATEGORIES, categoryPath, productsInCategory } from '../data/products.js'
import { Link } from '../router.jsx'
import { buildWhatsAppUrl, formatINR } from '../utils/order.js'
import usePageMeta from '../usePageMeta.js'
import { WhatsAppIcon } from '../components/Icons.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionHead from '../components/SectionHead.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function CategoryPage({ category, onAddToOrder, notify, cartCount, onOpenCart }) {
  const index = CATEGORIES.indexOf(category)
  const products = productsInCategory(category.id)
  const others = CATEGORIES.filter((c) => c.id !== category.id)
  usePageMeta(`${category.name} — ${formatINR(category.pricePerKg)}/kg`, `${category.description} Wholesale & bulk orders only.`)

  const enquiry = `Hello ${BUSINESS.name},\n\nI would like to enquire about a bulk order of ${category.name} (${formatINR(category.pricePerKg)}/kg).\n\nPlease share availability and order details.`

  return (
    <>
      <section className={`cat-hero category-band--${index % 3} scallop-b`} aria-labelledby="cat-title">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={15} aria-hidden="true" />
            <Link to="/#categories">Categories</Link>
            <ChevronRight size={15} aria-hidden="true" />
            <span aria-current="page">{category.name}</span>
          </nav>

          <div className="cat-hero__grid">
            <div>
              <p className="script">{category.script}</p>
              <h1 id="cat-title">{category.name}</h1>
              <p className="cat-hero__price">
                {formatINR(category.pricePerKg)}
                <span>per kg · {products.length} sweets</span>
              </p>
              <p className="cat-hero__desc">{category.description}</p>
              <p className="badge badge--bulk">{BUSINESS.bulkNotice}</p>
              <div className="cat-hero__ctas">
                <a className="btn btn--whatsapp" href={buildWhatsAppUrl(enquiry)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} /> Enquire about {category.name}
                </a>
                <a className="btn btn--outline" href={PHONE_LINK}>
                  <Phone size={17} aria-hidden="true" /> Call {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="cat-hero__media">
              <div className="arch arch--hero">
                <SmartImage src={category.image} alt={`${category.name} (illustrative photo)`} width={768} height={960} eager />
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="category-tabs" aria-label="Switch category">
        <div className="container category-tabs__inner">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={categoryPath(c.id)} className={c.id === category.id ? 'is-active' : undefined} aria-current={c.id === category.id ? 'page' : undefined}>
              {c.name.replace(' Sweets', '')} <span>{formatINR(c.pricePerKg)}/kg</span>
            </Link>
          ))}
        </div>
      </nav>

      <section className="section cat-products" aria-labelledby="cat-products-title">
        <div className="container">
          <div className="cat-products__head">
            <h2 id="cat-products-title">All {category.name}</h2>
            <p className="muted">Set the quantity in kg, then order a single sweet on WhatsApp or add several to one bulk order.</p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToOrder={onAddToOrder} notify={notify} />
            ))}
          </div>

          <div className="bulk__cta cat-products__cta">
            <p>
              <strong>Ordering several sweets?</strong> Add them to your bulk order from any category and send one
              combined WhatsApp enquiry. Totals are estimates. Final pricing, availability, minimum quantity and
              delivery are confirmed by us.
            </p>
            <div className="bulk__buttons">
              <button type="button" className="btn btn--primary" onClick={onOpenCart}>
                <ShoppingBag size={18} aria-hidden="true" />
                {cartCount > 0 ? `Review Bulk Order (${cartCount})` : 'View Bulk Order'}
              </button>
              <Link to="/#bulk-orders" className="btn btn--outline">How ordering works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section other-cats" aria-labelledby="other-title">
        <div className="container">
          <SectionHead id="other-title" script="Explore more" title="Other Categories" />
          <div className="other-cats__grid">
            {others.map((c) => (
              <Link key={c.id} to={categoryPath(c.id)} className="other-cat">
                <div className="arch">
                  <SmartImage src={c.image} alt="" width={768} height={960} />
                </div>
                <div>
                  <h3>{c.name}</h3>
                  <p className="other-cat__price">{formatINR(c.pricePerKg)}<span>/kg</span></p>
                  <p className="muted">{c.blurb}</p>
                  <span className="other-cat__go">
                    View {productsInCategory(c.id).length} sweets <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

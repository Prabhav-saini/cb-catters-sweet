import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { MIN_ORDER_KG } from '../config/business.js'
import SmartImage from './SmartImage.jsx'
import QuantityInput from './QuantityInput.jsx'
import Price from './Price.jsx'
import { WhatsAppIcon } from './Icons.jsx'
import {
  buildProductMessage,
  buildWhatsAppUrl,
  copyText,
  formatINR,
  formatKg,
  minOrderError,
  parseQuantity,
  savings,
  subtotal,
} from '../utils/order.js'

export default function ProductCard({ product, onAddToOrder, notify }) {
  const [qty, setQty] = useState(String(MIN_ORDER_KG))
  const [touched, setTouched] = useState(false)
  const [orderTried, setOrderTried] = useState(false)
  const parsed = parseQuantity(qty)
  const inputId = `qty-${product.id}`

  // Any positive amount can go to the bulk list; a direct order must meet the minimum on its own.
  const belowMin = parsed.value ? minOrderError(parsed.value) : null
  const canOrder = Boolean(parsed.value) && !belowMin
  const error = touched ? parsed.error || (orderTried ? belowMin : undefined) : undefined

  const message = canOrder ? buildProductMessage(product, parsed.value) : ''
  const waUrl = canOrder ? buildWhatsAppUrl(message) : undefined

  const rejectInvalid = (e) => {
    e?.preventDefault()
    setTouched(true)
    document.getElementById(inputId)?.focus()
  }

  // The <a> opens WhatsApp natively (never popup-blocked). We copy in the same click.
  const handleOrder = (e) => {
    if (!canOrder) {
      setOrderTried(true)
      return rejectInvalid(e)
    }
    copyText(message).then((ok) =>
      notify(ok ? `Order details for ${product.name} copied to clipboard.` : 'Opening WhatsApp — your order details are prefilled.'),
    )
  }

  const handleAdd = () => {
    if (!parsed.value) return rejectInvalid()
    setOrderTried(false)
    onAddToOrder(product, parsed.value)
  }

  const saved = parsed.value ? savings(parsed.value, product) : 0

  return (
    <article className="product-card" aria-labelledby={`${product.id}-name`}>
      <div className="product-card__media">
        <div className="arch arch--card">
          <SmartImage src={product.image} alt={`${product.name} (illustrative photo)`} />
        </div>
        {product.discountPercent > 0 && (
          <span className="product-card__ribbon" aria-hidden="true">{product.discountPercent}% OFF</span>
        )}
        <span className="product-card__code">{product.id}</span>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h4 id={`${product.id}-name`} className="product-card__name">{product.name}</h4>
        <p className="product-card__desc">{product.description}</p>
        <Price item={product} size="md" showOff={false} className="product-card__price" />

        <QuantityInput
          id={inputId}
          value={qty}
          onChange={(v) => {
            setQty(v)
            setTouched(true)
          }}
          error={error}
        />

        <p className="product-card__subtotal" aria-live="polite">
          {parsed.value ? (
            <>
              Est. {formatKg(parsed.value)} = <strong>{formatINR(subtotal(parsed.value, product.pricePerKg))}</strong>
              {saved > 0 && <span className="product-card__save"> · save {formatINR(saved)}</span>}
            </>
          ) : (
            <>&nbsp;</>
          )}
        </p>
        {parsed.value && belowMin && !error && (
          <p className="product-card__hint">
            Min. order {formatKg(MIN_ORDER_KG)}. Add to Bulk Order to mix with other sweets.
          </p>
        )}

        <div className="product-card__actions">
          <a
            className={`btn btn--whatsapp ${canOrder ? '' : 'is-disabled'}`}
            href={waUrl ?? '#'}
            aria-disabled={!canOrder}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOrder}
            aria-label={`Order ${product.name} (${product.id}) on WhatsApp`}
          >
            <WhatsAppIcon size={18} /> Order on WhatsApp
          </a>
          <button type="button" className="btn btn--gold" onClick={handleAdd} aria-label={`Add ${product.name} to bulk order list`}>
            <ShoppingBag size={17} aria-hidden="true" /> Add to Bulk Order
          </button>
        </div>
      </div>
    </article>
  )
}

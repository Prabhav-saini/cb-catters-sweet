import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import SmartImage from './SmartImage.jsx'
import QuantityInput from './QuantityInput.jsx'
import { WhatsAppIcon } from './Icons.jsx'
import { buildProductMessage, buildWhatsAppUrl, copyText, formatINR, formatKg, parseQuantity, subtotal } from '../utils/order.js'

export default function ProductCard({ product, onAddToOrder, notify }) {
  const [qty, setQty] = useState('1')
  const [touched, setTouched] = useState(false)
  const parsed = parseQuantity(qty)
  const error = touched ? parsed.error : undefined
  const inputId = `qty-${product.id}`

  const message = parsed.value ? buildProductMessage(product, parsed.value) : ''
  const waUrl = parsed.value ? buildWhatsAppUrl(message) : undefined

  const rejectInvalid = (e) => {
    e?.preventDefault()
    setTouched(true)
    document.getElementById(inputId)?.focus()
  }

  // The <a> opens WhatsApp natively (never popup-blocked). We copy in the same click.
  const handleOrder = (e) => {
    if (!parsed.value) return rejectInvalid(e)
    copyText(message).then((ok) =>
      notify(ok ? `Order details for ${product.name} copied to clipboard.` : 'Opening WhatsApp — your order details are prefilled.'),
    )
  }

  const handleAdd = () => {
    if (!parsed.value) return rejectInvalid()
    onAddToOrder(product, parsed.value)
  }

  return (
    <article className="product-card" aria-labelledby={`${product.id}-name`}>
      <div className="product-card__media">
        <div className="arch arch--card">
          <SmartImage src={product.image} alt={`${product.name} (illustrative photo)`} />
        </div>
        <span className="product-card__code">{product.id}</span>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h4 id={`${product.id}-name`} className="product-card__name">{product.name}</h4>
        <p className="product-card__desc">{product.description}</p>
        <p className="product-card__price">
          {formatINR(product.pricePerKg)}
          <span>/kg</span>
        </p>

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
            </>
          ) : (
            <>&nbsp;</>
          )}
        </p>

        <div className="product-card__actions">
          <a
            className={`btn btn--whatsapp ${waUrl ? '' : 'is-disabled'}`}
            href={waUrl ?? '#'}
            aria-disabled={!waUrl}
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

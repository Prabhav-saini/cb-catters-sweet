import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { PRODUCTS_BY_ID } from '../data/products.js'
import { Link } from '../router.jsx'
import { buildCartMessage, buildWhatsAppUrl, copyText, formatINR, parseQuantity, subtotal } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'
import QuantityInput from './QuantityInput.jsx'
import SmartImage from './SmartImage.jsx'

/** cart: { [productId]: quantityText } */
export default function CartDrawer({ open, onClose, cart, setQuantity, remove, clear, notify }) {
  const ref = useRef(null)
  const [hint, setHint] = useState('')

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  const lines = Object.entries(cart)
    .filter(([id]) => PRODUCTS_BY_ID[id])
    .map(([id, text]) => ({ product: PRODUCTS_BY_ID[id], text, parsed: parseQuantity(text) }))
  const hasInvalid = lines.some((l) => l.parsed.error)
  const valid = lines.filter((l) => l.parsed.value).map((l) => ({ product: l.product, kg: l.parsed.value }))
  const total = valid.reduce((s, l) => s + subtotal(l.kg, l.product.pricePerKg), 0)

  const canSend = lines.length > 0 && !hasInvalid
  const message = canSend ? buildCartMessage(valid) : ''

  const handleSend = (e) => {
    if (!canSend) {
      e.preventDefault()
      setHint('Please fix the highlighted quantities first.')
      return
    }
    setHint('')
    onClose()
    copyText(message).then((ok) =>
      notify(ok ? 'Bulk order details copied to clipboard.' : 'Opening WhatsApp — your bulk order is prefilled.'),
    )
  }

  return (
    <dialog
      ref={ref}
      className="cart"
      aria-labelledby="cart-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="cart__panel">
        <header className="cart__head">
          <h2 id="cart-title">Your Bulk Order</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close bulk order list">
            <X size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart__empty">
            <ShoppingBag size={40} aria-hidden="true" />
            <p>No sweets added yet.</p>
            <p className="muted">Use “Add to Bulk Order” on any sweet to build a combined enquiry.</p>
            <Link className="btn btn--primary" to="/#categories" onClick={onClose}>Browse Sweets</Link>
          </div>
        ) : (
          <>
            <ul className="cart__lines">
              {lines.map(({ product, text, parsed }) => (
                <li key={product.id} className="cart-line">
                  <SmartImage src={product.image} alt="" width={96} height={72} className="cart-line__img" />
                  <div className="cart-line__info">
                    <p className="cart-line__name">{product.name}</p>
                    <p className="cart-line__meta">
                      {product.id} · {formatINR(product.pricePerKg)}/kg
                    </p>
                    <QuantityInput
                      id={`cart-${product.id}`}
                      value={text}
                      onChange={(v) => setQuantity(product.id, v)}
                      error={parsed.error}
                      label={`Quantity of ${product.name} in kg`}
                      compact
                    />
                  </div>
                  <div className="cart-line__side">
                    <p className="cart-line__subtotal">
                      {parsed.value ? formatINR(subtotal(parsed.value, product.pricePerKg)) : '—'}
                    </p>
                    <button type="button" className="icon-btn icon-btn--sm" onClick={() => remove(product.id)} aria-label={`Remove ${product.name}`}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart__foot">
              <div className="cart__total">
                <span>Estimated Total</span>
                <strong>{formatINR(Math.round(total * 100) / 100)}</strong>
              </div>
              <p className="cart__note">
                Estimate only. Final pricing, availability, minimum order quantity and delivery terms will be
                confirmed by us on WhatsApp.
              </p>
              {hint && hasInvalid && <p className="cart__hint" role="alert">{hint}</p>}
              <a
                className={`btn btn--whatsapp btn--lg btn--block ${canSend ? '' : 'is-disabled'}`}
                href={canSend ? buildWhatsAppUrl(message) : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSend}
                aria-disabled={!canSend}
              >
                <WhatsAppIcon size={20} /> Send Bulk Enquiry on WhatsApp
              </a>
              <button type="button" className="link-btn" onClick={clear}>Clear list</button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  )
}

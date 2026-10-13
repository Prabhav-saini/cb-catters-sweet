import { useEffect, useState } from 'react'
import { Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { BUSINESS, NAV_LINKS, PHONE_LINK } from '../config/business.js'
import { buildWhatsAppUrl, GENERAL_MESSAGE } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'

export default function Header({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="notice-strip">{BUSINESS.bulkNotice}</div>
      <div className="container site-header__bar">
        <a href="#top" className="brand" aria-label={`${BUSINESS.name} — back to top`}>
          <span className="brand__mark" aria-hidden="true">CB</span>
          <span className="brand__name">
            CB Catters <span className="brand__amp">&amp;</span> Sweet
          </span>
        </a>

        <nav className="site-nav" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="icon-btn hide-sm" href={PHONE_LINK} aria-label={`Call ${BUSINESS.phoneDisplay}`} title={`Call ${BUSINESS.phoneDisplay}`}>
            <Phone size={19} />
          </a>
          <a className="btn btn--whatsapp btn--sm hide-sm" href={buildWhatsAppUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={17} /> Enquire for Bulk Orders
          </a>
          <button type="button" className="icon-btn cart-btn" onClick={onOpenCart} aria-label={`Open bulk order list, ${cartCount} item${cartCount === 1 ? '' : 's'}`}>
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="cart-btn__count" aria-hidden="true">{cartCount}</span>}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <div className="mobile-menu__cta">
          <a className="btn btn--whatsapp" href={buildWhatsAppUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> Enquire for Bulk Orders
          </a>
          <a className="btn btn--outline" href={PHONE_LINK}>
            <Phone size={18} /> Call {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  )
}

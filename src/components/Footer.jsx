import { Phone } from 'lucide-react'
import { BUSINESS, NAV_LINKS, PHONE_LINK } from '../config/business.js'
import { IMAGE_CREDITS } from '../data/imageCredits.js'
import { buildWhatsAppUrl, GENERAL_MESSAGE } from '../utils/order.js'
import { WhatsAppIcon } from './Icons.jsx'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{BUSINESS.name}</p>
          <p className="footer-tagline">{BUSINESS.tagline}</p>
          <p className="badge badge--bulk badge--light">{BUSINESS.bulkNotice}</p>
        </div>

        <div>
          <h2 className="footer-heading">Contact for Bulk Orders</h2>
          <ul className="footer-contact">
            <li>
              <a href={buildWhatsAppUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> WhatsApp: {BUSINESS.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={PHONE_LINK}>
                <Phone size={18} aria-hidden="true" /> Call: {BUSINESS.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>© {YEAR} {BUSINESS.name}. All rights reserved.</p>
        <details className="credits">
          <summary>Photos are illustrative · Photo credits</summary>
          <p>
            Product photos are representative images from Wikimedia Commons, not photographs of our own products.
          </p>
          <ul>
            {IMAGE_CREDITS.map((c) => (
              <li key={c.asset}>
                <a href={c.source} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.author},{' '}
                {c.licenseUrl ? (
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license">{c.license}</a>
                ) : (
                  c.license
                )}
                {c.license.startsWith('CC BY') ? ' (cropped & resized)' : ''}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  )
}

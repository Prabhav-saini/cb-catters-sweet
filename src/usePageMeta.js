import { useEffect } from 'react'

const DEFAULT_TITLE = 'CB Catters & Sweet | Wholesale Indian Sweets'
const DEFAULT_DESC =
  'Freshly prepared Indian sweets made to order at wholesale rates. Cheena, Desi Ghee and Kaju sweets for bulk orders only. Enquire on WhatsApp or call.'

/** Sets the browser tab title and meta description for the current page. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | CB Catters & Sweet` : DEFAULT_TITLE
    document.querySelector('meta[name="description"]')?.setAttribute('content', description || DEFAULT_DESC)
  }, [title, description])
}

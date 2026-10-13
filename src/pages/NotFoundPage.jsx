import { Link } from '../router.jsx'
import usePageMeta from '../usePageMeta.js'

export default function NotFoundPage() {
  usePageMeta('Page not found')
  return (
    <section className="section not-found">
      <div className="container">
        <p className="script">Oops!</p>
        <h1>We couldn’t find that page</h1>
        <p className="muted">It may have moved. Our full range of sweets is on the home page.</p>
        <Link to="/#categories" className="btn btn--primary btn--lg">Browse Sweet Categories</Link>
      </div>
    </section>
  )
}

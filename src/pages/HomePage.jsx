import Hero from '../components/Hero.jsx'
import Categories from '../components/Categories.jsx'
import Highlights from '../components/Highlights.jsx'
import BulkOrders from '../components/BulkOrders.jsx'
import Faq from '../components/Faq.jsx'
import usePageMeta from '../usePageMeta.js'

export default function HomePage({ cartCount, onOpenCart }) {
  usePageMeta()
  return (
    <>
      <Hero />
      <Categories />
      <Highlights />
      <BulkOrders cartCount={cartCount} onOpenCart={onOpenCart} />
      <Faq />
    </>
  )
}

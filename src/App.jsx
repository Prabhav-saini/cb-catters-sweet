import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import MobileContactBar from './components/MobileContactBar.jsx'
import { CATEGORIES, categoryPath, PRODUCTS_BY_ID } from './data/products.js'
import { useRouter } from './router.jsx'
import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { formatKg, MAX_KG, parseQuantity } from './utils/order.js'

const STORAGE_KEY = 'cb-bulk-order'

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return Object.fromEntries(Object.entries(saved).filter(([id, q]) => PRODUCTS_BY_ID[id] && typeof q === 'string'))
  } catch {
    return {}
  }
}

export default function App() {
  const { path } = useRouter()
  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      /* storage unavailable — list just won't survive a reload */
    }
  }, [cart])

  const notify = useCallback((text) => {
    clearTimeout(toastTimer.current)
    setToast({ text, key: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 3500)
  }, [])

  const addToOrder = useCallback(
    (product, kg) => {
      setCart((c) => {
        const existing = parseQuantity(c[product.id]).value ?? 0
        const next = Math.min(MAX_KG, Math.round((existing + kg) * 100) / 100)
        return { ...c, [product.id]: String(next) }
      })
      notify(`Added ${formatKg(kg)} ${product.name} to your bulk order.`)
    },
    [notify],
  )

  const setQuantity = (id, text) => setCart((c) => ({ ...c, [id]: text }))
  const remove = (id) =>
    setCart((c) => {
      const next = { ...c }
      delete next[id]
      return next
    })

  const cartCount = Object.keys(cart).length
  const openCart = () => setCartOpen(true)

  function renderPage() {
    if (path === '/') return <HomePage cartCount={cartCount} onOpenCart={openCart} />
    const category = CATEGORIES.find((c) => categoryPath(c.id) === path)
    if (category)
      return (
        <CategoryPage
          key={category.id}
          category={category}
          onAddToOrder={addToOrder}
          notify={notify}
          cartCount={cartCount}
          onOpenCart={openCart}
        />
      )
    return <NotFoundPage />
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header cartCount={cartCount} onOpenCart={openCart} />
      <main id="main">{renderPage()}</main>
      <Footer />
      <MobileContactBar cartCount={cartCount} onOpenCart={openCart} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setQuantity={setQuantity}
        remove={remove}
        clear={() => setCart({})}
        notify={notify}
      />
      <div className="toast-region" role="status" aria-live="polite">
        {toast && <div key={toast.key} className="toast">{toast.text}</div>}
      </div>
    </>
  )
}

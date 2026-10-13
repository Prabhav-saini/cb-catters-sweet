// Tiny client-side router (no dependency). Clean URLs like /sweets/kaju-sweets.
// The host must serve index.html for unknown paths — see vercel.json / public/_redirects.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const RouterContext = createContext(null)

const current = () => ({ path: window.location.pathname.replace(/\/+$/, '') || '/', hash: window.location.hash })

function scrollToHash(hash) {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
  if (el) el.scrollIntoView()
  return Boolean(el)
}

export function Router({ children }) {
  const [location, setLocation] = useState(current)

  useEffect(() => {
    const onPop = () => setLocation(current())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // After a page change: jump to #section if given, otherwise to the top.
  useEffect(() => {
    requestAnimationFrame(() => {
      if (!scrollToHash(location.hash)) window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }, [location])

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.href)
    window.history.pushState(null, '', url)
    setLocation(current())
  }, [])

  return <RouterContext.Provider value={{ ...location, navigate }}>{children}</RouterContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export const useRouter = () => useContext(RouterContext)

/** <a> that navigates without a page reload. Use for internal paths like "/" or "/#faq". */
export function Link({ to, onClick, ...props }) {
  const { navigate } = useRouter()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handle} {...props} />
}

import { useState } from 'react'
import { asset } from '../utils/asset.js'

const FALLBACK = asset('images/fallback.svg')

/** <img> with fixed dimensions (no layout shift) and a branded fallback if the photo fails. */
export default function SmartImage({ src, alt, width = 800, height = 600, eager = false, className }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      className={className}
      src={failed ? FALLBACK : asset(src)}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
    />
  )
}

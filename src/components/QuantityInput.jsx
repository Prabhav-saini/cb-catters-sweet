import { Minus, Plus } from 'lucide-react'
import { MAX_KG, parseQuantity } from '../utils/order.js'

const round = (n) => Math.round(n * 100) / 100

/** Kilogram quantity field with −/+ steppers. `value` is the raw text so users can type freely. */
export default function QuantityInput({ id, value, onChange, error, label = 'Quantity (kg)', compact = false }) {
  const current = parseQuantity(value).value ?? 0
  const step = (delta) => {
    const next = delta < 0 ? Math.max(0.5, round(current - 1)) : Math.min(MAX_KG, round(current + 1))
    onChange(String(next))
  }

  return (
    <div className={`qty ${compact ? 'qty--compact' : ''}`}>
      <label htmlFor={id} className={compact ? 'visually-hidden' : 'qty__label'}>
        {label}
      </label>
      <div className={`qty__control ${error ? 'is-invalid' : ''}`}>
        <button type="button" className="qty__btn" onClick={() => step(-1)} aria-label="Decrease quantity by 1 kg" disabled={current <= 0.5}>
          <Minus size={16} />
        </button>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(',', '.'))}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="qty__unit" aria-hidden="true">kg</span>
        <button type="button" className="qty__btn" onClick={() => step(1)} aria-label="Increase quantity by 1 kg">
          <Plus size={16} />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="qty__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

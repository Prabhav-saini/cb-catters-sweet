function Sprig({ flip }) {
  return (
    <svg className="ornament" viewBox="0 0 64 20" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M2 10h34" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M20 10c4-7 11-8 15-3-4 6-11 7-15 3z" fill="currentColor" opacity=".85" />
      <path d="M20 10c4 7 11 8 15 3-4-6-11-7-15-3z" fill="currentColor" opacity=".55" />
      <circle cx="44" cy="10" r="3.2" fill="currentColor" />
      <circle cx="53" cy="10" r="1.8" fill="currentColor" opacity=".7" />
      <circle cx="60" cy="10" r="1.1" fill="currentColor" opacity=".5" />
    </svg>
  )
}

/** Centered section title with gold flourishes and an optional script accent line. */
export default function SectionHead({ id, script, title, sub, tone = 'dark' }) {
  return (
    <header className={`section-head section-head--${tone}`}>
      {script && <p className="script">{script}</p>}
      <div className="section-head__row">
        <Sprig />
        <h2 id={id}>{title}</h2>
        <Sprig flip />
      </div>
      {sub && <p className="section-head__sub">{sub}</p>}
    </header>
  )
}

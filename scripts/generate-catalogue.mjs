// Regenerates PRODUCT_CATALOGUE.md from src/data/products.js
// Run: npm run catalogue
import { writeFileSync } from 'node:fs'
import { MIN_ORDER_KG, OFFER } from '../src/config/business.js'
import { CATEGORIES, PRODUCTS } from '../src/data/products.js'

const inr = (n) => `₹${new Intl.NumberFormat('en-IN').format(n)}`
const priceCell = (x) => (x.regularPricePerKg ? `~~${inr(x.regularPricePerKg)}~~ **${inr(x.pricePerKg)}**` : inr(x.pricePerKg))
const lines = [
  '# CB Catters & Sweet — Product Catalogue',
  '',
  '> Generated from `src/data/products.js` by `npm run catalogue`. Do not edit by hand.',
  '',
  `Total products: **${PRODUCTS.length}** · Minimum order: **${MIN_ORDER_KG} kg** in total (sweets can be mixed)`,
  '',
  ...(OFFER.active ? [`**${OFFER.name} is active.** Struck-through prices are regular prices; bold prices are what customers pay.`, ''] : []),
  '| Category | Products | Price per kg | Discount |',
  '|---|---:|---:|---:|',
  ...CATEGORIES.map((c) => `| ${c.name} | ${PRODUCTS.filter((p) => p.categoryId === c.id).length} | ${priceCell(c)} | ${c.discountPercent ? c.discountPercent + '%' : '—'} |`),
  '',
  '## All Products',
  '',
  '| Product ID | Product Name | Category | Price per kg |',
  '|---|---|---|---:|',
  ...PRODUCTS.map((p) => `| ${p.id} | ${p.name} | ${p.category} | ${priceCell(p)} |`),
  '',
]
writeFileSync(new URL('../PRODUCT_CATALOGUE.md', import.meta.url), lines.join('\n'))
console.log(`PRODUCT_CATALOGUE.md written (${PRODUCTS.length} products)`)

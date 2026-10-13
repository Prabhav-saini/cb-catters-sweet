// Regenerates PRODUCT_CATALOGUE.md from src/data/products.js
// Run: npm run catalogue
import { writeFileSync } from 'node:fs'
import { CATEGORIES, PRODUCTS } from '../src/data/products.js'

const inr = (n) => `₹${new Intl.NumberFormat('en-IN').format(n)}`
const lines = [
  '# CB Catters & Sweet — Product Catalogue',
  '',
  '> Generated from `src/data/products.js` by `npm run catalogue`. Do not edit by hand.',
  '',
  `Total products: **${PRODUCTS.length}**`,
  '',
  '| Category | Products | Price per kg |',
  '|---|---:|---:|',
  ...CATEGORIES.map((c) => `| ${c.name} | ${PRODUCTS.filter((p) => p.categoryId === c.id).length} | ${inr(c.pricePerKg)} |`),
  '',
  '## All Products',
  '',
  '| Product ID | Product Name | Category | Price per kg |',
  '|---|---|---|---:|',
  ...PRODUCTS.map((p) => `| ${p.id} | ${p.name} | ${p.category} | ${inr(p.pricePerKg)} |`),
  '',
]
writeFileSync(new URL('../PRODUCT_CATALOGUE.md', import.meta.url), lines.join('\n'))
console.log(`PRODUCT_CATALOGUE.md written (${PRODUCTS.length} products)`)

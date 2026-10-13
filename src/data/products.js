// ─────────────────────────────────────────────────────────────
//  Product catalogue
//
//  • Prices are set per CATEGORY. Change a category price once and
//    every sweet in it updates:
//      regularPricePerKg – normal price
//      offerPricePerKg   – festive price, used while OFFER.active is
//                          true (src/config/business.js)
//  • Product IDs are permanent. Do not reuse or renumber them —
//    customers quote them on WhatsApp. Add new items with the
//    next number (e.g. CB-CH-011).
//  • Images live in public/images/products/<ID>.webp. To use
//    your own photo, replace that file (keep the same name).
//    See IMAGE_CREDITS.md before removing any photo credit.
// ─────────────────────────────────────────────────────────────

import { OFFER } from '../config/business.js'

const CATEGORY_DATA = [
  {
    id: 'cheena-sweets',
    name: 'Cheena Sweets',
    code: 'CH',
    regularPricePerKg: 400,
    offerPricePerKg: 300,
    image: 'images/site/cat-cheena.webp',
    blurb: 'Soft, syrupy classics made from fresh chhena.',
    script: 'Soft, syrupy & fresh',
    description:
      'Classic chhena sweets from the Bengal and Odisha tradition: spongy Rasgulla, creamy Ras Malai, baked Chhena Poda, Rajbhog and more. Every sweet in this range is one wholesale rate per kilogram.',
  },
  {
    id: 'desi-ghee-sweets',
    name: 'Desi Ghee Sweets',
    code: 'DG',
    regularPricePerKg: 600,
    offerPricePerKg: 500,
    image: 'images/site/cat-desi-ghee.webp',
    blurb: 'Ladoos, barfis, peda and festive classics.',
    script: 'Rich & festive',
    description:
      'Traditional favourites for every celebration: Boondi, Besan and Motichoor Ladoo, Mysore Pak, Soan Papdi, Balushahi, Kesar Peda and barfis in mawa, coconut and moong dal. All at one wholesale rate per kilogram.',
  },
  {
    id: 'kaju-sweets',
    name: 'Kaju Sweets',
    code: 'KJ',
    regularPricePerKg: 1200,
    offerPricePerKg: 800,
    image: 'images/site/cat-kaju.webp',
    blurb: 'Premium cashew sweets — katlis, rolls and more.',
    script: 'Premium cashew classics',
    description:
      'Cashew sweets for gifting and special occasions: Kaju Katli, Kaju Kesar Katli, Kaju Rolls with pista, anjeer, rose or dry-fruit, Kaju Paan and Kaju Apple. All at one wholesale rate per kilogram.',
  },
]

// Adds the prices the site actually uses:
//   pricePerKg        – what the customer pays (offer price while the offer runs)
//   regularPricePerKg – shown struck through during the offer, else null
//   discountPercent   – e.g. 25, or 0 when no offer
export const CATEGORIES = CATEGORY_DATA.map((c) => {
  const onOffer = OFFER.active && c.offerPricePerKg < c.regularPricePerKg
  return {
    ...c,
    pricePerKg: onOffer ? c.offerPricePerKg : c.regularPricePerKg,
    regularPricePerKg: onOffer ? c.regularPricePerKg : null,
    discountPercent: onOffer ? Math.round((1 - c.offerPricePerKg / c.regularPricePerKg) * 100) : 0,
  }
})

// [id, name, short description] grouped by category id
const ITEMS = {
  'cheena-sweets': [
    ['CB-CH-001', 'Rasgulla', 'Soft, spongy chhena balls in light sugar syrup.'],
    ['CB-CH-002', 'Ras Malai', 'Chhena discs soaked in sweetened, saffron-tinted milk.'],
    ['CB-CH-003', 'Sandesh', 'Delicate Bengali sweet of sweetened fresh chhena.'],
    ['CB-CH-004', 'Chhena Poda', "Odisha's baked chhena sweet with a caramelised crust."],
    ['CB-CH-005', 'Cham Cham', 'Oblong chhena sweet, often finished with grated mawa.'],
    ['CB-CH-006', 'Chhena Murki', 'Small chhena cubes with a thin sugar coating.'],
    ['CB-CH-007', 'Chhena Jalebi', 'Chhena-based jalebi, fried and soaked in syrup.'],
    ['CB-CH-008', 'Rajbhog', 'Large, rich rasgulla-style sweet with a saffron hue.'],
    ['CB-CH-009', 'Chhena Gaja', 'Rectangular fried chhena sweet soaked in syrup.'],
    ['CB-CH-010', 'Rasabali', 'Fried, flattened chhena discs in thickened sweet milk.'],
  ],
  'desi-ghee-sweets': [
    ['CB-DG-001', 'Boondi Ladoo', 'Round ladoos of tiny fried gram-flour pearls in syrup.'],
    ['CB-DG-002', 'Soan Papdi', 'Flaky, melt-in-the-mouth layered sweet squares.'],
    ['CB-DG-003', 'Balushahi', 'Fried, glazed pastry with a soft, flaky centre.'],
    ['CB-DG-004', 'Mysore Pak', 'Classic South Indian gram-flour sweet with a rich texture.'],
    ['CB-DG-005', 'Besan Ladoo', 'Roasted gram-flour ladoo with a nutty aroma.'],
    ['CB-DG-006', 'Motichoor Ladoo', 'Soft ladoo of fine boondi pearls, a festive favourite.'],
    ['CB-DG-007', 'Mawa Barfi', 'Smooth, milky barfi made from mawa (khoya).'],
    ['CB-DG-008', 'Kesar Peda', 'Saffron-flavoured milk peda.'],
    ['CB-DG-009', 'Nariyal Barfi', 'Coconut barfi with a soft, moist bite.'],
    ['CB-DG-010', 'Moong Dal Barfi', 'Rich barfi made from roasted moong dal.'],
  ],
  'kaju-sweets': [
    ['CB-KJ-001', 'Kaju Katli', 'Classic diamond-cut cashew sweet.'],
    ['CB-KJ-002', 'Kaju Roll', 'Smooth cashew dough rolled into neat cylinders.'],
    ['CB-KJ-003', 'Kaju Pista Roll', 'Cashew roll with a pistachio centre.'],
    ['CB-KJ-004', 'Kaju Anjeer Roll', 'Cashew roll with a fig (anjeer) filling.'],
    ['CB-KJ-005', 'Kaju Pista Sandwich', 'Layers of cashew and pistachio pressed together.'],
    ['CB-KJ-006', 'Kaju Apple', 'Cashew sweet shaped and coloured like a little apple.'],
    ['CB-KJ-007', 'Kaju Paan', 'Cashew sweet shaped like a folded paan.'],
    ['CB-KJ-008', 'Kaju Kesar Katli', 'Kaju katli flavoured with saffron (kesar).'],
    ['CB-KJ-009', 'Kaju Rose Roll', 'Cashew roll with a delicate rose flavour.'],
    ['CB-KJ-010', 'Kaju Dry Fruit Roll', 'Cashew roll filled with chopped dry fruits.'],
  ],
}

export const PRODUCTS = CATEGORIES.flatMap((cat) =>
  ITEMS[cat.id].map(([id, name, description]) => ({
    id,
    name,
    category: cat.name,
    categoryId: cat.id,
    pricePerKg: cat.pricePerKg,
    regularPricePerKg: cat.regularPricePerKg,
    discountPercent: cat.discountPercent,
    image: `images/products/${id}.webp`,
    description,
  })),
)

export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))

export const MAX_DISCOUNT = Math.max(...CATEGORIES.map((c) => c.discountPercent))

export const categoryPath = (categoryId) => `/sweets/${categoryId}`

export const productsInCategory = (categoryId) =>
  PRODUCTS.filter((p) => p.categoryId === categoryId)

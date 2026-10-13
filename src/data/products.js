// ─────────────────────────────────────────────────────────────
//  Product catalogue
//
//  • Prices are set per CATEGORY (pricePerKg below). Change a
//    category price once and every sweet in it updates.
//  • Product IDs are permanent. Do not reuse or renumber them —
//    customers quote them on WhatsApp. Add new items with the
//    next number (e.g. CB-CH-011).
//  • Images live in public/images/products/<ID>.webp. To use
//    your own photo, replace that file (keep the same name).
//    See IMAGE_CREDITS.md before removing any photo credit.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: 'cheena-sweets',
    name: 'Cheena Sweets',
    code: 'CH',
    pricePerKg: 300,
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
    pricePerKg: 500,
    image: 'images/site/cat-desi-ghee.webp',
    blurb: 'Rich festive favourites for celebrations and functions.',
    script: 'Rich & festive',
    description:
      'A festive range of traditional favourites: Chhena Jhili, Kacha Golla, Raskadam, Malai Chaap, Sarpuria and more. Rich, celebratory sweets for functions and festivals, all at one wholesale rate per kilogram.',
  },
  {
    id: 'kaju-sweets',
    name: 'Kaju Sweets',
    code: 'KJ',
    pricePerKg: 800,
    image: 'images/site/cat-kaju.webp',
    blurb: 'Premium cashew sweets — katlis, rolls and more.',
    script: 'Premium cashew classics',
    description:
      'Cashew sweets for gifting and special occasions: Kaju Katli, Kaju Kesar Katli, Kaju Rolls with pista, anjeer, rose or dry-fruit, Kaju Paan and Kaju Apple. All at one wholesale rate per kilogram.',
  },
]

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
    ['CB-DG-001', 'Chhena Jhili', 'Fried chhena dumplings soaked in sugar syrup.'],
    ['CB-DG-002', 'Kacha Golla', 'Soft, lightly cooked sweet chhena from Bengal.'],
    ['CB-DG-003', 'Chhena Toast', 'Toast-shaped chhena sweet, a sweet-shop favourite.'],
    ['CB-DG-004', 'Chhena Gilori', 'Chhena sweet folded in the shape of a paan gilori.'],
    ['CB-DG-005', 'Raskadam', 'Small sweet centre coated and rolled in poppy seeds.'],
    ['CB-DG-006', 'Chhena Payesh', 'Creamy chhena simmered in sweetened milk.'],
    ['CB-DG-007', 'Malai Chaap', 'Chhena patties layered with thick sweetened malai.'],
    ['CB-DG-008', 'Chhena Sandwich', 'Layered chhena sweet with a creamy filling.'],
    ['CB-DG-009', 'Chhena Malpua', 'Soft, syrup-soaked malpua.'],
    ['CB-DG-010', 'Sarpuria', 'Layered sweet of Krishnanagar made from cream and khoya.'],
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
    image: `images/products/${id}.webp`,
    description,
  })),
)

export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))

export const categoryPath = (categoryId) => `/sweets/${categoryId}`

export const productsInCategory = (categoryId) =>
  PRODUCTS.filter((p) => p.categoryId === categoryId)

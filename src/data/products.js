import image1 from '../assets/image1.jpeg'
import image2 from '../assets/image2.jpeg'
import image3 from '../assets/image3.jpeg'
import image4 from '../assets/image4.jpeg'
import image5 from '../assets/image5.jpeg'
import image6 from '../assets/image6.jpeg'

// Image mapping (verified by visual scan):
// image1 = Shop lifestyle photo (bulbs + Sun Best unit in use)
// image2 = Family watching TV lifestyle photo
// image3 = Diamond package product shot (TV + Fan + panel + bulbs + battery)
// image4 = Plus Fan package product shot (Fan + panel + bulbs + battery)
// image5 = Plus TV package product shot (TV + panel + bulbs + battery)
// image6 = Basic package product shot (panel + bulbs + battery only)

export const products = [
  {
    id: 'sun-best-basic',
    slug: 'sun-best-basic',
    name: 'Sun Best Basic',
    tagline: 'Perfect for small homes',
    shortDescription: 'Very affordable for lighting and charging of mobile phones.',
    description: 'The Sun Best Basic is your entry-level solar home system — perfect for small homes that need reliable lighting and phone charging without depending on NEPA or fuel generators.',
    price: 197000,
    deposit: 59100,
    depositPercent: 30,
    image: image6,
    images: [image6, image1],
    category: 'home',
    features: [
      '4 very bright LED bulbs',
      'Fast USB charging ports',
      'Solar panel included',
      'Easy installation',
    ],
    powers: ['LED bulbs (4 points)', 'Phone charging'],
    whyThisProduct: [
      'Most affordable option',
      'Perfect for basic lighting needs',
      'Ideal for small apartments',
      'Zero fuel cost',
    ],
    whatYouGet: ['Solar panel', 'Battery system', 'Installation', '4 LED bulbs', 'USB charging cables', 'Customer support'],
    installmentMonths: [3, 6, 9, 12],
  },
  {
    id: 'sun-best-plus-fan',
    slug: 'sun-best-plus-fan',
    name: 'Sun Best Plus (Fan)',
    tagline: 'Basic + 16" Standing Fan',
    shortDescription: '4 very bright bulbs for lighting, fast USB charging ports and a 16" energy saving high blowing fan to cool.',
    description: 'The Sun Best Plus with Fan gives you everything in the Basic package plus a powerful 16-inch energy-saving standing fan. Stay cool and lit without generator noise.',
    price: 250000,
    deposit: 75000,
    depositPercent: 30,
    image: image4,
    images: [image4, image1],
    category: 'home',
    features: [
      '4 very bright LED bulbs',
      'Fast USB charging ports',
      '16" energy saving standing fan',
      'Solar panel included',
    ],
    powers: ['LED bulbs (4 points)', 'Fan', 'Phone charging'],
    whyThisProduct: [
      'Stay cool without generator',
      'Energy-saving fan included',
      'Longer battery backup',
      'Perfect for families',
    ],
    whatYouGet: ['Solar panel', 'Battery system', 'Installation', '4 LED bulbs', '16" standing fan', 'USB charging cables', 'Customer support'],
    installmentMonths: [3, 6, 9, 12],
  },
  {
    id: 'sun-best-plus-tv',
    slug: 'sun-best-plus-tv',
    name: 'Sun Best Plus (TV)',
    tagline: 'Basic + 32" Smart TV',
    shortDescription: '4 very bright bulbs for lighting, fast USB charging ports and a 32" energy saving SMART TV for premium entertainment.',
    description: 'The Sun Best Plus with TV delivers everything in the Basic package plus a 32-inch energy-saving Smart TV. Enjoy premium entertainment powered entirely by solar.',
    price: 280000,
    deposit: 84000,
    depositPercent: 30,
    image: image5,
    images: [image5, image2],
    category: 'home',
    features: [
      '4 very bright LED bulbs',
      'Fast USB charging ports',
      '32" energy saving Smart TV',
      'Solar panel included',
    ],
    powers: ['LED bulbs (4 points)', '32" Smart TV', 'Phone charging'],
    whyThisProduct: [
      'Premium entertainment included',
      'Energy-saving Smart TV',
      'Stable performance',
      'Ideal for families',
    ],
    whatYouGet: ['Solar panel', 'Battery system', 'Installation', '4 LED bulbs', '32" Smart TV', 'USB charging cables', 'Customer support'],
    installmentMonths: [3, 6, 9, 12],
  },
  {
    id: 'sun-best-diamond',
    slug: 'sun-best-diamond',
    name: 'Sun Best Diamond',
    tagline: 'Basic + Fan + TV — Maximum Comfort',
    shortDescription: '4 very bright bulbs for lighting, fast USB charging ports, a 16" energy saving high-blowing fan to cool, a 32" energy saving SMART TV for premium entertainment and relaxation.',
    description: 'The Sun Best Diamond is our premium package — everything you need for maximum comfort. Bright lighting, powerful fan, Smart TV, and phone charging all powered by clean solar energy.',
    price: 350000,
    deposit: 105000,
    depositPercent: 30,
    image: image3,
    images: [image3, image2],
    category: 'home',
    features: [
      '4 very bright LED bulbs',
      'Fast USB charging ports',
      '16" energy saving standing fan',
      '32" energy saving Smart TV',
      'Solar panel included',
    ],
    powers: ['LED bulbs (4 points)', 'Fan', '32" Smart TV', 'Phone charging'],
    whyThisProduct: [
      'Maximum comfort package',
      'Everything included',
      'Longer backup time',
      'Built for serious usage',
    ],
    whatYouGet: ['Solar panel', 'Battery system', 'Installation', '4 LED bulbs', '16" standing fan', '32" Smart TV', 'USB charging cables', 'Customer support'],
    installmentMonths: [3, 6, 9, 12],
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const formatPrice = (price) => {
  return '₦' + price.toLocaleString('en-NG')
}

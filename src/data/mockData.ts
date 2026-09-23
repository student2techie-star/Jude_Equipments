import type { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Electronic Weighing Scales',
    slug: 'electronic-weighing-scales',
    description: 'Precision weighing solutions for retail, commercial and professional applications.',
    imageUrl: 'https://images.unsplash.com/photo-1590845947376-2638caa89309?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c2',
    name: 'Industrial Weighing Scales',
    slug: 'industrial-weighing-scales',
    description: 'Heavy-duty weighing equipment for warehouses and factories.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c3',
    name: 'Mechanical Weighing Scales',
    slug: 'mechanical-weighing-scales',
    description: 'Durable mechanical scales for classic and robust weighing.',
    imageUrl: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c4',
    name: 'Digital Weighing Scales',
    slug: 'digital-weighing-scales',
    description: 'Modern digital scales with advanced accuracy.',
    imageUrl: 'https://images.unsplash.com/photo-1611078706346-6085dbbba174?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c5',
    name: 'Cash Counting Machines',
    slug: 'cash-counting-machines',
    description: 'Reliable currency counting and sorting machines with fake note detection.',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c6',
    name: 'Billing Machines',
    slug: 'billing-machines',
    description: 'Fast and reliable billing solutions for retail environments.',
    imageUrl: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c7',
    name: 'POS Systems & Accessories',
    slug: 'pos-systems-accessories',
    description: 'Complete point-of-sale hardware and accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c8',
    name: 'Office Supplies & Automation',
    slug: 'office-supplies-automation',
    description: 'Essential supplies and automation tools for business efficiency.',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    categoryId: 'c1',
    name: 'JEP-TB Digital Retail Scale 30kg',
    slug: 'jep-tb-digital-retail-scale',
    description: 'High-precision digital retail scale with dual LED display, perfect for grocery stores, supermarkets, and general retail. Features include tare function, piece counting, and price computing capabilities.',
    price: 4500,
    salePrice: 3800,
    sku: 'JE-RET-001',
    stockQuantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1616423641405-4c0a520281b5?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    specs: {
      "Capacity": "30 kg",
      "Accuracy": "1 g / 2 g",
      "Platform Size": "300 x 220 mm",
      "Material": "ABS structure with stainless-steel plate",
      "Power": "AC 110-240V / DC 4V rechargeable battery",
      "Display": "Front and rear LED with backlight"
    }
  },
  {
    id: 'p2',
    categoryId: 'c2',
    name: 'Heavy Duty Platform Scale 500kg',
    slug: 'heavy-duty-platform-scale-500kg',
    description: 'Industrial grade platform scale designed for warehouses, logistics, and heavy manufacturing. Built with rugged mild steel and high-resolution load cells for accurate heavy weighing.',
    price: 18500,
    sku: 'JE-IND-500',
    stockQuantity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    specs: {
      "Capacity": "250-500 kg",
      "Accuracy": "50 g",
      "Platform Size": "450 x 600 mm",
      "Material": "Mild/Stainless Steel",
      "Power": "220V, battery backup",
      "Display": "LED/Digital"
    }
  },
  {
    id: 'p3',
    categoryId: 'c5',
    name: 'UV/MG Currency Counting Machine',
    slug: 'uv-mg-currency-counter',
    description: 'Fast and reliable cash counting machine with advanced UV and MG counterfeit detection. Perfect for banks, retail shops, and cash-intensive businesses.',
    price: 12500,
    salePrice: 9999,
    sku: 'JE-CASH-001',
    stockQuantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-ed4718579471?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    specs: {
      "Counting Speed": "1000 notes/min",
      "Detection": "UV, MG, IR double-note",
      "Display": "LED external",
      "Features": "Auto-start, batch counting, sound error alert"
    }
  },
  {
    id: 'p4',
    categoryId: 'c7',
    name: 'Thermal Barcode Printer',
    slug: 'thermal-barcode-printer',
    sku: 'TBP-200',
    shortDescription: 'High-speed thermal barcode printer for POS systems.',
    price: 6500,
    salePrice: 5999,
    stockQuantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
  }
];

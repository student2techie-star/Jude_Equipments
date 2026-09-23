import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useProductStore } from '../store/useProductStore'

export default function Home() {
  const { categories, products, isLoading } = useProductStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading catalogue...</div>;
  }

  return (
    <div className="space-y-24 py-8">
      <Helmet>
        <title>Weighing Scales & Business Equipment in Chennai | Jude Equipment</title>
        <meta name="description" content="Jude Equipment supplies electronic, digital, industrial and mechanical weighing scales, billing machines, cash counters, POS equipment and animal weighing solutions in Chennai and across India." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
          alt="Industrial Equipment" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-20 container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mb-6 leading-tight"
          >
            Weighing Scales & Business Equipment Solutions
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold mb-6 text-accent"
          >
            Reliable Equipment for Modern Businesses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mb-10"
          >
            Explore professional weighing scales, industrial weighing equipment, billing machines, cash counting machines, POS products and animal weighing solutions for retail, commercial and industrial applications.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/products" className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
              Shop Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full font-medium transition-colors">
              Contact Jude Equipment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 max-w-4xl text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Weighing & Business Equipment for Every Application</h2>
        <p className="text-muted text-lg leading-relaxed">
          Jude Equipment Pvt. Ltd. provides weighing equipment and business solutions for retail, commercial, industrial and specialized applications.
        </p>
        <p className="text-muted leading-relaxed">
          Our product range includes electronic weighing scales, digital weighing machines, industrial platform scales, mechanical weighing scales, jewellery scales, billing machines, cash counting machines, POS equipment, animal weighing scales and weighing scale spare parts.
        </p>
        <p className="text-muted leading-relaxed font-medium">
          Based in Chennai, Tamil Nadu, Jude Equipment serves businesses looking for practical weighing, billing, cash-management and retail technology solutions.
        </p>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Explore Our Product Range</h2>
            <p className="text-muted">Find the perfect equipment for your business needs.</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-1 text-accent font-medium hover:underline">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/products?category=${category.slug}`} key={category.id} className="group block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-secondary">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">{category.name}</h3>
              <p className="text-sm text-muted line-clamp-3 mt-1">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 bg-secondary/50 rounded-3xl p-8 md:p-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
            <p className="text-muted">Our most popular and highly rated business solutions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.filter(p => p.isFeatured).map(product => (
            <div key={product.id} className="group bg-card rounded-2xl border hover:shadow-xl transition-all overflow-hidden flex flex-col">
              <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-secondary block">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.salePrice && (
                  <span className="absolute top-4 left-4 bg-destructive text-white text-xs font-bold px-2 py-1 rounded-md">
                    SALE
                  </span>
                )}
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-muted mb-2 uppercase tracking-wider">{product.sku}</p>
                <Link to={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-lg line-clamp-2 hover:text-accent transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.salePrice ? (
                      <>
                        <span className="text-lg font-bold text-destructive">₹{product.salePrice.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-muted line-through">₹{product.price.toLocaleString('en-IN')}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <button 
                    disabled={product.stockQuantity === 0}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-accent hover:text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-secondary disabled:hover:text-foreground"
                    title={product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                {product.stockQuantity === 0 && (
                  <p className="text-xs text-destructive mt-2 font-medium">Out of Stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us & Applications */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Jude Equipment?</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Wide Product Range</h3>
              <p className="text-muted">From precision jewellery scales to heavy-duty industrial weighing systems, our catalogue covers a wide range of weighing requirements.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Commercial & Industrial Solutions</h3>
              <p className="text-muted">Products are available for retail stores, supermarkets, warehouses, manufacturing units, food businesses and other commercial environments.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Product Support</h3>
              <p className="text-muted">Customers can contact Jude Equipment for product enquiries, service requirements, repairs and weighing-equipment spare parts.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Chennai-Based Support</h3>
              <p className="text-muted">Located in Vyasarpadi, Chennai, Jude Equipment serves customers in Chennai, Tamil Nadu and wider markets.</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 bg-secondary/50 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Equipment for Multiple Industries</h2>
          
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <h3 className="font-semibold">Retail</h3>
              <p className="text-sm text-muted">Weighing scales, price computing scales, billing machines and POS equipment for retail businesses.</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-semibold">Jewellery</h3>
              <p className="text-sm text-muted">Precision jewellery scales for gold, silver, diamonds, gemstones and related weighing applications.</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-semibold">Manufacturing</h3>
              <p className="text-sm text-muted">Industrial weighing equipment for production and material-handling environments.</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-semibold">Warehousing & Logistics</h3>
              <p className="text-sm text-muted">Platform, trolley and crane weighing solutions for commercial and industrial operations.</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-semibold">Food & Grocery</h3>
              <p className="text-sm text-muted">Commercial weighing scales, kitchen scales and retail weighing equipment.</p>
            </li>
            <li>
              <h3 className="font-semibold">Veterinary & Animal Care</h3>
              <p className="text-sm text-muted">Animal weighing equipment for clinics, hospitals, research centres and livestock applications.</p>
            </li>
          </ul>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Equipment?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Tell us about your weighing, billing or business-equipment requirement and our team can help you identify a suitable solution.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent-hover transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+918939828883" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

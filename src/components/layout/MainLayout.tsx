import { Outlet, Link } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export default function MainLayout() {
  const { getTotals } = useCartStore();
  const { totalItems } = getTotals();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl tracking-tight text-primary flex-shrink-0">
            Jude Equipment
          </Link>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">Home</Link>
            <Link to="/products" className="text-foreground hover:text-accent transition-colors">Products</Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors">About Us</Link>
            <Link to="/contact" className="text-foreground hover:text-accent transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/admin" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground">
              <User className="w-4 h-4" /> Admin
            </Link>
            
            <Link to="/account" className="p-2 text-foreground hover:bg-secondary rounded-full transition-colors">
              <User className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative p-2 text-foreground hover:bg-secondary rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="md:hidden p-2 text-foreground hover:bg-secondary rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="font-bold text-2xl tracking-tight mb-6 block">
              Jude Equipment
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Weighing Scales & Business Equipment Solutions. Manufacturer since 2002. ISO Certified.
            </p>
            <p className="text-sm font-medium">100% Customer Satisfaction</p>
            <p className="text-sm font-medium">100% After Sales & Service Support 24/7</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Categories</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li><Link to="/products?category=electronic-weighing-scales" className="hover:text-white transition-colors">Electronic Scales</Link></li>
              <li><Link to="/products?category=industrial-weighing-scales" className="hover:text-white transition-colors">Industrial Scales</Link></li>
              <li><Link to="/products?category=billing-machines" className="hover:text-white transition-colors">Billing Machines</Link></li>
              <li><Link to="/products?category=pos-products" className="hover:text-white transition-colors">POS Systems</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <address className="not-italic text-primary-foreground/70 space-y-3">
              <p>Jude Equipment Pvt Ltd</p>
              <p>No. 282/118, Ground Floor,<br />Eruckancheri High Road,<br />Vyasarpadi, Chennai – 600039,<br />Tamil Nadu, India.</p>
              <p className="pt-2"><strong>Phone:</strong><br /> +91 89398 28883<br /> +91 72000 51670</p>
              <p><strong>Email:</strong><br /> judemktg@gmail.com</p>
            </address>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} Jude Equipment Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

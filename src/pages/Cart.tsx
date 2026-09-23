import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotals } = useCartStore();
  const { subtotal, totalItems } = getTotals();
  const navigate = useNavigate();

  // Simple calculation for mock data
  const shipping = subtotal > 0 ? 500 : 0;
  const tax = subtotal * 0.18; // 18% GST mock
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 text-muted">
          <ShoppingCartIcon className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your cart is empty</h2>
        <p className="text-muted mb-8 max-w-md">Looks like you haven't added any equipment to your cart yet.</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors hover:bg-primary/90">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart ({totalItems})</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-semibold text-muted uppercase tracking-wider p-6 border-b bg-secondary/30">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="p-6 space-y-6">
              {items.map(item => {
                const price = item.salePrice || item.price;
                return (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b last:border-b-0 last:pb-0">
                    <div className="col-span-1 md:col-span-6 flex items-start sm:items-center gap-4">
                      <div className="w-24 h-24 sm:w-20 sm:h-20 bg-secondary/50 rounded-xl overflow-hidden flex-shrink-0 border p-2">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs text-muted mb-1 uppercase font-mono">{item.sku}</p>
                        <Link to={`/products/${item.slug}`} className="font-semibold text-base line-clamp-2 hover:text-accent transition-colors leading-snug">
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-destructive hover:text-destructive/80 font-medium mt-3 flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 text-left md:text-center font-semibold text-base mt-2 md:mt-0">
                      <span className="md:hidden text-muted font-normal mr-2">Price:</span>
                      ₹{price.toLocaleString('en-IN')}
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 flex items-center md:justify-center mt-2 md:mt-0">
                      <div className="flex items-center border rounded-lg bg-background shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-secondary text-muted hover:text-foreground transition-colors rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-secondary text-muted hover:text-foreground transition-colors rounded-r-lg"
                          disabled={item.quantity >= item.stockQuantity}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 text-left md:text-right font-bold text-lg mt-2 md:mt-0">
                      <span className="md:hidden text-muted font-normal text-base mr-2">Total:</span>
                      ₹{(price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-background rounded-2xl p-6 border sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping Estimate</span>
                <span className="font-medium">₹{shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estimated Tax (18%)</span>
                <span className="font-medium">₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="border-t pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Grand Total</span>
                <div className="text-right">
                  <span className="font-bold text-3xl text-accent block">₹{grandTotal.toLocaleString('en-IN')}</span>
                  <p className="text-xs text-muted mt-1">Inclusive of all taxes.</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-medium transition-colors flex justify-center items-center gap-2 shadow-sm"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
            <div className="mt-4 flex justify-center">
               <Link to="/products" className="text-sm font-medium text-muted hover:text-primary transition-colors">
                  or Continue Shopping
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { Check } from 'lucide-react'

export default function Checkout() {
  const { items, getTotals, clearCart } = useCartStore();
  const { subtotal } = getTotals();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simple calculation for mock data
  const shipping = subtotal > 0 ? 500 : 0;
  const tax = subtotal * 0.18; 
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-accent hover:underline">Return to shopping</Link>
      </div>
    )
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (paymentMethod === 'razorpay') {
      // Simulate Razorpay window opening and processing
      setTimeout(() => {
        // Create a dummy Razorpay-like overlay for the test
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        
        const modal = document.createElement('div');
        modal.style.backgroundColor = 'white';
        modal.style.padding = '32px';
        modal.style.borderRadius = '8px';
        modal.style.textAlign = 'center';
        modal.innerHTML = `
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Razorpay Test Mode</h2>
          <p style="margin-bottom: 24px;">Simulating payment of ₹${grandTotal.toLocaleString('en-IN')}</p>
          <button id="rzp-success" style="background-color: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px; margin-right: 8px;">Simulate Success</button>
          <button id="rzp-fail" style="background-color: #ef4444; color: white; padding: 8px 16px; border-radius: 4px;">Simulate Failure</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('rzp-success')?.addEventListener('click', () => {
          document.body.removeChild(overlay);
          clearCart();
          setIsProcessing(false);
          navigate('/order-success');
        });

        document.getElementById('rzp-fail')?.addEventListener('click', () => {
          document.body.removeChild(overlay);
          setIsProcessing(false);
          alert('Payment failed. Please try again.');
        });
      }, 500);
    } else {
      // Simulate COD processing
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        navigate('/order-success');
      }, 1500);
    }
  };

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Forms */}
        <div className="flex-grow space-y-8">
          
          {/* Contact Info */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name *</label>
                <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <input required type="email" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="john@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Mobile Number *</label>
                <input required type="tel" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="+91 98765 43210" />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Address Line 1 *</label>
                <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Flat No, Building Name" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Street / Locality</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Street Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City *</label>
                <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="City" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State *</label>
                <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="State" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pincode *</label>
                <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="6-digit pincode" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <input required type="text" defaultValue="India" disabled className="w-full border rounded-lg px-4 py-2 bg-secondary text-muted" />
              </div>
            </div>
          </section>

          {/* Business Info */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              Business Information <span className="text-sm text-muted font-normal">(Optional)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GST Number</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'hover:bg-secondary'}`}>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-accent bg-accent' : 'border-muted'}`}>
                  {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <input type="radio" className="hidden" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <div className="flex-grow">
                  <span className="font-semibold block">Cash on Delivery</span>
                  <span className="text-sm text-muted">Pay when you receive the order.</span>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-accent bg-accent/5' : 'hover:bg-secondary'}`}>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-accent bg-accent' : 'border-muted'}`}>
                  {paymentMethod === 'razorpay' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <input type="radio" className="hidden" name="payment" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                <div className="flex-grow">
                  <span className="font-semibold block flex items-center gap-2">
                    Pay via Razorpay 
                    <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded border border-blue-200">Test Mode</span>
                  </span>
                  <span className="text-sm text-muted">UPI, Netbanking, Credit/Debit Cards, Wallets.</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column - Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-background rounded-2xl p-6 border sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-3 border-b border-black/5 pb-4">
                  <div className="flex-grow text-sm">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-muted">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-semibold text-sm">
                    ₹{((item.salePrice || item.price) * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-medium">₹{shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estimated Tax (18%)</span>
                <span className="font-medium">₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Grand Total</span>
                <span className="font-bold text-2xl text-accent">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-medium transition-colors flex justify-center items-center gap-2 disabled:opacity-70 shadow-sm"
            >
              {isProcessing ? (
                'Processing...'
              ) : paymentMethod === 'razorpay' ? (
                'Pay Securely with Razorpay'
              ) : (
                'Place COD Order'
              )}
            </button>
            <p className="text-xs text-center text-muted mt-4 flex items-center justify-center gap-1">
              <Check className="w-3 h-3" /> Secure and encrypted checkout
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

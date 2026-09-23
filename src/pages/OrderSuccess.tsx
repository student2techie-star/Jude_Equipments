import { Link } from 'react-router-dom'
import { CheckCircle2, Package, ArrowRight } from 'lucide-react'

export default function OrderSuccess() {
  const orderId = `JE-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;

  return (
    <div className="py-24 px-4 flex justify-center">
      <div className="bg-card border rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-muted text-lg mb-8">
          Thank you for your purchase. We've received your order and are getting it ready for shipment.
        </p>

        <div className="bg-secondary rounded-2xl p-6 text-left mb-8">
          <h2 className="font-semibold text-lg border-b border-black/5 pb-4 mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted mb-1">Order Number</p>
              <p className="font-bold">{orderId}</p>
            </div>
            <div>
              <p className="text-muted mb-1">Date</p>
              <p className="font-bold">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted mb-1">Payment Method</p>
              <p className="font-bold">Cash on Delivery</p>
            </div>
            <div>
              <p className="text-muted mb-1">Status</p>
              <p className="font-bold text-amber-600">Processing</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/account/orders" className="bg-secondary hover:bg-secondary/80 text-foreground px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            <Package className="w-5 h-5" /> Track Order
          </Link>
          <Link to="/products" className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Minus, Plus, ShoppingCart, Shield, Truck, Info, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '../store/useCartStore'
import { useProductStore } from '../store/useProductStore'

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, isLoading } = useProductStore();
  const product = products.find(p => p.slug === slug);
  const category = categories.find(c => c.id === product?.categoryId);
  const addItem = useCartStore(state => state.addItem);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <div className="py-24 text-center">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline">Back to products</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div className="bg-secondary/10 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-3 flex items-center text-xs md:text-sm text-muted">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-2" />
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-2" />
          {category && (
            <>
              <Link to={`/products?category=${category.slug}`} className="hover:text-foreground line-clamp-1 max-w-[100px] md:max-w-none">
                {category.name}
              </Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-2 flex-shrink-0" />
            </>
          )}
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Image Gallery (Span 4) */}
          <div className="lg:col-span-4 lg:col-start-1 space-y-4">
            <div className="bg-white border rounded-lg overflow-hidden aspect-square flex items-center justify-center p-8 sticky top-24 relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
              {product.salePrice && (
                <div className="absolute top-4 left-4 bg-destructive text-white px-3 py-1 text-sm font-bold rounded shadow-sm">
                  SALE
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Product Info & Specs (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted">SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug">
                {product.name}
              </h1>
              
              <div className="mt-4 prose prose-sm text-muted">
                <p className="leading-relaxed text-base">{product.shortDescription}</p>
              </div>
            </div>

            {/* Specifications Table */}
            {product.specs && (
              <div className="pt-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-muted" /> Technical Specifications
                </h3>
                <div className="bg-white rounded-lg overflow-hidden border">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground bg-secondary/20 w-1/3">{key}</td>
                          <td className="py-3 px-4 text-muted">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* FAQ / Help */}
            <div className="pt-6 border-t border-black/5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-muted" /> Need Help?
              </h3>
              <p className="text-sm text-muted mb-3">Not sure if this is the right equipment for your business?</p>
              <Link to="/contact" className="text-sm font-medium text-primary hover:underline">
                Contact our sales team for consultation
              </Link>
            </div>
          </div>

          {/* Column 3: The "Buy Box" (Span 3) */}
          <div className="lg:col-span-3">
            <div className="bg-background border rounded-lg p-6 shadow-sm sticky top-24">
              
              {/* Pricing */}
              <div className="mb-6">
                {product.salePrice ? (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-destructive">₹{product.salePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-sm text-muted">
                      MRP: <span className="line-through">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-green-600 font-medium ml-2 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded text-xs">
                        Save ₹{(product.price - product.salePrice).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                )}
                <p className="text-xs text-muted mt-2">Prices are inclusive of all taxes.</p>
              </div>

              <div className="border-t border-black/5 my-6"></div>

              {/* Stock Status */}
              <div className="mb-6">
                {isOutOfStock ? (
                  <p className="text-destructive font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive" /> Currently out of stock
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-green-600 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" /> In Stock
                    </p>
                    <p className="text-xs text-muted">Usually dispatched in 2-3 business days.</p>
                  </div>
                )}
              </div>

              {/* Add to Cart Area */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-muted">Quantity</label>
                  <div className="flex items-center border rounded-md bg-white">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="px-3 py-2 hover:bg-secondary disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      disabled={quantity >= product.stockQuantity || isOutOfStock}
                      className="px-3 py-2 hover:bg-secondary disabled:opacity-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5" /> 
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                
                {!isOutOfStock && (
                  <Link to="/checkout" className="block text-center w-full bg-accent text-white hover:bg-accent-hover py-3.5 rounded-md font-medium transition-colors shadow-sm">
                    Buy Now
                  </Link>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-black/5 space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Shield className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Official Warranty</p>
                    <p className="text-muted text-xs">Standard 1-year manufacturer warranty included.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Truck className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Secure Delivery</p>
                    <p className="text-muted text-xs">Safe transport across Tamil Nadu and beyond.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

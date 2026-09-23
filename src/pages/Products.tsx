import { Link, useSearchParams } from 'react-router-dom'
import { ShoppingBag, Search, SlidersHorizontal, ChevronRight, Filter } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useCartStore } from '../store/useCartStore'
import { useProductStore } from '../store/useProductStore'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const addItem = useCartStore(state => state.addItem);
  const { categories, products } = useProductStore();
  
  const selectedCategory = categories.find(c => c.slug === categoryFilter);
  
  const filteredProducts = categoryFilter 
    ? products.filter(p => p.categoryId === selectedCategory?.id)
    : products;

  return (
    <div className="bg-secondary/20 min-h-screen pb-16">
      <Helmet>
        <title>{selectedCategory ? `${selectedCategory.name} in Chennai | Jude Equipment` : 'All Products | Jude Equipment'}</title>
        <meta name="description" content={selectedCategory ? selectedCategory.description : 'Explore our complete range of weighing scales, billing machines, and POS equipment in Chennai.'} />
      </Helmet>

      {/* Breadcrumb & Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-muted">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground font-medium">{selectedCategory ? selectedCategory.name : 'All Products'}</span>
        </div>
        
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {selectedCategory ? selectedCategory.name : 'All Equipment & Scales'}
            </h1>
            <p className="text-muted max-w-2xl text-lg">
              {selectedCategory ? selectedCategory.description : 'Browse our comprehensive catalog of industrial scales, retail billing machines, and commercial POS systems.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-secondary/50 border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-background border rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg pb-4 border-b">
                <Filter className="w-5 h-5 text-primary" />
                Categories
              </div>
              
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setSearchParams({})}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${!categoryFilter ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'}`}
                  >
                    <span>All Products</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted">{products.length}</span>
                  </button>
                </li>
                {categories.map(category => {
                  const count = products.filter(p => p.categoryId === category.id).length;
                  return (
                    <li key={category.id}>
                      <button
                        onClick={() => setSearchParams({ category: category.slug })}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${categoryFilter === category.slug ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'}`}
                      >
                        <span className="line-clamp-1">{category.name}</span>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted">{count}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-grow">
            <div className="bg-background border rounded-lg p-4 mb-6 flex justify-between items-center shadow-sm text-sm">
              <p className="text-muted">Showing <strong>{filteredProducts.length}</strong> products</p>
              <button className="flex items-center gap-2 font-medium hover:text-primary transition-colors">
                <SlidersHorizontal className="w-4 h-4" /> Sort by: Featured
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-background border rounded-lg hover:shadow-lg transition-all overflow-hidden flex flex-col">
                  <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-white block p-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                    {product.salePrice && (
                      <span className="absolute top-2 left-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        SALE
                      </span>
                    )}
                  </Link>
                  <div className="p-4 flex flex-col flex-grow border-t border-secondary">
                    <p className="text-xs text-muted mb-1 font-mono">{product.sku}</p>
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="font-medium text-sm md:text-base line-clamp-2 hover:text-accent transition-colors mb-3 leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex flex-col">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-foreground">₹{product.salePrice.toLocaleString('en-IN')}</span>
                            <span className="text-xs text-muted line-through">₹{product.price.toLocaleString('en-IN')}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem(product);
                        }}
                        disabled={product.stockQuantity === 0}
                        className="w-8 h-8 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-primary/10 disabled:hover:text-primary"
                        title={product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-24 text-center border border-dashed rounded-lg bg-background">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-muted">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-muted">We couldn't find any products in this category.</p>
                  <button 
                    onClick={() => setSearchParams({})}
                    className="mt-4 text-primary font-medium hover:underline"
                  >
                    View all products
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

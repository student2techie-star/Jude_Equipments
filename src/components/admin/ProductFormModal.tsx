import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Product, Category } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  initialData?: Product | null;
  categories: Category[];
}

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories
}: ProductFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    sku: '',
    shortDescription: '',
    price: 0,
    salePrice: '',
    stockQuantity: 0,
    imageUrl: '',
    capacity: '',
    readability: '',
    isFeatured: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        categoryId: initialData.categoryId || '',
        sku: initialData.sku || '',
        shortDescription: initialData.shortDescription || '',
        price: initialData.price || 0,
        salePrice: initialData.salePrice ? String(initialData.salePrice) : '',
        stockQuantity: initialData.stockQuantity || 0,
        imageUrl: initialData.imageUrl || '',
        capacity: initialData.specs?.Capacity || '',
        readability: initialData.specs?.Readability || '',
        isFeatured: initialData.isFeatured || false
      });
    } else {
      // Reset form
      setFormData({
        name: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        sku: '',
        shortDescription: '',
        price: 0,
        salePrice: '',
        stockQuantity: 0,
        imageUrl: '',
        capacity: '',
        readability: '',
        isFeatured: false
      });
    }
  }, [initialData, isOpen, categories]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submitData: Partial<Product> = {
        name: formData.name,
        categoryId: formData.categoryId,
        sku: formData.sku,
        slug: formData.name.toLowerCase().replace(/[\s\W-]+/g, '-'), // Generate slug from name
        shortDescription: formData.shortDescription,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        stockQuantity: Number(formData.stockQuantity),
        imageUrl: formData.imageUrl,
        isFeatured: formData.isFeatured,
        specs: {
          Capacity: formData.capacity,
          Readability: formData.readability
        }
      };

      await onSubmit(submitData);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while saving the product.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-2xl rounded-2xl shadow-xl border overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-muted hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <input 
                    required 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">SKU (Product Code) *</label>
                  <input 
                    required 
                    type="text" 
                    name="sku" 
                    value={formData.sku} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select 
                    required 
                    name="categoryId" 
                    value={formData.categoryId} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                  <input 
                    required 
                    type="number" 
                    name="price" 
                    min="0"
                    value={formData.price} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sale Price (₹) (Optional)</label>
                  <input 
                    type="number" 
                    name="salePrice" 
                    min="0"
                    value={formData.salePrice} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
                  <input 
                    required 
                    type="number" 
                    name="stockQuantity"
                    min="0" 
                    value={formData.stockQuantity} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-1">Image URL *</label>
                <input 
                  required 
                  type="url" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea 
                  name="shortDescription" 
                  value={formData.shortDescription} 
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity (Optional)</label>
                  <input 
                    type="text" 
                    name="capacity" 
                    value={formData.capacity} 
                    onChange={handleChange}
                    placeholder="e.g. 500g, 10kg"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Readability (Optional)</label>
                  <input 
                    type="text" 
                    name="readability" 
                    value={formData.readability} 
                    onChange={handleChange}
                    placeholder="e.g. 0.01g, 1g"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isFeatured" 
                  name="isFeatured" 
                  checked={formData.isFeatured} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">
                  Featured Product (Show on homepage)
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-secondary/30 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2 font-medium text-muted hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button 
            form="product-form"
            type="submit" 
            disabled={isLoading}
            className="px-5 py-2 font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {initialData ? 'Save Changes' : 'Add Product'}
          </button>
        </div>

      </div>
    </div>
  );
}

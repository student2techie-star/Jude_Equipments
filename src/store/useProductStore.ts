import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

interface ProductState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (categoryError) throw categoryError;

      // Map to frontend Category type
      const mappedCategories: Category[] = (categoryData || []).map(cat => ({
        id: cat.category_id,
        name: cat.category_name,
        slug: cat.slug,
        description: cat.description || '',
        imageUrl: cat.image_url || 'https://via.placeholder.com/800x600?text=No+Image'
      }));

      // Fetch products and their primary images
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            image_url,
            is_primary
          )
        `);

      if (productError) throw productError;

      // Map to frontend Product type
      const mappedProducts: Product[] = (productData || []).map(prod => {
        // Find the primary image, or fallback to the first image, or a placeholder
        const images = prod.product_images || [];
        const primaryImage = images.find((img: any) => img.is_primary) || images[0];
        const imageUrl = primaryImage ? primaryImage.image_url : 'https://via.placeholder.com/800x800?text=No+Image';

        return {
          id: prod.product_id,
          categoryId: prod.category_id,
          name: prod.product_name,
          slug: prod.slug,
          sku: prod.product_code || `SKU-${prod.product_id.substring(0, 8)}`,
          shortDescription: prod.short_description || prod.description || '',
          price: Number(prod.price) || 0,
          salePrice: prod.offer_price ? Number(prod.offer_price) : undefined,
          stockQuantity: prod.stock_quantity || 0,
          imageUrl: imageUrl,
          isFeatured: prod.featured || false,
          specs: {
            "Capacity": prod.capacity,
            "Readability": prod.readability
          }
        };
      });

      set({
        categories: mappedCategories,
        products: mappedProducts,
        isLoading: false
      });
    } catch (err: any) {
      console.error('Error fetching from Supabase:', err);
      set({ error: err.message, isLoading: false });
    }
  }
}));

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

interface ProductState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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

      // Fetch products (no image data from DB)
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*');

      if (productError) throw productError;

      // Map to frontend Product type (images handled on frontend only)
      const mappedProducts: Product[] = (productData || []).map(prod => ({
        id: prod.product_id,
        categoryId: prod.category_id,
        name: prod.product_name,
        slug: prod.slug,
        sku: prod.product_code || `SKU-${prod.product_id.substring(0, 8)}`,
        shortDescription: prod.short_description || prod.description || '',
        price: Number(prod.price) || 0,
        salePrice: prod.offer_price ? Number(prod.offer_price) : undefined,
        stockQuantity: prod.stock_quantity || 0,
        imageUrl: 'https://via.placeholder.com/800x800?text=No+Image',
        isFeatured: prod.featured || false,
        specs: {
          "Capacity": prod.capacity,
          "Readability": prod.readability
        }
      }));

      set({
        categories: mappedCategories,
        products: mappedProducts,
        isLoading: false
      });
    } catch (err: any) {
      console.error('Error fetching from Supabase:', err);
      set({ error: err.message, isLoading: false });
    }
  },
  addProduct: async (product) => {
    try {
      const { error: prodError } = await supabase
        .from('products')
        .insert({
          category_id: product.categoryId,
          product_name: product.name,
          slug: product.slug,
          product_code: product.sku,
          description: product.shortDescription,
          price: product.price,
          offer_price: product.salePrice,
          stock_quantity: product.stockQuantity,
          featured: product.isFeatured,
          capacity: product.specs?.Capacity,
          readability: product.specs?.Readability
        });

      if (prodError) throw prodError;

      // Refresh data
      await useProductStore.getState().fetchData();
    } catch (err: any) {
      console.error('Error adding product:', err);
      throw err;
    }
  },
  updateProduct: async (id, product) => {
    try {
      // 1. Update product
      const updateData: any = {};
      if (product.categoryId !== undefined) updateData.category_id = product.categoryId;
      if (product.name !== undefined) updateData.product_name = product.name;
      if (product.slug !== undefined) updateData.slug = product.slug;
      if (product.sku !== undefined) updateData.product_code = product.sku;
      if (product.shortDescription !== undefined) updateData.description = product.shortDescription;
      if (product.price !== undefined) updateData.price = product.price;
      if (product.salePrice !== undefined) updateData.offer_price = product.salePrice;
      if (product.stockQuantity !== undefined) updateData.stock_quantity = product.stockQuantity;
      if (product.isFeatured !== undefined) updateData.featured = product.isFeatured;
      if (product.specs?.Capacity !== undefined) updateData.capacity = product.specs.Capacity;
      if (product.specs?.Readability !== undefined) updateData.readability = product.specs.Readability;

      if (Object.keys(updateData).length > 0) {
        const { error: prodError } = await supabase
          .from('products')
          .update(updateData)
          .eq('product_id', id);
        if (prodError) throw prodError;
      }



      // Refresh data
      await useProductStore.getState().fetchData();
    } catch (err: any) {
      console.error('Error updating product:', err);
      throw err;
    }
  },
  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('product_id', id);

      if (error) throw error;

      // Refresh data
      await useProductStore.getState().fetchData();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      throw err;
    }
  }
}));

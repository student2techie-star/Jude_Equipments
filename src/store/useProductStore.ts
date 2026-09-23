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
  },
  addProduct: async (product) => {
    try {
      // 1. Insert product
      const { data: newProduct, error: prodError } = await supabase
        .from('products')
        .insert({
          category_id: product.categoryId,
          product_name: product.name,
          slug: product.slug,
          product_code: product.sku,
          description: product.shortDescription, // Using shortDescription for description
          price: product.price,
          offer_price: product.salePrice,
          stock_quantity: product.stockQuantity,
          featured: product.isFeatured,
          capacity: product.specs?.Capacity,
          readability: product.specs?.Readability
        })
        .select()
        .single();

      if (prodError) throw prodError;

      // 2. Insert image
      if (product.imageUrl) {
        const { error: imgError } = await supabase
          .from('product_images')
          .insert({
            product_id: newProduct.product_id,
            image_url: product.imageUrl,
            is_primary: true
          });
        if (imgError) throw imgError;
      }

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

      // 2. Update image
      if (product.imageUrl !== undefined) {
        // Delete old primary images
        await supabase
          .from('product_images')
          .delete()
          .eq('product_id', id);

        // Insert new primary image
        if (product.imageUrl) {
          const { error: imgError } = await supabase
            .from('product_images')
            .insert({
              product_id: id,
              image_url: product.imageUrl,
              is_primary: true
            });
          if (imgError) throw imgError;
        }
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

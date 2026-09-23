export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  imageUrl: string;
  isFeatured: boolean;
  specs?: Record<string, any>;
};

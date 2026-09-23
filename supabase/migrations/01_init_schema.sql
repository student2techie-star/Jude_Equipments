-- 1. ADMIN_USERS
CREATE TABLE public.admin_users (
    admin_id uuid default gen_random_uuid() primary key,
    username text not null unique,
    email text not null unique,
    password_hash text not null,
    full_name text,
    role text default 'ADMIN',
    status text default 'ACTIVE',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BRANDS
CREATE TABLE public.brands (
    brand_id uuid default gen_random_uuid() primary key,
    brand_name text not null unique,
    description text,
    logo_url text,
    website_url text,
    status text default 'ACTIVE',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CATEGORIES
CREATE TABLE public.categories (
    category_id uuid default gen_random_uuid() primary key,
    category_name text not null,
    slug text not null unique,
    description text,
    image_url text,
    display_order integer default 0,
    status text default 'ACTIVE',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SUBCATEGORIES
CREATE TABLE public.subcategories (
    subcategory_id uuid default gen_random_uuid() primary key,
    category_id uuid not null references public.categories(category_id) on delete cascade,
    subcategory_name text not null,
    slug text not null unique,
    description text,
    image_url text,
    display_order integer default 0,
    status text default 'ACTIVE',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PRODUCTS
CREATE TABLE public.products (
    product_id uuid default gen_random_uuid() primary key,
    category_id uuid not null references public.categories(category_id) on delete cascade,
    subcategory_id uuid references public.subcategories(subcategory_id) on delete set null,
    brand_id uuid references public.brands(brand_id) on delete set null,
    
    product_name text not null,
    product_code text,
    model_number text,
    slug text not null unique,
    
    short_description text,
    description text,
    
    price numeric(12,2),
    offer_price numeric(12,2),
    
    capacity text,
    readability text,
    
    stock_quantity integer default 0,
    
    featured boolean default false,
    status text default 'ACTIVE',
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. PRODUCT_IMAGES
CREATE TABLE public.product_images (
    image_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    image_url text not null,
    alt_text text,
    image_type text default 'PRODUCT',
    display_order integer default 0,
    is_primary boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. PRODUCT_SPECS
CREATE TABLE public.product_specs (
    spec_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    spec_name text not null,
    spec_value text not null,
    display_order integer default 0
);

-- 8. PRODUCT_FEATURES
CREATE TABLE public.product_features (
    feature_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    feature_text text not null,
    display_order integer default 0
);

-- 9. PRODUCT_APPLICATIONS
CREATE TABLE public.product_applications (
    application_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    application_name text not null,
    display_order integer default 0
);

-- 10. PRODUCT_FAQS
CREATE TABLE public.product_faqs (
    faq_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    question text not null,
    answer text not null,
    display_order integer default 0
);

-- 11. PRODUCT_RELATIONS
CREATE TABLE public.product_relations (
    relation_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    related_product_id uuid not null references public.products(product_id) on delete cascade,
    relation_type text default 'RELATED'
);

-- 12. SEO_METADATA
CREATE TABLE public.seo_metadata (
    seo_id uuid default gen_random_uuid() primary key,
    entity_type text not null,
    entity_id uuid not null, -- references either product, category, or subcategory
    seo_title text,
    meta_description text,
    keywords text,
    canonical_url text,
    og_title text,
    og_description text,
    og_image text,
    robots text default 'index,follow',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. CUSTOMERS
CREATE TABLE public.customers (
    customer_id uuid default gen_random_uuid() primary key,
    first_name text not null,
    last_name text,
    email text,
    phone text,
    company_name text,
    address_line1 text,
    address_line2 text,
    city text,
    state text,
    pincode text,
    country text default 'India',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. PRODUCT_ENQUIRIES
CREATE TABLE public.product_enquiries (
    enquiry_id uuid default gen_random_uuid() primary key,
    customer_id uuid references public.customers(customer_id) on delete set null,
    product_id uuid references public.products(product_id) on delete set null,
    subject text,
    message text,
    status text default 'NEW',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. ENQUIRY_ITEMS
CREATE TABLE public.enquiry_items (
    enquiry_item_id uuid default gen_random_uuid() primary key,
    enquiry_id uuid not null references public.product_enquiries(enquiry_id) on delete cascade,
    product_id uuid not null references public.products(product_id) on delete cascade,
    quantity integer default 1
);

-- 16. CONTACT_ENQUIRIES
CREATE TABLE public.contact_enquiries (
    contact_id uuid default gen_random_uuid() primary key,
    name text not null,
    email text,
    phone text,
    subject text,
    message text,
    status text default 'NEW',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. SERVICE_REQUESTS
CREATE TABLE public.service_requests (
    service_id uuid default gen_random_uuid() primary key,
    customer_id uuid references public.customers(customer_id) on delete set null,
    product_id uuid references public.products(product_id) on delete set null,
    service_type text,
    issue_description text,
    priority text default 'NORMAL',
    status text default 'OPEN',
    service_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. REVIEWS
CREATE TABLE public.reviews (
    review_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    customer_id uuid references public.customers(customer_id) on delete set null,
    rating integer not null check (rating between 1 and 5),
    review_title text,
    review_text text,
    status text default 'PENDING',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 19. INVENTORY
CREATE TABLE public.inventory (
    inventory_id uuid default gen_random_uuid() primary key,
    product_id uuid not null references public.products(product_id) on delete cascade,
    stock_quantity integer default 0,
    min_stock_level integer default 0,
    max_stock_level integer default 0,
    last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 20. LOCATIONS
CREATE TABLE public.locations (
    location_id uuid default gen_random_uuid() primary key,
    location_name text,
    address_line1 text,
    address_line2 text,
    city text,
    state text,
    pincode text,
    phone text,
    email text,
    latitude numeric(10,7),
    longitude numeric(10,7),
    status text default 'ACTIVE'
);

-- Enable RLS and setup basic policies (public read for product-related tables)
-- In a real production app, you might want to restrict this further or add write policies.
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on subcategories" ON public.subcategories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_specs" ON public.product_specs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_features" ON public.product_features FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_applications" ON public.product_applications FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_faqs" ON public.product_faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on locations" ON public.locations FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_subcategory ON public.products(subcategory_id);
CREATE INDEX idx_products_brand ON public.products(brand_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_product_images_product ON public.product_images(product_id);
CREATE INDEX idx_product_specs_product ON public.product_specs(product_id);
CREATE INDEX idx_product_features_product ON public.product_features(product_id);
CREATE INDEX idx_enquiries_product ON public.product_enquiries(product_id);
CREATE INDEX idx_enquiries_customer ON public.product_enquiries(customer_id);
CREATE INDEX idx_service_customer ON public.service_requests(customer_id);
CREATE INDEX idx_service_product ON public.service_requests(product_id);

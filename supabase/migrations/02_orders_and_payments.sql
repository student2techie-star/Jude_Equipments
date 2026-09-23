-- 1. ORDERS
CREATE TABLE public.orders (
    order_id uuid default gen_random_uuid() primary key,
    customer_id uuid not null references public.customers(customer_id) on delete cascade,
    order_status text default 'PENDING',
    total_amount numeric(12,2) not null,
    shipping_address text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ORDER_ITEMS
CREATE TABLE public.order_items (
    order_item_id uuid default gen_random_uuid() primary key,
    order_id uuid not null references public.orders(order_id) on delete cascade,
    product_id uuid not null references public.products(product_id) on delete restrict,
    quantity integer not null check (quantity > 0),
    unit_price numeric(12,2) not null,
    subtotal numeric(12,2) not null
);

-- 3. PAYMENTS
CREATE TABLE public.payments (
    payment_id uuid default gen_random_uuid() primary key,
    order_id uuid not null references public.orders(order_id) on delete cascade,
    payment_method text not null,
    transaction_id text,
    payment_status text default 'PENDING',
    amount numeric(12,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Indexes for fast querying
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_product ON public.order_items(product_id);
CREATE INDEX idx_payments_order ON public.payments(order_id);

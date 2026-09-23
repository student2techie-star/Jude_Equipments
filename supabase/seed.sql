-- UUID constants for seeded data
-- ADMIN: c78b5e4a-4b9a-4712-b13c-755cf4a95a43
-- BRAND_KARUNYA: 12a4b9c5-8e42-4b2a-a9d1-0f73c68e1a12
-- BRAND_JUDE: 94b34c2d-1a8c-4820-94d7-1335b7194c5e
-- CAT_ELECTRONIC: 40e29b11-2d4e-4e36-b6d8-941f6e21b8a4
-- CAT_INDUSTRIAL: fa8c7152-3d9a-4861-a54b-220a7b4505c8
-- CAT_MECHANICAL: 912384a2-1b6c-4813-8a3d-4c312d8a576f
-- CAT_KITCHEN: 82e3c4a1-b845-4286-9a2f-75b428d098e7
-- SUBCAT_JEWELLERY: d42a1b9e-6c8f-43b9-a35c-278b1d9c4f7a
-- SUBCAT_PLATFORM: e9b84a3c-1f5d-4a1e-8e42-0f1c9d7234a5
-- PROD_JEWELLERY: 5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7
-- PROD_KITCHEN: c8d1e2a9-b345-4297-a7b9-1234b5c68d7f
-- PROD_PLATFORM: a9d8c7b6-e5f4-4321-a1b2-c3d4e5f6a7b8
-- CUSTOMER_RAJESH: 1f2a3b4c-5d6e-4f8a-9b0c-1d2e3f4a5b6c
-- LOCATION_CHENNAI: 7c8b9a0d-1e2f-4a3b-5c6d-7e8f9a0b1c2d
-- ENQUIRY: 3a4b5c6d-7e8f-4a9b-0c1d-2e3f4a5b6c7d

-- 1. ADMIN_USERS
INSERT INTO public.admin_users (admin_id, username, email, password_hash, full_name, role, status)
VALUES ('c78b5e4a-4b9a-4712-b13c-755cf4a95a43', 'admin', 'admin@judeequipment.com', '$2b$12$SAMPLE_HASH', 'Jude Equipment Admin', 'SUPER_ADMIN', 'ACTIVE');

-- 2. BRANDS
INSERT INTO public.brands (brand_id, brand_name, description, status)
VALUES 
('12a4b9c5-8e42-4b2a-a9d1-0f73c68e1a12', 'Karunya', 'Weighing and measurement products', 'ACTIVE'),
('94b34c2d-1a8c-4820-94d7-1335b7194c5e', 'Jude Equipment', 'Jude Equipment products and solutions', 'ACTIVE');

-- 3. CATEGORIES
INSERT INTO public.categories (category_id, category_name, slug, display_order)
VALUES 
('40e29b11-2d4e-4e36-b6d8-941f6e21b8a4', 'Electronic Scales', 'electronic-scales', 1),
('fa8c7152-3d9a-4861-a54b-220a7b4505c8', 'Industrial Scales', 'industrial-scales', 2),
('912384a2-1b6c-4813-8a3d-4c312d8a576f', 'Mechanical Scales', 'mechanical-scales', 3),
('82e3c4a1-b845-4286-9a2f-75b428d098e7', 'Digital Scales', 'digital-scales', 4);

-- 4. SUBCATEGORIES
INSERT INTO public.subcategories (subcategory_id, category_id, subcategory_name, slug)
VALUES 
('d42a1b9e-6c8f-43b9-a35c-278b1d9c4f7a', '40e29b11-2d4e-4e36-b6d8-941f6e21b8a4', 'Jewellery Scales', 'jewellery-scales'),
('e9b84a3c-1f5d-4a1e-8e42-0f1c9d7234a5', 'fa8c7152-3d9a-4861-a54b-220a7b4505c8', 'Commercial Platform Scale', 'commercial-platform-scale');

-- 5. PRODUCTS
INSERT INTO public.products (product_id, category_id, subcategory_id, brand_id, product_name, product_code, model_number, slug, short_description, capacity, readability, featured)
VALUES 
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', '40e29b11-2d4e-4e36-b6d8-941f6e21b8a4', 'd42a1b9e-6c8f-43b9-a35c-278b1d9c4f7a', '12a4b9c5-8e42-4b2a-a9d1-0f73c68e1a12', 'Digital Jewellery Weighing Scale', 'JEW-001', 'SF 400 C', 'digital-jewellery-scale-sf-400-c', 'Precision digital weighing scale suitable for jewellery and precision weighing.', '300 gm', '10 mg', true),
('c8d1e2a9-b345-4297-a7b9-1234b5c68d7f', '82e3c4a1-b845-4286-9a2f-75b428d098e7', null, null, 'Digital Kitchen Scale', 'KIT-001', 'SF 400', 'digital-kitchen-scale-sf-400', 'Digital Kitchen Scale SF 400', '10 Kg', '1 gm', false),
('a9d8c7b6-e5f4-4321-a1b2-c3d4e5f6a7b8', 'fa8c7152-3d9a-4861-a54b-220a7b4505c8', 'e9b84a3c-1f5d-4a1e-8e42-0f1c9d7234a5', null, 'Commercial Platform Weighing Scale', 'IND-001', null, 'commercial-platform-weighing-scale', 'Heavy-duty platform weighing solution for commercial and industrial applications.', null, null, true);

-- 6. PRODUCT_IMAGES
INSERT INTO public.product_images (product_id, image_url, alt_text, is_primary)
VALUES ('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', '/images/products/sf-400-c.webp', 'Digital Jewellery Weighing Scale SF 400 C', true);

-- 7. PRODUCT_SPECS
INSERT INTO public.product_specs (product_id, spec_name, spec_value)
VALUES 
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Capacity', '300 gm'),
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Readability', '10 mg'),
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Weighing Unit', 'gm / oz'),
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Power Supply', 'AA Batteries / External Power');

-- 8. PRODUCT_FEATURES
INSERT INTO public.product_features (product_id, feature_text)
VALUES 
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Precision weighing'),
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Tare function'),
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Piece counting function');

-- 9. PRODUCT_APPLICATIONS
INSERT INTO public.product_applications (product_id, application_name)
VALUES 
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Jewellery Shops'),
('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Gold Shops');

-- 10. PRODUCT_FAQS
INSERT INTO public.product_faqs (product_id, question, answer)
VALUES ('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'What is the capacity of this jewellery scale?', 'The sample SF 400 C model has a capacity of 300 gm.');

-- 12. SEO_METADATA
INSERT INTO public.seo_metadata (entity_type, entity_id, seo_title, meta_description, keywords)
VALUES ('PRODUCT', '5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Digital Jewellery Weighing Scale | Jude Equipment Chennai', 'Digital jewellery weighing scale for precision weighing applications. Explore weighing solutions from Jude Equipment in Chennai.', 'digital jewellery scale, jewellery weighing scale, precision weighing scale, Chennai');

-- 13. CUSTOMERS
INSERT INTO public.customers (customer_id, first_name, last_name, email, phone, company_name, city, state, pincode)
VALUES ('1f2a3b4c-5d6e-4f8a-9b0c-1d2e3f4a5b6c', 'Rajesh', 'Kumar', 'rajesh@example.com', '9876543210', 'Rajesh Supermarket', 'Chennai', 'Tamil Nadu', '600001');

-- 14. PRODUCT_ENQUIRIES
INSERT INTO public.product_enquiries (enquiry_id, customer_id, product_id, subject, message)
VALUES ('3a4b5c6d-7e8f-4a9b-0c1d-2e3f4a5b6c7d', '1f2a3b4c-5d6e-4f8a-9b0c-1d2e3f4a5b6c', '5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Price Enquiry', 'Please provide price and availability for this weighing scale.');

-- 16. CONTACT_ENQUIRIES
INSERT INTO public.contact_enquiries (name, email, phone, subject, message)
VALUES ('Suresh', 'suresh@example.com', '9840012345', 'Industrial Scale Enquiry', 'I need an industrial weighing scale for my warehouse.');

-- 17. SERVICE_REQUESTS
INSERT INTO public.service_requests (customer_id, product_id, service_type, issue_description)
VALUES ('1f2a3b4c-5d6e-4f8a-9b0c-1d2e3f4a5b6c', '5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 'Repair', 'Display is not working properly.');

-- 19. INVENTORY
INSERT INTO public.inventory (product_id, stock_quantity, min_stock_level, max_stock_level)
VALUES ('5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 25, 5, 100);

-- 20. LOCATIONS
INSERT INTO public.locations (location_id, location_name, address_line1, city, state, pincode, phone)
VALUES ('7c8b9a0d-1e2f-4a3b-5c6d-7e8f9a0b1c2d', 'Jude Equipment Chennai', 'Velan Nagar, Korukkupet', 'Chennai', 'Tamil Nadu', '600021', '+91-89398 28883');

-- 21. ORDERS
INSERT INTO public.orders (order_id, customer_id, order_status, total_amount, shipping_address)
VALUES ('9e8d7c6b-5a4b-3c2d-1e0f-9a8b7c6d5e4f', '1f2a3b4c-5d6e-4f8a-9b0c-1d2e3f4a5b6c', 'PROCESSING', 4500.00, 'Rajesh Supermarket, Velachery, Chennai, TN, 600042');

-- 22. ORDER_ITEMS
INSERT INTO public.order_items (order_item_id, order_id, product_id, quantity, unit_price, subtotal)
VALUES ('f4e5d6c7-b8a9-0b1c-2d3e-4f5a6b7c8d9e', '9e8d7c6b-5a4b-3c2d-1e0f-9a8b7c6d5e4f', '5b71c2a4-e910-4f5c-89b1-0f83c1d9b4a7', 1, 4500.00, 4500.00);

-- 23. PAYMENTS
INSERT INTO public.payments (payment_id, order_id, payment_method, transaction_id, payment_status, amount)
VALUES ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '9e8d7c6b-5a4b-3c2d-1e0f-9a8b7c6d5e4f', 'STRIPE', 'pi_123abc456def', 'SUCCESS', 4500.00);

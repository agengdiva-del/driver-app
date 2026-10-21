export const SUPABASE_SQL_SCHEMA = `-- =========================================================================
-- MITRAARJA HYPERLOCAL SUPER-APP - SUPABASE POSTGRESQL SCHEMA (24 TABLES)
-- Target Region: Arjawinangun, Cirebon, Expandable Nationwide
-- Facilitator Marketplace Architecture (Customer, Merchant, Independent Driver)
-- =========================================================================

-- Enable PostGIS for geospatial queries & uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'merchant', 'driver', 'admin', 'superadmin');
CREATE TYPE verification_status AS ENUM ('unverified', 'partially_verified', 'verified', 'rejected');
CREATE TYPE order_status AS ENUM (
  'pending', 'merchant_accepted', 'driver_assigned', 'preparing',
  'picked_up', 'on_delivery', 'delivered', 'completed', 'cancelled'
);
CREATE TYPE payment_method AS ENUM ('mitrapay', 'qris', 'cod', 'bank_transfer', 'ewallet');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded', 'failed');
CREATE TYPE service_type AS ENUM ('food', 'grocery', 'pharmacy', 'courier', 'ppob', 'umkm');
CREATE TYPE ticket_status AS ENUM ('open', 'processing', 'resolved', 'closed');
CREATE TYPE account_status AS ENUM ('active', 'warning', 'suspended', 'blocked');

-- 2. USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  avatar_url TEXT,
  role user_role DEFAULT 'customer',
  account_status account_status DEFAULT 'active',
  verification_status verification_status DEFAULT 'unverified',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CUSTOMERS TABLE (Profile & KYC)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ktp_number VARCHAR(30),
  ktp_photo_url TEXT,
  selfie_photo_url TEXT,
  points INTEGER DEFAULT 0,
  membership_level VARCHAR(20) DEFAULT 'Bronze',
  referral_code VARCHAR(15) UNIQUE NOT NULL,
  referred_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CUSTOMER_ADDRESSES TABLE
CREATE TABLE customer_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  label VARCHAR(50) DEFAULT 'Home',
  recipient_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  street_address TEXT NOT NULL,
  province VARCHAR(50) DEFAULT 'Jawa Barat',
  city VARCHAR(50) DEFAULT 'Kabupaten Cirebon',
  district VARCHAR(50) DEFAULT 'Arjawinangun',
  village VARCHAR(50) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  notes TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MERCHANTS TABLE
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  service_type service_type NOT NULL,
  category VARCHAR(50),
  logo_url TEXT,
  banner_url TEXT,
  district VARCHAR(50) DEFAULT 'Arjawinangun',
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  rating NUMERIC(3, 2) DEFAULT 5.0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCTS TABLE
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(12, 2) NOT NULL,
  discount_price NUMERIC(12, 2),
  category VARCHAR(50),
  image_url TEXT,
  stock INTEGER DEFAULT 100,
  requires_prescription BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDERS TABLE
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(30) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  merchant_id UUID REFERENCES merchants(id),
  driver_id UUID REFERENCES users(id),
  service_type service_type NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  delivery_fee NUMERIC(12, 2) NOT NULL,
  platform_fee NUMERIC(12, 2) DEFAULT 2000, -- Admin rule: Rp1.000 - Rp2.500
  driver_commission NUMERIC(12, 2), -- 10% of delivery fee
  discount NUMERIC(12, 2) DEFAULT 0,
  total_amount NUMERIC(12, 2) NOT NULL,
  payment_method payment_method DEFAULT 'mitrapay',
  payment_status payment_status DEFAULT 'unpaid',
  order_status order_status DEFAULT 'pending',
  delivery_address_id UUID REFERENCES customer_addresses(id),
  order_notes TEXT,
  prescription_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ORDER_ITEMS TABLE
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(150) NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  notes TEXT
);

-- 9. CARTS TABLE
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

-- 10. PAYMENTS TABLE (Midtrans / Xendit / QRIS logs)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  gateway VARCHAR(30) DEFAULT 'midtrans', -- midtrans, xendit, qris, mitrapay
  transaction_id VARCHAR(100),
  amount NUMERIC(12, 2) NOT NULL,
  payment_type VARCHAR(50),
  raw_payload JSONB,
  status payment_status DEFAULT 'unpaid',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. WALLETS TABLE (MitraPay)
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  balance NUMERIC(14, 2) DEFAULT 0.00,
  pin_hash VARCHAR(255),
  qris_static_id VARCHAR(50),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. WALLET_TRANSACTIONS TABLE
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL, -- 'topup', 'payment', 'transfer', 'cashback', 'reward'
  amount NUMERIC(12, 2) NOT NULL,
  reference_id VARCHAR(100),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TRANSACTIONS TABLE (Platform Ledger)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  gross_amount NUMERIC(12, 2) NOT NULL,
  merchant_payout NUMERIC(12, 2) NOT NULL,
  driver_payout NUMERIC(12, 2) NOT NULL,
  platform_revenue NUMERIC(12, 2) NOT NULL,
  settled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. REVIEWS TABLE
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  customer_id UUID REFERENCES customers(id),
  merchant_id UUID REFERENCES merchants(id),
  driver_id UUID REFERENCES users(id),
  merchant_rating INTEGER CHECK (merchant_rating BETWEEN 1 AND 5),
  driver_rating INTEGER CHECK (driver_rating BETWEEN 1 AND 5),
  comment TEXT,
  photo_url TEXT,
  merchant_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. COMPLAINTS & SUPPORT TICKETS TABLE
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  status ticket_status DEFAULT 'open',
  resolution_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. NOTIFICATIONS TABLE
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(30) DEFAULT 'order',
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. FAVORITES TABLE
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, merchant_id)
);

-- 18. COUPONS & VOUCHERS TABLE
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(30) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- 'percentage' or 'fixed'
  discount_value NUMERIC(10, 2) NOT NULL,
  min_spend NUMERIC(12, 2) DEFAULT 0,
  max_discount NUMERIC(12, 2),
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ NOT NULL,
  quota INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT TRUE
);

-- 19. PROMOTIONS TABLE
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_url TEXT NOT NULL,
  title VARCHAR(100) NOT NULL,
  subtitle TEXT,
  link_type VARCHAR(30),
  target_id UUID,
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. SUPPORT_TICKETS MESSAGES
CREATE TABLE support_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  attachment_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. REFERRALS TABLE
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES users(id),
  referee_id UUID REFERENCES users(id),
  reward_points INTEGER DEFAULT 100,
  is_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. MERCHANT_FOLLOWERS TABLE
CREATE TABLE merchant_followers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(merchant_id, customer_id)
);

-- 23. SEARCH_HISTORY TABLE
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  query VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. DELIVERY_TRACKING TABLE (Realtime driver GPS path)
CREATE TABLE delivery_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES users(id),
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  heading NUMERIC(5, 2),
  speed NUMERIC(5, 2),
  estimated_arrival TIMESTAMPTZ,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. CHAT_ROOMS & MESSAGES TABLE
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  merchant_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  image_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Customers can manage own addresses" ON customer_addresses
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Customers can view and create own orders" ON orders
  FOR ALL USING (auth.uid() = customer_id);

-- SPATIAL INDEXES FOR HYPERLOCAL RADIUS SEARCH IN ARJAWINANGUN
CREATE INDEX idx_merchant_location ON merchants USING GIST (location);
CREATE INDEX idx_address_location ON customer_addresses USING GIST (location);
CREATE INDEX idx_tracking_order ON delivery_tracking (order_id, recorded_at DESC);
`;

export const FLUTTER_CLEAN_ARCHITECTURE_TREE = `lib/
├── core/
│   ├── constants/
│   │   ├── api_endpoints.dart
│   │   ├── app_colors.dart        # #16A34A (Primary), #F97316 (Secondary)
│   │   └── app_theme.dart         # Material 3 Light & Dark mode
│   ├── network/
│   │   ├── supabase_client.dart   # Supabase Auth, Storage & Realtime
│   │   └── api_interceptor.dart
│   ├── utils/
│   │   ├── currency_formatter.dart # IDR / Rupiah
│   │   └── location_helper.dart    # PostGIS distance & Directions API
│   └── error/
│       └── failures.dart
├── features/
│   ├── auth/
│   │   ├── data/ (datasources, models, repositories_impl)
│   │   ├── domain/ (entities, repositories, usecases: phone_otp, kyc_upload)
│   │   └── presentation/ (bloc/riverpod, pages: login_page, otp_verify, kyc_page)
│   ├── home/
│   │   └── presentation/ (home_page, banner_carousel, services_grid, nearby_stores)
│   ├── food_delivery/
│   │   ├── domain/ (entities: merchant, menu_item)
│   │   └── presentation/ (restaurant_list, food_detail_page, custom_options)
│   ├── grocery/
│   │   └── presentation/ (grocery_catalog, scheduled_delivery_sheet)
│   ├── pharmacy/
│   │   └── presentation/ (medicine_page, rx_prescription_upload_dialog)
│   ├── courier/
│   │   └── presentation/ (send_package_page, package_photo_picker, cost_calculator)
│   ├── ppob/
│   │   └── presentation/ (pulsa_page, pln_token, pdam_cirebon, ewallet_topup)
│   ├── cart_checkout/
│   │   └── presentation/ (cart_sheet, checkout_page, qris_midtrans_gateway)
│   ├── tracking/
│   │   └── presentation/ (realtime_map_page, driver_marker_animator, eta_counter)
│   ├── chat/
│   │   └── presentation/ (chat_room_page, quick_replies, photo_attachment)
│   ├── wallet_mitrapay/
│   │   └── presentation/ (wallet_dashboard, qris_scanner, transfer_page, history)
│   └── profile/
│       └── presentation/ (profile_page, address_management_map, loyalty_tier)
└── main.dart # Supabase.initialize & ProviderScope / BlocProvider`;

export type UserRole = 'customer' | 'merchant' | 'driver' | 'admin';

export type VerificationStatus = 'unverified' | 'partially_verified' | 'verified';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  verificationStatus: VerificationStatus;
  kycDocumentUrl?: string;
  selfieUrl?: string;
  role: UserRole;
  createdAt: string;
  isBlocked?: boolean;
  blockReason?: string;
}

export interface CustomerAddress {
  id: string;
  userId: string;
  label: 'Home' | 'Office' | 'Apartment' | 'Other';
  recipientName: string;
  phone: string;
  streetAddress: string;
  province: string;
  city: string;
  district: string; // e.g. Arjawinangun
  village: string;  // e.g. Jungjang, Tegalgubug, Kebonturi
  latitude: number;
  longitude: number;
  notes?: string;
  isDefault: boolean;
}

export type ServiceType = 
  | 'food' 
  | 'grocery' 
  | 'pharmacy' 
  | 'courier' 
  | 'ppob' 
  | 'umkm';

export interface Merchant {
  id: string;
  name: string;
  category: string;
  serviceType: ServiceType;
  logo: string;
  banner: string;
  rating: number;
  totalReviews: number;
  distanceKm: number;
  estimatedDeliveryMin: number;
  deliveryFee: number;
  address: string;
  district: string;
  isOpen: boolean;
  isVerified: boolean;
  latitude: number;
  longitude: number;
  featured?: boolean;
  tags: string[];
}

export interface Product {
  id: string;
  merchantId: string;
  merchantName?: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  serviceType: ServiceType;
  image: string;
  stock: number;
  rating: number;
  soldCount: number;
  isAvailable: boolean;
  requiresPrescription?: boolean;
  weightGrams?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'merchant_accepted'
  | 'driver_assigned'
  | 'preparing'
  | 'picked_up'
  | 'on_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 
  | 'mitrapay'
  | 'qris'
  | 'cod'
  | 'bank_transfer'
  | 'ewallet';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  vehicleModel: string;
  vehiclePlate: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  merchantId?: string;
  merchantName: string;
  merchantAddress?: string;
  serviceType: ServiceType;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  orderStatus: OrderStatus;
  deliveryAddress: CustomerAddress;
  driver?: DriverInfo;
  createdAt: string;
  estimatedArrival?: string;
  notes?: string;
  courierDetails?: {
    packageCategory: string;
    weightKg: number;
    description: string;
    photoUrl?: string;
    pickupAddress: string;
    dropoffAddress: string;
  };
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  points: number;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  qrisId: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'topup' | 'payment' | 'transfer' | 'cashback' | 'reward';
  amount: number;
  title: string;
  referenceId?: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

export interface Review {
  id: string;
  orderId: string;
  merchantId?: string;
  driverId?: string;
  customerName: string;
  rating: number;
  comment: string;
  photoUrl?: string;
  merchantReply?: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  orderId?: string;
  category: 'Order Problem' | 'Delivery Problem' | 'Payment Problem' | 'Refund Request' | 'Account Issue' | 'Other';
  subject: string;
  description: string;
  status: 'Open' | 'Processing' | 'Resolved' | 'Closed';
  createdAt: string;
  resolutionNote?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'order' | 'promo' | 'voucher' | 'payment' | 'system';
  timestamp: string;
  isRead: boolean;
  orderId?: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  maxDiscount?: number;
  expiryDate: string;
  category: ServiceType | 'all';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: 'customer' | 'driver' | 'merchant';
  text: string;
  imageUrl?: string;
  timestamp: string;
  isRead: boolean;
}

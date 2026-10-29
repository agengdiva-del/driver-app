import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  CustomerAddress,
  CartItem,
  Order,
  OrderStatus,
  Product,
  Merchant,
  ServiceType,
  Voucher,
  NotificationItem,
  Wallet,
  WalletTransaction,
  Complaint,
  Review,
  ChatMessage,
  DriverRegistrationData,
  DriverVerificationStatus,
  DriverEarnings,
  DriverOrderStep
} from '../types';
import {
  INITIAL_ADDRESSES,
  MOCK_MERCHANTS,
  MOCK_PRODUCTS,
  MOCK_DRIVER,
  MOCK_VOUCHERS,
  MOCK_NOTIFICATIONS,
  MOCK_WALLET_TRANSACTIONS,
  INITIAL_DRIVER_PROFILE,
  INITIAL_DRIVER_EARNINGS
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedMerchant: Merchant | null;
  setSelectedMerchant: (m: Merchant | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedService: ServiceType | null;
  setSelectedService: (s: ServiceType | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isKycModalOpen: boolean;
  setIsKycModalOpen: (open: boolean) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
  isBlueprintModalOpen: boolean;
  setIsBlueprintModalOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchFilter: string;
  setSearchFilter: (f: string) => void;

  // Auth & Profile
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
  loginWithPhone: (phone: string, method: 'whatsapp' | 'sms') => void;
  loginWithEmail: (email: string) => void;
  loginWithGoogle: () => void;
  loginAsGuest: () => void;
  logout: () => void;
  submitKyc: (ktpName: string, docUrl: string) => void;

  // Addresses
  addresses: CustomerAddress[];
  currentAddress: CustomerAddress;
  setCurrentAddress: (addr: CustomerAddress) => void;
  addAddress: (addr: Omit<CustomerAddress, 'id' | 'userId'>) => void;
  deleteAddress: (id: string) => void;

  // Catalog
  merchants: Merchant[];
  products: Product[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, notes?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Vouchers
  appliedVoucher: Voucher | null;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
  availableVouchers: Voucher[];

  // Orders & Realtime Tracking
  activeOrder: Order | null;
  orderHistory: Order[];
  placeOrder: (paymentMethod: Order['paymentMethod'], notes?: string) => Order;
  cancelActiveOrder: () => void;
  simulateNextOrderStatus: () => void;
  driverPosition: { lat: number; lng: number };

  // Chat
  chatMessages: ChatMessage[];
  sendMessage: (text: string, imageUrl?: string) => void;

  // Wallet
  wallet: Wallet;
  walletTransactions: WalletTransaction[];
  topUpWallet: (amount: number, method: string) => void;
  transferWallet: (targetPhone: string, amount: number) => boolean;

  // Complaints & Reviews
  complaints: Complaint[];
  addComplaint: (category: Complaint['category'], subject: string, description: string) => void;
  reviews: Review[];
  addReview: (orderId: string, rating: number, comment: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  unreadNotifCount: number;

  // Favorites
  favorites: string[]; // merchant IDs
  toggleFavorite: (merchantId: string) => void;
  isFavorite: (merchantId: string) => boolean;

  // Settings & Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  isDeviceFrame: boolean;
  toggleDeviceFrame: () => void;

  // Driver App Portal & Registration
  isDriverRegistrationModalOpen: boolean;
  setIsDriverRegistrationModalOpen: (open: boolean) => void;
  driverProfile: DriverRegistrationData | null;
  registerDriver: (data: Omit<DriverRegistrationData, 'id' | 'status' | 'registeredAt'>) => void;
  updateDriverStatus: (status: DriverVerificationStatus, reason?: string) => void;
  isDriverOnline: boolean;
  toggleDriverOnline: () => void;
  driverEarnings: DriverEarnings;
  driverActiveOrder: Order | null;
  driverStep: DriverOrderStep;
  setDriverStep: (step: DriverOrderStep) => void;
  advanceDriverStep: () => void;
  driverIncomingOrder: Order | null;
  setDriverIncomingOrder: (order: Order | null) => void;
  acceptIncomingDriverOrder: () => void;
  rejectIncomingDriverOrder: () => void;
  withdrawDriverEarnings: (amount: number) => boolean;
  triggerSampleIncomingOrder: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation (Default to Driver Cockpit)
  const [currentView, setCurrentView] = useState<string>('cockpit');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  // Theme & Mobile Shell
  const [darkMode, setDarkMode] = useState(false);
  const [isDeviceFrame, setIsDeviceFrame] = useState(false);

  // User (Mitra Driver AWD)
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'drv-01',
    fullName: 'Kang Asep Kurniawan',
    phone: '0813-8822-4411',
    email: 'asep.kurniawan@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    role: 'driver',
    createdAt: '2026-01-10'
  });

  // Addresses
  const [addresses, setAddresses] = useState<CustomerAddress[]>(INITIAL_ADDRESSES);
  const [currentAddress, setCurrentAddress] = useState<CustomerAddress>(INITIAL_ADDRESSES[0]);

  // Catalog
  const [merchants] = useState<Merchant[]>(MOCK_MERCHANTS);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[0], // Empal Gentong
      quantity: 2,
      notes: 'Kuah pisah, kucai dibanyakin ya kang'
    },
    {
      product: MOCK_PRODUCTS[2], // Lontong
      quantity: 2,
      notes: ''
    }
  ]);

  // Vouchers
  const [availableVouchers] = useState<Voucher[]>(MOCK_VOUCHERS);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(MOCK_VOUCHERS[1]);

  // Wallet
  const [wallet, setWallet] = useState<Wallet>({
    id: 'w-1',
    userId: 'user-1',
    balance: 145500,
    points: 340,
    membershipLevel: 'Silver',
    qrisId: '00020101021226580016ID.CO.MITRAARJA.WWW011893600998822145500252045812'
  });
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(MOCK_WALLET_TRANSACTIONS);

  // Initial Sample Active Order
  const [activeOrder, setActiveOrder] = useState<Order | null>({
    id: 'ord-101',
    orderNumber: 'ORD-ARJA-2026-0819',
    userId: 'user-1',
    merchantId: 'm-1',
    merchantName: 'Empal Gentong H. Apud - Cabang Arja',
    merchantAddress: 'Jl. Raya By Pass Arjawinangun No. 18',
    serviceType: 'food',
    items: [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 2,
        notes: 'Kuah pisah, kucai dibanyakin ya kang'
      },
      {
        product: MOCK_PRODUCTS[2],
        quantity: 2,
        notes: ''
      }
    ],
    subtotal: 74000,
    deliveryFee: 5000,
    platformFee: 1500,
    discount: 5000,
    totalAmount: 75500,
    paymentMethod: 'mitrapay',
    paymentStatus: 'paid',
    orderStatus: 'on_delivery',
    deliveryAddress: INITIAL_ADDRESSES[0],
    driver: MOCK_DRIVER,
    createdAt: '10 menit lalu',
    estimatedArrival: '6 menit (1.2 km)',
    notes: 'Pagar hijau dekat Masjid Al-Falah'
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>([
    {
      id: 'ord-100',
      orderNumber: 'ORD-ARJA-2026-0742',
      userId: 'user-1',
      merchantId: 'm-2',
      merchantName: 'Nasi Jamblang Ibu Nur Arjawinangun',
      merchantAddress: 'Jl. Kantor Pos Jungjang Arjawinangun',
      serviceType: 'food',
      items: [
        {
          product: MOCK_PRODUCTS[3],
          quantity: 1,
          notes: 'Pedas sedang'
        }
      ],
      subtotal: 29500,
      deliveryFee: 4000,
      platformFee: 1500,
      discount: 0,
      totalAmount: 35000,
      paymentMethod: 'qris',
      paymentStatus: 'paid',
      orderStatus: 'completed',
      deliveryAddress: INITIAL_ADDRESSES[0],
      driver: MOCK_DRIVER,
      createdAt: 'Kemarin, 12:30',
      notes: ''
    }
  ]);

  // Driver GPS live simulation coordinates (Arjawinangun center)
  const [driverPosition, setDriverPosition] = useState({
    lat: -6.6458,
    lng: 108.4110
  });

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      senderId: 'drv-01',
      senderType: 'driver',
      text: 'Sampurasun Mas Faiz, pesanan Empal Gentong sudah saya ambil di resto ya. Sekarang lagi jalan ke lokasi Jl. Ki Bagus Rangin 🙏',
      timestamp: '18:42',
      isRead: true
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      senderType: 'customer',
      text: 'Mangga kang Asep, hati-hati di jalan. Nanti saya tunggu di depan pagar hijau yaa.',
      timestamp: '18:43',
      isRead: true
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(['m-1', 'm-2']);

  // Complaints
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'comp-1',
      ticketNumber: 'TKT-ARJA-4921',
      category: 'Order Problem',
      subject: 'Kekurangan sendok dan sambal pada pesanan',
      description: 'Pesanan empal gentong sebelumnya tidak disertakan sambal bubuk khas.',
      status: 'Resolved',
      createdAt: '15 Okt 2026',
      resolutionNote: 'Pihak resto telah memberikan kompensasi kupon potongan Rp 10.000.'
    }
  ]);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      orderId: 'ord-100',
      customerName: 'Ahmad Faiz',
      rating: 5,
      comment: 'Cuminya empuk pisan, sambal jamblang juara! Driver kang Asep ramah & cepet sampai.',
      createdAt: 'Kemarin'
    }
  ]);

  // Driver App Portal & Registration
  const [isDriverRegistrationModalOpen, setIsDriverRegistrationModalOpen] = useState(false);
  const [driverProfile, setDriverProfile] = useState<DriverRegistrationData | null>(INITIAL_DRIVER_PROFILE);
  const [isDriverOnline, setIsDriverOnline] = useState(true);
  const [driverEarnings, setDriverEarnings] = useState<DriverEarnings>(INITIAL_DRIVER_EARNINGS);
  const [driverActiveOrder, setDriverActiveOrder] = useState<Order | null>(null);
  const [driverStep, setDriverStep] = useState<DriverOrderStep>('Menuju Merchant');
  const [driverIncomingOrder, setDriverIncomingOrder] = useState<Order | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleDeviceFrame = () => setIsDeviceFrame(prev => !prev);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, notes = '') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, quantity, notes }];
    });
    showToast(`Ditambahkan ke keranjang: ${product.name}`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item dihapus dari keranjang', 'info');
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Voucher logic
  const applyVoucher = (code: string): boolean => {
    const found = availableVouchers.find(
      v => v.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (!found) {
      showToast('Kode voucher tidak ditemukan atau kadaluarsa', 'error');
      return false;
    }
    if (cartTotal < found.minSpend) {
      showToast(`Minimal belanja Rp ${found.minSpend.toLocaleString('id-ID')} untuk voucher ini`, 'warning');
      return false;
    }
    setAppliedVoucher(found);
    showToast(`Voucher ${found.code} berhasil dipasang!`, 'success');
    return true;
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Voucher dilepas', 'info');
  };

  // Place order
  const placeOrder = (paymentMethod: Order['paymentMethod'], notes?: string): Order => {
    const deliveryFee = 5000;
    const platformFee = 1500; // MitraArja Admin rule (Rp 1.000 - Rp 2.500)
    let discount = 0;

    if (appliedVoucher) {
      if (appliedVoucher.discountType === 'percentage') {
        discount = Math.min((cartTotal * appliedVoucher.discountValue) / 100, appliedVoucher.maxDiscount || 999999);
      } else {
        discount = appliedVoucher.discountValue;
      }
    }

    const totalAmount = Math.max(0, cartTotal + deliveryFee + platformFee - discount);
    const orderNum = `ORD-ARJA-${Date.now().toString().slice(-6)}`;

    // Deduct wallet if paid via MitraPay
    if (paymentMethod === 'mitrapay') {
      if (wallet.balance < totalAmount) {
        showToast('Saldo MitraPay tidak mencukupi, silakan Top Up terlebih dahulu', 'error');
        throw new Error('Insufficient balance');
      }
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - totalAmount,
        points: prev.points + Math.floor(totalAmount / 10000) // Rule: Rp 10.000 = 1 Point
      }));
      setWalletTransactions(prev => [
        {
          id: `wt-${Date.now()}`,
          walletId: wallet.id,
          type: 'payment',
          amount: -totalAmount,
          title: `Pembayaran ${orderNum}`,
          referenceId: orderNum,
          status: 'success',
          timestamp: 'Baru saja'
        },
        ...prev
      ]);
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      userId: currentUser?.id || 'guest',
      merchantId: cart[0]?.product.merchantId,
      merchantName: cart[0]?.product.merchantName || 'Mitra UMKM Arjawinangun',
      merchantAddress: 'Kecamatan Arjawinangun, Cirebon',
      serviceType: cart[0]?.product.serviceType || 'food',
      items: [...cart],
      subtotal: cartTotal,
      deliveryFee,
      platformFee,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'unpaid' : 'paid',
      orderStatus: 'driver_assigned',
      deliveryAddress: currentAddress,
      driver: MOCK_DRIVER,
      createdAt: 'Baru saja',
      estimatedArrival: '18 menit',
      notes: notes || currentAddress.notes
    };

    setActiveOrder(newOrder);
    setOrderHistory(prev => [newOrder, ...prev]);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    showToast(`Pesanan ${orderNum} berhasil dibuat!`, 'success');

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Pesanan Dikonfirmasi! 🛵',
        message: `Pesanan ${orderNum} telah diteruskan ke merchant & driver terdekat.`,
        category: 'order',
        timestamp: 'Baru saja',
        isRead: false,
        orderId: newOrder.id
      },
      ...prev
    ]);

    return newOrder;
  };

  const cancelActiveOrder = () => {
    if (!activeOrder) return;
    setActiveOrder(null);
    showToast('Pesanan telah dibatalkan', 'info');
  };

  // Simulate real-time order lifecycle progression
  const simulateNextOrderStatus = () => {
    if (!activeOrder) return;
    const stages: OrderStatus[] = [
      'pending',
      'merchant_accepted',
      'driver_assigned',
      'preparing',
      'picked_up',
      'on_delivery',
      'delivered',
      'completed'
    ];
    const currentIndex = stages.indexOf(activeOrder.orderStatus);
    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      setActiveOrder(prev => prev ? { ...prev, orderStatus: nextStatus } : null);
      showToast(`Status pesanan diperbarui: ${nextStatus.replace('_', ' ').toUpperCase()}`, 'info');

      // Slightly shift simulated driver GPS
      setDriverPosition(prev => ({
        lat: prev.lat + 0.0003,
        lng: prev.lng + 0.0003
      }));

      if (nextStatus === 'completed') {
        showToast('Pesanan selesai! Terima kasih telah menggunakan MitraArja.', 'success');
      }
    }
  };

  // Chat
  const sendMessage = (text: string, imageUrl?: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id || 'guest',
      senderType: 'customer',
      text,
      imageUrl,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };
    setChatMessages(prev => [...prev, newMsg]);

    // Simulated quick driver auto-reply
    setTimeout(() => {
      const replies = [
        'Siap Mas Faiz, pesanan dipastikan aman!',
        'Baik, saya sudah dekat pertigaan Jungjang.',
        'Oke mas, meluncur sekarang!'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          senderId: 'drv-01',
          senderType: 'driver',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        }
      ]);
    }, 1800);
  };

  // Wallet operations
  const topUpWallet = (amount: number, method: string) => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
    setWalletTransactions(prev => [
      {
        id: `wt-${Date.now()}`,
        walletId: wallet.id,
        type: 'topup',
        amount,
        title: `Top Up via ${method}`,
        referenceId: `TOPUP-${Date.now().toString().slice(-4)}`,
        status: 'success',
        timestamp: 'Baru saja'
      },
      ...prev
    ]);
    showToast(`Top Up Rp ${amount.toLocaleString('id-ID')} berhasil!`, 'success');
  };

  const transferWallet = (targetPhone: string, amount: number): boolean => {
    if (wallet.balance < amount) {
      showToast('Saldo MitraPay tidak mencukupi', 'error');
      return false;
    }
    setWallet(prev => ({
      ...prev,
      balance: prev.balance - amount
    }));
    setWalletTransactions(prev => [
      {
        id: `wt-${Date.now()}`,
        walletId: wallet.id,
        type: 'transfer',
        amount: -amount,
        title: `Transfer ke ${targetPhone}`,
        referenceId: `TRF-${Date.now().toString().slice(-4)}`,
        status: 'success',
        timestamp: 'Baru saja'
      },
      ...prev
    ]);
    showToast(`Transfer Rp ${amount.toLocaleString('id-ID')} ke ${targetPhone} berhasil!`, 'success');
    return true;
  };

  // Addresses
  const addAddress = (addr: Omit<CustomerAddress, 'id' | 'userId'>) => {
    const newAddr: CustomerAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
      userId: currentUser?.id || 'guest'
    };
    setAddresses(prev => [newAddr, ...prev]);
    setCurrentAddress(newAddr);
    showToast('Alamat baru berhasil disimpan', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Alamat dihapus', 'info');
  };

  // Complaints & Reviews
  const addComplaint = (category: Complaint['category'], subject: string, description: string) => {
    const ticket: Complaint = {
      id: `comp-${Date.now()}`,
      ticketNumber: `TKT-ARJA-${Date.now().toString().slice(-4)}`,
      category,
      subject,
      description,
      status: 'Open',
      createdAt: 'Baru saja'
    };
    setComplaints(prev => [ticket, ...prev]);
    showToast(`Tiket aduan #${ticket.ticketNumber} berhasil diajukan`, 'success');
  };

  const addReview = (orderId: string, rating: number, comment: string) => {
    const rev: Review = {
      id: `rev-${Date.now()}`,
      orderId,
      customerName: currentUser?.fullName || 'Pelanggan Arja',
      rating,
      comment,
      createdAt: 'Baru saja'
    };
    setReviews(prev => [rev, ...prev]);
    showToast('Ulasan dan bintang berhasil dikirim, hatur nuhun!', 'success');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadNotifCount = notifications.filter(n => !n.isRead).length;

  // Favorites
  const toggleFavorite = (merchantId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(merchantId);
      if (exists) {
        showToast('Dihapus dari merchant favorit', 'info');
        return prev.filter(id => id !== merchantId);
      } else {
        showToast('Ditambahkan ke merchant favorit ❤️', 'success');
        return [...prev, merchantId];
      }
    });
  };

  const isFavorite = (merchantId: string) => favorites.includes(merchantId);

  // Auth simulators
  const loginWithPhone = (phone: string, method: 'whatsapp' | 'sms') => {
    setCurrentUser({
      id: 'user-1',
      fullName: 'Pelanggan Arjawinangun',
      phone,
      email: `${phone.replace(/\D/g, '')}@mitraarja.id`,
      verificationStatus: 'verified',
      role: 'customer',
      createdAt: '2026-10-19'
    });
    setIsAuthModalOpen(false);
    showToast(`Login berhasil via OTP ${method === 'whatsapp' ? 'WhatsApp' : 'SMS'}!`, 'success');
  };

  const loginWithEmail = (email: string) => {
    setCurrentUser({
      id: 'user-1',
      fullName: email.split('@')[0],
      phone: '0812-9988-7766',
      email,
      verificationStatus: 'partially_verified',
      role: 'customer',
      createdAt: '2026-10-19'
    });
    setIsAuthModalOpen(false);
    showToast('Login berhasil!', 'success');
  };

  const loginWithGoogle = () => {
    setCurrentUser({
      id: 'user-google-1',
      fullName: 'Ahmad Faiz Mubarok',
      phone: '0812-3456-7890',
      email: 'aluncell@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      verificationStatus: 'verified',
      role: 'customer',
      createdAt: '2026-10-19'
    });
    setIsAuthModalOpen(false);
    showToast('Berhasil masuk dengan Akun Google!', 'success');
  };

  const loginAsGuest = () => {
    setCurrentUser({
      id: 'guest-user',
      fullName: 'Tamu MitraArja',
      phone: '0800-0000-0000',
      email: 'tamu@mitraarja.id',
      verificationStatus: 'unverified',
      role: 'customer',
      createdAt: '2026-10-19'
    });
    setIsAuthModalOpen(false);
    showToast('Mode tamu aktif. Jelajahi merchant Arjawinangun!', 'info');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah keluar', 'info');
  };

  const submitKyc = (ktpName: string, docUrl: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        fullName: ktpName || currentUser.fullName,
        verificationStatus: 'verified',
        kycDocumentUrl: docUrl
      });
      showToast('KYC Dokumen & Selfie berhasil diverifikasi instan!', 'success');
      setIsKycModalOpen(false);
    }
  };

  // Driver App Handlers
  const registerDriver = (data: Omit<DriverRegistrationData, 'id' | 'status' | 'registeredAt'>) => {
    const newProfile: DriverRegistrationData = {
      ...data,
      id: `drv-${Date.now().toString().slice(-4)}`,
      status: 'Menunggu Verifikasi',
      registeredAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      rating: 5.0,
      completedTripsCount: 0
    };
    setDriverProfile(newProfile);
    showToast('Pendaftaran driver berhasil dikirim! Menunggu verifikasi admin AWD.', 'success');
  };

  const updateDriverStatus = (status: DriverVerificationStatus, reason?: string) => {
    if (driverProfile) {
      setDriverProfile({
        ...driverProfile,
        status,
        rejectionReason: status === 'Ditolak' ? (reason || 'Dokumen SIM/STNK kurang jelas atau masa berlaku habis') : undefined
      });
      if (status === 'Disetujui') {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        showToast('Akun Driver DISANGGONGKAN / DISETUJUI! Selamat bergabung di AWD.', 'success');
      } else if (status === 'Ditolak') {
        showToast('Status Driver diubah menjadi Ditolak.', 'warning');
      } else {
        showToast('Status Driver kembali ke Menunggu Verifikasi.', 'info');
      }
    }
  };

  const toggleDriverOnline = () => {
    if (driverProfile?.status !== 'Disetujui') {
      showToast('Akun Anda belum disetujui untuk mulai bekerja', 'warning');
      return;
    }
    const nextState = !isDriverOnline;
    setIsDriverOnline(nextState);
    if (nextState) {
      showToast('Status Driver: ONLINE. Siap menerima orderan pengantaran!', 'success');
      // If no active or incoming order, trigger a simulated incoming order after 3s
      if (!driverActiveOrder && !driverIncomingOrder) {
        setTimeout(() => {
          triggerSampleIncomingOrder();
        }, 3000);
      }
    } else {
      showToast('Status Driver: OFFLINE. Istirahat sejenak.', 'info');
    }
  };

  const advanceDriverStep = () => {
    if (!driverActiveOrder) return;
    if (driverStep === 'Menuju Merchant') {
      setDriverStep('Pesanan Diambil');
      showToast('Status diperbarui: Pesanan telah diambil dari Merchant', 'success');
    } else if (driverStep === 'Pesanan Diambil') {
      setDriverStep('Menuju Pelanggan');
      showToast('Status diperbarui: Sedang menuju alamat pelanggan', 'info');
    } else if (driverStep === 'Menuju Pelanggan') {
      setDriverStep('Pesanan Selesai');
      // Calculate earnings: 90% of deliveryFee
      const earned = Math.round(driverActiveOrder.deliveryFee * 0.9);
      setDriverEarnings(prev => ({
        ...prev,
        todayEarnings: prev.todayEarnings + earned,
        totalEarnings: prev.totalEarnings + earned,
        todayTrips: prev.todayTrips + 1,
        totalTrips: prev.totalTrips + 1,
        driverWalletBalance: prev.driverWalletBalance + earned
      }));
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
      showToast(`Pesanan selesai! Pendapatan +Rp ${earned.toLocaleString('id-ID')} (Komisi 90%) telah masuk dompet`, 'success');
      
      setTimeout(() => {
        setDriverActiveOrder(null);
        setDriverStep('Menuju Merchant');
      }, 2500);
    }
  };

  const triggerSampleIncomingOrder = () => {
    const sampleOrder: Order = {
      id: `ord-in-${Date.now().toString().slice(-4)}`,
      orderNumber: `AWD-FOOD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: 'user-sample',
      merchantId: 'm-1',
      merchantName: 'Empal Gentong H. Apud - Cabang Arja',
      merchantAddress: 'Jl. Raya By Pass Jungjang No. 12, Arjawinangun',
      serviceType: 'food',
      items: [
        {
          product: {
            id: 'p-1',
            merchantId: 'm-1',
            name: 'Empal Gentong Daging Super',
            description: 'Daging sapi segar khas Arjawinangun',
            price: 28000,
            image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=300&auto=format&fit=crop&q=80',
            category: 'Makanan Utama',
            serviceType: 'food',
            stock: 50,
            rating: 4.9,
            soldCount: 320,
            isAvailable: true
          },
          quantity: 2,
          notes: 'Kuah pisah, sambal cabai bubuk banyakin'
        }
      ],
      subtotal: 56000,
      deliveryFee: 12000,
      platformFee: 1500,
      discount: 0,
      totalAmount: 69500,
      paymentMethod: 'qris',
      paymentStatus: 'paid',
      orderStatus: 'preparing',
      deliveryAddress: {
        id: 'addr-cust',
        userId: 'user-sample',
        label: 'Home',
        recipientName: 'Mas Danu Pratama (0812-9988-7766)',
        phone: '0812-9988-7766',
        streetAddress: 'Komplek Griya Arjawinangun Indah Blok C-09',
        village: 'Jungjang',
        district: 'Arjawinangun',
        city: 'Kabupaten Cirebon',
        province: 'Jawa Barat',
        latitude: -6.6430,
        longitude: 108.4090,
        notes: 'Pagar abu-abu, ada motor Nmax parkir di teras',
        isDefault: true
      },
      createdAt: 'Baru saja',
      estimatedArrival: '18 Menit'
    };
    setDriverIncomingOrder(sampleOrder);
  };

  const acceptIncomingDriverOrder = () => {
    if (!driverIncomingOrder) return;
    setDriverActiveOrder(driverIncomingOrder);
    setDriverStep('Menuju Merchant');
    setDriverIncomingOrder(null);
    showToast('Tawaran pesanan diterima! Segera meluncur ke resto/merchant.', 'success');
  };

  const rejectIncomingDriverOrder = () => {
    setDriverIncomingOrder(null);
    showToast('Tawaran pengantaran dilewati.', 'info');
  };

  const withdrawDriverEarnings = (amount: number): boolean => {
    if (amount <= 0 || amount > driverEarnings.driverWalletBalance) {
      showToast('Nominal penarikan melebihi saldo dompet driver', 'error');
      return false;
    }
    setDriverEarnings(prev => ({
      ...prev,
      driverWalletBalance: prev.driverWalletBalance - amount
    }));
    showToast(`Penarikan dana Rp ${amount.toLocaleString('id-ID')} berhasil diajukan ke rekening/e-wallet!`, 'success');
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedMerchant,
        setSelectedMerchant,
        selectedProduct,
        setSelectedProduct,
        selectedService,
        setSelectedService,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isChatOpen,
        setIsChatOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isKycModalOpen,
        setIsKycModalOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isBlueprintModalOpen,
        setIsBlueprintModalOpen,
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        currentUser,
        setCurrentUser,
        loginWithPhone,
        loginWithEmail,
        loginWithGoogle,
        loginAsGuest,
        logout,
        submitKyc,
        addresses,
        currentAddress,
        setCurrentAddress,
        addAddress,
        deleteAddress,
        merchants,
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        availableVouchers,
        activeOrder,
        orderHistory,
        placeOrder,
        cancelActiveOrder,
        simulateNextOrderStatus,
        driverPosition,
        chatMessages,
        sendMessage,
        wallet,
        walletTransactions,
        topUpWallet,
        transferWallet,
        complaints,
        addComplaint,
        reviews,
        addReview,
        notifications,
        markNotificationAsRead,
        unreadNotifCount,
        favorites,
        toggleFavorite,
        isFavorite,
        darkMode,
        toggleDarkMode,
        isDeviceFrame,
        toggleDeviceFrame,
        isDriverRegistrationModalOpen,
        setIsDriverRegistrationModalOpen,
        driverProfile,
        registerDriver,
        updateDriverStatus,
        isDriverOnline,
        toggleDriverOnline,
        driverEarnings,
        driverActiveOrder,
        driverStep,
        setDriverStep,
        advanceDriverStep,
        driverIncomingOrder,
        setDriverIncomingOrder,
        acceptIncomingDriverOrder,
        rejectIncomingDriverOrder,
        withdrawDriverEarnings,
        triggerSampleIncomingOrder,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

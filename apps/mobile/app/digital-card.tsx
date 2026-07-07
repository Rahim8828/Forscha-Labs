import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Alert, FlatList, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft, ShoppingCart, Star, Check, Plus, Minus, Trash2,
  Zap, Shield, Package, Wifi, ChevronRight, ChevronDown, ChevronUp,
  Award, Users, TrendingUp, MapPin, Truck, Clock, Tag,
} from 'lucide-react-native';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Plan {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  features: string[];
}

interface Product {
  id: string;
  name: string;
  shortName: string;
  category: 'google' | 'standee' | 'nfc' | 'menu';
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  brand: string;
  size: string;
  material: string;
  nfcEnabled: boolean;
  color: string;
  description: string;
  features: string[];
  plans: Plan[];
  image: ReturnType<typeof require>;
  badgeColor: string;
}

interface CartItem {
  product: Product;
  plan: Plan;
  qty: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '1 QR Google Review AI Standee | White Acrylic | 5mm Thick | NFC-Enabled',
    shortName: '1QR Google Review AI Standee',
    category: 'google',
    price: 1200,
    originalPrice: 4000,
    discount: 70,
    rating: 4.5,
    reviews: 324,
    brand: 'SmartyQ',
    size: '4×6 inch (5mm Thickness)',
    material: 'Acrylic',
    nfcEnabled: true,
    color: 'Gold & White',
    description: 'Boost your Google reviews instantly! UV-printed acrylic standee with embedded QR + NFC tap access. One-time setup, lifetime results.',
    features: [
      'Get 1 Year AI Review Subscription FREE',
      'UV printed directly on Acrylic – High quality & durable',
      '5mm thick acrylic for a premium look and durability',
      'Google Review QR code for easy access',
      'Google Review Stand with NFC technology',
      'Contactless NFC tag for seamless user experience',
    ],
    plans: [
      { id: 'pro', label: 'Google Standee + AI Pro Plan', price: 1200, originalPrice: 4000, features: ['1 Year AI Review Subscription', 'QR Code Setup', 'Basic Analytics'] },
      { id: 'premium', label: 'Google Standee + AI Premium Plan', price: 3200, originalPrice: 6000, badge: 'Most Popular', features: ['2 Year AI Review Subscription', 'QR + NFC Setup', 'Advanced Analytics', 'Priority Support'] },
      { id: 'enterprise', label: 'Google Standee + AI Enterprise Plan', price: 5200, originalPrice: 8000, badge: 'Best Value', features: ['Lifetime AI Review Subscription', 'Multiple QR + NFC Setup', 'Full Analytics Dashboard', '24/7 Dedicated Support', 'Custom Branding'] },
    ],
    image: require('../assets/products/product_1qr_standee.png'),
    badgeColor: '#F59E0B',
  },
  {
    id: 'p2',
    name: 'Customized 1 QR Standee | Premium Acrylic | NFC-Enabled',
    shortName: 'Customized 1QR Standee',
    category: 'standee',
    price: 1000,
    originalPrice: 3300,
    discount: 70,
    rating: 4.3,
    reviews: 218,
    brand: 'SmartyQ',
    size: '4×6 inch',
    material: 'Acrylic',
    nfcEnabled: true,
    color: 'Custom',
    description: 'Fully customizable standee with your brand logo and colors. UV-printed with QR + NFC for seamless customer review experience.',
    features: [
      'Custom branding with your logo and colors',
      'UV printed high quality acrylic standee',
      'QR + NFC enabled for dual-mode access',
      '1 Year AI Review Subscription included',
      'Fast delivery within 5-7 working days',
    ],
    plans: [
      { id: 'pro', label: 'Standee + AI Pro Plan', price: 1000, originalPrice: 3300, features: ['1 Year AI Review Subscription', 'Custom Design', 'QR Code Setup'] },
      { id: 'premium', label: 'Standee + AI Premium Plan', price: 2800, originalPrice: 5000, badge: 'Most Popular', features: ['2 Year AI Review Subscription', 'Premium Custom Design', 'QR + NFC Setup', 'Analytics Dashboard'] },
    ],
    image: require('../assets/products/product_custom_1qr_standee.png'),
    badgeColor: '#8B5CF6',
  },
  {
    id: 'p3',
    name: '2 QR Google Review AI Standee | Double QR Acrylic | NFC-Enabled',
    shortName: '2QR Google Review AI Standee',
    category: 'google',
    price: 1500,
    originalPrice: 5000,
    discount: 70,
    rating: 4.6,
    reviews: 412,
    brand: 'SmartyQ',
    size: '5×7 inch (5mm Thickness)',
    material: 'Acrylic',
    nfcEnabled: true,
    color: 'Gold & White',
    description: 'Double QR standee with two separate QR codes for different platforms. Collect reviews on Google AND Justdial simultaneously.',
    features: [
      '2 QR Codes – Google + any other platform',
      'NFC enabled for tap-to-review experience',
      'Get 1 Year AI Review Subscription FREE',
      '5mm premium thick acrylic',
      'UV printed for outdoor durability',
    ],
    plans: [
      { id: 'pro', label: 'Double QR + AI Pro Plan', price: 1500, originalPrice: 5000, features: ['1 Year AI Review Subscription', '2 QR Codes', 'Dual Platform Setup'] },
      { id: 'premium', label: 'Double QR + AI Premium Plan', price: 3800, originalPrice: 7000, badge: 'Most Popular', features: ['2 Year AI Review Subscription', '2 QR + NFC', 'Analytics', 'Priority Support'] },
      { id: 'enterprise', label: 'Double QR + AI Enterprise Plan', price: 6000, originalPrice: 10000, badge: 'Best Value', features: ['Lifetime Subscription', 'Unlimited QR Codes', 'Full Suite', '24/7 Support'] },
    ],
    image: require('../assets/products/product_2qr_standee.png'),
    badgeColor: '#3E6BEC',
  },
  {
    id: 'p4',
    name: 'Customized 2 QR Standee | Dual QR | Premium Acrylic',
    shortName: 'Customized 2QR Standee',
    category: 'standee',
    price: 1100,
    originalPrice: 3700,
    discount: 70,
    rating: 4.2,
    reviews: 156,
    brand: 'SmartyQ',
    size: '5×7 inch',
    material: 'Acrylic',
    nfcEnabled: false,
    color: 'Custom',
    description: 'Your brand, your design! Two QR codes on a premium customized acrylic standee. Perfect for restaurants with menu + review QR.',
    features: [
      'Dual QR code layout with custom design',
      'Perfect for Menu QR + Review QR combo',
      'High-resolution UV print on premium acrylic',
      'Your logo, colors, and contact info',
    ],
    plans: [
      { id: 'pro', label: 'Custom 2QR + AI Pro Plan', price: 1100, originalPrice: 3700, features: ['1 Year AI Review Subscription', 'Custom Dual QR Design', 'QR Code Setup'] },
      { id: 'premium', label: 'Custom 2QR + AI Premium Plan', price: 3000, originalPrice: 5500, badge: 'Most Popular', features: ['2 Year AI Review Subscription', 'Premium Custom Design', 'Analytics Dashboard'] },
    ],
    image: require('../assets/products/product_custom_2qr_standee.png'),
    badgeColor: '#10B981',
  },
  {
    id: 'p5',
    name: '3 QR Google Review AI Standee | Triple QR Acrylic | NFC-Enabled',
    shortName: '3QR Google Review AI Standee',
    category: 'google',
    price: 1500,
    originalPrice: 5000,
    discount: 70,
    rating: 4.7,
    reviews: 289,
    brand: 'SmartyQ',
    size: '6×8 inch (5mm Thickness)',
    material: 'Acrylic',
    nfcEnabled: true,
    color: 'Gold & White',
    description: 'Triple QR standee – collect reviews across three platforms simultaneously. Maximum review generation for serious business owners.',
    features: [
      '3 QR Codes for Google, Justdial & Zomato/Swiggy',
      'NFC enabled for triple platform tap access',
      'Get 1 Year AI Review Subscription FREE',
      '5mm thick acrylic standee',
      'AI-powered smart review prompts',
    ],
    plans: [
      { id: 'pro', label: 'Triple QR + AI Pro Plan', price: 1500, originalPrice: 5000, features: ['1 Year AI Review Subscription', '3 QR Codes', 'Triple Platform Setup'] },
      { id: 'premium', label: 'Triple QR + AI Premium Plan', price: 4200, originalPrice: 8000, badge: 'Most Popular', features: ['2 Year AI Review Subscription', '3 QR + NFC', 'Full Analytics'] },
      { id: 'enterprise', label: 'Triple QR + AI Enterprise Plan', price: 6200, originalPrice: 12000, badge: 'Best Value', features: ['Lifetime Subscription', 'All Features', '24/7 Priority Support', 'Custom Branding'] },
    ],
    image: require('../assets/products/product_3qr_standee.png'),
    badgeColor: '#F59E0B',
  },
  {
    id: 'p6',
    name: 'Customized NFC Digital Business Card | Smart NFC Tap Card',
    shortName: 'Customized NFC Digital Business Card',
    category: 'nfc',
    price: 501,
    originalPrice: 1700,
    discount: 70,
    rating: 4.4,
    reviews: 534,
    brand: 'SmartyQ',
    size: 'Standard Card (85×54mm)',
    material: 'PVC / Metal Available',
    nfcEnabled: true,
    color: 'Custom',
    description: 'Share your complete digital profile with a single tap. No app needed! Works with all NFC-enabled smartphones instantly.',
    features: [
      'Tap to share contact, website, social media',
      'No app required – works on all NFC phones',
      'Custom design with your branding',
      'Rewritable NFC – update info anytime',
      'Works with iOS and Android',
    ],
    plans: [
      { id: 'basic', label: 'NFC Card Basic', price: 501, originalPrice: 1700, features: ['1 NFC Card', 'Custom Design', 'Basic Digital Profile'] },
      { id: 'pro', label: 'NFC Card Pro', price: 1200, originalPrice: 3000, badge: 'Most Popular', features: ['3 NFC Cards', 'Premium Custom Design', 'Full Digital Profile', 'Analytics'] },
    ],
    image: require('../assets/products/product_nfc_business_card.png'),
    badgeColor: '#3E6BEC',
  },
  {
    id: 'p7',
    name: 'Social Media Card – Tap to Share | Instagram & LinkedIn NFC Card',
    shortName: 'Social Media Card – Tap to Share',
    category: 'nfc',
    price: 550,
    originalPrice: 1800,
    discount: 70,
    rating: 4.3,
    reviews: 198,
    brand: 'SmartyQ',
    size: 'Standard Card (85×54mm)',
    material: 'PVC',
    nfcEnabled: true,
    color: 'Custom',
    description: 'Instantly share your Instagram, LinkedIn, Facebook profile with a tap. Perfect for networking events and influencer marketing.',
    features: [
      'One tap to open your social media profile',
      'Supports Instagram, LinkedIn, YouTube, Facebook',
      'Custom printed with your photo and handle',
      'Works on all NFC smartphones',
      'Rewritable – change linked profile anytime',
    ],
    plans: [
      { id: 'basic', label: 'Social NFC Card Basic', price: 550, originalPrice: 1800, features: ['1 Card', 'Custom Print', '1 Social Profile Link'] },
      { id: 'pro', label: 'Social NFC Card Pro', price: 1400, originalPrice: 3500, badge: 'Most Popular', features: ['5 Cards', 'Premium Print', 'Multiple Profile Links', 'Analytics Dashboard'] },
    ],
    image: require('../assets/products/product_social_media_card.png'),
    badgeColor: '#EC4899',
  },
  {
    id: 'p8',
    name: 'Smart Digital Menu Card | NFC & QR Menu for Restaurants',
    shortName: 'Smart Digital Menu Card (NFC & QR)',
    category: 'menu',
    price: 1000,
    originalPrice: 3300,
    discount: 70,
    rating: 4.5,
    reviews: 176,
    brand: 'SmartyQ',
    size: 'A5 / Custom',
    material: 'Acrylic / PVC',
    nfcEnabled: true,
    color: 'Custom',
    description: 'Replace paper menus with a smart digital menu. Customers scan QR or tap NFC to view your full menu instantly. Update items without reprinting.',
    features: [
      'QR + NFC dual access to your digital menu',
      'Update menu items anytime from your phone',
      'No printing costs – save money long term',
      'Supports images, descriptions, prices',
      'Works at any restaurant, café, hotel',
    ],
    plans: [
      { id: 'basic', label: 'Smart Menu Basic', price: 1000, originalPrice: 3300, features: ['1 Menu Card', 'Digital Menu Setup', 'QR + NFC Access', '1 Year Updates'] },
      { id: 'pro', label: 'Smart Menu Pro', price: 2500, originalPrice: 5000, badge: 'Most Popular', features: ['5 Menu Cards', 'Custom Design', 'QR + NFC', 'Lifetime Updates', 'Analytics'] },
    ],
    image: require('../assets/products/product_smart_menu_card.png'),
    badgeColor: '#F97316',
  },
];

const FILTERS = [
  { id: 'all', label: 'All Products' },
  { id: 'google', label: 'Google Review' },
  { id: 'standee', label: 'Standees' },
  { id: 'nfc', label: 'Digital Cards' },
  { id: 'menu', label: 'Menu Cards' },
];

const HOW_IT_WORKS = [
  { step: '1', title: 'Place Your Order', desc: 'Select your preferred design and complete your order', icon: Package },
  { step: '2', title: 'Scan the QR Code', desc: 'Use your smartphone to scan the QR code provided', icon: Zap },
  { step: '3', title: 'Enter Your Business Details', desc: 'Add your business information and save the details', icon: MapPin },
  { step: '4', title: 'Add Keywords for AI', desc: 'Provide keywords for the AI to generate intelligent suggestions', icon: Award },
  { step: '5', title: 'Place it on Your Counter', desc: 'Position your standee on your business counter for customers to scan', icon: Shield },
  { step: '6', title: 'Our Team Will Connect', desc: 'Our support team will reach out to assist you as ordered', icon: Users },
];

const BENEFITS = [
  { title: 'Boost Your Reputation', desc: 'Get more positive Google reviews and build trust with customers', icon: TrendingUp, color: '#10B981' },
  { title: 'Increase Customer Engagement', desc: 'Easy QR code scanning leads to higher review rates', icon: Users, color: '#3E6BEC' },
  { title: 'Build Customer Loyalty', desc: 'Show customers you value their feedback and opinions', icon: Award, color: '#F59E0B' },
  { title: 'Improve Local SEO', desc: 'More reviews help your business rank higher in local searches', icon: TrendingUp, color: '#8B5CF6' },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function DigitalCardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  type ScreenView = 'catalog' | 'detail' | 'cart';
  const [view, setView] = useState<ScreenView>('catalog');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState('pro');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  const cartTotal = cart.reduce((s, i) => s + i.plan.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setSelectedPlanId(p.plans[0].id);
    setQty(1);
    setView('detail');
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    const plan = selectedProduct.plans.find(p => p.id === selectedPlanId)!;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === selectedProduct.id && i.plan.id === plan.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === selectedProduct.id && i.plan.id === plan.id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { product: selectedProduct, plan, qty }];
    });
    Alert.alert('Added to Cart!', `${selectedProduct.shortName} (${plan.label}) × ${qty} added.`);
  };

  const removeFromCart = (productId: string, planId: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.plan.id === planId)));
  };

  const changeCartQty = (productId: string, planId: string, delta: number) => {
    setCart(prev =>
      prev.map(i => {
        if (i.product.id === productId && i.plan.id === planId) {
          const newQty = Math.max(1, i.qty + delta);
          return { ...i, qty: newQty };
        }
        return i;
      })
    );
  };

  const placeOrder = () => {
    if (!shippingAddress.trim()) {
      Alert.alert('Shipping Address Required', 'Please enter your delivery address to continue.');
      return;
    }
    Alert.alert(
      'Order Placed!',
      `Your order of ₹${cartTotal.toLocaleString()} has been confirmed. We'll process and ship within 5-8 business days via DTDC or Amazon Delivery.`,
      [{ text: 'Great!', onPress: () => { setCart([]); setView('catalog'); setShippingAddress(''); } }]
    );
  };

  // ── Header ──────────────────────────────────────────────────────────────────
  const renderHeader = (title: string, onBack: () => void) => (
    <>
      <View style={{ height: Math.max(insets.top, 12) }} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        {view !== 'cart' ? (
          <TouchableOpacity style={styles.cartIconBtn} onPress={() => setView('cart')} activeOpacity={0.8}>
            <ShoppingCart size={18} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </>
  );

  // ── CATALOG VIEW ─────────────────────────────────────────────────────────────
  if (view === 'catalog') {
    return (
      <View style={styles.screen}>
        {renderHeader('Order Standees & Cards', () => router.back())}

        {/* Filters */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
            bounces={false}
          >
            {FILTERS.map(f => (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterChip, activeFilter === f.id && styles.filterChipActive]}
                onPress={() => setActiveFilter(f.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, activeFilter === f.id && styles.filterChipTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.countText}>Showing {filteredProducts.length} of {PRODUCTS.length} products</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.catalogGrid, { paddingTop: 4 }]}>
          <View style={styles.grid}>
            {filteredProducts.map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => openProduct(product)}
                activeOpacity={0.85}
              >
                {/* Product Image Placeholder */}
                <View style={[styles.productImageBox, { backgroundColor: product.badgeColor + '18' }]}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}% OFF</Text>
                  </View>
                  <Image source={product.image} style={styles.productImage} resizeMode="contain" />
                  {product.nfcEnabled && (
                    <View style={styles.nfcBadge}>
                      <Wifi size={9} color="#FFFFFF" />
                      <Text style={styles.nfcBadgeText}>NFC</Text>
                    </View>
                  )}
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{product.shortName}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>

                  {/* Rating */}
                  <View style={styles.ratingRow}>
                    <Star size={11} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                    <Text style={styles.reviewCount}>({product.reviews})</Text>
                  </View>

                  {/* Price */}
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
                    <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
                  </View>

                  <TouchableOpacity style={styles.buyNowBtn} onPress={() => openProduct(product)} activeOpacity={0.8}>
                    <Text style={styles.buyNowText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  // ── DETAIL VIEW ──────────────────────────────────────────────────────────────
  if (view === 'detail' && selectedProduct) {
    const activePlan = selectedProduct.plans.find(p => p.id === selectedPlanId) || selectedProduct.plans[0];

    return (
      <View style={styles.screen}>
        {renderHeader('Product Details', () => setView('catalog'))}

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Hero */}
          <View style={[styles.heroBox, { backgroundColor: selectedProduct.badgeColor + '18' }]}>
            <Image source={selectedProduct.image} style={styles.heroImage} resizeMode="contain" />
            {selectedProduct.nfcEnabled && (
              <View style={[styles.nfcBadge, { position: 'absolute', top: 16, right: 16 }]}>
                <Wifi size={10} color="#FFFFFF" />
                <Text style={styles.nfcBadgeText}>NFC-Enabled</Text>
              </View>
            )}
            <View style={styles.discountBadgeLarge}>
              <Tag size={12} color="#FFFFFF" />
              <Text style={styles.discountBadgeLargeText}>{selectedProduct.discount}% OFF</Text>
            </View>
          </View>

          <View style={{ padding: 16 }}>
            {/* Title & Brand */}
            <Text style={styles.detailBrand}>{selectedProduct.brand}</Text>
            <Text style={styles.detailName}>{selectedProduct.name}</Text>

            {/* Specs row */}
            <View style={styles.specsRow}>
              <View style={styles.specChip}><Text style={styles.specText}>Size: {selectedProduct.size}</Text></View>
              <View style={styles.specChip}><Text style={styles.specText}>Material: {selectedProduct.material}</Text></View>
              <View style={styles.specChip}><Text style={styles.specText}>Colour: {selectedProduct.color}</Text></View>
            </View>

            {/* Rating */}
            <View style={styles.detailRatingRow}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} color="#F59E0B" fill={i <= Math.floor(selectedProduct.rating) ? "#F59E0B" : "transparent"} />
              ))}
              <Text style={styles.detailRatingText}>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</Text>
            </View>

            {/* Price Banner */}
            <View style={styles.priceBanner}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.detailPrice}>₹{activePlan.price.toLocaleString()}</Text>
                  <Text style={styles.detailOriginalPrice}>₹{(activePlan.originalPrice || selectedProduct.originalPrice).toLocaleString()}</Text>
                  <View style={styles.saveBadge}><Text style={styles.saveText}>{selectedProduct.discount}% OFF</Text></View>
                </View>
                <Text style={styles.freeDelivery}>FREE Delivery</Text>
              </View>
            </View>

            {/* Plan Selector */}
            <Text style={styles.sectionHeader}>CHOOSE YOUR PLAN</Text>
            {selectedProduct.plans.map(plan => (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, selectedPlanId === plan.id && styles.planCardActive]}
                onPress={() => setSelectedPlanId(plan.id)}
                activeOpacity={0.8}
              >
                <View style={styles.planLeft}>
                  <View style={[styles.planRadio, selectedPlanId === plan.id && styles.planRadioActive]}>
                    {selectedPlanId === plan.id && <View style={styles.planRadioDot} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={styles.planLabel}>{plan.label}</Text>
                      {plan.badge && (
                        <View style={[styles.planBadge, { backgroundColor: plan.badge === 'Best Value' ? '#10B981' : '#F59E0B' }]}>
                          <Text style={styles.planBadgeText}>{plan.badge}</Text>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                      {plan.features.map((f, i) => (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                          <Check size={10} color="#10B981" />
                          <Text style={styles.planFeatureText}>{f}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.planPrice, selectedPlanId === plan.id && { color: '#3E6BEC' }]}>₹{plan.price.toLocaleString()}</Text>
                  {plan.originalPrice && <Text style={styles.planOrigPrice}>₹{plan.originalPrice.toLocaleString()}</Text>}
                </View>
              </TouchableOpacity>
            ))}

            {/* Quantity */}
            <Text style={styles.sectionHeader}>QUANTITY</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))} activeOpacity={0.8}>
                <Minus size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => q + 1)} activeOpacity={0.8}>
                <Plus size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.qtyTotal}>= ₹{(activePlan.price * qty).toLocaleString()}</Text>
            </View>

            {/* CTA Buttons */}
            <TouchableOpacity style={styles.addToCartBtn} onPress={addToCart} activeOpacity={0.85}>
              <ShoppingCart size={16} color="#FFFFFF" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyNowLargeBtn}
              onPress={() => { addToCart(); setView('cart'); }}
              activeOpacity={0.85}
            >
              <Text style={styles.buyNowLargeText}>Buy Now</Text>
            </TouchableOpacity>

            {/* Trust Badges */}
            <View style={styles.trustRow}>
              <View style={styles.trustItem}><Truck size={14} color="#10B981" /><Text style={styles.trustText}>Fast Delivery</Text></View>
              <View style={styles.trustItem}><Clock size={14} color="#F59E0B" /><Text style={styles.trustText}>5-8 Days</Text></View>
              <View style={styles.trustItem}><Shield size={14} color="#3E6BEC" /><Text style={styles.trustText}>Quality Guaranteed</Text></View>
            </View>

            {/* Discount Banner */}
            <View style={styles.offerBanner}>
              <View style={styles.offerItem}>
                <Tag size={14} color="#EF4444" />
                <Text style={styles.offerText}>70% OFF on all standees</Text>
              </View>
              <View style={styles.offerItem}>
                <Award size={14} color="#10B981" />
                <Text style={styles.offerText}>Extra 10% on orders above ₹3000</Text>
              </View>
            </View>

            {/* How It Works */}
            <TouchableOpacity style={styles.collapseHeader} onPress={() => setShowHowItWorks(v => !v)} activeOpacity={0.8}>
              <Text style={styles.collapseTitle}>How It Works</Text>
              {showHowItWorks ? <ChevronUp size={18} color="#71717A" /> : <ChevronDown size={18} color="#71717A" />}
            </TouchableOpacity>
            {showHowItWorks && (
              <View style={styles.collapseBody}>
                {HOW_IT_WORKS.map(item => {
                  const Icon = item.icon;
                  return (
                    <View key={item.step} style={styles.howRow}>
                      <View style={styles.howCircle}><Text style={styles.howNum}>{item.step}</Text></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.howTitle}>{item.title}</Text>
                        <Text style={styles.howDesc}>{item.desc}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Benefits */}
            <TouchableOpacity style={styles.collapseHeader} onPress={() => setShowBenefits(v => !v)} activeOpacity={0.8}>
              <Text style={styles.collapseTitle}>Benefits for Your Business</Text>
              {showBenefits ? <ChevronUp size={18} color="#71717A" /> : <ChevronDown size={18} color="#71717A" />}
            </TouchableOpacity>
            {showBenefits && (
              <View style={styles.collapseBody}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {BENEFITS.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <View key={i} style={[styles.benefitCard, { borderColor: b.color + '40' }]}>
                        <Icon size={18} color={b.color} />
                        <Text style={styles.benefitTitle}>{b.title}</Text>
                        <Text style={styles.benefitDesc}>{b.desc}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Product Details */}
            <Text style={styles.sectionHeader}>PRODUCT DETAILS</Text>
            <View style={styles.detailCard}>
              <View style={styles.detailRow}><Text style={styles.detailKey}>Brand</Text><Text style={styles.detailVal}>{selectedProduct.brand}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailKey}>Size</Text><Text style={styles.detailVal}>{selectedProduct.size}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailKey}>Material</Text><Text style={styles.detailVal}>{selectedProduct.material}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailKey}>Colour</Text><Text style={styles.detailVal}>{selectedProduct.color}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailKey}>NFC-Enabled</Text><Text style={styles.detailVal}>{selectedProduct.nfcEnabled ? 'Yes, Tap access' : 'No'}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailKey}>Technology</Text><Text style={styles.detailVal}>AI-Powered</Text></View>
            </View>

            {/* Description */}
            <Text style={styles.sectionHeader}>PRODUCT DESCRIPTION</Text>
            <View style={styles.detailCard}>
              <Text style={styles.descText}>{selectedProduct.description}</Text>
              {selectedProduct.features.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <Check size={13} color="#10B981" />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>

            {/* Shipping */}
            <Text style={styles.sectionHeader}>SHIPPING</Text>
            <View style={styles.detailCard}>
              <View style={styles.shipRow}><Truck size={15} color="#10B981" /><Text style={styles.shipText}>Fast Shipping and Delivery</Text></View>
              <View style={styles.shipRow}><Clock size={15} color="#F59E0B" /><Text style={styles.shipText}>Delivered in 5-8 working days</Text></View>
              <View style={styles.shipRow}><Package size={15} color="#3E6BEC" /><Text style={styles.shipText}>Shipping partners DTDC & Amazon Delivery</Text></View>
              <View style={styles.shipRow}><Shield size={15} color="#8B5CF6" /><Text style={styles.shipText}>Free shipping on all orders</Text></View>
            </View>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>
    );
  }

  // ── CART VIEW ────────────────────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      {renderHeader('My Cart', () => setView('catalog'))}

      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <ShoppingCart size={60} color="#202025" />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartSub}>Browse our standees and digital cards to get started</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setView('catalog')} activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
          {/* Cart Items */}
          {cart.map((item, idx) => (
            <View key={idx} style={styles.cartItem}>
              <View style={[styles.cartItemEmoji, { backgroundColor: item.product.badgeColor + '18' }]}>
                <Image source={item.product.image} style={styles.cartItemImage} resizeMode="contain" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cartItemName} numberOfLines={2}>{item.product.shortName}</Text>
                <Text style={styles.cartItemPlan}>{item.plan.label}</Text>
                <View style={styles.cartQtyRow}>
                  <TouchableOpacity style={styles.cartQtyBtn} onPress={() => changeCartQty(item.product.id, item.plan.id, -1)}>
                    <Minus size={12} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.cartQtyText}>{item.qty}</Text>
                  <TouchableOpacity style={styles.cartQtyBtn} onPress={() => changeCartQty(item.product.id, item.plan.id, 1)}>
                    <Plus size={12} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.cartItemTotal}>₹{(item.plan.price * item.qty).toLocaleString()}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.product.id, item.plan.id)} style={styles.removeBtn}>
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Order Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            {cart.map((item, idx) => (
              <View key={idx} style={styles.summaryLine}>
                <Text style={styles.summaryLineText} numberOfLines={1}>{item.product.shortName} ×{item.qty}</Text>
                <Text style={styles.summaryLineVal}>₹{(item.plan.price * item.qty).toLocaleString()}</Text>
              </View>
            ))}
            <View style={styles.summaryDivider} />
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLineText}>Shipping</Text>
              <Text style={{ color: '#10B981', fontSize: 13, fontWeight: '700' }}>FREE</Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={[styles.summaryLineText, { color: '#FFFFFF', fontWeight: '800', fontSize: 15 }]}>Total</Text>
              <Text style={styles.cartTotal}>₹{cartTotal.toLocaleString()}</Text>
            </View>
          </View>

          {/* Shipping Address */}
          <Text style={styles.sectionHeader}>SHIPPING ADDRESS</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Enter your full delivery address..."
            placeholderTextColor="#52525B"
            value={shippingAddress}
            onChangeText={setShippingAddress}
            multiline
            numberOfLines={3}
          />

          {/* Trust Badges */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}><Truck size={14} color="#10B981" /><Text style={styles.trustText}>Free Delivery</Text></View>
            <View style={styles.trustItem}><Clock size={14} color="#F59E0B" /><Text style={styles.trustText}>5-8 Days</Text></View>
            <View style={styles.trustItem}><Shield size={14} color="#3E6BEC" /><Text style={styles.trustText}>Guaranteed</Text></View>
          </View>

          {/* Place Order */}
          <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder} activeOpacity={0.85}>
            <Text style={styles.placeOrderText}>Place Order — ₹{cartTotal.toLocaleString()}</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#070709' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderColor: '#202025', backgroundColor: '#070709',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#0F0F12',
    borderWidth: 1, borderColor: '#202025', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  cartIconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#3E6BEC',
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  cartBadge: {
    position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444',
    borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3,
  },
  cartBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '900' },

  // Filters
  filterContainer: {
    height: 44,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#202025',
    backgroundColor: '#070709',
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
  },
  filterChip: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#0F0F12',
    borderWidth: 1,
    borderColor: '#202025',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: { backgroundColor: '#3E6BEC', borderColor: '#3E6BEC' },
  filterChipText: { fontSize: 11, fontWeight: '600', color: '#71717A', lineHeight: 14 },
  filterChipTextActive: { color: '#FFFFFF' },
  countText: { fontSize: 11, color: '#52525B', paddingHorizontal: 16, marginBottom: 6, marginTop: 8, fontWeight: '500' },

  // Catalog Grid
  catalogGrid: { paddingHorizontal: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  productCard: {
    width: '47.5%', backgroundColor: '#0F0F12',
    borderRadius: 14, borderWidth: 1, borderColor: '#202025', overflow: 'hidden',
  },
  productImageBox: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 26,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  productImage: { width: '100%', height: 96, borderRadius: 8 },
  discountBadge: {
    position: 'absolute', top: 6, left: 6,
    backgroundColor: '#EF4444', borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2,
    zIndex: 10,
  },
  discountText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  nfcBadge: {
    position: 'absolute', bottom: 6, right: 6,
    backgroundColor: '#3E6BEC', borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2,
    flexDirection: 'row', alignItems: 'center', gap: 2,
    zIndex: 10,
  },
  nfcBadgeText: { color: '#FFFFFF', fontSize: 8, fontWeight: '700' },
  productInfo: { padding: 8, paddingTop: 6 },
  productName: { fontSize: 10, fontWeight: '700', color: '#FFFFFF', lineHeight: 14, marginBottom: 2 },
  productBrand: { fontSize: 9, color: '#52525B', fontWeight: '500', marginBottom: 3 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  ratingText: { fontSize: 10, color: '#F59E0B', fontWeight: '700' },
  reviewCount: { fontSize: 9, color: '#52525B' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 7 },
  price: { fontSize: 13, fontWeight: '900', color: '#FFFFFF' },
  originalPrice: { fontSize: 10, color: '#52525B', textDecorationLine: 'line-through' },
  buyNowBtn: {
    backgroundColor: '#3E6BEC', borderRadius: 7, paddingVertical: 6,
    alignItems: 'center',
  },
  buyNowText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },

  // Detail View
  heroBox: {
    height: 260, alignItems: 'center', justifyContent: 'center', position: 'relative',
    backgroundColor: '#0A0A0C',
  },
  heroImage: { width: '80%', height: 220, borderRadius: 12 },
  discountBadgeLarge: {
    position: 'absolute', top: 16, left: 16,
    backgroundColor: '#EF4444', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  discountBadgeLargeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  detailBrand: { fontSize: 12, color: '#52525B', fontWeight: '600', marginBottom: 4 },
  detailName: { fontSize: 15, fontWeight: '800', color: '#FFFFFF', lineHeight: 22, marginBottom: 12 },
  specsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  specChip: {
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
  },
  specText: { fontSize: 10, color: '#93C5FD', fontWeight: '600' },
  detailRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 14 },
  detailRatingText: { fontSize: 12, color: '#71717A', marginLeft: 4 },
  priceBanner: {
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 14, padding: 14, marginBottom: 20,
  },
  detailPrice: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  detailOriginalPrice: { fontSize: 15, color: '#52525B', textDecorationLine: 'line-through', alignSelf: 'flex-end', marginBottom: 4 },
  saveBadge: { backgroundColor: '#10B98120', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  saveText: { color: '#10B981', fontSize: 12, fontWeight: '700' },
  freeDelivery: { fontSize: 12, color: '#10B981', fontWeight: '700', marginTop: 4 },
  sectionHeader: {
    fontSize: 11, fontWeight: '900', color: '#71717A', letterSpacing: 1,
    marginBottom: 12, marginTop: 4, textTransform: 'uppercase',
  },

  // Plan Selector
  planCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 14, padding: 14, marginBottom: 10,
  },
  planCardActive: { borderColor: '#3E6BEC', backgroundColor: '#3E6BEC0A' },
  planLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  planRadio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#202025', alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  planRadioActive: { borderColor: '#3E6BEC' },
  planRadioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3E6BEC' },
  planLabel: { fontSize: 12, fontWeight: '700', color: '#FFFFFF', flex: 1, flexWrap: 'wrap', lineHeight: 17 },
  planBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  planBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  planFeatureText: { fontSize: 10, color: '#71717A' },
  planPrice: { fontSize: 16, fontWeight: '900', color: '#FFFFFF' },
  planOrigPrice: { fontSize: 11, color: '#52525B', textDecorationLine: 'line-through', textAlign: 'right' },

  // Qty
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  qtyBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', minWidth: 24, textAlign: 'center' },
  qtyTotal: { fontSize: 16, fontWeight: '800', color: '#10B981', marginLeft: 8 },

  // CTA Buttons
  addToCartBtn: {
    backgroundColor: '#0F0F12', borderWidth: 1.5, borderColor: '#3E6BEC',
    borderRadius: 14, paddingVertical: 15, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, marginBottom: 10,
  },
  addToCartText: { color: '#3E6BEC', fontSize: 14, fontWeight: '800' },
  buyNowLargeBtn: {
    backgroundColor: '#3E6BEC', borderRadius: 14, paddingVertical: 15,
    alignItems: 'center', marginBottom: 14,
  },
  buyNowLargeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  // Trust Badges
  trustRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 12, padding: 12, marginBottom: 14,
  },
  trustItem: { alignItems: 'center', gap: 4 },
  trustText: { fontSize: 10, color: '#71717A', fontWeight: '600' },

  // Offer Banner
  offerBanner: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#EF444440',
    borderRadius: 12, padding: 12, marginBottom: 14, gap: 8,
  },
  offerItem: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  offerText: { fontSize: 11, color: '#D1D5DB', fontWeight: '600', flex: 1, lineHeight: 15 },

  // Collapse Sections
  collapseHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 12, padding: 14, marginBottom: 2,
  },
  collapseTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  collapseBody: {
    backgroundColor: '#0A0A0C', borderWidth: 1, borderColor: '#202025',
    borderRadius: 12, padding: 14, marginBottom: 12,
  },

  // How It Works
  howRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  howCircle: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#3E6BEC',
    alignItems: 'center', justifyContent: 'center',
  },
  howNum: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  howTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  howDesc: { fontSize: 11, color: '#71717A', lineHeight: 15 },

  // Benefits
  benefitCard: {
    width: '47.5%', backgroundColor: '#0F0F12',
    borderWidth: 1, borderRadius: 12, padding: 12, gap: 6,
  },
  benefitTitle: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  benefitDesc: { fontSize: 11, color: '#71717A', lineHeight: 15 },

  // Product Detail Card
  detailCard: {
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 14, padding: 14, marginBottom: 14,
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  detailKey: { fontSize: 12, color: '#71717A' },
  detailVal: { fontSize: 12, color: '#FFFFFF', fontWeight: '700' },
  descText: { fontSize: 13, color: '#D1D5DB', lineHeight: 20, marginBottom: 12 },
  featureRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginBottom: 6 },
  featureText: { fontSize: 12, color: '#D1D5DB', flex: 1, lineHeight: 17 },
  shipRow: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 },
  shipText: { fontSize: 12, color: '#D1D5DB', flex: 1 },

  // Cart View
  emptyCart: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 },
  emptyCartTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  emptyCartSub: { fontSize: 13, color: '#71717A', textAlign: 'center', lineHeight: 20 },
  primaryBtn: { backgroundColor: '#3E6BEC', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 14, marginTop: 8 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  cartItem: {
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 16, padding: 14, marginBottom: 12,
  },
  cartItemEmoji: { width: 60, height: 60, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cartItemImage: { width: 50, height: 50 },
  cartItemName: { fontSize: 12, fontWeight: '700', color: '#FFFFFF', lineHeight: 17, marginBottom: 3 },
  cartItemPlan: { fontSize: 11, color: '#71717A', marginBottom: 8 },
  cartQtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cartQtyBtn: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: '#16161A',
    borderWidth: 1, borderColor: '#202025', alignItems: 'center', justifyContent: 'center',
  },
  cartQtyText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF', minWidth: 20, textAlign: 'center' },
  cartItemTotal: { fontSize: 14, fontWeight: '900', color: '#10B981', marginLeft: 4 },
  removeBtn: { padding: 4 },

  summaryCard: {
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 16, padding: 16, marginBottom: 14,
  },
  summaryTitle: { fontSize: 13, fontWeight: '800', color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLineText: { fontSize: 13, color: '#71717A', flex: 1, marginRight: 8 },
  summaryLineVal: { fontSize: 13, color: '#FFFFFF', fontWeight: '700' },
  summaryDivider: { height: 1, backgroundColor: '#202025', marginVertical: 10 },
  cartTotal: { fontSize: 20, fontWeight: '900', color: '#3E6BEC' },
  addressInput: {
    backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025',
    borderRadius: 12, padding: 14, color: '#FFFFFF', fontSize: 14,
    textAlignVertical: 'top', marginBottom: 14, minHeight: 80,
  },
  placeOrderBtn: {
    backgroundColor: '#10B981', borderRadius: 14, paddingVertical: 17,
    alignItems: 'center', marginBottom: 12,
  },
  placeOrderText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});

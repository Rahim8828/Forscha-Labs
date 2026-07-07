import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Modal, Pressable, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  CreditCard, Star, ShoppingBag, MessageCircle, Receipt, Share2,
  Bell, User, ChevronRight, LogOut, FileText,
  HelpCircle, Shield, X,
} from 'lucide-react-native';

const FEATURES = [
  {
    id: 'digital-card',
    Icon: CreditCard,
    label: 'Digital Card',
    desc: 'QR & NFC review standees',
    route: '/digital-card',
    color: '#3E6BEC',
    bg: '#0D1526',
  },
  {
    id: 'google-review',
    Icon: Star,
    label: 'Google Reviews',
    desc: 'GMB connect & analytics',
    route: '/google-review',
    color: '#F59E0B',
    bg: '#18140A',
  },
  {
    id: 'catalogue',
    Icon: ShoppingBag,
    label: 'Catalogue',
    desc: 'Products synced to GMB',
    route: '/(tabs)/catalogue',
    color: '#8B5CF6',
    bg: '#120D1A',
  },
  {
    id: 'whatsapp',
    Icon: MessageCircle,
    label: 'WhatsApp',
    desc: 'Auto-reply & campaigns',
    route: '/whatsapp',
    color: '#25D366',
    bg: '#0A1A0D',
  },
  {
    id: 'billing',
    Icon: Receipt,
    label: 'Billing',
    desc: 'GST invoices & clients',
    route: '/billing',
    color: '#F97316',
    bg: '#1A0E00',
  },
  {
    id: 'social-media',
    Icon: Share2,
    label: 'Social Media',
    desc: 'All platforms in one hub',
    route: '/social-media',
    color: '#EC4899',
    bg: '#1A0010',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  const profileMenu = [
    {
      icon: User,
      label: 'Edit Profile',
      sub: 'Name, photo, business info',
      onPress: () => { setProfileOpen(false); router.push('/edit-profile'); },
      color: '#3E6BEC',
    },
    {
      icon: CreditCard,
      label: 'My Subscription',
      sub: 'Growth Plan — Active',
      onPress: () => { setProfileOpen(false); router.push('/subscription'); },
      color: '#F97316',
    },
    {
      icon: Bell,
      label: 'Notifications',
      sub: 'Alerts and preferences',
      onPress: () => { setProfileOpen(false); Alert.alert('Notifications', 'Settings coming soon.'); },
      color: '#8B5CF6',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      sub: 'Chat, docs, FAQs',
      onPress: () => { setProfileOpen(false); Alert.alert('Support', 'Contact: support@forscha.com'); },
      color: '#25D366',
    },
    {
      icon: Shield,
      label: 'Privacy Policy',
      sub: 'How we handle your data',
      onPress: () => { setProfileOpen(false); Alert.alert('Privacy', 'forscha.com/privacy'); },
      color: '#71717A',
    },
    {
      icon: FileText,
      label: 'Terms & Conditions',
      sub: 'Usage terms and agreements',
      onPress: () => { setProfileOpen(false); Alert.alert('Terms', 'forscha.com/terms'); },
      color: '#71717A',
    },
  ];

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ── TOP BAR ── */}
        <View style={s.topBar}>
          {/* Profile Avatar (left) */}
          <TouchableOpacity style={s.avatar} onPress={() => setProfileOpen(true)} activeOpacity={0.7}>
            <Text style={s.avatarText}>R</Text>
            <View style={s.avatarOnline} />
          </TouchableOpacity>

          {/* Center brand */}
          <View style={s.topCenter}>
            <Text style={s.brandName}>Forscha</Text>
          </View>

          {/* Notification bell (right) */}
          <TouchableOpacity style={s.bellBtn} activeOpacity={0.7}>
            <Bell size={20} color="#A1A1AA" />
            <View style={s.bellBadge} />
          </TouchableOpacity>
        </View>

        {/* ── GREETING ── */}
        <View style={s.greetRow}>
          <Text style={s.greetSub}>Good morning</Text>
          <Text style={s.greetName}>Rahul Sharma 👋</Text>
          <Text style={s.greetBiz}>Forscha Glass Works · Mumbai</Text>
        </View>

        {/* ── METRIC STRIP ── */}
        <View style={s.metricStrip}>
          <View style={s.metric}>
            <Text style={s.metricVal}>4.8</Text>
            <Text style={s.metricStar}>★</Text>
            <Text style={s.metricLbl}>GMB Rating</Text>
          </View>
          <View style={s.metricDivide} />
          <View style={s.metric}>
            <Text style={s.metricVal}>128</Text>
            <Text style={s.metricLbl}>Reviews</Text>
          </View>
          <View style={s.metricDivide} />
          <View style={s.metric}>
            <Text style={s.metricVal}>₹2.4L</Text>
            <Text style={s.metricLbl}>This Month</Text>
          </View>
        </View>

        {/* ── SECTION HEADER ── */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Your Tools</Text>
          <View style={s.planBadge}>
            <Text style={s.planText}>Growth Plan</Text>
          </View>
        </View>

        {/* ── FEATURE GRID (3 × 2) ── */}
        <View style={s.grid}>
          {FEATURES.map((f) => {
            const Icon = f.Icon;
            return (
              <TouchableOpacity
                key={f.id}
                style={[s.featureCard, { backgroundColor: f.bg, borderColor: f.color + '28' }]}
                onPress={() => router.push(f.route as any)}
                activeOpacity={0.72}
              >
                {/* Icon circle */}
                <View style={[s.iconWrap, { backgroundColor: f.color + '18', borderColor: f.color + '35' }]}>
                  <Icon size={22} color={f.color} />
                </View>

                <Text style={s.featureLabel}>{f.label}</Text>
                <Text style={s.featureDesc}>{f.desc}</Text>

                {/* Tap arrow */}
                <View style={[s.tapArrow, { backgroundColor: f.color + '20' }]}>
                  <ChevronRight size={12} color={f.color} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── QUICK ACTIONS ── */}
        <Text style={s.quickLabel}>Quick Actions</Text>
        <View style={s.quickRow}>
          <TouchableOpacity style={s.quickBtn} onPress={() => router.push('/billing')}>
            <Receipt size={16} color="#F97316" />
            <Text style={s.quickBtnText}>New Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.quickBtn} onPress={() => router.push('/google-review')}>
            <Star size={16} color="#F59E0B" />
            <Text style={s.quickBtnText}>Get Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.quickBtn} onPress={() => router.push('/whatsapp')}>
            <MessageCircle size={16} color="#25D366" />
            <Text style={s.quickBtnText}>Broadcast</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* ── PROFILE BOTTOM SHEET ── */}
      <Modal
        visible={profileOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setProfileOpen(false)}
      >
        <Pressable style={s.modalOverlay} onPress={() => setProfileOpen(false)}>
          <Pressable style={s.sheet} onPress={() => {}}>

            {/* Handle */}
            <View style={s.sheetHandle} />

            {/* Profile Header */}
            <View style={s.sheetProfileRow}>
              <View style={s.sheetAvatar}>
                <Text style={s.sheetAvatarText}>R</Text>
              </View>
              <View>
                <Text style={s.sheetName}>Rahul Sharma</Text>
                <Text style={s.sheetBiz}>Forscha Glass Works</Text>
                <View style={s.sheetPlanBadge}>
                  <Text style={s.sheetPlanText}>● Growth Plan</Text>
                </View>
              </View>
              <TouchableOpacity style={s.closeBtn} onPress={() => setProfileOpen(false)}>
                <X size={18} color="#71717A" />
              </TouchableOpacity>
            </View>

            <View style={s.sheetDivider} />

            {/* Menu Items */}
            {profileMenu.map((item, i) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity key={i} style={s.menuItem} onPress={item.onPress} activeOpacity={0.7}>
                  <View style={[s.menuIconWrap, { backgroundColor: item.color + '18' }]}>
                    <Icon size={18} color={item.color} />
                  </View>
                  <View style={s.menuText}>
                    <Text style={s.menuLabel}>{item.label}</Text>
                    <Text style={s.menuSub}>{item.sub}</Text>
                  </View>
                  <ChevronRight size={16} color="#3F3F46" />
                </TouchableOpacity>
              );
            })}

            <View style={s.sheetDivider} />

            {/* Logout */}
            <TouchableOpacity
              style={s.logoutBtn}
              onPress={() => {
                setProfileOpen(false);
                Alert.alert('Log out?', 'You will be returned to the login screen.', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Log out', style: 'destructive', onPress: () => router.replace('/login') },
                ]);
              }}
            >
              <LogOut size={18} color="#EF4444" />
              <Text style={s.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <View style={{ height: 24 }} />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070709' },
  scroll: { paddingHorizontal: 18 },

  /* ── TOP BAR ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 22,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1D2D50',
    borderWidth: 2,
    borderColor: '#3E6BEC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  avatarOnline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#25D366',
    borderWidth: 1.5,
    borderColor: '#070709',
  },
  topCenter: { flex: 1, alignItems: 'center' },
  brandName: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111113',
    borderWidth: 1,
    borderColor: '#202025',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#070709',
  },

  /* ── GREETING ── */
  greetRow: { marginBottom: 22 },
  greetSub: { fontSize: 12, color: '#52525B', fontWeight: '500', marginBottom: 2 },
  greetName: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 },
  greetBiz: { fontSize: 13, color: '#52525B', marginTop: 4 },

  /* ── METRIC STRIP ── */
  metricStrip: {
    flexDirection: 'row',
    backgroundColor: '#0F0F12',
    borderWidth: 1,
    borderColor: '#202025',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 28,
    alignItems: 'center',
  },
  metric: { flex: 1, alignItems: 'center', flexDirection: 'column', gap: 2 },
  metricVal: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  metricStar: { fontSize: 14, color: '#F59E0B', position: 'absolute', top: 0, right: 16 },
  metricLbl: { fontSize: 11, color: '#52525B', fontWeight: '500' },
  metricDivide: { width: 1, height: 32, backgroundColor: '#202025' },

  /* ── SECTION HEADER ── */
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#E4E4E7' },
  planBadge: {
    backgroundColor: '#F9731615',
    borderColor: '#F9731640',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  planText: { fontSize: 11, fontWeight: '700', color: '#F97316' },

  /* ── FEATURE GRID ── */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
    marginBottom: 28,
  },
  featureCard: {
    width: '47.5%',
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    gap: 6,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  featureLabel: { fontSize: 14, fontWeight: '700', color: '#F4F4F5', lineHeight: 18 },
  featureDesc: { fontSize: 11, color: '#71717A', lineHeight: 15 },
  tapArrow: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 4,
  },

  /* ── QUICK ACTIONS ── */
  quickLabel: { fontSize: 13, fontWeight: '700', color: '#52525B', marginBottom: 10, letterSpacing: 0.5 },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#111113',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
  },
  quickBtnText: { fontSize: 12, fontWeight: '700', color: '#D4D4D8' },

  /* ── PROFILE BOTTOM SHEET ── */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0F0F12',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#202025',
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3F3F46',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  sheetAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1D2D50',
    borderWidth: 2,
    borderColor: '#3E6BEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetAvatarText: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  sheetName: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  sheetBiz: { fontSize: 13, color: '#71717A', marginTop: 1 },
  sheetPlanBadge: { marginTop: 5 },
  sheetPlanText: { fontSize: 11, fontWeight: '700', color: '#25D366' },
  closeBtn: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetDivider: { height: 1, backgroundColor: '#202025', marginVertical: 12 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuText: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '700', color: '#F4F4F5' },
  menuSub: { fontSize: 12, color: '#71717A', marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#EF4444' },
});

import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Modal, Pressable, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  CreditCard, Star, ShoppingBag, MessageCircle, Receipt, Share2,
  User, ChevronRight, LogOut, FileText,
  HelpCircle, Shield, X, Sun, Moon, MapPin, Bell
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const [darkMode, setDarkMode] = useState(true);
  const insets = useSafeAreaInsets();

  const theme = {
    bg: darkMode ? '#070709' : '#F4F4F5',
    cardBg: darkMode ? '#0F0F12' : '#FFFFFF',
    text: darkMode ? '#FFFFFF' : '#18181B',
    subtext: darkMode ? '#71717A' : '#71717A',
    border: darkMode ? '#202025' : '#E4E4E7',
    avatarBg: darkMode ? '#16233B' : '#E0E7FF',
    avatarText: darkMode ? '#FFFFFF' : '#3E6BEC',
    avatarBorder: darkMode ? '#3E6BEC80' : '#3E6BEC80',
    brandBadgeBg: darkMode ? '#27272A' : '#E4E4E7',
    brandBadgeText: darkMode ? '#A1A1AA' : '#71717A',
  };

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
    <View style={[s.root, { backgroundColor: theme.bg }]}>
      {/* Spacer for notch */}
      <View style={{ height: Math.max(insets.top, 12) }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ── TOP BAR (UNIFIED HEADER WITH THEME TOGGLE) ── */}
        <View style={[s.topBar, { borderColor: theme.border }]}>
          {/* Profile Avatar (left) */}
          <TouchableOpacity style={[s.avatar, { backgroundColor: theme.avatarBg, borderColor: theme.avatarBorder }]} onPress={() => setProfileOpen(true)} activeOpacity={0.7}>
            <Text style={[s.avatarText, { color: theme.avatarText }]}>RS</Text>
            <View style={s.avatarOnline} />
          </TouchableOpacity>

          {/* Center brand */}
          <View style={s.topCenter}>
            <Text style={[s.brandName, { color: theme.text }]}>FORSCHA</Text>
            <View style={[s.brandBadge, { backgroundColor: theme.brandBadgeBg, borderColor: theme.border }]}>
              <Text style={[s.brandBadgeText, { color: theme.brandBadgeText }]}>OS</Text>
            </View>
          </View>

          {/* Theme Mode Toggle (right) */}
          <TouchableOpacity 
            style={[s.themeBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }]} 
            onPress={() => setDarkMode(!darkMode)}
            activeOpacity={0.7}
          >
            {darkMode ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#3E6BEC" />}
          </TouchableOpacity>
        </View>

        {/* ── GREETING CARD ── */}
        <View style={[s.welcomeCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={s.welcomeHeader}>
            <View>
              <Text style={[s.greetSub, { color: theme.subtext }]}>WELCOME BACK</Text>
              <Text style={[s.greetName, { color: theme.text }]}>Rahul Sharma</Text>
            </View>
            <View style={s.statusBadge}>
              <View style={s.statusDot} />
              <Text style={s.statusText}>Active</Text>
            </View>
          </View>
          
          <View style={[s.welcomeDivider, { backgroundColor: theme.border }]} />
          
          <View style={s.bizRow}>
            <Text style={[s.greetBiz, { color: theme.text }]}>Forscha Glass Works</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MapPin size={12} color={theme.subtext} />
              <Text style={[s.bizLocation, { color: theme.subtext }]}>Mumbai, IN</Text>
            </View>
          </View>
        </View>

        {/* ── SECTION HEADER ── */}
        <View style={s.sectionRow}>
          <Text style={[s.sectionTitle, { color: theme.text }]}>Your Tools</Text>
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
                style={[s.featureCard, { backgroundColor: theme.cardBg, borderColor: darkMode ? f.color + '25' : f.color + '45' }]}
                onPress={() => router.push(f.route as any)}
                activeOpacity={0.72}
              >
                {/* Arrow indicator */}
                <View style={s.arrowContainer}>
                  <ChevronRight size={14} color={darkMode ? "#52525B" : "#A1A1AA"} />
                </View>

                {/* Icon circle */}
                <View style={[s.iconWrap, { backgroundColor: f.color + '12', borderColor: f.color + '30' }]}>
                  <Icon size={20} color={f.color} />
                </View>

                <View style={{ gap: 4 }}>
                  <Text style={[s.featureLabel, { color: theme.text }]}>{f.label}</Text>
                  <Text style={[s.featureDesc, { color: theme.subtext }]}>{f.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── QUICK ACTIONS ── */}
        <Text style={[s.quickLabel, { color: theme.subtext }]}>QUICK ACTIONS</Text>
        <View style={s.quickRow}>
          <TouchableOpacity style={[s.quickBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }]} onPress={() => router.push('/billing')} activeOpacity={0.7}>
            <View style={[s.quickIconWrap, { backgroundColor: '#F9731615' }]}>
              <Receipt size={16} color="#F97316" />
            </View>
            <Text style={[s.quickBtnText, { color: theme.text }]}>New Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.quickBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }]} onPress={() => router.push('/google-review')} activeOpacity={0.7}>
            <View style={[s.quickIconWrap, { backgroundColor: '#F59E0B15' }]}>
              <Star size={16} color="#F59E0B" />
            </View>
            <Text style={[s.quickBtnText, { color: theme.text }]}>Get Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.quickBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }]} onPress={() => router.push('/whatsapp')} activeOpacity={0.7}>
            <View style={[s.quickIconWrap, { backgroundColor: '#25D36615' }]}>
              <MessageCircle size={16} color="#25D366" />
            </View>
            <Text style={[s.quickBtnText, { color: theme.text }]}>Broadcast</Text>
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

  /* ── TOP BAR (UNIFIED HEADER) ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#141417',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16233B',
    borderWidth: 1.5,
    borderColor: '#3E6BEC80',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  avatarOnline: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#070709',
  },
  topCenter: { 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 6,
  },
  brandName: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1.5 },
  brandBadge: {
    backgroundColor: '#27272A',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  brandBadgeText: { fontSize: 8, fontWeight: '800', color: '#A1A1AA' },
  themeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── GREETING CARD ── */
  welcomeCard: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetSub: { fontSize: 10, color: '#71717A', fontWeight: '800', letterSpacing: 1, marginBottom: 4 },
  greetName: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#064E3B20',
    borderColor: '#064E3B80',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  statusText: { fontSize: 10, fontWeight: '800', color: '#10B981' },
  welcomeDivider: { height: 1, backgroundColor: '#202025', marginVertical: 14 },
  bizRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetBiz: { fontSize: 13, color: '#A1A1AA', fontWeight: '600' },
  bizLocation: { fontSize: 11, color: '#71717A', fontWeight: '500' },

  /* ── SECTION HEADER ── */
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  planBadge: {
    backgroundColor: '#F9731612',
    borderColor: '#F9731630',
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
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 28,
  },
  featureCard: {
    width: '48.5%',
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    position: 'relative',
    minHeight: 136,
    justifyContent: 'space-between',
  },
  arrowContainer: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
  featureDesc: { fontSize: 11, color: '#71717A', lineHeight: 15 },

  /* ── QUICK ACTIONS ── */
  quickLabel: { fontSize: 11, fontWeight: '800', color: '#71717A', marginBottom: 12, letterSpacing: 1 },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
  },
  quickIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBtnText: { fontSize: 12, fontWeight: '700', color: '#E4E4E7' },

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

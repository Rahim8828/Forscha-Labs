import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { 
  CreditCard, MapPin, Check, Layers, HardDrive, Shield, Info, ArrowRight, Rss 
} from 'lucide-react-native';

type Step = 'customise' | 'preview' | 'order';
type ViewMode = 'order' | 'nfc';

const CARD_STYLES = [
  { id: 'acrylic', label: 'Acrylic Glossy', price: 349, Icon: Layers },
  { id: 'wooden', label: 'Wooden Base', price: 499, Icon: HardDrive },
  { id: 'nfc-card', label: 'NFC Tap Card', price: 199, Icon: CreditCard },
  { id: 'metal', label: 'Metal Standee', price: 699, Icon: Shield },
];

const COLOR_OPTIONS = [
  { id: 'blue', color: '#3E6BEC', label: 'Ocean Blue' },
  { id: 'black', color: '#18181B', label: 'Midnight' },
  { id: 'white', color: '#F4F4F5', label: 'Frost White' },
  { id: 'gold', color: '#D97706', label: 'Golden' },
];

export default function DigitalCardScreen() {
  const [mode, setMode] = useState<ViewMode>('order');
  const [step, setStep] = useState<Step>('customise');
  const [businessName, setBusinessName] = useState('Forscha Glass Works');
  const [tagline, setTagline] = useState('Premium Glass Solutions');
  const [address, setAddress] = useState('Andheri, Mumbai');
  const [selectedStyle, setSelectedStyle] = useState('acrylic');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [qty, setQty] = useState('1');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // NFC Programming State
  const [slug, setSlug] = useState('forschalabs-mumbai');
  const [programming, setProgramming] = useState(false);
  const [progProgress, setProgProgress] = useState(0);

  const selectedCard = CARD_STYLES.find(c => c.id === selectedStyle)!;
  const selectedTheme = COLOR_OPTIONS.find(c => c.id === selectedColor)!;
  const total = selectedCard.price * (parseInt(qty) || 1);

  const handleOrder = () => {
    setOrderPlaced(true);
    Alert.alert(
      'Order Confirmed',
      `Your ${selectedCard.label} review card for "${businessName}" has been placed! We will process and ship within 2-3 business days.`,
    );
    setStep('customise');
    setOrderPlaced(false);
  };

  const handleWriteNFC = () => {
    setProgramming(true);
    setProgProgress(10);
    
    const interval = setInterval(() => {
      setProgProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProgramming(false);
          Alert.alert('NFC Card Programmed', 'Write success! Touch this card to any customer phone to launch review portal.');
          return 0;
        }
        return prev + 30;
      });
    }, 400);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Segment Switcher */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity 
          style={[styles.segmentBtn, mode === 'order' && styles.segmentBtnActive]}
          onPress={() => setMode('order')}
          activeOpacity={0.7}
        >
          <Text style={[styles.segmentText, mode === 'order' && styles.segmentTextActive]}>
            Order Standees
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.segmentBtn, mode === 'nfc' && styles.segmentBtnActive]}
          onPress={() => setMode('nfc')}
          activeOpacity={0.7}
        >
          <Text style={[styles.segmentText, mode === 'nfc' && styles.segmentTextActive]}>
            Write NFC Tag
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── MODE: ORDER STANDEES ── */}
      {mode === 'order' && (
        <View>
          {/* Step Progress */}
          <View style={styles.stepRow}>
            {(['customise', 'preview', 'order'] as Step[]).map((s, i) => (
              <React.Fragment key={s}>
                <TouchableOpacity onPress={() => setStep(s)} style={styles.stepItem}>
                  <View style={[styles.stepCircle, step === s && styles.stepCircleActive]}>
                    <Text style={[styles.stepNum, step === s && styles.stepNumActive]}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.stepLabel, step === s && styles.stepLabelActive]}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Text>
                </TouchableOpacity>
                {i < 2 && <View style={styles.stepLine} />}
              </React.Fragment>
            ))}
          </View>

          {/* STEP 1: CUSTOMISE */}
          {step === 'customise' && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Business Details</Text>
                <Text style={styles.fieldLabel}>Business Name</Text>
                <TextInput
                  style={styles.input}
                  value={businessName}
                  onChangeText={setBusinessName}
                  placeholderTextColor="#52525B"
                />
                <Text style={styles.fieldLabel}>Tagline / Slogan</Text>
                <TextInput
                  style={styles.input}
                  value={tagline}
                  onChangeText={setTagline}
                  placeholderTextColor="#52525B"
                />
                <Text style={styles.fieldLabel}>Location / Area</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor="#52525B"
                />
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Card Style</Text>
                <View style={styles.styleGrid}>
                  {CARD_STYLES.map(s => {
                    const StyleIcon = s.Icon;
                    return (
                      <TouchableOpacity
                        key={s.id}
                        style={[styles.styleCard, selectedStyle === s.id && styles.styleCardActive]}
                        onPress={() => setSelectedStyle(s.id)}
                      >
                        <View style={[styles.iconBox, { backgroundColor: selectedStyle === s.id ? '#3E6BEC20' : '#202025' }]}>
                          <StyleIcon size={20} color={selectedStyle === s.id ? '#3E6BEC' : '#8E9196'} />
                        </View>
                        <Text style={styles.styleName}>{s.label}</Text>
                        <Text style={styles.stylePrice}>₹{s.price}</Text>
                        {selectedStyle === s.id && (
                          <View style={styles.checkBadge}>
                            <Check size={10} color="#FFFFFF" />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Theme Color</Text>
                <View style={styles.colorRow}>
                  {COLOR_OPTIONS.map(c => (
                    <TouchableOpacity
                      key={c.id}
                      onPress={() => setSelectedColor(c.id)}
                      style={[styles.colorDot, { backgroundColor: c.color }, selectedColor === c.id && styles.colorDotSelected]}
                    />
                  ))}
                </View>
                <Text style={styles.colorLabel}>{selectedTheme.label}</Text>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep('preview')}>
                <Text style={styles.primaryBtnText}>Preview Card</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 2: PREVIEW */}
          {step === 'preview' && (
            <View>
              <View style={[styles.mockCard, { backgroundColor: selectedTheme.color }]}>
                <Text style={[styles.mockBusiness, { color: selectedColor === 'white' ? '#18181B' : '#FFFFFF' }]}>
                  {businessName}
                </Text>
                <Text style={[styles.mockTagline, { color: selectedColor === 'white' ? '#3F3F46' : '#FFFFFF99' }]}>
                  {tagline}
                </Text>
                <View style={styles.mockQrBox}>
                  <Text style={styles.mockQrText}>[ QR CODE ]</Text>
                  <Text style={styles.mockQrSub}>Scan to leave a review</Text>
                </View>
                <View style={styles.mockAddressRow}>
                  <MapPin size={13} color={selectedColor === 'white' ? '#52525B' : '#FFFFFF80'} />
                  <Text style={[styles.mockAddress, { color: selectedColor === 'white' ? '#52525B' : '#FFFFFF80' }]}>
                    {address}
                  </Text>
                </View>
                <View style={styles.mockBadge}>
                  <selectedCard.Icon size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.mockBadgeText}>{selectedCard.label}</Text>
                </View>
              </View>

              <View style={styles.infoBox}>
                <Info size={16} color="#93C5FD" style={{ marginRight: 8, marginTop: 1 }} />
                <Text style={styles.infoText}>Your GMB review link will be embedded as a QR code. Customers scan, land on a curated review prompt, and tap to post directly on Google.</Text>
              </View>

              <View style={styles.row}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => setStep('customise')}>
                  <Text style={styles.outlineBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setStep('order')}>
                  <Text style={styles.primaryBtnText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* STEP 3: ORDER */}
          {step === 'order' && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>Card Type</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <selectedCard.Icon size={14} color="#8E9196" />
                    <Text style={styles.summaryVal}>{selectedCard.label}</Text>
                  </View>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>Theme</Text>
                  <Text style={styles.summaryVal}>{selectedTheme.label}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>For</Text>
                  <Text style={styles.summaryVal}>{businessName}</Text>
                </View>
                <View style={styles.divider} />

                <Text style={styles.fieldLabel}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  value={qty}
                  onChangeText={setQty}
                  keyboardType="number-pad"
                  placeholderTextColor="#52525B"
                />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Shipping Address</Text>
                <TextInput
                  style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                  placeholder="Full delivery address..."
                  placeholderTextColor="#52525B"
                  multiline
                />
              </View>

              <TouchableOpacity style={styles.greenBtn} onPress={handleOrder}>
                <Text style={styles.primaryBtnText}>Confirm Order - ₹{total.toLocaleString()}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* ── MODE: WRITE NFC TAG ── */}
      {mode === 'nfc' && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Live Review Slug</Text>
            <Text style={styles.fieldLabel}>Google Review Shortname</Text>
            <TextInput
              style={styles.input}
              placeholder="Google Review Shortname"
              placeholderTextColor="#52525B"
              value={slug}
              onChangeText={setSlug}
              autoCapitalize="none"
            />
            <Text style={styles.subtext}>Resolves to: https://forscha.com/r/{slug}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>NFC Card Programmer</Text>
            <Text style={styles.nfcHeader}>Tap to Write NFC Keytags</Text>
            <Text style={styles.nfcBody}>
              Program physical cards or stickers instantly. Place the blank tag on the back of your phone near the NFC reader antenna.
            </Text>

            {programming ? (
              <View style={styles.progressContainer}>
                <ActivityIndicator size="large" color="#3E6BEC" />
                <Text style={styles.progressText}>Programming Tag... {progProgress}%</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.nfcBtn} onPress={handleWriteNFC}>
                <Rss size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.nfcBtnText}>Start NFC Write Sequence</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070709', padding: 16 },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: '#3E6BEC',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 8 },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#16161A',
    borderWidth: 1, borderColor: '#202025', alignItems: 'center', justifyContent: 'center',
  },
  stepCircleActive: { backgroundColor: '#3E6BEC', borderColor: '#3E6BEC' },
  stepNum: { fontSize: 13, fontWeight: '700', color: '#52525B' },
  stepNumActive: { color: '#FFFFFF' },
  stepLabel: { fontSize: 10, color: '#52525B', fontWeight: '600' },
  stepLabelActive: { color: '#3E6BEC' },
  stepLine: { flex: 1, height: 1, backgroundColor: '#202025', marginBottom: 16 },
  card: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 18, padding: 16, marginBottom: 16,
  },
  cardTitle: { fontSize: 13, fontWeight: '800', color: '#71717A', textTransform: 'uppercase', marginBottom: 14, letterSpacing: 0.5 },
  fieldLabel: { fontSize: 12, color: '#71717A', fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#070709', borderColor: '#202025', borderWidth: 1,
    borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 14, marginBottom: 12,
  },
  styleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  styleCard: {
    width: '48%', backgroundColor: '#16161A', borderColor: '#202025', borderWidth: 1,
    borderRadius: 12, padding: 12, alignItems: 'center', position: 'relative',
  },
  styleCardActive: { borderColor: '#3E6BEC', backgroundColor: '#0D1526' },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  styleName: { fontSize: 12, fontWeight: '700', color: '#FFFFFF', textAlign: 'center' },
  stylePrice: { fontSize: 12, color: '#10B981', fontWeight: '800', marginTop: 4 },
  checkBadge: {
    position: 'absolute', top: 8, right: 8, backgroundColor: '#3E6BEC',
    width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center',
  },
  colorRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  colorDot: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: 'transparent' },
  colorDotSelected: { borderColor: '#FFFFFF' },
  colorLabel: { fontSize: 12, color: '#71717A', fontWeight: '600' },
  primaryBtn: {
    backgroundColor: '#3E6BEC', paddingVertical: 15, borderRadius: 14,
    alignItems: 'center', marginBottom: 12,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  greenBtn: {
    backgroundColor: '#10B981', paddingVertical: 15, borderRadius: 14,
    alignItems: 'center', marginBottom: 12,
  },
  outlineBtn: {
    backgroundColor: '#16161A', borderColor: '#202025', borderWidth: 1,
    paddingVertical: 15, paddingHorizontal: 20, borderRadius: 14,
    alignItems: 'center', marginBottom: 12, marginRight: 10,
  },
  outlineBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  row: { flexDirection: 'row' },
  mockCard: {
    borderRadius: 20, padding: 24, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
  },
  mockBusiness: { fontSize: 22, fontWeight: '900', marginBottom: 4 },
  mockTagline: { fontSize: 13, marginBottom: 20 },
  mockQrBox: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    alignItems: 'center', marginBottom: 16,
  },
  mockQrText: { fontSize: 16, color: '#18181B', fontWeight: '800' },
  mockQrSub: { fontSize: 11, color: '#71717A', marginTop: 4 },
  mockAddressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  mockAddress: { fontSize: 12 },
  mockBadge: { backgroundColor: '#FFFFFF20', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' },
  mockBadgeText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#101726', borderColor: '#1D2D50', borderWidth: 1,
    borderRadius: 14, padding: 14, marginBottom: 16,
  },
  infoText: { flex: 1, fontSize: 13, color: '#93C5FD', lineHeight: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryKey: { fontSize: 13, color: '#71717A' },
  summaryVal: { fontSize: 13, color: '#FFFFFF', fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#202025', marginVertical: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  totalLabel: { fontSize: 15, color: '#FFFFFF', fontWeight: '800' },
  totalValue: { fontSize: 22, color: '#3E6BEC', fontWeight: '900' },
  
  // NFC Programmer merged styles
  subtext: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  nfcHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  nfcBody: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
    marginBottom: 16,
  },
  nfcBtn: {
    flexDirection: 'row',
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nfcBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  progressText: {
    color: '#3E6BEC',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
});

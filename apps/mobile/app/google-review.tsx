import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Alert, Linking,
} from 'react-native';
import { Star, Link, Copy, ExternalLink, RefreshCw, CheckCircle, Download } from 'lucide-react-native';

type Tab = 'connect' | 'scanner' | 'analytics';

const PRE_WRITTEN_REVIEWS = [
  "Great service and quality work! The team was professional, punctual and delivered exactly what was promised. Highly recommend!",
  "Excellent experience from start to finish. The craftsmanship is top-notch and the pricing is fair. Will definitely use again!",
  "Outstanding customer service! They went above and beyond to make sure everything was perfect. 5 stars without hesitation!",
  "Very impressed with the quality and attention to detail. The team is knowledgeable and genuinely cares about customer satisfaction.",
];

export default function GoogleReviewScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('connect');
  const [gmbUrl, setGmbUrl] = useState('https://g.page/r/YOUR_REVIEW_LINK');
  const [isConnected, setIsConnected] = useState(false);
  const [selectedReview, setSelectedReview] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleConnect = () => {
    if (!gmbUrl || gmbUrl === 'https://g.page/r/YOUR_REVIEW_LINK') {
      Alert.alert('Enter GMB Link', 'Paste your Google Business review link first.');
      return;
    }
    setIsConnected(true);
    Alert.alert('GMB Connected!', 'Your Google Business Profile is now linked. Review prompts and analytics are active.');
    setActiveTab('scanner');
  };

  const handleCopyAndRedirect = () => {
    // In production: use Clipboard API
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    Alert.alert(
      'Review Copied!',
      'The review text has been copied. You will now be redirected to Google to paste and submit your 5-star review!',
      [
        {
          text: 'Open Google Review',
          onPress: () => Linking.openURL(gmbUrl).catch(() => {}),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: 'connect', label: 'Connect GMB' },
    { id: 'scanner', label: 'Review Scanner' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, activeTab === t.id && styles.tabActive]}
            onPress={() => setActiveTab(t.id)}
          >
            <Text style={[styles.tabText, activeTab === t.id && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── TAB 1: CONNECT ── */}
      {activeTab === 'connect' && (
        <View>
          {isConnected ? (
            <View style={styles.connectedCard}>
              <CheckCircle size={32} color="#10B981" />
              <Text style={styles.connectedTitle}>GMB Profile Connected</Text>
              <Text style={styles.connectedUrl} numberOfLines={1}>{gmbUrl}</Text>
              <TouchableOpacity style={styles.disconnectBtn} onPress={() => setIsConnected(false)}>
                <Text style={styles.disconnectText}>Disconnect</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Link size={20} color="#F59E0B" />
                <Text style={styles.cardTitle}>Link Your GMB Profile</Text>
              </View>
              <Text style={styles.cardDesc}>
                Paste your Google Business review link below. Find it by going to your Google Business Profile → Get more reviews → Share review link.
              </Text>
              <Text style={styles.fieldLabel}>Google Review URL</Text>
              <TextInput
                style={styles.input}
                value={gmbUrl}
                onChangeText={setGmbUrl}
                placeholder="https://g.page/r/..."
                placeholderTextColor="#52525B"
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleConnect}>
                <Text style={styles.primaryBtnText}>Connect Profile</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* GMB Stats (Mock) */}
          {isConnected && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>GMB Overview</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>4.8</Text>
                  <Text style={styles.statLabel}>Avg Rating</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>128</Text>
                  <Text style={styles.statLabel}>Total Reviews</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>94%</Text>
                  <Text style={styles.statLabel}>Positive</Text>
                </View>
              </View>
              <View style={styles.ratingRow}>
                {[5, 4, 3, 2, 1].map(r => (
                  <View key={r} style={styles.ratingBarRow}>
                    <Text style={styles.ratingNum}>{r}★</Text>
                    <View style={styles.ratingBarBg}>
                      <View style={[styles.ratingBarFill, { width: `${[80, 12, 5, 2, 1][5 - r]}%` as any }]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}

      {/* ── TAB 2: REVIEW SCANNER ── */}
      {activeTab === 'scanner' && (
        <View>
          {/* How it works */}
          <View style={styles.howCard}>
            <Text style={styles.howTitle}>How it works</Text>
            {[
              'Customer scans your QR standee with their phone camera',
              'They see a pre-written 5★ review on their screen',
              'Tap "Copy & Go to Google" — review is copied',
              'They paste & submit on your GMB page instantly',
            ].map((step, i) => (
              <View key={i} style={styles.howStep}>
                <View style={styles.howNum}><Text style={styles.howNumText}>{i + 1}</Text></View>
                <Text style={styles.howText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* QR Preview */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Review QR Code</Text>
            <View style={styles.qrBox}>
              <View style={styles.qrPlaceholder}>
                <Text style={styles.qrText}>QR</Text>
                <Text style={styles.qrSub}>Scan to review</Text>
              </View>
              <View>
                <Text style={styles.qrLink} numberOfLines={1}>{gmbUrl}</Text>
                <Text style={styles.qrNote}>This QR opens a review prompt layer</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.outlineBtn}>
              <Download size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.outlineBtnText}>Download QR Image</Text>
            </TouchableOpacity>
          </View>

          {/* Review Templates */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pre-Written Review Templates</Text>
            <Text style={styles.cardDesc}>Choose which review text will appear when the customer scans.</Text>
            {PRE_WRITTEN_REVIEWS.map((rev, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.reviewOption, selectedReview === i && styles.reviewOptionActive]}
                onPress={() => setSelectedReview(i)}
              >
                <View style={styles.reviewBullet}>
                  {selectedReview === i
                    ? <CheckCircle size={18} color="#3E6BEC" />
                    : <View style={styles.emptyBullet} />}
                </View>
                <Text style={styles.reviewText}>{rev}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Customer View Preview */}
          <View style={styles.customerPreview}>
            <View style={styles.previewHeader}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.previewRatingText}>5.0</Text>
            </View>
            <Text style={styles.previewTitle}>Leave Us a Review!</Text>
            <View style={styles.previewBubble}>
              <Text style={styles.previewReviewText}>{PRE_WRITTEN_REVIEWS[selectedReview]}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyAndRedirect}>
              {copied
                ? <CheckCircle size={18} color="#FFFFFF" />
                : <Copy size={18} color="#FFFFFF" />}
              <Text style={styles.copyBtnText}>
                {copied ? 'Copied! Opening Google...' : 'Copy & Go to Google'}
              </Text>
              {!copied && <ExternalLink size={14} color="#FFFFFF" style={{ marginLeft: 6 }} />}
            </TouchableOpacity>
            <Text style={styles.previewNote}>★ This is the screen your customers will see</Text>
          </View>
        </View>
      )}

      {/* ── TAB 3: ANALYTICS ── */}
      {activeTab === 'analytics' && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Review Performance</Text>
            {[
              { label: 'Scans this week', value: '47', trend: '+12%' },
              { label: 'Reviews submitted', value: '31', trend: '+8%' },
              { label: 'Conversion rate', value: '66%', trend: '+5%' },
              { label: 'Avg response time', value: '2.3 days', trend: '' },
            ].map(stat => (
              <View key={stat.label} style={styles.analyticsRow}>
                <Text style={styles.analyticsLabel}>{stat.label}</Text>
                <View style={styles.analyticsRight}>
                  <Text style={styles.analyticsValue}>{stat.value}</Text>
                  {stat.trend ? <Text style={styles.analyticsTrend}>{stat.trend}</Text> : null}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Reviews</Text>
            {[
              { name: 'Aarav M.', rating: 5, time: '2h ago', text: 'Excellent service!' },
              { name: 'Priya S.', rating: 5, time: '1d ago', text: 'Very professional team.' },
              { name: 'Rajan K.', rating: 4, time: '2d ago', text: 'Good quality work.' },
            ].map((r, i) => (
              <View key={i} style={styles.recentReview}>
                <View style={styles.reviewerRow}>
                  <Text style={styles.reviewerName}>{r.name}</Text>
                  <Text style={styles.reviewTime}>{r.time}</Text>
                </View>
                <Text style={styles.reviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</Text>
                <Text style={styles.reviewBody}>{r.text}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070709', padding: 16 },
  tabBar: {
    flexDirection: 'row', backgroundColor: '#0F0F12', borderColor: '#202025',
    borderWidth: 1, borderRadius: 12, padding: 4, marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center' },
  tabActive: { backgroundColor: '#3E6BEC' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#71717A' },
  tabTextActive: { color: '#FFFFFF' },
  card: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 18, padding: 16, marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  cardTitle: { fontSize: 13, fontWeight: '800', color: '#71717A', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 },
  cardDesc: { fontSize: 13, color: '#71717A', lineHeight: 18, marginBottom: 14 },
  fieldLabel: { fontSize: 12, color: '#71717A', fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#070709', borderColor: '#202025', borderWidth: 1,
    borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 14, marginBottom: 12,
  },
  primaryBtn: { backgroundColor: '#3E6BEC', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  outlineBtn: {
    backgroundColor: '#16161A', borderColor: '#202025', borderWidth: 1,
    paddingVertical: 12, borderRadius: 12, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center',
  },
  outlineBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  connectedCard: {
    backgroundColor: '#10B98110', borderColor: '#10B98140', borderWidth: 1,
    borderRadius: 18, padding: 20, alignItems: 'center', marginBottom: 16, gap: 8,
  },
  connectedTitle: { fontSize: 16, fontWeight: '800', color: '#10B981' },
  connectedUrl: { fontSize: 12, color: '#71717A', maxWidth: '80%' },
  disconnectBtn: { marginTop: 4 },
  disconnectText: { fontSize: 12, color: '#EF4444', fontWeight: '700' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { fontSize: 11, color: '#71717A', marginTop: 2 },
  ratingRow: { gap: 6 },
  ratingBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingNum: { fontSize: 11, color: '#71717A', width: 20 },
  ratingBarBg: { flex: 1, backgroundColor: '#202025', borderRadius: 4, height: 6 },
  ratingBarFill: { backgroundColor: '#F59E0B', borderRadius: 4, height: 6 },
  howCard: {
    backgroundColor: '#101726', borderColor: '#1D2D50', borderWidth: 1,
    borderRadius: 18, padding: 16, marginBottom: 16,
  },
  howTitle: { fontSize: 14, fontWeight: '800', color: '#60A5FA', marginBottom: 14 },
  howStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  howNum: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#3E6BEC',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  howNumText: { fontSize: 11, fontWeight: '800', color: '#FFFFFF' },
  howText: { fontSize: 13, color: '#93C5FD', lineHeight: 18, flex: 1 },
  qrBox: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  qrPlaceholder: {
    width: 80, height: 80, backgroundColor: '#FFFFFF', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  qrText: { fontSize: 16, fontWeight: '900', color: '#18181B' },
  qrSub: { fontSize: 8, color: '#71717A', marginTop: 2 },
  qrLink: { fontSize: 12, color: '#3E6BEC', fontWeight: '600', maxWidth: 200 },
  qrNote: { fontSize: 11, color: '#71717A', marginTop: 4 },
  reviewOption: {
    flexDirection: 'row', gap: 10, padding: 12, backgroundColor: '#16161A',
    borderColor: '#202025', borderWidth: 1, borderRadius: 12, marginBottom: 8, alignItems: 'flex-start',
  },
  reviewOptionActive: { borderColor: '#3E6BEC', backgroundColor: '#3E6BEC12' },
  reviewBullet: { flexShrink: 0, marginTop: 1 },
  emptyBullet: { width: 18, height: 18, borderRadius: 9, borderColor: '#52525B', borderWidth: 2 },
  reviewText: { fontSize: 13, color: '#D4D4D8', lineHeight: 18, flex: 1 },
  customerPreview: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 18, padding: 20, marginBottom: 16,
  },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  previewRatingText: { fontSize: 14, fontWeight: '800', color: '#F59E0B', marginLeft: 4 },
  previewTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 12 },
  previewBubble: {
    backgroundColor: '#16161A', borderRadius: 12, padding: 14, marginBottom: 16,
    borderLeftWidth: 3, borderLeftColor: '#3E6BEC',
  },
  previewReviewText: { fontSize: 14, color: '#E4E4E7', lineHeight: 20 },
  copyBtn: {
    backgroundColor: '#3E6BEC', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 14, borderRadius: 12, gap: 8,
  },
  copyBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  previewNote: { fontSize: 11, color: '#52525B', textAlign: 'center', marginTop: 10 },
  analyticsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#202025',
  },
  analyticsLabel: { fontSize: 14, color: '#A1A1AA' },
  analyticsRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  analyticsValue: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  analyticsTrend: { fontSize: 12, color: '#10B981', fontWeight: '700' },
  recentReview: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#202025' },
  reviewerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  reviewerName: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  reviewTime: { fontSize: 12, color: '#71717A' },
  reviewStars: { fontSize: 13, color: '#F59E0B', marginBottom: 4 },
  reviewBody: { fontSize: 13, color: '#A1A1AA' },
});

import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Share2, Instagram, Link, CheckCircle, Plus, RefreshCw } from 'lucide-react-native';

interface SocialPlatform {
  id: string;
  name: string;
  handle: string;
  icon: string;
  color: string;
  connected: boolean;
  followers?: string;
  posts?: number;
  engagement?: string;
}

export default function SocialMediaScreen() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@forschalabs',
      icon: '📸',
      color: '#E1306C',
      connected: true,
      followers: '2.4K',
      posts: 89,
      engagement: '4.2%',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'Forscha Labs',
      icon: '👥',
      color: '#1877F2',
      connected: true,
      followers: '1.1K',
      posts: 124,
      engagement: '2.8%',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Forscha Labs Pvt Ltd',
      icon: '💼',
      color: '#0A66C2',
      connected: false,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@forschalabs',
      icon: '▶️',
      color: '#FF0000',
      connected: false,
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      handle: '@forschalabs',
      icon: '𝕏',
      color: '#FFFFFF',
      connected: false,
    },
    {
      id: 'google',
      name: 'Google Business',
      handle: 'Forscha Glass Works',
      icon: '🔍',
      color: '#4285F4',
      connected: true,
      followers: '128 reviews',
      posts: 0,
      engagement: '4.8★',
    },
  ]);

  const [activeSection, setActiveSection] = useState<'accounts' | 'schedule' | 'analytics'>('accounts');

  const toggleConnect = (id: string) => {
    const platform = platforms.find(p => p.id === id);
    if (!platform) return;
    if (platform.connected) {
      Alert.alert(
        'Disconnect?',
        `Are you sure you want to disconnect ${platform.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: () => setPlatforms(prev => prev.map(p => p.id === id ? { ...p, connected: false } : p)),
          },
        ]
      );
    } else {
      Alert.alert(
        `Connect ${platform.name}`,
        `You'll be redirected to ${platform.name} to authorize Forscha to manage your account.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Connect',
            onPress: () => setPlatforms(prev => prev.map(p =>
              p.id === id ? { ...p, connected: true, followers: '—', posts: 0, engagement: '—' } : p
            )),
          },
        ]
      );
    }
  };

  const connectedCount = platforms.filter(p => p.connected).length;

  const SECTIONS = [
    { id: 'accounts' as const, label: 'Accounts' },
    { id: 'schedule' as const, label: 'Scheduler' },
    { id: 'analytics' as const, label: 'Analytics' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Connection Status */}
      <View style={styles.statusBar}>
        <View style={styles.statusLeft}>
          <Share2 size={18} color="#EC4899" />
          <Text style={styles.statusText}>{connectedCount} of {platforms.length} platforms connected</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${(connectedCount / platforms.length) * 100}%` as any }]} />
        </View>
      </View>

      {/* Section Tabs */}
      <View style={styles.tabBar}>
        {SECTIONS.map(s => (
          <TouchableOpacity
            key={s.id}
            style={[styles.tab, activeSection === s.id && styles.tabActive]}
            onPress={() => setActiveSection(s.id)}
          >
            <Text style={[styles.tabText, activeSection === s.id && styles.tabTextActive]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── ACCOUNTS ── */}
      {activeSection === 'accounts' && (
        <View>
          {platforms.map(platform => (
            <View key={platform.id} style={[styles.platformCard, platform.connected && { borderColor: platform.color + '40' }]}>
              <View style={styles.platformLeft}>
                <View style={[styles.platformIcon, { backgroundColor: platform.color + '20', borderColor: platform.color + '40' }]}>
                  <Text style={styles.platformEmoji}>{platform.icon}</Text>
                </View>
                <View>
                  <Text style={styles.platformName}>{platform.name}</Text>
                  <Text style={styles.platformHandle}>{platform.handle}</Text>
                  {platform.connected && platform.followers && (
                    <View style={styles.statsRow}>
                      <Text style={styles.statChip}>👥 {platform.followers}</Text>
                      {platform.engagement && <Text style={styles.statChip}>📊 {platform.engagement}</Text>}
                    </View>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.connectBtn,
                  platform.connected ? styles.connectBtnActive : styles.connectBtnInactive,
                ]}
                onPress={() => toggleConnect(platform.id)}
              >
                {platform.connected
                  ? <CheckCircle size={14} color="#10B981" />
                  : <Link size={14} color="#71717A" />}
                <Text style={[styles.connectBtnText, platform.connected && styles.connectBtnTextActive]}>
                  {platform.connected ? 'Connected' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* ── SCHEDULER ── */}
      {activeSection === 'schedule' && (
        <View>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📅 Content Scheduler</Text>
            <Text style={styles.infoDesc}>
              Schedule posts across all your connected social platforms from one place. 
              Set date, time, captions, and choose which platforms to publish to.
            </Text>
          </View>

          {[
            { time: 'Today, 6:00 PM', caption: '🏆 Premium glass installations done right! Check out our latest project in Bandra...', platforms: ['📸', '👥'], status: 'scheduled' },
            { time: 'Tomorrow, 10:00 AM', caption: '💡 Did you know? Our tempered glass can withstand up to 250°C! Perfect for commercial...', platforms: ['📸', '💼'], status: 'draft' },
            { time: 'Thu, 8:00 PM', caption: '⭐ Overwhelmed by 5-star reviews this week! Thank you to all our clients in Mumbai...', platforms: ['📸', '👥', '𝕏'], status: 'scheduled' },
          ].map((post, i) => (
            <View key={i} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.postTime}>{post.time}</Text>
                <View style={[styles.postStatus, post.status === 'scheduled' ? styles.statusScheduled : styles.statusDraft]}>
                  <Text style={styles.postStatusText}>{post.status.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.postCaption} numberOfLines={2}>{post.caption}</Text>
              <View style={styles.postPlatforms}>
                {post.platforms.map((p, j) => (
                  <Text key={j} style={styles.postPlatformIcon}>{p}</Text>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.primaryBtn} onPress={() => Alert.alert('Schedule Post', 'Post composer coming soon!')}>
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Schedule New Post</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── ANALYTICS ── */}
      {activeSection === 'analytics' && (
        <View>
          {/* Overall Stats */}
          <View style={styles.analyticsGrid}>
            {[
              { label: 'Total Reach', value: '8.4K', trend: '+22%', color: '#EC4899' },
              { label: 'Impressions', value: '24K', trend: '+15%', color: '#3E6BEC' },
              { label: 'Engagements', value: '1.2K', trend: '+8%', color: '#F59E0B' },
              { label: 'Avg Eng. Rate', value: '3.6%', trend: '+1.2%', color: '#10B981' },
            ].map(stat => (
              <View key={stat.label} style={styles.analyticsCard}>
                <Text style={[styles.analyticsValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.analyticsLabel}>{stat.label}</Text>
                <Text style={styles.analyticsTrend}>{stat.trend} ↑</Text>
              </View>
            ))}
          </View>

          {/* Platform Breakdown */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Platform Breakdown</Text>
            {platforms.filter(p => p.connected).map(p => (
              <View key={p.id} style={styles.breakdownRow}>
                <Text style={styles.breakdownIcon}>{p.icon}</Text>
                <Text style={styles.breakdownName}>{p.name}</Text>
                <View style={styles.breakdownBarBg}>
                  <View style={[styles.breakdownBarFill, { width: `${Math.random() * 60 + 20}%` as any, backgroundColor: p.color }]} />
                </View>
                <Text style={styles.breakdownVal}>{p.followers}</Text>
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
  statusBar: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 14, marginBottom: 16, gap: 10,
  },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusText: { fontSize: 13, fontWeight: '700', color: '#A1A1AA' },
  progressBarBg: { height: 4, backgroundColor: '#202025', borderRadius: 2 },
  progressBarFill: { height: 4, backgroundColor: '#EC4899', borderRadius: 2 },
  tabBar: {
    flexDirection: 'row', backgroundColor: '#0F0F12', borderColor: '#202025',
    borderWidth: 1, borderRadius: 12, padding: 4, marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center' },
  tabActive: { backgroundColor: '#EC4899' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#71717A' },
  tabTextActive: { color: '#FFFFFF' },
  platformCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 14, marginBottom: 10,
  },
  platformLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  platformIcon: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  platformEmoji: { fontSize: 20 },
  platformName: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  platformHandle: { fontSize: 12, color: '#71717A', marginTop: 1 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  statChip: { fontSize: 11, color: '#A1A1AA' },
  connectBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1,
  },
  connectBtnActive: { backgroundColor: '#0A1A0D', borderColor: '#10B98140' },
  connectBtnInactive: { backgroundColor: '#16161A', borderColor: '#202025' },
  connectBtnText: { fontSize: 12, fontWeight: '700', color: '#71717A' },
  connectBtnTextActive: { color: '#10B981' },
  infoCard: {
    backgroundColor: '#1A0010', borderColor: '#EC489940', borderWidth: 1,
    borderRadius: 16, padding: 16, marginBottom: 16,
  },
  infoTitle: { fontSize: 15, fontWeight: '800', color: '#EC4899', marginBottom: 8 },
  infoDesc: { fontSize: 13, color: '#A1A1AA', lineHeight: 18 },
  postCard: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 14, marginBottom: 10,
  },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  postTime: { fontSize: 12, fontWeight: '700', color: '#A1A1AA' },
  postStatus: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  statusScheduled: { backgroundColor: '#10B98125' },
  statusDraft: { backgroundColor: '#71717A25' },
  postStatusText: { fontSize: 9, fontWeight: '800', color: '#FFFFFF' },
  postCaption: { fontSize: 13, color: '#D4D4D8', lineHeight: 18, marginBottom: 10 },
  postPlatforms: { flexDirection: 'row', gap: 8 },
  postPlatformIcon: { fontSize: 18 },
  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#EC4899', paddingVertical: 14, borderRadius: 12, gap: 8, marginBottom: 12,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  analyticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  analyticsCard: {
    width: '47%', backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 14,
  },
  analyticsValue: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  analyticsLabel: { fontSize: 12, color: '#71717A' },
  analyticsTrend: { fontSize: 11, color: '#10B981', fontWeight: '700', marginTop: 4 },
  card: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 18, padding: 16, marginBottom: 16,
  },
  cardTitle: { fontSize: 12, fontWeight: '800', color: '#71717A', textTransform: 'uppercase', marginBottom: 14, letterSpacing: 0.5 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  breakdownIcon: { fontSize: 18, width: 26 },
  breakdownName: { fontSize: 12, color: '#A1A1AA', width: 70 },
  breakdownBarBg: { flex: 1, height: 6, backgroundColor: '#202025', borderRadius: 3 },
  breakdownBarFill: { height: 6, borderRadius: 3 },
  breakdownVal: { fontSize: 12, color: '#FFFFFF', fontWeight: '700', width: 40, textAlign: 'right' },
});

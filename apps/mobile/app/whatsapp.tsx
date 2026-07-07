import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Alert, Switch,
} from 'react-native';
import { MessageCircle, Zap, Users, Bell, Plus, Trash2, Play, Pause } from 'lucide-react-native';

type Tab = 'templates' | 'campaigns' | 'triggers';

interface Template {
  id: string;
  name: string;
  message: string;
  active: boolean;
  type: 'review' | 'followup' | 'promo';
}

interface Campaign {
  id: string;
  name: string;
  sent: number;
  opened: number;
  status: 'active' | 'paused' | 'draft';
}

export default function WhatsAppScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('templates');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLinked, setIsLinked] = useState(false);

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Review Request',
      message: 'Hi {name}! 👋 Thank you for visiting {business}. We\'d love your feedback! Tap here to leave a quick review: {review_link} ⭐',
      active: true,
      type: 'review',
    },
    {
      id: '2',
      name: 'Follow-up (3 days)',
      message: 'Hi {name}, just checking in! Did you enjoy your experience with {business}? Your review means the world to us 🙏',
      active: false,
      type: 'followup',
    },
    {
      id: '3',
      name: 'Promo Blast',
      message: '🎉 Special offer for our valued customers! Get 15% off on your next order. Use code FORSCHA15. Valid till Sunday!',
      active: true,
      type: 'promo',
    },
  ]);

  const [campaigns] = useState<Campaign[]>([
    { id: '1', name: 'Diwali Promo 2025', sent: 234, opened: 189, status: 'active' },
    { id: '2', name: 'Review Drive Oct', sent: 87, opened: 71, status: 'paused' },
    { id: '3', name: 'New Year Offer', sent: 0, opened: 0, status: 'draft' },
  ]);

  const toggleTemplate = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: 'templates', label: 'Auto-Reply' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'triggers', label: 'Triggers' },
  ];

  const TYPE_COLORS: Record<string, string> = {
    review: '#F59E0B',
    followup: '#3E6BEC',
    promo: '#8B5CF6',
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* WhatsApp Link Banner */}
      {!isLinked ? (
        <View style={styles.linkBanner}>
          <MessageCircle size={28} color="#25D366" />
          <View style={styles.linkText}>
            <Text style={styles.linkTitle}>Connect WhatsApp Business</Text>
            <Text style={styles.linkDesc}>Link your number to enable automation</Text>
          </View>
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => {
              setIsLinked(true);
              Alert.alert('WhatsApp Linked!', 'Your WhatsApp Business account is now connected.');
            }}
          >
            <Text style={styles.linkBtnText}>Link</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.linkedBanner}>
          <View style={styles.activeDot} />
          <Text style={styles.linkedText}>WhatsApp Business Active</Text>
          <TouchableOpacity onPress={() => setIsLinked(false)}>
            <Text style={styles.unlinkText}>Unlink</Text>
          </TouchableOpacity>
        </View>
      )}

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

      {/* ── TAB 1: TEMPLATES ── */}
      {activeTab === 'templates' && (
        <View>
          {templates.map(t => (
            <View key={t.id} style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <View style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[t.type] + '25', borderColor: TYPE_COLORS[t.type] + '50' }]}>
                  <Text style={[styles.typeBadgeText, { color: TYPE_COLORS[t.type] }]}>{t.type.toUpperCase()}</Text>
                </View>
                <Switch
                  trackColor={{ false: '#202025', true: '#25D36650' }}
                  thumbColor={t.active ? '#25D366' : '#52525B'}
                  value={t.active}
                  onValueChange={() => toggleTemplate(t.id)}
                />
              </View>
              <Text style={styles.templateName}>{t.name}</Text>
              <Text style={styles.templateMessage}>{t.message}</Text>
              <View style={styles.templateFooter}>
                <Text style={styles.variableHint}>Variables: {'{name}'} {'{business}'} {'{review_link}'}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addCard}
            onPress={() => Alert.alert('Add Template', 'Template editor coming soon!')}
          >
            <Plus size={20} color="#3E6BEC" />
            <Text style={styles.addCardText}>Create New Template</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── TAB 2: CAMPAIGNS ── */}
      {activeTab === 'campaigns' && (
        <View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>321</Text>
              <Text style={styles.statLabel}>Total Sent</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>260</Text>
              <Text style={styles.statLabel}>Opened</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>81%</Text>
              <Text style={styles.statLabel}>Open Rate</Text>
            </View>
          </View>

          {campaigns.map(c => (
            <View key={c.id} style={styles.campaignCard}>
              <View style={styles.campaignHeader}>
                <Text style={styles.campaignName}>{c.name}</Text>
                <View style={[
                  styles.statusBadge,
                  c.status === 'active' ? styles.badgeActive :
                  c.status === 'paused' ? styles.badgePaused : styles.badgeDraft
                ]}>
                  <Text style={styles.statusBadgeText}>{c.status.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.campaignStats}>
                <Text style={styles.campaignStat}>Sent: <Text style={styles.campaignStatVal}>{c.sent}</Text></Text>
                <Text style={styles.campaignStat}>Opened: <Text style={styles.campaignStatVal}>{c.opened}</Text></Text>
                <Text style={styles.campaignStat}>Rate: <Text style={styles.campaignStatVal}>{c.sent > 0 ? Math.round((c.opened / c.sent) * 100) : 0}%</Text></Text>
              </View>
              <View style={styles.campaignActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  {c.status === 'active' ? <Pause size={14} color="#F59E0B" /> : <Play size={14} color="#10B981" />}
                  <Text style={styles.actionBtnText}>{c.status === 'active' ? 'Pause' : 'Resume'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.primaryBtn} onPress={() => Alert.alert('New Campaign', 'Campaign builder coming soon!')}>
            <Text style={styles.primaryBtnText}>+ Launch New Campaign</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── TAB 3: TRIGGERS ── */}
      {activeTab === 'triggers' && (
        <View>
          <Text style={styles.sectionDesc}>Triggers automatically send WhatsApp messages when specific events happen.</Text>

          {[
            { icon: '⭐', event: 'Customer leaves a review', action: 'Send thank you message', active: true },
            { icon: '🛍️', event: 'New order placed', action: 'Send order confirmation', active: true },
            { icon: '📅', event: '3 days after visit', action: 'Send review request', active: false },
            { icon: '💰', event: 'Invoice sent', action: 'Payment reminder after 7 days', active: true },
            { icon: '🎂', event: 'Customer birthday', action: 'Send birthday discount', active: false },
          ].map((trigger, i) => (
            <View key={i} style={styles.triggerCard}>
              <Text style={styles.triggerIcon}>{trigger.icon}</Text>
              <View style={styles.triggerInfo}>
                <Text style={styles.triggerEvent}>{trigger.event}</Text>
                <Text style={styles.triggerAction}>→ {trigger.action}</Text>
              </View>
              <Switch
                trackColor={{ false: '#202025', true: '#25D36650' }}
                thumbColor={trigger.active ? '#25D366' : '#52525B'}
                value={trigger.active}
              />
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070709', padding: 16 },
  linkBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A1A0D',
    borderColor: '#25D36640', borderWidth: 1, borderRadius: 16, padding: 14,
    gap: 12, marginBottom: 16,
  },
  linkText: { flex: 1 },
  linkTitle: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
  linkDesc: { fontSize: 12, color: '#71717A', marginTop: 2 },
  linkBtn: { backgroundColor: '#25D366', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  linkBtnText: { fontSize: 13, fontWeight: '800', color: '#FFFFFF' },
  linkedBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A1A0D',
    borderColor: '#25D36640', borderWidth: 1, borderRadius: 16, padding: 14,
    gap: 8, marginBottom: 16,
  },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#25D366' },
  linkedText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#25D366' },
  unlinkText: { fontSize: 12, color: '#EF4444', fontWeight: '600' },
  tabBar: {
    flexDirection: 'row', backgroundColor: '#0F0F12', borderColor: '#202025',
    borderWidth: 1, borderRadius: 12, padding: 4, marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center' },
  tabActive: { backgroundColor: '#25D366' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#71717A' },
  tabTextActive: { color: '#FFFFFF' },
  templateCard: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 16, marginBottom: 12,
  },
  templateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  typeBadge: { borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  typeBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  templateName: { fontSize: 15, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  templateMessage: { fontSize: 13, color: '#A1A1AA', lineHeight: 18, marginBottom: 10 },
  templateFooter: {},
  variableHint: { fontSize: 11, color: '#52525B', fontFamily: 'monospace' },
  addCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#0D1526', borderColor: '#3E6BEC40', borderWidth: 1,
    borderRadius: 16, padding: 16, gap: 8, marginBottom: 12, borderStyle: 'dashed',
  },
  addCardText: { fontSize: 14, fontWeight: '700', color: '#3E6BEC' },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#0F0F12', borderColor: '#202025',
    borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 16,
    justifyContent: 'space-around',
  },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { fontSize: 11, color: '#71717A', marginTop: 2 },
  campaignCard: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 16, marginBottom: 12,
  },
  campaignHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  campaignName: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  statusBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeActive: { backgroundColor: '#10B98125' },
  badgePaused: { backgroundColor: '#F59E0B25' },
  badgeDraft: { backgroundColor: '#71717A25' },
  statusBadgeText: { fontSize: 9, fontWeight: '800', color: '#FFFFFF' },
  campaignStats: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  campaignStat: { fontSize: 12, color: '#71717A' },
  campaignStatVal: { fontWeight: '800', color: '#FFFFFF' },
  campaignActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#16161A', borderColor: '#202025', borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
  },
  actionBtnText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  primaryBtn: { backgroundColor: '#25D366', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  sectionDesc: { fontSize: 13, color: '#71717A', lineHeight: 18, marginBottom: 16 },
  triggerCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F0F12',
    borderColor: '#202025', borderWidth: 1, borderRadius: 14, padding: 14,
    marginBottom: 10, gap: 12,
  },
  triggerIcon: { fontSize: 24 },
  triggerInfo: { flex: 1 },
  triggerEvent: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginBottom: 3 },
  triggerAction: { fontSize: 12, color: '#71717A' },
});

import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Check, Zap, Rocket, Crown, ChevronRight, CreditCard } from 'lucide-react-native';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹999',
    period: '/month',
    Icon: Zap,
    color: '#71717A',
    features: [
      '1 Business Location',
      'Digital Review Card (1 standee)',
      '100 WhatsApp messages/mo',
      'Basic Analytics',
      'Email Support',
    ],
    current: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹2,499',
    period: '/month',
    Icon: Rocket,
    color: '#3E6BEC',
    features: [
      '3 Business Locations',
      'Unlimited Review Cards',
      '1,000 WhatsApp messages/mo',
      'Full Billing & Invoicing',
      'Social Media Hub',
      'GMB Product Sync',
      'Priority Chat Support',
    ],
    current: true,
    badge: 'Your Plan',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    Icon: Crown,
    color: '#F59E0B',
    features: [
      'Unlimited Locations',
      'Dedicated Account Manager',
      'Unlimited Messages',
      'API Access',
      'Custom Integrations',
      'White-label Option',
      '24/7 Phone Support',
    ],
    current: false,
  },
];

export default function SubscriptionScreen() {
  const [selectedId, setSelectedId] = useState('growth');

  const handleUpgrade = (planId: string) => {
    if (planId === 'growth') return;
    Alert.alert(
      planId === 'enterprise' ? 'Contact Sales' : 'Switch to Starter?',
      planId === 'enterprise'
        ? 'Our team will reach out within 24 hours with a custom quote.'
        : 'Downgrading will reduce your usage limits at the next billing cycle.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: planId === 'enterprise' ? 'Contact Now' : 'Downgrade',
          onPress: () => Alert.alert('Done!', 'We\'ve received your request.'),
        },
      ]
    );
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>

      {/* Billing Info Banner */}
      <View style={s.billingBanner}>
        <View>
          <Text style={s.billingLabel}>Next billing date</Text>
          <Text style={s.billingDate}>August 6, 2026</Text>
        </View>
        <View style={s.billingRight}>
          <Text style={s.billingAmt}>₹2,499</Text>
          <View style={s.billingActiveDot} />
        </View>
      </View>

      {/* Plans */}
      {PLANS.map((plan) => {
        const Icon = plan.Icon;
        const isCurrent = plan.id === 'growth';
        const isSelected = selectedId === plan.id;
        return (
          <TouchableOpacity
            key={plan.id}
            style={[
              s.planCard,
              isSelected && { borderColor: plan.color },
              isCurrent && s.planCardCurrent,
            ]}
            onPress={() => setSelectedId(plan.id)}
            activeOpacity={0.8}
          >
            {/* Card header */}
            <View style={s.planHeader}>
              <View style={[s.planIconWrap, { backgroundColor: plan.color + '18', borderColor: plan.color + '35' }]}>
                <Icon size={20} color={plan.color} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={s.planNameRow}>
                  <Text style={s.planName}>{plan.name}</Text>
                  {plan.badge && (
                    <View style={[s.currentBadge, { backgroundColor: plan.color + '20', borderColor: plan.color + '50' }]}>
                      <Text style={[s.currentBadgeText, { color: plan.color }]}>{plan.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={s.priceRow}>
                  <Text style={[s.planPrice, { color: isCurrent ? plan.color : '#FFFFFF' }]}>{plan.price}</Text>
                  {plan.period ? <Text style={s.planPeriod}>{plan.period}</Text> : null}
                </View>
              </View>
              <View style={[
                s.radioOuter,
                isSelected && { borderColor: plan.color },
              ]}>
                {isSelected && <View style={[s.radioInner, { backgroundColor: plan.color }]} />}
              </View>
            </View>

            {/* Features */}
            <View style={s.featureList}>
              {plan.features.map((f, i) => (
                <View key={i} style={s.featureRow}>
                  <Check size={13} color={plan.color} />
                  <Text style={s.featureText}>{f}</Text>
                </View>
              ))}
            </View>

            {/* CTA */}
            {!isCurrent && (
              <TouchableOpacity
                style={[s.planCta, { backgroundColor: plan.color + '18', borderColor: plan.color + '40' }]}
                onPress={() => handleUpgrade(plan.id)}
              >
                <Text style={[s.planCtaText, { color: plan.color }]}>
                  {plan.id === 'enterprise' ? 'Talk to Sales →' : 'Switch Plan →'}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Payment Method */}
      <View style={s.paySection}>
        <Text style={s.paySectionLabel}>Payment Method</Text>
        <View style={s.payCard}>
          <View style={s.payLeft}>
            <View style={s.payIconWrap}>
              <CreditCard size={20} color="#F97316" />
            </View>
            <View>
              <Text style={s.payCardName}>Visa ending ···· 4242</Text>
              <Text style={s.payCardExpiry}>Expires 08/27</Text>
            </View>
          </View>
          <TouchableOpacity style={s.payChangeBtn} onPress={() => Alert.alert('Update Card', 'Card update flow coming soon.')}>
            <Text style={s.payChangeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Invoice History */}
      <View style={s.paySection}>
        <Text style={s.paySectionLabel}>Recent Invoices</Text>
        {[
          { date: 'Jul 6, 2026', amount: '₹2,499', status: 'Paid' },
          { date: 'Jun 6, 2026', amount: '₹2,499', status: 'Paid' },
          { date: 'May 6, 2026', amount: '₹2,499', status: 'Paid' },
        ].map((inv, i) => (
          <TouchableOpacity key={i} style={s.invoiceRow}>
            <Text style={s.invoiceDate}>{inv.date}</Text>
            <Text style={s.invoiceAmt}>{inv.amount}</Text>
            <View style={s.invoiceStatus}>
              <Text style={s.invoiceStatusText}>{inv.status}</Text>
            </View>
            <ChevronRight size={14} color="#52525B" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070709', padding: 16 },
  billingBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D1526',
    borderColor: '#1D2D50',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  billingLabel: { fontSize: 12, color: '#71717A', fontWeight: '500' },
  billingDate: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginTop: 2 },
  billingRight: { alignItems: 'flex-end', gap: 6 },
  billingAmt: { fontSize: 20, fontWeight: '900', color: '#3E6BEC' },
  billingActiveDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#25D366', alignSelf: 'flex-end',
  },
  planCard: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },
  planCardCurrent: { backgroundColor: '#0D1526', borderColor: '#3E6BEC' },
  planHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  planIconWrap: { width: 42, height: 42, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  planNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  planName: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  currentBadge: { borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2 },
  currentBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  planPrice: { fontSize: 22, fontWeight: '900' },
  planPeriod: { fontSize: 13, color: '#71717A' },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#3F3F46', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 'auto' },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  featureList: { gap: 8, marginBottom: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 13, color: '#A1A1AA' },
  planCta: { paddingVertical: 11, borderRadius: 12, alignItems: 'center', borderWidth: 1 },
  planCtaText: { fontSize: 14, fontWeight: '800' },
  paySection: { marginTop: 8, marginBottom: 16 },
  paySectionLabel: { fontSize: 11, fontWeight: '700', color: '#52525B', letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase' },
  payCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F0F12',
    borderColor: '#202025', borderWidth: 1, borderRadius: 16, padding: 14,
  },
  payLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  payIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F9731615',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payCardName: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  payCardExpiry: { fontSize: 12, color: '#71717A', marginTop: 2 },
  payChangeBtn: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#16161A', borderColor: '#202025', borderWidth: 1, borderRadius: 10 },
  payChangeBtnText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  invoiceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#202025' },
  invoiceDate: { flex: 1, fontSize: 14, color: '#A1A1AA' },
  invoiceAmt: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  invoiceStatus: { backgroundColor: '#10B98120', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  invoiceStatusText: { fontSize: 11, fontWeight: '700', color: '#10B981' },
});

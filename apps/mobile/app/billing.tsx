import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Receipt, Plus, Trash2, Download, Send, Check, PenTool, ChevronLeft } from 'lucide-react-native';

type Tab = 'create' | 'invoices' | 'clients';

interface InvoiceItem {
  id: string;
  desc: string;
  qty: number;
  rate: number;
}

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

export default function BillingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', desc: 'Service Charge', qty: 1, rate: 5000 },
  ]);
  const [newDesc, setNewDesc] = useState('');
  const [newQty, setNewQty] = useState('1');
  const [newRate, setNewRate] = useState('');
  const [gstPercent, setGstPercent] = useState('18');
  const [sigName, setSigName] = useState('');
  const [signed, setSigned] = useState(false);

  const [invoices] = useState<Invoice[]>([
    { id: 'INV-001', client: 'Acme Corp', amount: 24500, status: 'paid', date: '2 Jul 2026' },
    { id: 'INV-002', client: 'Mehta Builders', amount: 89000, status: 'pending', date: '5 Jul 2026' },
    { id: 'INV-003', client: 'Singh & Sons', amount: 15750, status: 'overdue', date: '28 Jun 2026' },
    { id: 'INV-004', client: 'Patel Constructions', amount: 42000, status: 'paid', date: '1 Jul 2026' },
  ]);

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const gst = subtotal * (parseFloat(gstPercent) / 100);
  const total = subtotal + gst;

  const handleAddItem = () => {
    if (!newDesc || !newRate) return;
    setItems(prev => [...prev, {
      id: Math.random().toString(),
      desc: newDesc,
      qty: parseInt(newQty) || 1,
      rate: parseFloat(newRate) || 0,
    }]);
    setNewDesc(''); setNewQty('1'); setNewRate('');
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const handleSend = () => {
    if (!clientName) {
      Alert.alert('Missing Info', 'Please enter the client name.');
      return;
    }
    Alert.alert(
      'Invoice Sent',
      `Invoice of ₹${total.toLocaleString()} has been sent to ${clientName} via WhatsApp & email with a payment link.`
    );
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: 'create', label: 'New Invoice' },
    { id: 'invoices', label: 'All Invoices' },
    { id: 'clients', label: 'Clients' },
  ];

  const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
    paid: { bg: '#10B98125', color: '#10B981' },
    pending: { bg: '#F59E0B25', color: '#F59E0B' },
    overdue: { bg: '#EF444425', color: '#EF4444' },
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#070709' }}>
      {/* Spacer for notch */}
      <View style={{ height: Math.max(insets.top, 12) }} />

      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <ChevronLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Billing & Invoices</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Revenue Summary */}
      <View style={styles.summaryBanner}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>₹1.56L</Text>
          <Text style={styles.summaryLabel}>This Month</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>₹89K</Text>
          <Text style={styles.summaryLabel}>Collected</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>₹15.7K</Text>
          <Text style={styles.summaryLabel}>Overdue</Text>
        </View>
      </View>

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

      {/* ── TAB 1: CREATE INVOICE ── */}
      {activeTab === 'create' && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Client Details</Text>
            <TextInput style={styles.input} placeholder="Client Name *" placeholderTextColor="#52525B" value={clientName} onChangeText={setClientName} />
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#52525B" keyboardType="phone-pad" value={clientPhone} onChangeText={setClientPhone} />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>GST Rate (%)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={gstPercent} onChangeText={setGstPercent} />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Line Items</Text>
            {items.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  <Text style={styles.itemMeta}>{item.qty} × ₹{item.rate.toLocaleString()}</Text>
                </View>
                <Text style={styles.itemTotal}>₹{(item.qty * item.rate).toLocaleString()}</Text>
                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteBtn}>
                  <Trash2 size={14} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.addItemRow}>
              <TextInput style={[styles.input, { flex: 2, marginBottom: 0 }]} placeholder="Item" placeholderTextColor="#52525B" value={newDesc} onChangeText={setNewDesc} />
              <TextInput style={[styles.input, { width: 50, marginBottom: 0, textAlign: 'center' }]} placeholder="Qty" placeholderTextColor="#52525B" keyboardType="numeric" value={newQty} onChangeText={setNewQty} />
              <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} placeholder="₹" placeholderTextColor="#52525B" keyboardType="numeric" value={newRate} onChangeText={setNewRate} />
              <TouchableOpacity style={styles.addItemBtn} onPress={handleAddItem}>
                <Plus size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Totals */}
          <View style={styles.totalsCard}>
            <View style={styles.totalRow}><Text style={styles.totalKey}>Subtotal</Text><Text style={styles.totalVal}>₹{subtotal.toLocaleString()}</Text></View>
            <View style={styles.totalRow}><Text style={styles.totalKey}>GST ({gstPercent}%)</Text><Text style={styles.totalVal}>₹{gst.toLocaleString()}</Text></View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.grandKey}>Grand Total</Text>
              <Text style={styles.grandVal}>₹{total.toLocaleString()}</Text>
            </View>
          </View>

          {/* Signature */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Digital Signature</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Type full name to sign"
                placeholderTextColor="#52525B"
                value={sigName}
                onChangeText={v => { setSigName(v); setSigned(false); }}
              />
              <TouchableOpacity style={styles.signBtn} onPress={() => setSigned(true)}>
                {signed ? <Check size={16} color="#FFFFFF" /> : <Text style={styles.signBtnText}>Sign</Text>}
              </TouchableOpacity>
            </View>
            {signed && sigName ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, gap: 6 }}>
                <PenTool size={14} color="#71717A" />
                <Text style={[styles.cursiveSig, { marginTop: 0 }]}>{sigName}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.outlineBtn}>
              <Download size={16} color="#FFFFFF" />
              <Text style={styles.outlineBtnText}>PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleSend}>
              <Send size={16} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>Send Invoice</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── TAB 2: ALL INVOICES ── */}
      {activeTab === 'invoices' && (
        <View>
          {invoices.map(inv => {
            const s = STATUS_STYLES[inv.status];
            return (
              <TouchableOpacity key={inv.id} style={styles.invoiceCard}>
                <View style={styles.invoiceHeader}>
                  <Text style={styles.invoiceId}>{inv.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.statusText, { color: s.color }]}>{inv.status.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.invoiceClient}>{inv.client}</Text>
                <View style={styles.invoiceFooter}>
                  <Text style={styles.invoiceDate}>{inv.date}</Text>
                  <Text style={styles.invoiceAmount}>₹{inv.amount.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ── TAB 3: CLIENTS ── */}
      {activeTab === 'clients' && (
        <View>
          {[
            { name: 'Acme Corp', invoices: 3, total: '₹1.2L', phone: '+91 98765 43210' },
            { name: 'Mehta Builders', invoices: 1, total: '₹89K', phone: '+91 87654 32109' },
            { name: 'Singh & Sons', invoices: 2, total: '₹56K', phone: '+91 76543 21098' },
          ].map((c, i) => (
            <View key={i} style={styles.clientCard}>
              <View style={styles.clientAvatar}>
                <Text style={styles.clientInitial}>{c.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.clientName}>{c.name}</Text>
                <Text style={styles.clientMeta}>{c.invoices} invoices • {c.total} billed</Text>
                <Text style={styles.clientPhone}>{c.phone}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addCard}>
            <Plus size={18} color="#3E6BEC" />
            <Text style={[styles.addCardText, { color: '#3E6BEC' }]}>Add New Client</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#202025',
    backgroundColor: '#070709',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F0F12',
    borderWidth: 1,
    borderColor: '#202025',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  container: { flex: 1, backgroundColor: '#070709', padding: 16 },
  summaryBanner: {
    flexDirection: 'row', backgroundColor: '#0F0F12', borderColor: '#202025',
    borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 16,
    justifyContent: 'space-around', alignItems: 'center',
  },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  summaryLabel: { fontSize: 11, color: '#71717A', marginTop: 2 },
  summaryDivider: { width: 1, height: 30, backgroundColor: '#202025' },
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
  cardTitle: { fontSize: 12, fontWeight: '800', color: '#71717A', textTransform: 'uppercase', marginBottom: 14, letterSpacing: 0.5 },
  fieldLabel: { fontSize: 12, color: '#71717A', fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#070709', borderColor: '#202025', borderWidth: 1,
    borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 14, marginBottom: 10,
  },
  row: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  itemRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#202025', gap: 8,
  },
  itemDesc: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  itemMeta: { fontSize: 12, color: '#71717A', marginTop: 2 },
  itemTotal: { fontSize: 14, fontWeight: '800', color: '#10B981' },
  deleteBtn: { padding: 4 },
  addItemRow: { flexDirection: 'row', gap: 6, marginTop: 12, alignItems: 'center' },
  addItemBtn: { backgroundColor: '#3E6BEC', width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  totalsCard: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 18, padding: 16, marginBottom: 16,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalKey: { fontSize: 14, color: '#71717A' },
  totalVal: { fontSize: 14, color: '#FFFFFF', fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#202025', marginVertical: 8 },
  grandKey: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  grandVal: { fontSize: 22, fontWeight: '900', color: '#10B981' },
  signBtn: {
    backgroundColor: '#3E6BEC', paddingHorizontal: 16, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', height: 44,
  },
  signBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  cursiveSig: { fontSize: 20, fontStyle: 'italic', color: '#E4E4E7', textAlign: 'right', marginTop: 10 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  outlineBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#16161A', borderColor: '#202025', borderWidth: 1,
    paddingHorizontal: 18, borderRadius: 14, justifyContent: 'center',
  },
  outlineBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#3E6BEC', paddingVertical: 14, borderRadius: 14, gap: 8,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  invoiceCard: {
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 16, marginBottom: 10,
  },
  invoiceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  invoiceId: { fontSize: 13, fontWeight: '800', color: '#A1A1AA' },
  statusBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 9, fontWeight: '800' },
  invoiceClient: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 10 },
  invoiceFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  invoiceDate: { fontSize: 12, color: '#71717A' },
  invoiceAmount: { fontSize: 16, fontWeight: '800', color: '#10B981' },
  clientCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#0F0F12', borderColor: '#202025', borderWidth: 1,
    borderRadius: 16, padding: 14, marginBottom: 10,
  },
  clientAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#3E6BEC12',
    borderColor: '#3E6BEC', borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  clientInitial: { fontSize: 18, fontWeight: '900', color: '#3E6BEC' },
  clientName: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  clientMeta: { fontSize: 12, color: '#71717A', marginTop: 2 },
  clientPhone: { fontSize: 12, color: '#3E6BEC', marginTop: 2 },
  addCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#3E6BEC12', borderColor: '#3E6BEC30', borderWidth: 1,
    borderRadius: 16, padding: 16, gap: 8, borderStyle: 'dashed',
  },
  addCardText: { fontSize: 14, fontWeight: '700' },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Phone, Check, X, RefreshCw } from 'lucide-react-native';

interface Lead {
  id: string;
  name: string;
  phone: string;
  status: 'INQUIRY' | 'QUOTED' | 'WON' | 'LOST';
  value: number;
  source: string;
}

export default function MobileCRM() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'Aditya Sen', phone: '+91 98765 43210', status: 'INQUIRY', value: 15000, source: 'WhatsApp' },
    { id: '2', name: 'Rohan Sharma', phone: '+91 99988 87766', status: 'QUOTED', value: 35000, source: 'Google Maps' },
    { id: '3', name: 'Neha Varma', phone: '+91 88877 66554', status: 'WON', value: 12500, source: 'NFC Card Tap' },
    { id: '4', name: 'Devendra Patil', phone: '+91 77766 55443', status: 'INQUIRY', value: 45000, source: 'WhatsApp' },
  ]);

  const [activeColumn, setActiveColumn] = useState<'INQUIRY' | 'QUOTED' | 'WON' | 'LOST'>('INQUIRY');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newSource, setNewSource] = useState('WhatsApp');

  const handleCall = (lead: Lead) => {
    Alert.alert('Calling Client', `Calling ${lead.name} (${lead.phone}) from your native dialer...`);
  };

  const handleMoveLead = (id: string, nextStatus: 'INQUIRY' | 'QUOTED' | 'WON' | 'LOST') => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: nextStatus } : l));
  };

  const handleAddLead = () => {
    if (!newName || !newPhone || !newValue) {
      Alert.alert('Incomplete Form', 'Please enter a name, phone, and lead valuation.');
      return;
    }
    const newLead: Lead = {
      id: Math.random().toString(),
      name: newName,
      phone: newPhone,
      status: 'INQUIRY',
      value: parseFloat(newValue) || 0,
      source: newSource,
    };
    setLeads([...leads, newLead]);
    setNewName('');
    setNewPhone('');
    setNewValue('');
    setShowAddForm(false);
    setActiveColumn('INQUIRY');
    Alert.alert('Lead Registered', `Successfully added ${newName} to the Inquiry funnel.`);
  };

  const getFilteredLeads = () => {
    return leads.filter(l => l.status === activeColumn);
  };

  const getColumnCount = (status: 'INQUIRY' | 'QUOTED' | 'WON' | 'LOST') => {
    return leads.filter(l => l.status === status).length;
  };

  return (
    <View style={styles.container}>
      {/* Column Headers / Tab Selector */}
      <View style={styles.tabScrollWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
          {(['INQUIRY', 'QUOTED', 'WON', 'LOST'] as const).map(col => (
            <TouchableOpacity
              key={col}
              style={[styles.tabButton, activeColumn === col && styles.activeTabButton]}
              onPress={() => setActiveColumn(col)}
            >
              <Text style={[styles.tabLabel, activeColumn === col && styles.activeTabLabel]}>
                {col} ({getColumnCount(col)})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.boardBody}>
        {/* Empty State */}
        {getFilteredLeads().length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No leads in this stage of the pipeline.</Text>
          </View>
        ) : (
          getFilteredLeads().map(lead => (
            <View key={lead.id} style={styles.leadCard}>
              <View style={styles.leadHeader}>
                <Text style={styles.leadName}>{lead.name}</Text>
                <Text style={styles.leadVal}>₹{lead.value.toLocaleString()}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Phone size={12} color="#8E9196" />
                <Text style={styles.leadMeta}>{lead.phone} • Tag: {lead.source}</Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.callBtn} onPress={() => handleCall(lead)}>
                  <Phone size={12} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.callBtnText}>Call Client</Text>
                </TouchableOpacity>

                {activeColumn === 'INQUIRY' && (
                  <TouchableOpacity style={styles.advanceBtn} onPress={() => handleMoveLead(lead.id, 'QUOTED')}>
                    <Text style={styles.advanceBtnText}>Quote Sent ➔</Text>
                  </TouchableOpacity>
                )}

                {activeColumn === 'QUOTED' && (
                  <View style={styles.row}>
                    <TouchableOpacity style={styles.wonBtn} onPress={() => handleMoveLead(lead.id, 'WON')}>
                      <Check size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                      <Text style={styles.wonBtnText}>Won</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lostBtn} onPress={() => handleMoveLead(lead.id, 'LOST')}>
                      <X size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                      <Text style={styles.lostBtnText}>Lost</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {(activeColumn === 'WON' || activeColumn === 'LOST') && (
                  <TouchableOpacity style={styles.reopenBtn} onPress={() => handleMoveLead(lead.id, 'INQUIRY')}>
                    <RefreshCw size={12} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.reopenBtnText}>Re-open Inquiry</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowAddForm(true)}>
        <Text style={styles.fabText}>+ New Lead</Text>
      </TouchableOpacity>

      {/* Add Lead Modal Form */}
      <Modal visible={showAddForm} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register New Inquiry</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Customer Name"
              placeholderTextColor="#6B7280"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Estimated Value (₹)"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              value={newValue}
              onChangeText={setNewValue}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Source (WhatsApp, GBP, Maps)"
              placeholderTextColor="#6B7280"
              value={newSource}
              onChangeText={setNewSource}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddLead}>
                <Text style={styles.saveBtnText}>Save Lead</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddForm(false)}>
                <Text style={styles.cancelBtnText}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070709',
  },
  tabScrollWrapper: {
    backgroundColor: '#0F0F12',
    borderBottomWidth: 1,
    borderBottomColor: '#202025',
  },
  tabContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#16161A',
    borderWidth: 1,
    borderColor: '#202025',
  },
  activeTabButton: {
    backgroundColor: '#1F2D44',
    borderColor: '#3E6BEC',
  },
  tabLabel: {
    fontSize: 12,
    color: '#8E9196',
    fontWeight: '700',
  },
  activeTabLabel: {
    color: '#3E6BEC',
  },
  boardBody: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 13,
  },
  leadCard: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  leadName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  leadVal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#10B981',
  },
  leadMeta: {
    fontSize: 12,
    color: '#8E9196',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  advanceBtn: {
    flex: 1,
    backgroundColor: '#3E6BEC',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  advanceBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  wonBtn: {
    flex: 1,
    backgroundColor: '#054E3B',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wonBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  lostBtn: {
    flex: 1,
    backgroundColor: '#7F1D1D',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lostBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  reopenBtn: {
    flex: 1,
    backgroundColor: '#202025',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reopenBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3E6BEC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: '#070709',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  saveBtn: {
    backgroundColor: '#10B981',
    flex: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

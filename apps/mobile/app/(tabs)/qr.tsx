import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';

export default function MobileQR() {
  const [selectedTemplate, setSelectedTemplate] = useState('acrylic');
  const [slug, setSlug] = useState('forschalabs-mumbai');
  const [programming, setProgramming] = useState(false);
  const [progProgress, setProgProgress] = useState(0);

  const handleWriteNFC = () => {
    setProgramming(true);
    setProgProgress(10);
    
    const interval = setInterval(() => {
      setProgProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProgramming(false);
          Alert.alert('NFC Card Programmed!', 'Write success! Touch this card to any customer phone to launch review portal.');
          return 0;
        }
        return prev + 30;
      });
    }, 400);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.cardTitle}>Live Review Slug</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Google Review Shortname"
          placeholderTextColor="#6B7280"
          value={slug}
          onChangeText={setSlug}
        />
        <Text style={styles.subtext}>Resolves to: https://forscha.com/r/{slug}</Text>
      </View>

      <Text style={styles.sectionTitle}>Standee Mock Layouts</Text>
      <View style={styles.templateGrid}>
        <TouchableOpacity 
          style={[styles.templateCard, selectedTemplate === 'acrylic' && styles.selectedBorder]} 
          onPress={() => setSelectedTemplate('acrylic')}
        >
          <Text style={styles.templateEmoji}>💎</Text>
          <Text style={styles.templateName}>Acrylic Board</Text>
          <Text style={styles.templatePrice}>₹349</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.templateCard, selectedTemplate === 'wooden' && styles.selectedBorder]} 
          onPress={() => setSelectedTemplate('wooden')}
        >
          <Text style={styles.templateEmoji}>🪵</Text>
          <Text style={styles.templateName}>Wooden Base</Text>
          <Text style={styles.templatePrice}>₹499</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.templateCard, selectedTemplate === 'card' && styles.selectedBorder]} 
          onPress={() => setSelectedTemplate('card')}
        >
          <Text style={styles.templateEmoji}>💳</Text>
          <Text style={styles.templateName}>Tap Cards</Text>
          <Text style={styles.templatePrice}>₹199</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>NFC Card Programmer</Text>
      <View style={styles.nfcCard}>
        <Text style={styles.nfcHeader}>Tap to Write NFC Keytags</Text>
        <Text style={styles.nfcBody}>
          Program physical cards/stickers instantly. Place the blank tag on the back of your phone near the NFC reader antenna.
        </Text>

        {programming ? (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color="#3E6BEC" />
            <Text style={styles.progressText}>Programming Tag... {progProgress}%</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.nfcBtn} onPress={handleWriteNFC}>
            <Text style={styles.nfcBtnText}>📶 Start NFC Write Sequence</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={styles.orderBtn} 
        onPress={() => Alert.alert('Standee Ordered', 'Printed customized standee request received! Dispatched within 24 hours.')}
      >
        <Text style={styles.orderBtnText}>🛍️ Order Selected Standee</Text>
      </TouchableOpacity>
      
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070709',
    padding: 16,
  },
  headerCard: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E9196',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: '#070709',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  templateGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  templateCard: {
    flex: 1,
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  selectedBorder: {
    borderColor: '#3E6BEC',
    backgroundColor: '#1F2D44',
  },
  templateEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  templateName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  templatePrice: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '800',
    marginTop: 6,
  },
  nfcCard: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
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
  orderBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  orderBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

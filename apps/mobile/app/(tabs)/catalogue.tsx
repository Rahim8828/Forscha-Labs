import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
}

export default function MobileCatalogue() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Ultra Premium Glass Railing', price: 12500, category: 'Hardware', available: true },
    { id: '2', name: 'Standard Aluminum Framing', price: 6800, category: 'Framing', available: false },
    { id: '3', name: 'Tempered Partition Glass', price: 9200, category: 'Glass Sheets', available: true },
  ]);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Hardware');

  const handleToggleAvailability = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  const handleAddProduct = () => {
    if (!newName || !newPrice) {
      Alert.alert('Incomplete Form', 'Please enter both a product name and a base price.');
      return;
    }
    const newProd: Product = {
      id: Math.random().toString(),
      name: newName,
      price: parseFloat(newPrice) || 0,
      category: newCategory,
      available: true,
    };
    setProducts([...products, newProd]);
    setNewName('');
    setNewPrice('');
    Alert.alert('Product Created', `${newName} added to the digital menu successfully.`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* GMB Sync Banner */}
      <View style={styles.gmbBanner}>
        <Text style={styles.gmbIcon}>🔍</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.gmbTitle}>Synced with Google Business</Text>
          <Text style={styles.gmbDesc}>Products added here appear on your GMB listing automatically</Text>
        </View>
        <View style={styles.syncDot} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add New Product</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Product Name"
          placeholderTextColor="#6B7280"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Base Price (₹)"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={newPrice}
          onChangeText={setNewPrice}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Category (e.g., Hardware, Services)"
          placeholderTextColor="#6B7280"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
          <Text style={styles.addBtnText}>Create Listing → Sync to GMB</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Current Inventory</Text>
      
      {products.map(prod => (
        <View key={prod.id} style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{prod.name}</Text>
            <Text style={styles.productMeta}>{prod.category} • ₹{prod.price.toLocaleString()}</Text>
          </View>
          <View style={styles.statusBlock}>
            <Text style={[styles.statusText, prod.available ? styles.textAvailable : styles.textSoldOut]}>
              {prod.available ? 'In Stock' : 'Out of Stock'}
            </Text>
            <Switch
              trackColor={{ false: '#202025', true: '#054E3B' }}
              thumbColor={prod.available ? '#10B981' : '#9CA3AF'}
              value={prod.available}
              onValueChange={() => handleToggleAvailability(prod.id)}
            />
          </View>
        </View>
      ))}

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
  gmbBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101726',
    borderColor: '#1D2D50',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  gmbIcon: { fontSize: 22 },
  gmbTitle: { fontSize: 13, fontWeight: '800', color: '#60A5FA' },
  gmbDesc: { fontSize: 11, color: '#71717A', marginTop: 2 },
  syncDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  card: {
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
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#3E6BEC',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  productMeta: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  statusBlock: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textAvailable: {
    color: '#10B981',
  },
  textSoldOut: {
    color: '#EF4444',
  },
});

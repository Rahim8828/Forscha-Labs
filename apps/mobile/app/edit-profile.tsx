import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Image, Alert,
} from 'react-native';
import { Camera, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul@forscha.com');
  const [phone, setPhone] = useState('9876543210');
  const [business, setBusiness] = useState('Forscha Glass Works');
  const [city, setCity] = useState('Mumbai, Maharashtra');
  const [gstin, setGstin] = useState('27AAPFU0939F1ZV');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.back();
    }, 1200);
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>

      {/* Avatar Section */}
      <View style={s.avatarSection}>
        <View style={s.avatarWrap}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>R</Text>
          </View>
          <TouchableOpacity style={s.cameraBtn} onPress={() => Alert.alert('Upload Photo', 'Camera/gallery picker coming soon.')}>
            <Camera size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={s.avatarName}>{name}</Text>
        <Text style={s.avatarRole}>Merchant · Growth Plan</Text>
      </View>

      {/* Personal Info */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>Personal Information</Text>
        <View style={s.card}>
          <Field label="Full Name" value={name} onChange={setName} />
          <Field label="Email Address" value={email} onChange={setEmail} keyboard="email-address" />
          <Field label="Mobile Number" value={phone} onChange={setPhone} keyboard="phone-pad" last />
        </View>
      </View>

      {/* Business Info */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>Business Details</Text>
        <View style={s.card}>
          <Field label="Business Name" value={business} onChange={setBusiness} />
          <Field label="City / Location" value={city} onChange={setCity} />
          <Field label="GSTIN" value={gstin} onChange={setGstin} last />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={[s.saveBtn, saved && s.saveBtnSuccess]} onPress={handleSave}>
        {saved
          ? <><Check size={18} color="#FFFFFF" /><Text style={s.saveBtnText}>Saved!</Text></>
          : <Text style={s.saveBtnText}>Save Changes</Text>
        }
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function Field({
  label, value, onChange, keyboard, last,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  keyboard?: any;
  last?: boolean;
}) {
  return (
    <View style={[f.wrap, !last && f.withBorder]}>
      <Text style={f.label}>{label}</Text>
      <TextInput
        style={f.input}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard}
        placeholderTextColor="#52525B"
        selectionColor="#3E6BEC"
      />
    </View>
  );
}

const f = StyleSheet.create({
  wrap: { paddingVertical: 12 },
  withBorder: { borderBottomWidth: 1, borderBottomColor: '#202025' },
  label: { fontSize: 11, fontWeight: '600', color: '#71717A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: 15, color: '#FFFFFF', fontWeight: '500', paddingVertical: 2 },
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070709' },
  avatarSection: { alignItems: 'center', paddingTop: 28, paddingBottom: 28, backgroundColor: '#0F0F12', borderBottomWidth: 1, borderBottomColor: '#202025' },
  avatarWrap: { position: 'relative', marginBottom: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1D2D50', borderWidth: 3, borderColor: '#3E6BEC', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 34, fontWeight: '900', color: '#FFFFFF' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#3E6BEC', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#0F0F12' },
  avatarName: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  avatarRole: { fontSize: 13, color: '#71717A', marginTop: 4 },
  section: { paddingHorizontal: 18, marginTop: 24 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#52525B', letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase' },
  card: { backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#202025', borderRadius: 18, paddingHorizontal: 16 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 18, backgroundColor: '#3E6BEC', paddingVertical: 16, borderRadius: 16 },
  saveBtnSuccess: { backgroundColor: '#10B981' },
  saveBtnText: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
});

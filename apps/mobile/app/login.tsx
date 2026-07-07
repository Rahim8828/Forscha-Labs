import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function MobileLogin() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSendOTP = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      Alert.alert('OTP Sent', 'Temporary OTP has been sent! Enter any 4-digit number to proceed (e.g. 1234).');
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (!otpCode || otpCode.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit verification code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Premium Gradient Glow Circle in Background */}
      <View style={styles.glowOverlay} />

      <View style={styles.branding}>
        <View style={styles.logoRow}>
          <Text style={styles.logoLight}>Forscha</Text>
          <Text style={styles.logoBold}>Labs</Text>
        </View>
        <Text style={styles.tagline}>Local Business Growth OS</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.heading}>{otpSent ? 'Verification Code' : 'Merchant Access'}</Text>
        <Text style={styles.subheading}>
          {otpSent 
            ? `We sent a 4-digit verification code to +91 ${phoneNumber}` 
            : 'Access your reviews, invoicing, and local client acquisition tools.'}
        </Text>

        {!otpSent ? (
          <>
            <View style={[styles.inputWrapper, isFocused && styles.inputActiveBorder]}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#4E4E5A"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={setPhoneNumber}
              />
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSendOTP} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.btnText}>Request SMS Passkey</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.otpInput}
              placeholder="0 0 0 0"
              placeholderTextColor="#24242B"
              keyboardType="number-pad"
              maxLength={4}
              value={otpCode}
              onChangeText={setOtpCode}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyOTP} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.btnText}>Verify & Enter OS</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backLink} onPress={() => setOtpSent(false)}>
              <Text style={styles.backLinkText}>Edit mobile number</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.footer}>Forscha Labs SaaS • Secured Sandbox Environment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070709',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
  },
  glowOverlay: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(62, 107, 236, 0.12)',
    opacity: 0.8,
  },
  branding: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoLight: {
    fontSize: 34,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  logoBold: {
    fontSize: 34,
    fontWeight: '900',
    color: '#3E6BEC',
    letterSpacing: -0.5,
    marginLeft: 2,
  },
  tagline: {
    fontSize: 10,
    color: '#829DF3',
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  formCard: {
    backgroundColor: '#0F0F12',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 28,
    padding: 28,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  subheading: {
    fontSize: 13,
    color: '#71717A',
    lineHeight: 18,
    marginBottom: 26,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070709',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  inputActiveBorder: {
    borderColor: '#3E6BEC',
  },
  prefix: {
    color: '#71717A',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 14,
    fontWeight: '600',
  },
  otpInput: {
    backgroundColor: '#070709',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    color: '#3E6BEC',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 10,
    marginBottom: 18,
  },
  primaryBtn: {
    backgroundColor: '#3E6BEC',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  backLink: {
    alignItems: 'center',
    marginTop: 18,
  },
  backLinkText: {
    color: '#71717A',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: '#3F3F46',
    fontSize: 11,
    marginTop: 40,
    fontWeight: '500',
  },
});

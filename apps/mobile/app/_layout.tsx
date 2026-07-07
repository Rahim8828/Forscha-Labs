import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const HEADER_OPTS = {
  headerStyle: { backgroundColor: '#0F0F12' },
  headerTintColor: '#FFFFFF' as string,
  headerTitleStyle: { fontWeight: 'bold' as const },
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="digital-card" options={{ headerShown: false }} />
        <Stack.Screen name="google-review" options={{ headerShown: false }} />
        <Stack.Screen name="whatsapp" options={{ headerShown: false }} />
        <Stack.Screen name="billing" options={{ headerShown: false }} />
        <Stack.Screen name="social-media" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: true, title: 'Account', ...HEADER_OPTS }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: true, title: 'Edit Profile', ...HEADER_OPTS }} />
        <Stack.Screen name="subscription" options={{ headerShown: true, title: 'My Subscription', ...HEADER_OPTS }} />
      </Stack>
    </>
  );
}

import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Users, MessageSquare, QrCode, ShoppingBag } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F0F12',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: '#0F0F12',
          borderTopColor: '#202025',
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#3E6BEC',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Forscha',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="crm"
        options={{
          title: 'CRM Leads',
          tabBarLabel: 'CRM',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: 'AI Reviews',
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'QR & NFC Generator',
          tabBarLabel: 'QR Standee',
          tabBarIcon: ({ color, size }) => <QrCode color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="catalogue"
        options={{
          title: 'Products Menu',
          tabBarLabel: 'Catalogue',
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size - 2} />,
        }}
      />
    </Tabs>
  );
}

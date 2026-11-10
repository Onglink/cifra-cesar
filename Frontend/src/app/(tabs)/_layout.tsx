import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#202024',
          borderTopColor: '#29292E',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00B37E',
        tabBarInactiveTintColor: '#82828E',
      }}
    >
      <Tabs.Screen
        name="encrypt"
        options={{
          title: 'Criptografar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="decrypt"
        options={{
          title: 'Descriptografar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-open-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
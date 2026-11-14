import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Alert } from 'react-native'
import { StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function TabLayout() {
  async function handleLogout() {
    Alert.alert(
      'Sair da Conta',
      'Deseja realmente sair do aplicativo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            try {
              // 1. Remove o token JWT armazenado
              await SecureStore.deleteItemAsync('user_token');
              
              // 2. Redireciona para a tela de login
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          }
        }
      ]
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Habilitamos o header para mostrar o botão de sair
        headerStyle: {
          backgroundColor: '#202024',
          borderBottomWidth: 1,
          borderBottomColor: '#29292E',
        },
        headerTintColor: '#E1E1E6',
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
          // Adiciona o botão de Sair no canto superior direito
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
              <Ionicons name="log-out-outline" size={24.5} color="#F75A68" />
            </TouchableOpacity>
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
          // Botão de Sair também visível na aba de descriptografar
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
              <Ionicons name="log-out-outline" size={24.5} color="#F75A68" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
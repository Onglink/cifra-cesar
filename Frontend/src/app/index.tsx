import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function IndexScreen() {
  useEffect(() => {
    async function checkUserSession() {
      try {
        // Verifica se existe um token JWT salvo no dispositivo
        const token = await SecureStore.getItemAsync('user_token');

        // Pequeno delay para suavizar a transição (opcional)
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (token) {
          // Se houver token, redireciona direto para as telas protegidas
          router.replace('/(tabs)/encrypt');
        } else {
          // Se não houver, direciona para o fluxo de login
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        router.replace('/(auth)/login');
      }
    }

    checkUserSession();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00B37E" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
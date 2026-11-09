import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Ou AsyncStorage, dependendo da sua preferência

export const api = axios.create({
  // Se estiver testando no Expo Go no seu celular físico, use o IP da sua máquina (ex: http://192.168.1.15:3000/api)
  // Se for emulador Android, pode usar http://10.0.2.2:3000/api
  baseURL: 'http://localhost:3000/api', 
});

// Interceptor para injetar o token JWT em todas as requisições protegidas
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Erro ao buscar o token:', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
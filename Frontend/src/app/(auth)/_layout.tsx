import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, // Oculta o cabeçalho padrão para mantermos o design customizado
        contentStyle: { backgroundColor: '#121214' }
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
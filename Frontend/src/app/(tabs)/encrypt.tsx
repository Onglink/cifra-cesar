import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  Alert, 
  Clipboard 
} from 'react-native';
import { api } from '../../services/api';

export default function EncryptScreen() {
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [hashKey, setHashKey] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEncrypt() {
    if (!message || !shift) {
      Alert.alert('Atenção', 'Preencha a mensagem e o valor do passo.');
      return;
    }

    try {
      setLoading(true);

      // TODO: Substituir pela chamada real ao backend (ex: axios.post('/encrypt', { message, shift: Number(shift) }))
      // const response = await api.post('/encrypt', { message, shift: Number(shift) });
      // setEncryptedMessage(response.data.encryptedMessage);
      // setHashKey(response.data.hashKey);

      const response = await api.post('/encrypt', { 
        message, 
        shift: Number(shift) 
      });

      // Simulação visual temporária:
      setEncryptedMessage(response.data.encryptedMessage);
      setHashKey(response.data.hashKey);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a criptografia.');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    Clipboard.setString(text);
    Alert.alert('Copiado!', 'Chave copiada para a área de transferência.');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Criptografar</Text>
        <Text style={styles.subtitle}>Aplique a Cifra de César e gere sua chave</Text>

        <Text style={styles.label}>Mensagem original</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o texto aqui..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <Text style={styles.label}>Passo (Número de deslocamentos)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 3 ou -2"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={shift}
          onChangeText={setShift}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleEncrypt}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Criptografando...' : 'Criptografar Mensagem'}
          </Text>
        </TouchableOpacity>

        {encryptedMessage ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Mensagem Criptografada:</Text>
            <Text style={styles.resultText}>{encryptedMessage}</Text>

            <Text style={styles.resultTitle}>Hash (Chave Privada Única):</Text>
            <TouchableOpacity onPress={() => copyToClipboard(hashKey)}>
              <Text style={styles.hashText}>{hashKey} 📋 (Toque para copiar)</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121214',
    padding: 24,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E1E1E6',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#82828E',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    color: '#C4C4CC',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#202024',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#E1E1E6',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#29292E',
    minHeight: 56,
  },
  button: {
    backgroundColor: '#00875F',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#202024',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00B37E',
    marginTop: 16,
  },
  resultTitle: {
    color: '#82828E',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  resultText: {
    color: '#E1E1E6',
    fontSize: 16,
    marginBottom: 12,
  },
  hashText: {
    color: '#00B37E',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  Alert 
} from 'react-native';

export default function DecryptScreen() {
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [hashKey, setHashKey] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleDecrypt() {
    if (!encryptedMessage || !hashKey) {
      Alert.alert('Atenção', 'Preencha a mensagem criptografada e o hash.');
      return;
    }

    try {
      setLoading(true);
      setDecryptedMessage('');

      // TODO: Substituir pela chamada real ao backend (ex: axios.post('/decrypt', { encryptedMessage, hashKey }))
      // const response = await api.post('/decrypt', { encryptedMessage, hashKey });
      // setDecryptedMessage(response.data.decryptedMessage);

      // Simulação visual temporária de sucesso:
      setDecryptedMessage('Esta é a mensagem original recuperada com sucesso!');

    } catch (error: any) {
      // O backend deve retornar erro se o hash já foi usado (coluna 'usado' = true) ou for inválido[cite: 1, 2]
      Alert.alert('Erro na Descriptografia', 'Hash inválido ou já utilizado anteriormente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Descriptografar</Text>
        <Text style={styles.subtitle}>Insira a chave única para recuperar o texto</Text>

        <Text style={styles.label}>Mensagem Criptografada</Text>
        <TextInput
          style={styles.input}
          placeholder="Cole a mensagem cifrada aqui..."
          placeholderTextColor="#888"
          value={encryptedMessage}
          onChangeText={setEncryptedMessage}
          multiline
        />

        <Text style={styles.label}>Hash (Chave Privada)</Text>
        <TextInput
          style={styles.input}
          placeholder="Cole o hash correspondente..."
          placeholderTextColor="#888"
          value={hashKey}
          onChangeText={setHashKey}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleDecrypt}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Validando...' : 'Descriptografar Mensagem'}
          </Text>
        </TouchableOpacity>

        {decryptedMessage ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Mensagem Original Recuperada:</Text>
            <Text style={styles.resultText}>{decryptedMessage}</Text>
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
  },
});
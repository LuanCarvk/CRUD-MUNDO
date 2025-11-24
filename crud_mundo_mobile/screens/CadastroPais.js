import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from '../supabase';

export default function CadastroPais({ route, navigation }) {
  const refresh = route.params?.refresh;
  const [nome, setNome] = useState('');
  const [continente, setContinente] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [idioma, setIdioma] = useState('');

  async function salvar() {
    await supabase.from('paises').insert({
      nome,
      continente,
      populacao: parseInt(populacao),
      idioma,
    });
    refresh && refresh();
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Continente"
          onChangeText={setContinente}
        />
        <TextInput
          style={styles.input}
          placeholder="População"
          onChangeText={setPopulacao}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Idioma"
          onChangeText={setIdioma}
        />
        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={salvar} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
  },
  form: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 45,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

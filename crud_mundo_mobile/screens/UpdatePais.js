import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../supabase';

export default function EditarPais({ route, navigation }) {
  const { item, refresh } = route.params;
  const [nome, setNome] = useState(item.nome);
  const [continente, setContinente] = useState(item.continente);
  const [populacao, setPopulacao] = useState(item.populacao.toString());
  const [idioma, setIdioma] = useState(item.idioma);

  async function atualizar() {
    await supabase
      .from('paises')
      .update({
        nome,
        continente,
        populacao: parseInt(populacao),
        idioma,
      })
      .eq('id_pais', item.id_pais);

    refresh && refresh();
    navigation.goBack();
  }

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" />
      <TextInput style={styles.input} value={continente} onChangeText={setContinente} placeholder="Continente" />
      <TextInput style={styles.input} value={populacao} onChangeText={setPopulacao} keyboardType="numeric" placeholder="População" />
      <TextInput style={styles.input} value={idioma} onChangeText={setIdioma} placeholder="Idioma" />
      <Button title="Atualizar" onPress={atualizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    height: 45,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 16,
  },
});

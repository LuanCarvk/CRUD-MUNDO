import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { supabase } from '../supabase';

export default function CadastroCidade({ route, navigation }) {
  const refresh = route.params?.refresh;

  const [nome, setNome] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [paisId, setPaisId] = useState('');
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    async function carregarPaises() {
      const { data } = await supabase.from('paises').select('*');
      setPaises(data || []);
    }
    carregarPaises();
  }, []);

  async function salvar() {
    await supabase.from('cidades').insert({
      nome,
      populacao: parseInt(populacao),
      pais_id: paisId,
    });
    refresh && refresh();
    navigation.goBack();
  }

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} placeholder="Nome" onChangeText={setNome} />
      <TextInput
        style={styles.input}
        placeholder="População"
        keyboardType="numeric"
        onChangeText={setPopulacao}
      />

      <Picker selectedValue={paisId} onValueChange={setPaisId}>
        <Picker.Item label="Selecione um país" value="" />
        {paises.map(p => (
          <Picker.Item key={p.id_pais} label={p.nome} value={p.id_pais} />
        ))}
      </Picker>

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 20, margin: 20, backgroundColor: '#fff', borderRadius: 10 },
  input: {
    height: 45,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 16,
  },
});

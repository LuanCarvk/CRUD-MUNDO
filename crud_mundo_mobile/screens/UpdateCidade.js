import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { supabase } from '../supabase';

export default function UpdateCidade({ route, navigation }) {
  const { item, refresh } = route.params;

  const [nome, setNome] = useState(item.nome);
  const [populacao, setPopulacao] = useState(item.populacao.toString());
  const [paisId, setPaisId] = useState(item.pais_id);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    async function carregarPaises() {
      const { data } = await supabase.from('paises').select('*');
      setPaises(data || []);
    }
    carregarPaises();
  }, []);

  async function atualizar() {
    await supabase
      .from('cidades')
      .update({
        nome,
        populacao: parseInt(populacao),
        pais_id: paisId,
      })
      .eq('id_cidade', item.id_cidade);

    refresh && refresh();
    navigation.goBack();
  }

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput
        style={styles.input}
        value={populacao}
        onChangeText={setPopulacao}
        keyboardType="numeric"
      />

      <Picker selectedValue={paisId} onValueChange={setPaisId}>
        {paises.map(p => (
          <Picker.Item key={p.id_pais} label={p.nome} value={p.id_pais} />
        ))}
      </Picker>

      <Button title="Atualizar" onPress={atualizar} />
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

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';

export default function ListaCidades({ navigation }) {
  const [dados, setDados] = useState([]);

  async function carregar() {
    const { data, error } = await supabase
      .from('cidades')
      .select('*, paises(nome)')
      .order('id_cidade', { ascending: true });

    if (!error) setDados(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CadastroCidade', { refresh: carregar })}
      >
        <Text style={styles.addButtonText}>Cadastrar Cidade</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{ backgroundColor: '#444', padding: 8, borderRadius: 6 }}
        onPress={() => navigation.navigate('ListaPaises')}
      >
        <Text style={{ color: '#fff' }}>Ver Países</Text>
      </TouchableOpacity>

      <FlatList
        data={dados}
        keyExtractor={i => i.id_cidade + ''}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cityName}>{item.nome}</Text>
              <Text style={styles.cityDetail}>
                {item.paises?.nome} • População: {item.populacao}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              {/* Editar */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('UpdateCidade', { item, refresh: carregar })}
              >
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>

              {/* Excluir */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={async () => {
                  const { error } = await supabase
                    .from('cidades')
                    .delete()
                    .eq('id_cidade', item.id_cidade);
                  if (!error) carregar();
                }}
              >
                <Text style={styles.btnText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma cidade cadastrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f6fa' },
  addButton: {
    backgroundColor: '#0066CC',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: { fontSize: 17, fontWeight: 'bold' },
  cityDetail: { fontSize: 14, color: '#555' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  editButton: {
    backgroundColor: '#00AA55',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: { color: '#fff', fontSize: 14 },
  emptyText: { marginTop: 30, textAlign: 'center', color: '#777', fontSize: 16 },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function CadastroCidade() {
const [nome, setNome] = useState('');
const [paisId, setPaisId] = useState('');


const salvar = () => {
Alert.alert('Sucesso', `Cidade '${nome}' cadastrada no país ${paisId}`);
setNome('');
setPaisId('');
};


return (
<View style={styles.container}>
<Text style={styles.title}>Cadastro de Cidade</Text>
<TextInput style={styles.input} placeholder="Nome da cidade" value={nome} onChangeText={setNome} />
<TextInput style={styles.input} placeholder="ID do país" value={paisId} onChangeText={setPaisId} keyboardType="numeric" />
<TouchableOpacity style={styles.button} onPress={salvar}>
<Text style={styles.buttonText}>Salvar Cidade</Text>
</TouchableOpacity>
</View>
);
}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function CadastroPais() {
const [nome, setNome] = useState('');
const [populacao, setPopulacao] = useState('');


const salvar = () => {
// Aqui você integraria com API ou banco local
Alert.alert('Sucesso', `País '${nome}' cadastrado com sucesso!`);
setNome('');
setPopulacao('');
};


return (
<View style={styles.container}>
<Text style={styles.title}>Cadastro de País</Text>
<TextInput
style={styles.input}
placeholder="Nome do país"
value={nome}
onChangeText={setNome}
/>
<TextInput
style={styles.input}
placeholder="População"
value={populacao}
onChangeText={setPopulacao}
keyboardType="numeric"
/>
<TouchableOpacity style={styles.button} onPress={salvar}>
<Text style={styles.buttonText}>Salvar País</Text>
</TouchableOpacity>
</View>
);
}
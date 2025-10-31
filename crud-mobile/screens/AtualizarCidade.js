import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function AtualizarCidade() {
const [id, setId] = useState('');
const [nome, setNome] = useState('');


const atualizar = () => {
Alert.alert('Atualizado', `Cidade ${id} atualizada para: ${nome}`);
setId('');
setNome('');
};


return (
<View style={styles.container}>
<Text style={styles.title}>Atualizar Cidade</Text>
<TextInput style={styles.input} placeholder="ID da cidade" value={id} onChangeText={setId} keyboardType="numeric" />
<TextInput style={styles.input} placeholder="Novo nome da cidade" value={nome} onChangeText={setNome} />
<TouchableOpacity style={styles.button} onPress={atualizar}>
<Text style={styles.buttonText}>Atualizar</Text>
</TouchableOpacity>
</View>
);
}
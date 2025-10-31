import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function ApagarCidade() {
const [id, setId] = useState('');


const apagar = () => {
Alert.alert('Confirmar', `Apagar cidade de id ${id}?`, [
{ text: 'Cancelar' },
{ text: 'Apagar', onPress: () => Alert.alert('Apagado', 'Cidade removida.') },
]);
};


return (
<View style={styles.container}>
<Text style={styles.title}>Apagar Cidade</Text>
<TextInput style={styles.input} placeholder="ID da cidade" value={id} onChangeText={setId} keyboardType="numeric" />
<TouchableOpacity style={styles.button} onPress={apagar}>
<Text style={styles.buttonText}>Apagar</Text>
</TouchableOpacity>
</View>
);
}
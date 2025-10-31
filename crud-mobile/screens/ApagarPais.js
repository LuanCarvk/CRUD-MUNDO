import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function ApagarPais() {
const [id, setId] = useState('');


const apagar = () => {
Alert.alert('Confirmar', `Deseja apagar o país de id ${id}?`, [
{ text: 'Cancelar' },
{ text: 'Apagar', onPress: () => Alert.alert('Apagado', 'País removido.') },
]);
};


return (
<View style={styles.container}>
<Text style={styles.title}>Apagar País</Text>
<TextInput
style={styles.input}
placeholder="ID do país"
value={id}
onChangeText={setId}
keyboardType="numeric"
/>
<TouchableOpacity style={styles.button} onPress={apagar}>
<Text style={styles.buttonText}>Apagar</Text>
</TouchableOpacity>
</View>
);
}
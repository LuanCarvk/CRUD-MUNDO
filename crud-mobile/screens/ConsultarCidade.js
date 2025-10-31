import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function ConsultarCidade() {
const [consulta, setConsulta] = useState('');


const buscar = () => {
Alert.alert('Resultado', `Resultado para: ${consulta}`);
};


return (
<View style={styles.container}>
<Text style={styles.title}>Consultar Cidade</Text>
<TextInput style={styles.input} placeholder="Nome ou ID da cidade" value={consulta} onChangeText={setConsulta} />
<TouchableOpacity style={styles.button} onPress={buscar}>
<Text style={styles.buttonText}>Buscar</Text>
</TouchableOpacity>
</View>
);
}
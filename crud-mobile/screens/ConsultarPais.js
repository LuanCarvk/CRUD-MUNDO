import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';


export default function ConsultarPais() {
const [consulta, setConsulta] = useState('');


const buscar = () => {
// Simulação de resultado
Alert.alert('Resultado', `Resultado para: ${consulta}\n(Exemplo: País XYZ)`);
};


return (
<View style={styles.container}>
<Text style={styles.title}>Consultar País</Text>
<TextInput
style={styles.input}
placeholder="Nome ou ID do país"
value={consulta}
onChangeText={setConsulta}
/>
<TouchableOpacity style={styles.button} onPress={buscar}>
<Text style={styles.buttonText}>Buscar</Text>
</TouchableOpacity>
</View>
);
}
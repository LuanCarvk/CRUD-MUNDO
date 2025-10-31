import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const CORES = {
primario: '#007AFF',
fundo: '#FFFFFF',
entradaFundo: '#F3F3F3',
texto: '#222222',
branco: '#FFFFFF',
borda: '#DDDDDD',
sombra: '#000000',
};

const TAMANHOS = {
base: 8,
raio: 10,
padding: 16,
alturaEntrada: 45,
alturaBotao: 48,
titulo: 24,
texto: 16,
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: TAMANHOS.padding,
paddingTop: Constants.statusBarHeight + TAMANHOS.padding,
backgroundColor: CORES.fundo,
alignItems: 'center',
justifyContent: 'center',
},

title: {
fontSize: TAMANHOS.titulo,
fontWeight: 'bold',
color: CORES.texto,
marginBottom: TAMANHOS.base * 3,
textAlign: 'center',
},

input: {
width: '85%',
height: TAMANHOS.alturaEntrada,
borderWidth: 1,
borderColor: CORES.borda,
borderRadius: TAMANHOS.raio,
paddingHorizontal: TAMANHOS.base * 1.5,
backgroundColor: CORES.entradaFundo,
marginBottom: TAMANHOS.base * 1.5,
fontSize: TAMANHOS.texto,
color: CORES.texto,
},

button: {
width: '85%',
height: TAMANHOS.alturaBotao,
backgroundColor: CORES.primario,
borderRadius: TAMANHOS.raio,
alignItems: 'center',
justifyContent: 'center',
marginTop: TAMANHOS.base * 2,
elevation: 4,
shadowColor: CORES.sombra,
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.25,
shadowRadius: 3.5,
},

buttonText: {
color: CORES.branco,
fontSize: TAMANHOS.texto,
fontWeight: '600',
},

label: {
fontSize: TAMANHOS.texto - 2,
color: CORES.texto,
alignSelf: 'flex-start',
marginLeft: '8%',
marginBottom: 4,
},

divider: {
width: '90%',
height: 1,
backgroundColor: CORES.borda,
marginVertical: TAMANHOS.base * 2,
},
});

export default styles;

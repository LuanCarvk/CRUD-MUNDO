import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';


import CadastroPais from './screens/CadastroPais';
import ApagarPais from './screens/ApagarPais';
import ConsultarPais from './screens/ConsultarPais';
import AtualizarPais from './screens/AtualizarPais';
import CadastroCidade from './screens/CadastroCidade';
import ApagarCidade from './screens/ApagarCidade';
import ConsultarCidade from './screens/ConsultarCidade';
import AtualizarCidade from './screens/AtualizarCidade';


import styles from './styles';


const Drawer = createDrawerNavigator();


const iconesPorTela = {
Cadastro_País: 'earth',
Apagar_País: 'trash-bin',
Consultar_País: 'search',
Atualizar_País: 'pencil',
Cadastro_Cidade: 'add-circle',
Apagar_Cidade: 'trash-bin',
Consultar_Cidade: 'eye',
Atualizar_Cidade: 'pencil',
};


const getDrawerIcon = (routeName) => {
const nome = iconesPorTela[routeName] || 'help-circle';
return <Ionicons name={nome} size={22} color="#000" />;
};


export default function App() {
return (
<NavigationContainer>
<Drawer.Navigator
initialRouteName="Cadastro_País"
screenOptions={({ route }) => ({
headerTitleAlign: 'center',
drawerIcon: () => getDrawerIcon(route.name),
})}
>
<Drawer.Screen name="Cadastro_País" component={CadastroPais} />
<Drawer.Screen name="Apagar_País" component={ApagarPais} />
<Drawer.Screen name="Consultar_País" component={ConsultarPais} />
<Drawer.Screen name="Atualizar_País" component={AtualizarPais} />


<Drawer.Screen name="Cadastro_Cidade" component={CadastroCidade} />
<Drawer.Screen name="Apagar_Cidade" component={ApagarCidade} />
<Drawer.Screen name="Consultar_Cidade" component={ConsultarCidade} />
<Drawer.Screen name="Atualizar_Cidade" component={AtualizarCidade} />
</Drawer.Navigator>
</NavigationContainer>
);
}
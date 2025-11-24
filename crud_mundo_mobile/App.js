import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaPaises from './screens/ListaPaises';
import CadastroPais from './screens/CadastroPais';
import UpdatePais from './screens/UpdatePais';

import ListaCidades from './screens/ListaCidades';
import CadastroCidade from './screens/CadastroCidade';
import UpdateCidade from './screens/UpdateCidade';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Telas de Países */}
        <Stack.Screen name="ListaPaises" component={ListaPaises} />
        <Stack.Screen name="CadastroPais" component={CadastroPais} />
        <Stack.Screen name="UpdatePais" component={UpdatePais} />

        {/* Telas de Cidades */}
        <Stack.Screen name="ListaCidades" component={ListaCidades} />
        <Stack.Screen name="CadastroCidade" component={CadastroCidade} />
        <Stack.Screen name="UpdateCidade" component={UpdateCidade} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

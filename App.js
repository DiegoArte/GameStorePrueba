import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CartProvider } from './src/context/CartContext';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

// Tema oscuro para la navegación
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0A0A0A'
  },
};

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#0A0A0A' },
          headerTintColor: '#FAFAFA',
          headerShadowVisible: false
        }}>
          <Stack.Screen 
            name="Inicio" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Detalles" 
            component={DetailScreen} 
            options={{ title: '' }} 
          />
          <Stack.Screen 
            name="Carrito" 
            component={CartScreen} 
            options={{ title: 'Carrito' }} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </CartProvider>
    
  );
}
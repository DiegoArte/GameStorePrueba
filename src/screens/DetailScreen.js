// src/screens/DetailScreen.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function DetailScreen({ route }) {
  // Recibimos los parámetros de la navegación [cite: 195]
  const { juego } = route.params;
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: juego.img }} style={styles.coverImage} />
      <LinearGradient colors={['transparent', '#0A0A0A']} style={styles.gradient} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{juego.titulo}</Text>
        <Text style={styles.console}>{juego.consola}</Text>
        
        {/* NUEVO: Componente para mostrar la descripción */}
        <Text style={styles.description}>{juego.descripcion}</Text>
        
        <Text style={styles.price}>{juego.precio}</Text>
        
        <TouchableOpacity style={styles.buyButton} onPress={() => agregarAlCarrito(juego)}>
          <Text style={styles.buyButtonText}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  coverImage: { width: '100%', height: 400, resizeMode: 'cover', position: 'absolute' },
  gradient: { width: '100%', height: 400, position: 'absolute' },
  infoContainer: { padding: 20, marginTop: 350 },
  title: { fontSize: 32, fontWeight: '900', color: '#FAFAFA' },
  console: { fontSize: 18, color: '#A3A3A3', marginVertical: 10 },
  description: { 
    fontSize: 16, 
    color: '#D4D4D4', 
    lineHeight: 24, 
    marginVertical: 15 
  },
  price: { fontSize: 28, fontWeight: 'bold', color: '#10B981', marginBottom: 30 },
  buyButton: { backgroundColor: '#8B5CF6', padding: 18, borderRadius: 15, alignItems: 'center' },
  buyButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
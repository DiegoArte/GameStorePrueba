import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  // Calcular el total dinámicamente
  const total = carrito.reduce((sum, item) => {
    // Limpiamos el signo de $ y TODAS las comas
    const precioLimpio = item.precio.replace('$', '').replace(/,/g, '');
    const precioNum = parseFloat(precioLimpio);
    
    return sum + (isNaN(precioNum) ? 0 : precioNum);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tu Carrito</Text>
      
      {carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={60} color="#333" />
          <Text style={styles.emptyText}>Tu carrito está muy vacío...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.img }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.titulo}</Text>
                  <Text style={styles.itemPrice}>{item.precio}</Text>
                </View>
                <TouchableOpacity onPress={() => eliminarDelCarrito(index)}>
                  <Ionicons name="trash" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={vaciarCarrito}>
              <Text style={styles.checkoutText}>Proceder al Pago</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 20 },
  headerTitle: { color: '#FAFAFA', fontSize: 32, fontWeight: '900', marginBottom: 20, marginTop: 10 },
  
  // Estado Vacío
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#A3A3A3', fontSize: 18, marginTop: 10 },
  
  // Elementos de la lista
  cartItem: { flexDirection: 'row', backgroundColor: '#171717', borderRadius: 15, padding: 15, marginBottom: 15, alignItems: 'center' },
  itemImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemTitle: { color: '#FAFAFA', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  itemPrice: { color: '#10B981', fontSize: 16, fontWeight: '800' },
  
  // Footer / Pago
  footer: { backgroundColor: '#171717', padding: 20, borderRadius: 20, marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { color: '#A3A3A3', fontSize: 20 },
  totalAmount: { color: '#FAFAFA', fontSize: 24, fontWeight: '900' },
  checkoutButton: { backgroundColor: '#8B5CF6', padding: 18, borderRadius: 15, alignItems: 'center' },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
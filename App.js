import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, FlatList, TextInput, TouchableOpacity    } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


// You can import supported modules from npm
import { Card } from 'react-native-paper';
import VIDEOJUEGOS from './datos.json';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {

  const [busqueda, setBusqueda] = useState('');
  const CATEGORIAS = ['Todos', 'PS5', 'Xbox', 'Switch', 'PC'];
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const juegosFiltrados = VIDEOJUEGOS.filter((juego) => {
    const coincideTexto = juego.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva === 'Todos' || juego.consola.includes(categoriaActiva);
    return coincideTexto && coincideCategoria;
  });
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bienvenido de vuelta,</Text>
          <Text style={styles.headerTitle}>Game <Text style={styles.accentText}>Store</Text></Text>
        </View>
        <Image source={{uri: 'https://fotos.perfil.com/2022/03/23/trim/720/410/ibai-le-pidio-a-epic-games-un-nuevo-modo-para-fortnite-tras-sacar-la-construccion-1331203.jpg'}} style={styles.profilePic} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A3A3A3" style={styles.searchIcon} />
        <TextInput
          style={styles.buscador}
          placeholder="Buscar obras maestras..."
          placeholderTextColor="#A3A3A3"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.pill, categoriaActiva === cat && styles.pillActive]}
              onPress={() => setCategoriaActiva(cat)}
            >
              <Text style={[styles.pillText, categoriaActiva === cat && styles.pillTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        data={juegosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            
            {/* Degradado para hacer el texto legible sobre cualquier imagen */}
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,0.9)']} 
              style={styles.gradientOverlay} 
            />

            {/* Insignia de Consola Flotante */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.consola}</Text>
            </View>

            {/* Contenido sobre la imagen */}
            <View style={styles.cardContent}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardPrice}>{item.precio}</Text>
              </View>
              <TouchableOpacity style={styles.buyButton}>
                <Ionicons name="cart" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 10 },
  greeting: { color: '#A3A3A3', fontSize: 16 },
  headerTitle: { color: '#FAFAFA', fontSize: 28, fontWeight: '900', marginTop: 4 },
  accentText: { color: '#8B5CF6' },
  profilePic: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#8B5CF6' },

  // Buscador
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#171717', marginHorizontal: 20, borderRadius: 15, paddingHorizontal: 15, marginBottom: 20 },
  searchIcon: { marginRight: 10 }, 
  buscador: { flex: 1, color: '#FAFAFA', paddingVertical: 15, fontSize: 16 },

  // Categorías
  categoriesContainer: { paddingLeft: 20, marginBottom: 20 },
  pill: { backgroundColor: '#171717', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, marginRight: 12 },
  pillActive: { backgroundColor: '#8B5CF6' },
  pillText: { color: '#A3A3A3', fontWeight: '600', fontSize: 14 },
  pillTextActive: { color: '#FAFAFA' },

  // Tarjeta (Hero Card)
  card: { marginHorizontal: 20, marginBottom: 25, borderRadius: 20, overflow: 'hidden', backgroundColor: '#171717', elevation: 5, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 5 },
  cardImage: { width: '100%', height: 220, resizeMode: 'cover' },
  gradientOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 120 },
  
  // Insignia superior
  badge: { position: 'absolute', top: 15, left: 15, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  badgeText: { color: '#FAFAFA', fontWeight: 'bold', fontSize: 12 },

  // Contenido inferior de la tarjeta
  cardContent: { position: 'absolute', bottom: 15, left: 15, right: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardInfo: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#FAFAFA', marginBottom: 4, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 3 },
  cardPrice: { fontSize: 18, fontWeight: '800', color: '#10B981' }, // Verde esmeralda para el precio
  
  // Botón Comprar
  buyButton: { backgroundColor: '#8B5CF6', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }
});

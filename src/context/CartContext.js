import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartGuardado = await AsyncStorage.getItem('@carrito_juegos');
        if (cartGuardado) setCarrito(JSON.parse(cartGuardado));
      } catch (error) { 
        console.log(error); 
      }
    };
    loadCart();
  }, []);

  const agregarAlCarrito = async (juego) => {
    const nuevoCarrito = [...carrito, juego];
    setCarrito(nuevoCarrito);
    try {
      await AsyncStorage.setItem('@carrito_juegos', JSON.stringify(nuevoCarrito));
      alert('¡Juego agregado al carrito!');
    } catch (error) { 
      console.log(error); 
    }
  };

  // NUEVA FUNCIÓN: Eliminar un juego específico
  const eliminarDelCarrito = async (indexItem) => {
    // Filtramos por índice por si agregan dos veces el mismo juego
    const nuevoCarrito = carrito.filter((_, index) => index !== indexItem);
    setCarrito(nuevoCarrito);
    await AsyncStorage.setItem('@carrito_juegos', JSON.stringify(nuevoCarrito));
  };

  // NUEVA FUNCIÓN: Vaciar al "Pagar"
  const vaciarCarrito = async () => {
    setCarrito([]);
    await AsyncStorage.removeItem('@carrito_juegos');
    alert('¡Gracias por tu compra!');
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};
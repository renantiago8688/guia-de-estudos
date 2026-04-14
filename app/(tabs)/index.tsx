import { Link } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Bem-vindo ao meu{"\n"}Guia de Estudos!</Text>
      
      <Link href="/about" style={styles.button}>
        Sobre  →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Evita que o texto toque as bordas em telas pequenas
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto principal
    marginBottom: 20,    // Dá um espaço entre o título e o botão
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    textAlign: 'center', // Garante que o texto do Link esteja centralizado
    marginTop: 10,
  }
});
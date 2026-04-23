import { Link } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      {/* Título Principal */}
      <Text style={styles.text}>Guia de Estudos</Text>
      
      {/* Texto de Resumo do Tema */}
      <Text style={styles.description}>
        Este aplicativo foi desenvolvido para ajudar você a organizar suas matérias, 
        definir prioridades e gerenciar seu tempo de estudo de forma eficiente.
      </Text>

      {/* Botão para Voltar */}
      <Link href="/" style={styles.button}>
        ← Voltar para a Página Inicial.
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // Fundo preto total
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30, // Espaçamento nas laterais
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    color: '#ccc', 
    fontSize: 18,
    textAlign: 'center', // Centraliza o texto do resumo
    lineHeight: 26, // Dá um espaço entre as linhas para facilitar a leitura
    marginBottom: 40,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  }
});
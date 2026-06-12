import { Link } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guia de Estudos</Text>
      
      <Text style={styles.description}>
        Este aplicativo foi desenvolvido para ajudar você a organizar suas matérias, 
        definir prioridades e gerenciar seu tempo de estudo de forma eficiente.
      </Text>

      <Link href="/" style={styles.button}>
        ← Voltar para a Página Inicial.
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30, 
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
    textAlign: 'center', 
    lineHeight: 26, 
    marginBottom: 40,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  }
});
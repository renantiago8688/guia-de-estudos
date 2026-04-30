import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/library.jpg');

export default function Index() {
  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <ImageViewer imgSource= {PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Selecione uma foto." />
        <Button label="Usar esta foto." />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center', // Isso mantém o bloco todo centralizado na tela
    paddingHorizontal: 20,
  },
  imageContainer: {
    paddingTop: 50, // Dar um espaço do topo da tela
    marginBottom: 20, // Espaço entre a imagem e o texto
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

});
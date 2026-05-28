import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from '@/components/EmojiPicker';
import { useState } from 'react';

const PlaceholderImage = require('@/assets/images/library.jpg');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('Você não escolheu nenhuma imagem.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>

      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Selecione uma foto." onPress={pickImageAsync} />
          <Button label="Usar esta foto." onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* A lista de componentes de emoji entrará aqui futuramente */}
      </EmojiPicker>
      
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    paddingTop: 50,
    marginBottom: 20,
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
  optionContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
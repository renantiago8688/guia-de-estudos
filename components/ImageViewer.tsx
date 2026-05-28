import { Image, type ImageSource } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

type Props = {
    imgSource: ImageSource;
    selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage} : imgSource;

    return <Image source= {imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 420,
        height: 400,
        borderRadius: 18,
    },
});
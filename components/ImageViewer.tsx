import { Image, type ImageSource } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

type Props = {
    imgSource: ImageSource;
};

export default function ImageViewer({ imgSource }: Props) {
    return <Image source= {imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 420,
        height: 400,
        borderRadius: 18,
    },
});
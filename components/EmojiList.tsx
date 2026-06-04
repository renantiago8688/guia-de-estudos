import { useState } from "react";
import { ImageSourcePropType, StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Image } from 'expo-image';
import React from "react";

type Props = {
    onSelect: (image: ImageSourcePropType) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    const [emoji] = useState<ImageSourcePropType[]>([
        require("../assets/images/emote1.jpg"),
        require("../assets/images/emote2.jpg"),
        require("../assets/images/emote3.jpg"),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer} 
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}>
                    <Image source={item} key={index} style={styles.image} /> 
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});
import { Link } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
  
  <View style= {styles.container}>
      <Text style= {styles.text}>About us.</Text>
      <Link href="/" style={styles.button}>
      Go Back
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    text: {
      color: '#ffffffff',
      fontSize: 30,
    },
    button:{
      fontSize: 20,
      textDecorationLine: 'underline',
      color:'#ffffffff'
    }
});
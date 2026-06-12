import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from "expo-router";
import React from "react";



export default function TabLayout() {
  return ( 
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#3d81ff',
            headerStyle:{
              backgroundColor:'#25292e'
            },
            headerShadowVisible: false,
            headerTintColor:'#fff',
            tabBarStyle:{
              backgroundColor:'#25292e',
            },
        }}
    >
      <Tabs.Screen
         name="index" 
         options={{
         title: 'Página Principal',
         tabBarIcon: ({ color, focused }) => (
            <Octicons name='home-fill'  color = {color} size = {24} />
         ),
         }} 
    />
      <Tabs.Screen 
         name="about" 
         options={{ 
         title: 'Sobre',
         tabBarIcon: ({ color, focused }) => (
            <FontAwesome name='address-card-o' color={color} size={24}/>
         ),
         }} 
    />
    <Tabs.Screen 
         name="toDoList" 
         options={{ 
         title: 'Lista de Tarefas',
         tabBarIcon: ({ color, focused }) => (
            <FontAwesome name='list-ul' color={color} size={24}/>
         ),
         }} 
    
    />
    <Tabs.Screen 
         name="planejamento" 
         options={{ 
         title: 'Planejamento',
         tabBarIcon: ({ color, focused }) => (
            <AntDesign name="book" size={24} color={color} />
         ),
         }} 
    
    />
    <Tabs.Screen 
         name="pesquisa" 
         options={{ 
         title: 'Pesquisa',
         tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="magnifying-glass" size={24} color={color} />
         ),
         }} 
    
    />
    </Tabs>
  );
}
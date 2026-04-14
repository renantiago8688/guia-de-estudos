import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";
import React from "react";



export default function TabLayout() {
  return ( 
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#3d81ffff',
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
            <Octicons name={focused ? 'home-fill' : 'home'} color = {color} size = {24} />
         ),
         }} 
    />
      <Tabs.Screen 
         name="about" 
         options={{ 
         title: 'Sobre',
         tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'id-card' : 'address-card-o'} color={color} size={24}/>
         ),
         }} 
    />
    <Tabs.Screen 
         name="toDoList" 
         options={{ 
         title: 'Lista de Tarefas',
         tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'list' : 'list-ul'} color={color} size={24}/>
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
    </Tabs>
  );
}
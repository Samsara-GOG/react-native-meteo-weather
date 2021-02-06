import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreatePostScreen from './components/CreatePostScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Meteo Tour" }}
        />
        <Stack.Screen 
          name="CreatePost" 
          component={CreatePostScreen} 
          options={{ title: "Choix de la ville" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebaseConfig } from "./app/config/firebaseConfig";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "./app/screens/Intro";
import Second from "./app/screens/Second";
import Third from "./app/screens/Third";
import Fourth from "./app/screens/Fourth";
import Final from "./app/screens/Final";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Second" component={Second} />
        <Stack.Screen name="Third" component={Third} />
        <Stack.Screen name="Fourth" component={Fourth} />
        <Stack.Screen name="Final" component={Final} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

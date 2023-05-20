
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRpage from "../screens/QRpage";
import Home from "../screens/Home";



export default Navigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ headerShown: false }} name="QRpage" component={QRpage} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

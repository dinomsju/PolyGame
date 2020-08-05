import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import GameScreen from './containers/GameScreen';
import DetailGame from './containers/DetailGame';
import MainStack from './navigation/MainStack';
import DetailCreators from './containers/DetailCreators';

const Stack = createStackNavigator();

export default function RootStack() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="Games" component={GameScreen} />
        <Stack.Screen name="DetailGames" component={DetailGame} />
        <Stack.Screen name="DetailCreators" component={DetailCreators} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

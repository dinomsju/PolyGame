import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import GameScreen from '../screens/GameScreen';
import CreatorScreen from '../screens/CreatorScreen'

const Tab = createBottomTabNavigator();

export default function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName="Games">
            <Tab.Screen
                name="Games"
                component={GameScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="game-controller" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Creators"
                component={CreatorScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, Avatar } from 'react-native-paper';
import { View } from 'react-native-animatable';


import GameScreen from '../containers/GameScreen';
import CreatorScreen from '../containers/CreatorScreen'
import DetailGame from '../containers/DetailGame';
import DetailCreators from '../containers/DetailCreators'
import SearchScreen from '../containers/SearchScreen';

const Tab = createBottomTabNavigator();
const GameStack = createStackNavigator();
const CreatorStack = createStackNavigator();

export default function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName="Games"
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#A4A4A4',
                showLabel: false,
                style: {
                    backgroundColor: 'black',
                },
            }}>
            <Tab.Screen
                name="Games"
                component={GameStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="game-controller" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Creators"
                component={CreatorStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="user-secret" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const GameStackScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <GameStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <GameStack.Screen
                name="Games"
                component={GameScreen}
                options={{
                    headerShown: false
                }}
            />
            <GameStack.Screen
                name="DetailGames"
                component={DetailGame}
                options={({ route }) => ({
                    // title: route.params.title,
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <GameStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={({ route }) => ({
                    // title: route.params.title,
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
        </GameStack.Navigator>
    );
};

const CreatorStackScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <CreatorStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <CreatorStack.Screen
                name="Creators"
                component={CreatorScreen}
                options={{
                    headerShown: false
                }}
            />
            <CreatorStack.Screen
                name="DetailCreators"
                component={DetailCreators}
                options={({ route }) => ({
                    // title: route.params.title,
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <CreatorStack.Screen
                name="DetailGames"
                component={DetailGame}
                options={({ route }) => ({
                    // title: route.params.title,
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <CreatorStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={({ route }) => ({
                    // title: route.params.title,
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
        </CreatorStack.Navigator>
    );
};

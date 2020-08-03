import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName="Movie"
            tabBarOptions={{
                activeTintColor: '#E54028',
                inactiveTintColor: '#A4A4A4',
            }}>
            <Tab.Screen
                name="Movie"
                component={MovieScreen}
                options={{
                    tabBarLabel: 'Movie',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="movie-open" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="TV"
                component={TVScreen}
                options={{
                    tabBarLabel: 'TV',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="youtube-tv" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="People"
                component={PeopleScreen}
                options={{
                    tabBarLabel: 'People',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

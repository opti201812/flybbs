import React, {useEffect} from 'react';
import { NativeBaseProvider, Container, Content } from 'native-base';
import { ActivityIndicator, StatusBar, Alert  } from 'react-native';
import {HOST, PORT} from '../config';
import AuthLoadiingScreen from './AuthLoadiingScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './RegisterScreen';

const AuthStack = createStackNavigator({
    "Login": {
        "screen": LoginScreen,
        "navigationOptions": {"title": "Login"},
    },
    "Register": {
        "screen": RegisterScreen,
        "navigationOptions": {"title": "Register"},
    }
});

const RootSwitch = createSwitchNavigator(
    {
        "AuthLoading": AuthLoadiingScreen,
        Auth: AuthStack,
        Main: MainTab,
    },
    {
        "initialRouteName": "AuthLoading",
    }
)

const App = createAppContainer(RootSwitch);
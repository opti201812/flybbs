import * as Font from 'expo-font';
import React, {useEffect} from 'react';
import { NativeBaseProvider, Container, Content } from 'native-base';
import { ActivityIndicator, StatusBar, Alert  } from 'react-native';
import {AsyncStorage} from '@react-native-community/async-storage';
import {HOST, PORT} from '../config'

const loadFonts = async () => {
    await Font.loadFonts({
        Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
};

const AuthLoadiingScreen = (props) => {
    const bootstrapAsync = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const token = await AsyncStorage.getItem('token');
            const data = {
                username,
                token,
            };
            const res = await fetch(`${HOST}:${PORT}/api/users/auth`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
                // Alert.alert('Main');
                props.navigation.navigate('Main');
            } else {
                Alert.alert(result.message);
                props.navigation.navigate('Auth');
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }
    useEffect(() => {
        bootstrapAsync();
        loadFonts();
    }, []);

    return (
        <NativeBaseProvider>
            <Container>
                <Content>
                    <ActivityIndicator />
                    <StatusBar barStyle='default' />
                </Content>
            </Container>
        </NativeBaseProvider>
    )
};

export default AuthLoadiingScreen;

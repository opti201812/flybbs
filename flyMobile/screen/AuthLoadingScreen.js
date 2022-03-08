import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { NativeBaseProvider, Center, Container, Box } from 'native-base';
import { ActivityIndicator, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST, PORT } from '../config'

// const loadFonts = async () => {
//     await Font.loadFonts({
//         Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
//         Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
//     });
// };

const AuthLoadingScreen = (props) => {
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
                Alert.alert('Main');
                props.navigation.navigate('Main');
            } else {
                Alert.alert("Error", result.message);
                console.warn("Auth wrong: ", result.message)
                props.navigation.navigate('Auth');
            }
        } catch (err) {
            console.error("Auth error: ", error.message)
            Alert.alert(err.message);
        }
    }
    useEffect(() => {
        bootstrapAsync();
        // loadFonts();
    }, []);

    return (
        <NativeBaseProvider>
            <Container>
                <Box>
                    <Center flex={1} w={200} h="1">
                        <ActivityIndicator />
                    </Center>
                    <StatusBar barStyle='default' />
                </Box>
            </Container>
        </NativeBaseProvider>
    )
};

export default AuthLoadingScreen;

import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Avatar, Center, Card, Button, Text, Box, Container, VStack } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogAlert, WarnAlert, ErrorAlert } from '../common';
import { HOST, PORT } from '../config'

const SideDrawer = (props) => {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");

    const getUser = async () => {
        try {
            const localName = await AsyncStorage.getItem('username');
            const res = await fetch(`${HOST}:${PORT}/api/users/${localName}`, {
                method: 'GET',
            });
            const result = await res.json();
            if (res.ok) {
                console.log("get user OK: " + localName)
                setUsername(localName);
                setUser(result.data);
            } else {
                WarnAlert(result.message);
            }
        } catch (err) {
            ErrorAlert(err.message);
        }
    }

    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const data = { username, token };
            const res = await fetch(`${HOST}:${PORT}/api/users/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setUser({});
                props.navigation.navigate('Auth');
            } else {
                WarnAlert(res.message);
            }
        } catch (err) {
            ErrorAlert(err.message);
        };
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <NativeBaseProvider>
            <VStack mt={10} alignItems='center'>
                <Box width="300" >
                    <Avatar alignSelf='center' size="lg" source={{
                        uri: user.avatar ? `${HOST}:${PORT}/upload/${user.avatar}` : `${HOST}:${PORT}/img/avatar.jpeg`
                    }} />
                    <Box alignItems='center' m='5'>
                        <Text>Welcome back!</Text>
                        <Text>{username}</Text>
                    </Box>
                </Box>
                <Button width="80" alignSelf='center' mt={10} full light onPress={() => logout()}>
                    <Text color='#fff'>Logout</Text>
                </Button>
            </VStack>
        </NativeBaseProvider>
    )
}

export default SideDrawer;
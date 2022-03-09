import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Center, Card, Button, Text, Box } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { HOST, PORT } from '../config'

const SideDrawer = (props) => {
    const [user, setUser] = useState();
    const [username, setUsername] = useState(null);

    const getUser = async () => {
        try {
            username = await AsyncStorage.getItem('username');
            const res = await fetch(`${HOST}:${PORT}/api/users/${username}`, {
                method: 'GET',
            });
            const result = await res.json();
            if (res.ok) {
                setUser(result.data);
                setUsername(username);
            } else {
                Alert.alert(result.message);
            }
        } catch (err) {
            Alert.alert(err.message);
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
                Alert.alert(res.message);
            }
        } catch (err) {
            Alert.alert(err.message);
        };
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <NativeBaseProvider>
            <Center>
                <Card style={{ margin: 50 }}>
                    <Box>
                        {/* <Thumbnail source={{
                                uri: user.avatar ? `${HOST}:${PORT}/upload/${user.avatar}` : `${HOST}:${PORT}/img/avatar.png`
                            }} /> */}
                    </Box>
                    <Box>
                        <Center flex={1}>
                            <Text>Welcome!</Text>
                            <Text>{username}</Text>
                        </Center>
                    </Box>
                </Card>
                <Center>
                    <Button full light onPress={() => logout()}>
                        <Text>Logout</Text>
                    </Button>
                </Center>
            </Center>
        </NativeBaseProvider>
    )
}

export default SideDrawer;
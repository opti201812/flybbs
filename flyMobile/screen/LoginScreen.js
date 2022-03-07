import React, { useState } from "react";
import { AsyncStorage } from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Content, Form, Item, Label, Input, Button, Text, Right } from 'native-base';
import { HOST, PORT } from '../config.js';

const LoginScreen = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const login = () => {
        try {
            const data = {username, password};
            const res = await fetch(`${HOST}:${PORT}/api/users/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
                await AsyncStorage.setItem('username', result.data.username);
                await AsyncStorage.setItem('token', result.data.token);
                Alert.alert(result.message);
                props.navigation.navigate('Main');
            } else {
                Alert.alert(result.message);
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    };
    return (
        <NativeBaseProvider>
            <Container padder>
                <Form>
                    <Item>
                        <Label>Username</Label>
                        <Input onChangeText={username => setUsername(username)} />
                    </Item>
                    <Item>
                        <Label>Password</Label>
                        <Input secureTextEntry onChangeText={password => setPassword(password)} />
                    </Item>
                    <Button block success style={{ margin: 10 }} onPress={() => login()}>
                        <Text>Login</Text></Button>
                </Form>
                <Right onPress={() => props.navigation.navigate('Register')}>Register</Right>
            </Container>
        </NativeBaseProvider>
    );
};

export default LoginScreen;
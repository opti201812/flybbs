import React, { useState } from "react";
import { AsyncStorage } from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Content, Form, Item, Label, Input, Button, Text, Right } from 'native-base';
import { HOST, PORT } from '../config.js';

const RegisterScreen = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setReassword] = useState(null);

    const register = () => {
        try {
            const data = { username, password, repassword };
            const res = await fetch(`${HOST}:${PORT}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
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
                    <Item>
                        <Label>Retype Password</Label>
                        <Input secureTextEntry onChangeText={repassword => setReassword(repassword)} />
                    </Item>
                    <Button block success style={{ margin: 10 }} onPress={() => register()}>
                        <Text>Register</Text></Button>
                </Form>
                <Right onPress={() => props.navigation.navigate('Register')}>Register</Right>
            </Container>
        </NativeBaseProvider>
    );
};

export default RegisterScreen;
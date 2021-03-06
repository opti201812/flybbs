import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Box, Label, Input, Button, Text, Pressable, Center } from 'native-base';
import { HOST, PORT } from '../config.js';
import { Item } from './LoginScreen';
import { WarnAlert, ErrorAlert } from '../common';

const RegisterScreen = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setReassword] = useState(null);

    const register = async () => {
        try {
            const data = { username, password, repassword };
            const res = await fetch(`${HOST}:${PORT}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
                LogAlert("Register " + result.message);
                props.navigation.navigate('Main');
            } else {
                WarnAlert(result.message);
            }
        } catch (err) {
            ErrorAlert(err.message);
        }
    };
    return (
        <NativeBaseProvider>
            <Center>
                <Container padder>
                    <Text alignSelf='center' mt="2" fontSize="2xl" bold letterSpacing="xs" >FlyBBS Mobile</Text>
                    <Box>
                        <Center>
                            <Item isRequired={true} label="Username" type="input" defaultValue="" placeholder="" helperText="Input account name" errorText="Please input user name" changeFunc={username => setUsername(username)} />
                            <Item isRequired={true} label="Password" type="password" defaultValue="" placeholder="" helperText="Input your password" errorText="Please input password" changeFunc={password => setPassword(password)} />
                            <Item isRequired={true} label="Reinput Password" type="password" defaultValue="" placeholder="" helperText="Reinput the same password" errorText="Please reinput same password" changeFunc={password => setPassword(password)} />
                            <Button  width="90%" mt={10} onPress={() => register()}>
                                <Text>Register</Text></Button>
                        </Center>
                    </Box>
                </Container>
            </Center>
        </NativeBaseProvider>
    );
};

export default RegisterScreen;
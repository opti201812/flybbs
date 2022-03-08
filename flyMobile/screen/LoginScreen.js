import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Box, FormControl, WarningOutlineIcon, Stack, Input, Button, Text, Pressable, Center } from 'native-base';
import { HOST, PORT } from '../config.js';

const Item = (props) => {
    const { isRequired, label, type, defaultValue, placeholder, helperText, errorText, changeFunc } = props;
    return (
        <FormControl isRequired={isRequired}>
            <Stack mx="4" mt={4} alignContent="center">
                <Center flex={1}>
                    <FormControl.Label>{label}</FormControl.Label>
                    <Input type={type} defaultValue={defaultValue} placeholder={placeholder} onChangeText={(text) => changeFunc(text)} />
                    <FormControl.HelperText>
                        {helperText}
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errorText}
                    </FormControl.ErrorMessage>
                </Center>
            </Stack>
        </FormControl>
    );
};

const LoginScreen = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const login = async () => {
        try {
            const data = { username, password };
            const res = await fetch(`${HOST}:${PORT}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            <Center>
                <Container padder>
                    <Box>
                        <Item isRequired={true} label="Username" type="input" defaultValue="" placeholder="" helperText="Input account name" errorText="Please input account name" changeFunc={username => setUsername(username)} />
                        <Item isRequired={true} label="Password" type="password" defaultValue="" placeholder="" helperText="Input your password" errorText="Please input password" changeFunc={password => setPassword(password)} />
                        <Button block success style={{ margin: 10 }} onPress={() => login()}>
                            <Text>Login</Text></Button>
                    </Box>
                </Container>
                <Pressable onPress={() => props.navigation.navigate('Register')}><Text>Register</Text></Pressable>
            </Center>
        </NativeBaseProvider>
    );
};

export default LoginScreen;
export { Item };
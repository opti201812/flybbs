import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Box, FormControl, WarningOutlineIcon, Stack, Input, Button, Text, Pressable, Center, VStack } from 'native-base';
import { HOST, PORT } from '../config.js';
import { LogAlert, WarnAlert, ErrorAlert } from "../common.js";

const Item = (props) => {
    const { isRequired, label, type, defaultValue, placeholder, helperText, errorText, changeFunc } = props;
    return (
        <FormControl isRequired={isRequired}>
            <Stack mx="4" mt={4}>
                <FormControl.Label>{label}</FormControl.Label>
                <Input width="300" type={type} defaultValue={defaultValue} placeholder={placeholder} onChangeText={(text) => changeFunc(text)} />
                <FormControl.HelperText>{helperText}</FormControl.HelperText>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errorText}</FormControl.ErrorMessage>
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
                console.log("Login " + result.message);
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
            <FormControl>
                <VStack alignItems='center'>
                    <Text alignSelf='center' mt="2" fontSize="2xl" bold letterSpacing="xs" >FlyBBS Mobile</Text>
                    <Box>
                        <Item isRequired={true} label="Username" type="input" defaultValue="" placeholder="" helperText="Input account name" errorText="Please input account name" changeFunc={username => setUsername(username)} />
                        <Item isRequired={true} label="Password" type="password" defaultValue="" placeholder="" helperText="Input your password" errorText="Please input password" changeFunc={password => setPassword(password)} />
                        <Center>
                            <Button width="90%" mt={10} alignSelf='center' alignItems='center' onPress={() => login()}>
                                <Text color='#fff'>Login</Text>
                            </Button>
                        </Center>
                    </Box>
                    <Pressable onPress={() => props.navigation.navigate('Register')}><Text>Register</Text></Pressable>
                </VStack>
            </FormControl>
        </NativeBaseProvider>
    );
};

export default LoginScreen;
export { Item };
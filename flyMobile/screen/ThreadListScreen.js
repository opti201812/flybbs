import React, { useState } from "react";
import { AsyncStorage } from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Content, Form, Item, Label, Input, Button, Text, Right } from 'native-base';
import { HOST, PORT } from '../config.js';

const ThreadListScreen = (props) => {
    return (
        <NativeBaseProvider>
            <Container padder>
                <Text>to be done</Text>
            </Container>
        </NativeBaseProvider>
    );
};

export default ThreadListScreen;
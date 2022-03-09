import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Container, Input, Box, Button, Text, Actionsheet, useDisclose } from 'native-base';
import { REQ_USERS_API, REQ_API_ROOT } from '../config.js';
const Item = Box;
const Form = Box;
const Label = Box;

const UserScreen = (props) => {
    const [description, setDescription] = useState("");
    const [imgUri, setImgUri] = useState('null');
    const loadUser = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            console.log("req:", username, REQ_USERS_API + `/${username}`)
            const res = await fetch(REQ_USERS_API + `/${username}`, { method: 'GET' });
            const result = await res.json();
            const user = result.data;
            if (res.ok) {
                const avatar = REQ_API_ROOT + (user.avatar ? `/upload/${user.avatar}` : `/img/avatar.png`)
                setImgUri(avatar);
                setDescription(user.description);
                console.log("set img & desc: ", avatar, user.description);
            } else {
                console.warn("result.message", result.message);
                Alert.alert(result.message);
            }
        } catch (err) {
            console.error("err.message", err.message);
            Alert.alert(err.message);
        }
    };
    useEffect(() => {
        loadUser();
    }, []);

    const onTakePic = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({});
        if (!cancelled) {
            setImgUri(uri);
        }
    };
    const onChoosePic = async () => {
        await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync();
        if (!cancelled) {
            setImgUri(uri);
        }
    };
    const edit = async () => {
        try {
            const formData = new FormData();
            const username = await AsyncStorage.getItem('username');
            const token = await AsyncStorage.getItem('token');
            await formData.append('username', username);
            await formData.append('token', token);
            await formData.append('description', description);
            await formData.append('avatar', { uri: imgUri, type: 'multipart/form-data', name: 'temp' });
            const res = await fetch(REQ_USERS_API, {
                method: 'PATCH',
                body: formData,
            });
            const result = await res.json();
            if (res.ok) {
                Alert.alert(result.message);
            } else {
                Alert.alert(result.message);
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclose();
    return (
        <NativeBaseProvider>
            <Container padder>
                <Form>
                    <Item>
                        <Label>Personal Description</Label>
                        <Input onChangeText={description => setDescription(description)} value={description} />
                    </Item>
                    <Item>
                        <Label>Upload Avatar</Label>
                        <TouchableOpacity onPress={onOpen} >
                            {/* <TouchableOpacity onPress={() => ActionSheet.show(
                            {
                                options: ['shot', 'album', 'cancel'],
                                cancelButtonIndex: 2,
                                title: 'Upload avatar',
                            },
                            (buttonIndex) => {
                                if (buttonIndex == 0) {
                                    onTakePic();
                                } else if (buttonIndex == 1) {
                                    onChoosePic();
                                }
                            },
                        )} > */}
                            <Image style={{ width: 150, height: 150, backgroundColor: '#dddddd' }} source={{ uri: imgUri }} />
                        </TouchableOpacity>
                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                <Actionsheet.Header>Upload avatar</Actionsheet.Header>
                                <Actionsheet.Item onPress={()=>onTakePic()}>Camera</Actionsheet.Item>
                                <Actionsheet.Item onPress={()=>onChoosePic()}>Album</Actionsheet.Item>
                            </Actionsheet.Content>
                            <Actionsheet.Footer>
                                <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
                            </Actionsheet.Footer>
                        </Actionsheet>
                    </Item>
                    <Button block success style={{ margin: 10 }} onPress={() => edit()}>
                        <Text>Modify info</Text>
                    </Button>
                </Form>
            </Container>
        </NativeBaseProvider>
    );
};

export default UserScreen;
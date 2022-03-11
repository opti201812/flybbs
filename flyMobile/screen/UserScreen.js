import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Image, TouchableOpacity } from "react-native";
import { LogAlert, WarnAlert, ErrorAlert } from "../common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Stack, FormControl, Center, Input, Box, Button, Text, Actionsheet, useDisclose } from 'native-base';
import { REQ_USERS_API, REQ_API_ROOT } from '../config.js';

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
                WarnAlert(result.message);
            }
        } catch (err) {
            ErrorAlert(err.message);
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
            console.log("imgUri: ", imgUri)
            await formData.append('avatar', { uri: imgUri, type: 'multipart/form-data', name: 'temp' });
            const res = await fetch(REQ_USERS_API, {
                method: 'PATCH',
                body: formData,
            });
            const result = await res.json();
            if (res.ok) {
                LogAlert(result.message);
            } else {
                WarnAlert(result.message);
            }
        } catch (err) {
            ErrorAlert(err.message);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclose();
    return (
        <NativeBaseProvider>
            <FormControl>
                <Center>
                    <Stack space={3} mt="5" width="60%">
                        <Stack>
                            <FormControl.Label>Personal Description</FormControl.Label>
                            <Input width="100%" onChangeText={description => setDescription(description)} p={2} placeholder="description" value={description} />
                        </Stack>
                        <Stack>
                            <FormControl.Label>Upload Avatar</FormControl.Label>
                            <TouchableOpacity  onPress={onOpen} >
                                <Image style={{ width: 294, height: 294, backgroundColor: '#dddddd' }} source={{ uri: imgUri }} />
                            </TouchableOpacity>
                            <Actionsheet isOpen={isOpen} onClose={onClose}>
                                <Actionsheet.Content>
                                    <Actionsheet.Header>Upload avatar</Actionsheet.Header>
                                    <Actionsheet.Item onPress={() => onTakePic()}>Camera</Actionsheet.Item>
                                    <Actionsheet.Item onPress={() => onChoosePic()}>Album</Actionsheet.Item>
                                </Actionsheet.Content>
                                <Actionsheet.Footer>
                                    <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
                                </Actionsheet.Footer>
                            </Actionsheet>
                        </Stack>
                    </Stack>
                    <Button block success style={{ margin: 20 }} onPress={() => edit()}>
                        <Text>Submit Modification</Text>
                    </Button>
                </Center>
            </FormControl>
        </NativeBaseProvider>
    );
};

export default UserScreen;
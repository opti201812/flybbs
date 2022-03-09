import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Box, List, Text, Icon } from 'native-base';
import { REQ_THREADS_API } from '../config.js';
import { Ionicons } from '@expo/vector-icons';

const Body = Box;
const Content= Box;
const ListItem = Box;
const Right = Box;

const ThreadListScreen = (props) => {
    const { navigation } = props;
    const [threads, setThreads] = useState([]);
    const loadThreads = async () => {
        try {
            const res = await fetch(REQ_THREADS_API, { method: 'GET' });
            const result = await res.json();
            if (res.ok) {
                setThreads(result.data);
            } else {
                Alert.alert(res.message);
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }

    useEffect(() => {
        loadThreads();
    }, []);

    const ThreadItem = (props) => {
        const { thread, navigation } = props;
        return (
            <ListItem>
                <Body>
                    <Text>{thread.author.username}</Text>
                    <Text note>{thread.title}</Text>
                </Body>
                <Right>
                    <Icon as={Ionicons}  name="arrow-forward"
                        onPress={() => navigation.navigate('ThreadDetail', { thread })}
                    />
                </Right>
            </ListItem>
        )
    }
    const items = threads.map((thread, idx) => <ThreadItem key={idx} thread={thread} navigation={navigation} />);
    return (
        <NativeBaseProvider>
            <Container>
                <Content>
                    <List>
                        {items}
                    </List>
                </Content>
            </Container>
        </NativeBaseProvider>
    );
};

export default ThreadListScreen;
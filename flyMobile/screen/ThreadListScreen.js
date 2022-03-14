import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Box, List, Text, Icon, Row, Column, Pressable } from 'native-base';
import { REQ_THREADS_API } from '../config.js';
import { Ionicons } from '@expo/vector-icons';
import { WarnAlert, ErrorAlert } from '../common';

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
                WarnAlert(res.message);
            }
        } catch (err) {
            ErrorAlert(err.message);
        }
    }

    useEffect(() => {
        loadThreads();
    }, []);

    const ThreadItem = (props) => {
        const { thread, navigation } = props;
        return (
            <Row width={"100%"} mt={1}>
                <Column width="90%" marginLeft={"2"} marginBottom={"1"} >
                    <Pressable onPress={() => navigation.navigate('ThreadDetail', { thread })}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{thread.author.username}</Text>
                        <Text fontSize={"sm"} isTruncated maxWidth="90%">{thread.title}</Text>
                    </Pressable>
                </Column>
                <Icon mt={2} alighSelf="flex-end" as={Ionicons} name="chevron-forward"
                    onPress={() => navigation.navigate('ThreadDetail', { thread })}
                />
            </Row>
        )
    }
    const items = threads.map((thread, idx) => <ThreadItem key={idx} thread={thread} navigation={navigation} />);
    return (
        <NativeBaseProvider>
            <Box flex={1}>
                <List>
                    {items}
                </List>
            </Box>
        </NativeBaseProvider>
    );
};

export default ThreadListScreen;
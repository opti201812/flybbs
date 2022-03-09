import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NativeBaseProvider, Container, Card, Box, Text } from 'native-base';
import { REQ_THREADS_API, REQ_API_ROOT } from '../config.js';
const Body = Box;
const Thumbnail = Box;
const Left = Box;
const Right = Box;
const CardItem = Box;

const ThreadDetailScreen = (props) => {
    const tid = props.navigation.getParam('thread')._id;
    const [thread, setThread] = useState([]);
    const [comments, setComments] = useState([]);

    const loadThread = async () => {
        try {
            const res = await fetch(REQ_THREADS_API + `/${tid}`, { method: 'GET' });
            const result = await res.json();

            if (res.ok) {
                setThread(result.data.thread);
                setComments(result.data.comments);
            } else {
                Alert.alert(result.message);
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }
    const ContentCard = (props) => {
        const { data } = props;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{
                            uri: REQ_API_ROOT + data.author.avatar ? `/upload/${data.author.avatar}` : `/img/avatar.png`,
                        }} />
                        <Body>
                            <Text>{data.author.username}</Text>
                            <Text note>{data.author.description}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text note>{new Date(data.posttime).toLocaleString()}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{data.content}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    useEffect(() => {
        loadThread();
    }, []);

    const commentCards = comments.map((comment, idx) => <ContentCard key={idx} data={comment} />);
    if (!thread.author) return null;

    return (
        <NativeBaseProvider>
            <Container padder>
                <ContentCard data={thread} />
                {commentCards}
            </Container>
        </NativeBaseProvider>
    );
};

export default ThreadDetailScreen;
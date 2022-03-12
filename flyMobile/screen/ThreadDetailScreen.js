import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import { Editor } from '@tinymce/tinymce-react';
import { NativeBaseProvider, Container, Avatar, Text, VStack, Box, Divider, HStack } from 'native-base';
import { REQ_THREADS_API, REQ_API_ROOT } from '../config.js';
// import WebView from 'react-native-webview'

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
    const injectedJs = 'setInterval(() => {window.parent.postMessage(document.getElementById("content").clientHeight)}, 500)';
    const ContentCard = (props) => {
        const { data } = props;

        return (
            <Box m={2} width="99%">
                <VStack>
                    <HStack space={1.5} >
                        <Avatar size="md" source={{
                            uri: REQ_API_ROOT + (data.author.avatar ? `/upload/${data.author.avatar}` : `/img/avatar.jpeg`),
                        }} />
                        <VStack space={1} mt={1} width="60%">
                            <Text fontSize="sm" fontWeight="bold">{data.author.username}</Text>
                            <Text fontSize="xs" maxW="90%">{data.author.description}</Text>
                        </VStack>
                        <Box width="30%" height="100%" mt={1} alignItems="flex-end">
                            <Text fontSize="xs" alignContent="flex-end">{new Date(data.posttime).toLocaleString()}</Text>
                        </Box>
                    </HStack>
                    <Editor
                        initialValue={data.content}
                        id={"tinyEditor"+data._id}
                        apiKey="ptr6mblaq31o1ghf2979iusmzxd367ds7xtdoukeb5r3wbuf"
                        init={{
                            language: "en",
                            contextmenu: false,
                            branding: false,
                            menubar: false,
                            menu: false,
                            statusbar: false,
                            readonly: true,
                            toolbar: false,
                            readonly: 1,
                        }} />
                    {/* <WebView
                        style={{
                            width: Dimensions.get('window').width,
                            height: this.state.height
                        }}
                        injectedJavaScript={injectedJs}
                        automaticallyAdjustContentInsets={true}
                        source={{ html: `<!DOCTYPE html><html> <style type="text/css"> .tour_product_explain img{ display: block!important; vertical-align: top!important; width: 100%!important;} .tour_product_explain{ padding: 0 15px 20px 15px;} .tour_product_explain *{text-align: left!important; font-size: 14px!important; line-height: 1.3!important; font-family: Arial,"Lucida Grande",Verdana,"Microsoft YaHei",hei!important; float: none!important; padding: 0!important; position: static!important; height: auto!important} </style><body><div class='tour_product_explain' id='content'>${this.state.value}</div></body></html>` }}
                        scalesPageToFit={true}
                        javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
                        domStorageEnabled={true} // 适用于安卓a
                        scrollEnabled={false}
                        onMessage={(event) => {
                            console.log(event.nativeEvent.data)
                            this.setState({ height: +event.nativeEvent.data })
                        }}
                    /> */}
                </VStack>
            </Box>
        )
    }

    useEffect(() => {
        loadThread();
    }, []);

    const commentCards = comments.map((comment, idx) => <ContentCard key={idx} data={comment} />);
    if (!thread.author) return null;

    return (
        <NativeBaseProvider>
            <Box flex={1} mr="2">
                <ContentCard data={thread} />
                {commentCards}
            </Box>
        </NativeBaseProvider>
    );
};

export default ThreadDetailScreen;
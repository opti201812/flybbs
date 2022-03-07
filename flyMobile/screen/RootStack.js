import React from "react";
import { NativeBaseProvider, Container, Icon, Text, View, Button, ArrowBackIcon, ArrowDownIcon } from 'native-base';
import { createStackNavigator } from "react-navigation-stack";

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'center',
    }
};

const HomeScreen = (props) => {
    const { navigation } = props;

    return (
        <NativeBaseProvider>
            <Container style={styles.content}>
                <Text>Home</Text>
                <Button success style={styles.button}
                    onPress={() => navigation.navigate("Detail", { "title": "What a wonderful day!" })} >
                    <ArrowDownIcon size="4" />
                    <Text>Check details</Text>
                </Button>
            </Container>
        </NativeBaseProvider>
    )
};

const DetailScreen = (props) => {
    const { navigation } = props;
    const title = navigation.getParam('title');

    return (
        <NativeBaseProvider>
            <Container style={styles.content}>
                <Text>{title}</Text>
                <Button style={styles.button} onPress={() => navigation.goBack()} >
                    <ArrowBackIcon size="4"/>
                    <Text>Go Back</Text>
                </Button>
            </Container>
        </NativeBaseProvider>
    );
};

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Detail: {
        screen: DetailScreen,
    },
});

export default RootStack;
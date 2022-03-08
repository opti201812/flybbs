import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NativeBaseProvider, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ThreadDetailScreen from './screen/ThreadDetailScreen';
import ThreadListScreen from './screen/ThreadListScreen';
import UserScreen from './screen/UserScreen';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const UserStack = createStackNavigator({
    User: {
        screen: UserScreen,
        navigationOptions: { title: 'User' },
    },
});

const AuthStack = createStackNavigator({
    "Login": {
        "screen": LoginScreen,
        "navigationOptions": { "title": "Login" },
    },
    "Register": {
        "screen": RegisterScreen,
        "navigationOptions": { "title": "Register" },
    }
});

const ThreadStack = createStackNavigator({
    ThreadList: {
        screen: ThreadListScreen,
        navigationOptions: { title: 'Thread List' },
    },
    ThreadDetail: {
        screen: ThreadDetailScreen,
        navigationOptions: { title: 'Thread Detail' },
    },
})

const MainTab = createBottomTabNavigator({
    ThreadStack: {
        screen: ThreadStack,
        navigationOptions: {
            title: 'Thread',
            tabBarLabel: 'Thread',
            tabBarIcon: ({ focused }) => <NativeBaseProvider><Icon active={focused.toString()} as={Ionicons} name="ios-people" /></NativeBaseProvider>,
        },
    },
    UserStack: {
        screen: UserStack,
        navigationOptions: {
            title: 'User',
            tabBarLabel: 'User',
            tabBarIcon: ({ focused }) => <NativeBaseProvider><Icon active={focused.toString()} as={Ionicons} name="ios-man" /></NativeBaseProvider>,
        }
    },
});

const RootSwitch = createSwitchNavigator(
    {
        "AuthLoading": AuthLoadingScreen,
        Auth: AuthStack,
        Main: MainTab,
    },
    {
        "initialRouteName": "AuthLoading",
    }
)

const App = createAppContainer(RootSwitch);

export default App;
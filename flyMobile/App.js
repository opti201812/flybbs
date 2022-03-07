import RootStack from './screen/RootStack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ThreadDetailScreen from './screen/ThreadDetailScreen';
import ThreadListScreen from './screen/ThreadListScreen';
import UserScreen from './screen/UserScreen';

const MainTab = createBottomTabNavigator({
    ThreadStack: {
        screen: ThreadStack,
        navigationOptions: {
            title: 'Thread',
            tabBarLabel: 'Thread',
            tabBarIcon: ({focused}) => <Icon active={focused} name="ios-people" />,
        },
    },
    UserStack: {
        screen: UserStack,
        navigationOptions: {
            title: 'User',
            tabBarLabel: 'User',
            tabBarIcon: ({focused}) => <Icon active={focused} name="ios-man" />,
        }
    },
    ThreadList: {
        screen: ThreadListScreen,
        navigationOptions: {title: 'Thread List'},
    },
    ThreadDetail: {
        screen: ThreadDetailScreen,
        navigationOptions: {title: 'Thread Detail'},
    },
});

const UserStack = createStackNavigator({
    User: {
        screen: UserScreen,
        navigationOptions: {title: 'User'},
    },
});

const App = createAppContainer(RootStack);

export default App;
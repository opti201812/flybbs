import { Alert } from 'react-native';

const MyAlert = (msg, level) => {
    const time = new Date().toLocaleTimeString();
    const msgWithTime = `->${time} | ${msg}`;
    switch (level) {
        case "warn":
            console.warn(msgWithTime);
            break;
        case "error":
            console.error(msgWithTime);
            break;
        default:
            console.log(msgWithTime);
    }
    Alert.alert(msg);
}
const LogAlert = MyAlert;
const WarnAlert = (msg) => MyAlert(msg, "warn");
const ErrorAlert = (msg) => MyAlert(msg, "error");
export { LogAlert, WarnAlert, ErrorAlert };
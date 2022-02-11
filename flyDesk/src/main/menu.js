import { app, Menu, dialog } from 'electron';
import { win, getWindow } from './createWindow';

const sayHello = () => dialog.showMessageBox({
    message: 'Hi, BBSer!'
});

const logout = () => {
    if (getWindow == null) {
        console.error("getWindow is null!")
        return;
    }
    let mainWin = getWindow();
    if (mainWin !== null) mainWin.webContents.send('logout', true);
    else console.error("getWindow get null!")
};

const template = [
    {
        label: 'Account',
        submenu: [
            {
                label: 'Logout',
                click: logout,
                id: 'logout',
                enabled: false,
            },
            { type: 'separator' },
            {
                role: 'close',
                label: 'Close',
            },
        ],
    }
];

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ]
    })
}
const menu = Menu.buildFromTemplate(template);
export default menu;
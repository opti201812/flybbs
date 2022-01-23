import { app, Menu, dialog } from 'electron';
import { win, getWindow } from './createWindow';

const sayHello = () => dialog.showMessageBox({
    message: 'Hi, BBSer!'
});

const changeColor = () => {
    if (getWindow == null) {
        console.error("getWindow is null!")
        return;
    }
    let mainWin = getWindow();
    if (mainWin == null) console.error("getWindow get null!")
    mainWin.webContents.send('color', 'primary');
};

const template = [
    {
        label: 'Test',
        submenu: [
            {
                label: 'Say HI',
                click: sayHello,
            },
            {
                label: 'Change to blue',
                click: changeColor,
                id: 'changeColor',
                enable: false,
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
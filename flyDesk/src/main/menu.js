import { app, Menu, dialog } from 'electron';

const sayHello = () => dialog.showMessageBox({
    message: 'Hi, BBSer!'
});

const template = [
    {
        label: 'Test',
        submenu: [
            {
                label: 'Say HI',
                click: sayHello,
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
            {role: 'about'},
            {type: 'separator'},
            {role: 'services'},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'},
        ]
    })
}
const menu = Menu.buildFromTemplate(template);
export default menu;
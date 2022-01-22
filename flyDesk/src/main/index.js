import { app, Menu } from 'electron';
import createWindow from './createWindow';
import menu from './menu';

app.on('ready', () => {
    createWindow();
    Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', (_e, hasVisibleWindow) => {
    if (!hasVisibleWindow) {
        createWindow();
    }
})
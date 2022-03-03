import { app, Menu, ipcMain } from 'electron';
import createWindow from './createWindow';
import menu from './menu';

app.on('ready', () => {
    createWindow();
    Menu.setApplicationMenu(menu);
    const item = menu.getMenuItemById('logout');
    ipcMain.on('logoutMenuItem', (e, msg) =>{
        if (msg) {
            item.enabled = msg;
        }
    });
    
    ipcMain.on('logoutClicked', (e, msg) =>{
        if (msg) {
            item.click();
            item.enabled = false;
        }
    });
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
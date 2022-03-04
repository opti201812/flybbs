import { BrowserWindow } from 'electron';
import { app } from 'electron';
let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // win.loadURL(`file://${__dirname}/../index.html`);   //Dev
    win.loadURL(`file://${__dirname}/index.html`);   //Prod
    win.on('closed', () => { win = null });
    if (!app.isPackaged) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
};

const getWindow = () => win;

export { win, getWindow };
export default createWindow;
import { BrowserWindow } from 'electron';

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
         },
    });
    win.loadURL(`file://${__dirname}/../index.html`);
    win.on('closed', () => { win = null });
    win.webContents.openDevTools();
};

const getWindow = () => win;

export { win, getWindow };
export default createWindow;
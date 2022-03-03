import { BrowserWindow } from 'electron';

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
    win.loadURL(`file://${__dirname}/../index.html`);
    win.on('closed', () => { win = null });
    // win.webContents.openDevTools();
};

const getWindow = () => win;

export { win, getWindow };
export default createWindow;
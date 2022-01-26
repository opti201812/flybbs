import { BrowserWindow } from 'electron';

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        WebPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadURL(`file://${__dirname}/../index.html`);
    win.on('closed', () => { win = null });
};

const getWindow = () => win;

export { win, getWindow };
export default createWindow;
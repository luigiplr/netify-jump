import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';
import {
    ipcMain
}
from 'electron';
import yargs from 'yargs';

const args = yargs(process.argv.slice(1)).wrap(100).argv;

app.on('ready', () => {
    const screenSize = require('screen').getPrimaryDisplay().workAreaSize;

    var mainWindow = new BrowserWindow({
        minWidth: 960,
        minHeight: 500,
        width: 960,
        height: screenSize.height * 0.7,
        'standard-window': true,
        'auto-hide-menu-bar': true,
        resizable: true,
        title: 'Netify Jump',
        center: true,
        frame: false,
        show: false
    });

    if (args.dev) {
        mainWindow.show();
        mainWindow.toggleDevTools();
        mainWindow.focus();
        console.info('Dev Mode Active: Developer Tools Enabled.')
    }

    mainWindow.setMenu(null);

    mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '../index.html')));


    mainWindow.webContents.on('new-window', event => {
        event.preventDefault();
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url.indexOf('build/index.html#') < 0) {
            event.preventDefault();
        }
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('close', app.quit);


    ipcMain.on('app:get:maximized', (event) => {
        event.returnValue = mainWindow.isMaximized();
    });

    ipcMain.on('app:maximize', (event, state) => {
        state ? mainWindow.maximize() : mainWindow.unmaximize();
    });

    ipcMain.on('app:minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('app:bitchForAttention', (event, state = true) => {
        if (!mainWindow.isFocused())
            mainWindow.flashFrame(state);
    });




});


app.on('window-all-closed', app.quit);
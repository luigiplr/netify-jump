import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';
import {
    ipcMain
}
from 'electron';
import yargs from 'yargs';
import tray from './tray';

const args = yargs(process.argv.slice(1)).wrap(100).argv;
var minimzeInfoShown = false;


app.on('ready', () => {
    const screenSize = require('screen').getPrimaryDisplay().workAreaSize;

    var mainWindow = new BrowserWindow({
        minWidth: 930,
        minHeight: 600,
        width: 960,
        height: 650,
        resizable: true,
        icon: path.join(__dirname, '../images/icon.png'),
        title: 'Netify Jump',
        center: true,
        frame: false,
        show: false
    });

    var appIcon = tray({
        close: app.quit,
        show: () => {
            mainWindow.show();
            mainWindow.focus();
        }
    });


    if (args.dev) {
        mainWindow.show();
        mainWindow.toggleDevTools();
        mainWindow.focus();
        console.info('Dev Mode Active: Developer Tools Enabled.')
    }


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
        mainWindow.hide();
        if (!minimzeInfoShown) {
            minimzeInfoShown = true;
            appIcon.displayBalloon({
                title: 'Netify Jump has been minimized to tray',
                content: 'Netify Jump is still running and can be restored by clicking its tray icon.'
            });
        }
    });

    ipcMain.on('app:toggleDevTools', () => {
        mainWindow.show();
        mainWindow.toggleDevTools();
        mainWindow.focus();
        console.info('Developer Tools Toggled.');
    });

    ipcMain.on('app:close', app.quit);

});


app.on('window-all-closed', app.quit);
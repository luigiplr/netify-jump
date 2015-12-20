import path from 'path';
import {
    Menu, Tray, ipcMain
}
from 'electron';

module.exports = (Helper, appIcon = new Tray(path.join(__dirname, '../images/icon.png'))) => {
    try {
        appIcon.on('click', Helper.show)
        appIcon.on('double-click', Helper.show)

        const contextMenu = Menu.buildFromTemplate([{
            label: 'Open Netify Jump',
            click: Helper.show
        }, {
            type: 'separator'
        }, {
            label: 'Quit Netify Jump ',
            click: Helper.close
        }]);
        appIcon.setToolTip('Netify Jump');
        appIcon.setContextMenu(contextMenu);
    } catch (e) {
        console.error(e)
    }
}
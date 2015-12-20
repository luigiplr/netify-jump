import path from 'path';
import {
    Menu, Tray, ipcMain
}
from 'electron';

module.exports = Helper => {
    try {
        var appIcon = new Tray(path.join(__dirname, '../images/icon.png'));

        appIcon.on('click', Helper.show);
        appIcon.on('double-click', Helper.show);

        const contextMenu = Menu.buildFromTemplate([{
            label: 'Show',
            click: Helper.show
        }, {
            type: 'separator'
        }, {
            label: 'Exit',
            click: Helper.close
        }]);
        appIcon.setToolTip('Netify Jump');
        appIcon.setContextMenu(contextMenu);
    } catch (e) {
        console.error(e);
    }
    return appIcon;
}
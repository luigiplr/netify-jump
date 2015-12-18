import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';


module.exports = {
    readJson(jsonPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(jsonPath, 'utf8', (err, data) => {
                if (err) return reject(err);
                resolve(JSON.parse(data));
            });
        });
    },
    saveJson(jsonPath, json) {
        return new Promise((resolve, reject) => {
            fs.writeFile(jsonPath, JSON.stringify(json), (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    },
    formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
    }
}
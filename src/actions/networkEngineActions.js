import path from 'path';
import online from 'is-online';
import Promise from 'bluebird';
import async from 'async';
import nodeHotspot from 'node-hotspot';
import _ from 'lodash';
import alt from '../alt';
import {
    EventEmitter
}
from 'events';

const statsUpdateEmitter = new EventEmitter();

const hotspotUpdateQueue = async.queue((task, next) => {
    nodeHotspot.stats()
        .then(info => {
            statsUpdateEmitter.emit('update', info);
            process.nextTick(next);
        })
        .catch(error => {
            console.error(error)
            process.nextTick(next);
        });
});

const internetUpdateQueue = async.queue((task, next) => {
    _.delay(() => {
        online((err, status) => {
        	internetUpdateQueue.push(true);
            statsUpdateEmitter.emit('internet', status);
            process.nextTick(next);
        });
    }, 1000);
});



class networkEngineActions {

    constructor() {
        this.generateActions(
            'adaptors',
            'isCompatible',
            'update',

            'settingsOK',

            'online',

            'enabled',
            'disabling',
            'enabling'
        );
    }

    refreshInternet() {
        this.dispatch();

        internetUpdateQueue.push(true);
        statsUpdateEmitter.on('internet', status => {
            this.actions.online(status)
        });
    }

    refreshHotspot() {
        this.dispatch();
        if (!hotspotUpdateQueue.idle())
            return false;

        hotspotUpdateQueue.push(true);
        statsUpdateEmitter.once('update', this.actions.update);
    }


    checkOnline() {
        this.dispatch();
        _.delay(() => {
            online((err, status) => {
                this.actions.online(status);
            });
        }, 500);
    }


    enable(ssid, key) {
        this.dispatch();

        this.actions.enabling(true);
        return nodeHotspot.enable({
            ssid: ssid,
            password: key,
            force: true
        }).then(() => {;
            this.actions.updateAdaptors()
                .then(() => {
                    this.actions.enabled(true);
                    this.actions.enabling(false);
                });
        }).catch(err => {
            console.error(err);
        });
    }


    disable() {
        this.dispatch();

        this.actions.disabling(true);
        return nodeHotspot.disable()
            .then(this.actions.updateAdaptors)
            .then(() => {
                this.actions.disabling(false);
            }).catch(err => {
                console.error(err);
            });
    }


    updateAdaptors() {
        this.dispatch();

        return nodeHotspot.stats()
            .then(this.actions.update)
            .catch(error => {
                console.error(error)
            });
    }

}

export
default alt.createActions(networkEngineActions);
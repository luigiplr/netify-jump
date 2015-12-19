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
from 'events'

var statsUpdateEmitter = new EventEmitter();

var statsUpdateQueue = async.queue((task, next) => {
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


    refreshHotspot() {
        this.dispatch();
        if (!statsUpdateQueue.idle())
            return false;

        statsUpdateQueue.push(true);

        statsUpdateEmitter.once('update', this.actions.update);

    }


    checkOnline() {
        this.dispatch();
        _.delay(() => {
            online((err, status) => {
                this.actions.online(status);
            });
        }, 1000);
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
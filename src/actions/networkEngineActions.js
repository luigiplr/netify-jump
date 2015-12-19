import path from 'path';
import online from 'is-online';
import Promise from 'bluebird';
import nodeHotspot from 'node-hotspot';
import _ from 'lodash';
import alt from '../alt';



class networkEngineActions {

    constructor() {
        this.generateActions(
            'adaptors',
            'isCompatible',
            'update',


            'online',

            'enabled',

            'enabling'
        );
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
        nodeHotspot.enable({
            ssid: ssid,
            password: key,
            force: true
        }).then(() => {

            this.actions.updateAdaptors();

        }).catch(err => {
            console.error(err);
        });

    }


    disable() {
        nodeHotspot.disable()
            .then(this.actions.updateAdaptors).catch(err => {
                console.error(err);
            })

    }


    updateAdaptors() {
        nodeHotspot.stats()
            .then(this.actions.update)
            .catch(error => {
                console.error(error)
            })
    }

}

export
default alt.createActions(networkEngineActions);
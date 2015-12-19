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

        this.actions.enabling(false);
        return nodeHotspot.disable()
            .then(this.actions.updateAdaptors)
            .catch(err => {
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
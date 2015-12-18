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

    updateAdaptors() {
        nodeHotspot.stats()
            .then(Adaptors => {
                this.actions.isCompatible(Adaptors.compatible);
                this.actions.adaptors(Adaptors.networkAdaptors);
                this.actions.update(Adaptors);
            })
            .catch(error => {
                console.error(error)
            })
    }

}

export
default alt.createActions(networkEngineActions);
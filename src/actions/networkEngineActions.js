import path from 'path';
import online from 'is-online';
import Promise from 'bluebird';
import _ from 'lodash';
import alt from '../alt';



class networkEngineActions {

    constructor() {
        this.generateActions(
            'online',
            'enabled',
            'disabled',

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

}

export
default alt.createActions(networkEngineActions);
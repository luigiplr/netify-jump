import path from 'path';
import Promise from 'bluebird';
import _ from 'lodash';
import alt from '../alt';



class networkEngineActions {

    constructor() {
        this.generateActions(
            'enabled',
            'disabled',

            'enabling'
        );
    }

}

export
default alt.createActions(networkEngineActions);
import Promise from 'bluebird';
import _ from 'lodash';
import alt from '../alt';

import updaterUtil from '../utils/updaterUtil';

class updateActions {

    constructor() {
        this.generateActions(
            'updateAvailable'
        );
    }

    check() {
        updaterUtil.check()
    }

}

export
default alt.createActions(updateActions);
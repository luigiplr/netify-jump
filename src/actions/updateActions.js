import alt from '../alt';
import updaterUtil from '../utils/updaterUtil';

class updateActions {

    constructor() {
        this.generateActions(
            'updateAvailable'
        );
    }

    install(path) {
        this.dispatch();
        updaterUtil.install(path);
    }

    check() {
        this.dispatch();
        updaterUtil.check();
    }

}

export
default alt.createActions(updateActions);
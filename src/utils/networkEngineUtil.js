import Promise from 'bluebird';
import _ from 'lodash';
import {
    app, dialog
}
from 'remote';
import networkActions from '../actions/networkEngineActions';
import networkStore from '../stores/networkEngineStore';


module.exports = {

    appDataDir: path.join(app.getPath('userData'), 'config'),

    enable(opts) {},

    disable() {}
}
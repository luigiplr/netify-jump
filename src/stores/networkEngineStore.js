import alt from '../alt';
import _ from 'lodash';
import networkEngineActions from '../actions/networkEngineActions';



class NetworkEngineStore {
    constructor() {
        this.bindActions(networkEngineActions);

        this.online = 'checking';

        this.hotspot = {};

    }

    onOnline(status) {
        this.setState({
            online: status
        });
    }

}

export
default alt.createStore(NetworkEngineStore);
import alt from '../alt';
import _ from 'lodash';
import networkEngineActions from '../actions/networkEngineActions';



class NetworkEngineStore {
    constructor() {
        this.bindActions(networkEngineActions);

        this.online = 'checking';
        this.isCompatible = 'checking';
        this.adaptors = [];

        this.hotspot = {};
        this.info = {};

    }

    onUpdate(info) {
        this.setState({
            info: info
        });
        console.log(this)
    }

    onAdaptors(adaptors) {
        this.setState({
            adaptors: adaptors
        });
    }

    onIsCompatible(status) {
        this.setState({
            isCompatible: status
        });
    }

    onOnline(status) {
        this.setState({
            online: status
        });
    }

}

export
default alt.createStore(NetworkEngineStore);
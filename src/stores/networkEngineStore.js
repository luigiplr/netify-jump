import alt from '../alt';
import _ from 'lodash';
import networkEngineActions from '../actions/networkEngineActions';



class NetworkEngineStore {
    constructor() {
        this.bindActions(networkEngineActions);

        this.enabling = false;
        this.disabling = false;

        this.online = 'checking';
        this.isCompatible = 'checking';
        this.adaptors = [];

        this.hotspot = {};
        this.info = {};

    }

    onDisabling(dis = true) {
        this.setState({
            enabling: false,
            disabling: dis
        });
    }


    onEnabling(enabling = true) {
        this.setState({
            disabling: false,
            enabling: enabling
        });
    }

    onUpdate(info) {
        this.setState({
            hotspot: _.omit(info, ['compatible', 'networkAdaptors', 'connectedAdaptor']),
            isCompatible: info.compatible,
            adaptors: info.networkAdaptors
        });
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

    onOnline(status = true) {
        this.setState({
            online: status
        });
    }

}

export
default alt.createStore(NetworkEngineStore);
import alt from '../alt';
import updateActions from '../actions/updateActions';

class UpdateStore {
    constructor() {
        this.bindActions(updateActions);
        this.update = false;
    }
    onUpdateAvailable(update) {
        this.setState({
            update: update
        });
    }

}

export
default alt.createStore(UpdateStore);
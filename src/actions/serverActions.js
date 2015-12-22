import alt from '../alt';
import {
	v1 as uuid
}
from 'uuid';

class serverActions {


	constructor() {
		this.generateActions(
			'started',
			'stopped',
			'changed'
		);
	}

	start(type, port = false, id = uuid()) {

		return new Promise((resolve, reject) => {

		});

	}

	stop(id) {



	}
}

export
default alt.createActions(serverActions);
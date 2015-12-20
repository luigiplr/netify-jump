import alt from '../alt';
import analytics from 'universal-analytics';
import {
    v4 as uuid
}
from 'uuid';

const USER_ID = (localStorage.getItem('ga-user-id') || uuid());
const ga = analytics('UA-67206995-6');

localStorage.setItem('ga-user-id', USER_ID);

class GAActions {
    send(path) {
        ga.pageview('/app/' + path).send();
    }

    event(event = []) {
        console.log(event)
        ga.event(...event).send()
    }
}

export
default alt.createActions(GAActions);
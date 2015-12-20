import alt from '../alt';
import analytics from 'universal-analytics';
import {
    v4 as uuid
}
from 'uuid';

const USER_ID = (localStorage.getItem('ga-user-id') || uuid());
const ga = analytics('UA-67206995-6');

localStorage.setItem('ga-user-id', USER_ID);

if (process.env.NODE_ENV === 'development')
    ga.pageview('app/development').send();

class GAActions {
    send(path) {
        if (process.env.NODE_ENV !== 'development')
            ga.pageview('app/' + path).send();
    }

    event(event = []) {
        if (process.env.NODE_ENV !== 'development')
            ga.event(...event).send()
    }
}

export
default alt.createActions(GAActions);
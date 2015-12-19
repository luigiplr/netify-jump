import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    RouteContext
}
from 'react-router';
import {
    mouseTrap
} from 'react-mousetrap';
import {
    ipcRenderer
}
from 'electron';

import Header from './Header';
import NetworkActions from '../actions/networkEngineActions';

const Framework = React.createClass({

    mixins: [PureRenderMixin, RouteContext],


    componentWillMount() {
        this.props.bindShortcut('ctrl+d', () => {
            ipcRenderer.send('app:toggleDevTools');
        });
        NetworkActions.checkOnline();
        NetworkActions.updateAdaptors();
    },

    render() {
        return (
            <div>
              <Header/>
              {React.cloneElement(this.props.children, {query: this.props.query})}
            </div>
        );
    }
});


export
default mouseTrap(Framework)
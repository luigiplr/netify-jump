import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    RouteContext
}
from 'react-router';
import _ from 'lodash';
import {
    mouseTrap
}
from 'react-mousetrap';
import {
    ipcRenderer
}
from 'electron';

import Header from './Header';
import NetworkActions from '../actions/networkEngineActions';
import NetworkStore from '../stores/networkEngineStore';
import UpdateActions from '../actions/updateActions';

const Framework = React.createClass({

    mixins: [PureRenderMixin, RouteContext],

    getInitialState() {
        return {
            updateChecked: false,
            online: NetworkStore.getState().online
        };
    },

    componentWillMount() {
        NetworkStore.listen(this.update);
        this.props.bindShortcut('ctrl+d', () => {
            ipcRenderer.send('app:toggleDevTools');
        });
    },

    componentDidMount() {
        NetworkActions.refreshInternet();

        _.defer(NetworkActions.updateAdaptors);
    },

    componentWillUnmount() {
        NetworkStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                online: NetworkStore.getState().online
            });

            _.defer(() => {
                if (!this.state.updateChecked && this.state.online) {
                    this.setState({
                        updateChecked: true
                    });
                    UpdateActions.check();
                    NetworkStore.unlisten(this.update);
                }
            });
        }
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
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    RouteContext
}
from 'react-router';

import Header from './Header';
import NetworkActions from '../actions/networkEngineActions';

export
default React.createClass({

    mixins: [PureRenderMixin, RouteContext],


    componentWillMount() {
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
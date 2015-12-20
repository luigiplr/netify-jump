import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

import NetworkStore from '../../stores/networkEngineStore';
import NetworkActions from '../../actions/networkEngineActions';

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            online: NetworkStore.getState().online,
            hotspot: NetworkStore.getState().hotspot
        };
    },

    componentWillMount() {
        NetworkStore.listen(this.update);
    },

    componentWillUnmount() {
        NetworkStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                online: NetworkStore.getState().online,
                hotspot: NetworkStore.getState().hotspot
            });
        }
    },
    render() {

        return (
            <div >

            </div>
        );
    }
});
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';


export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {};
    },

    componentWillMount() {},

    componentWillUnmount() {},

    update() {
        if (this.isMounted()) {
            this.setState({

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
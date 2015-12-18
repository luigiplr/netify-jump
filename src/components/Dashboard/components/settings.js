import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});


export
default React.createClass({

    mixins: [PureRenderMixin],

    render() {
        return (
            <div className="section" style={{marginTop: '0px', height: '15px', width: '300px', right: '245px'}}>
                <h2>Settings</h2>
            </div>
        );
    }
});
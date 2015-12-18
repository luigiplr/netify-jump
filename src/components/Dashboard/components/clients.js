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
            <div className="section" style={{marginTop: '-15px', height: '15px', width: '300px', left: '249px'}}>
                <h2>Wi-Fi</h2>
            </div>
        );
    }
});
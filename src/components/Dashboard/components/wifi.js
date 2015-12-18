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
                <div className="adaptor">
                    <div className="sep"/>

                    <span style={{color:'#00B20A'}}>Active</span>
                    <p>Status</p>


                    <div className="sep"/>

                    <span>00:00:00:00:00:0X</span>
                    <p>MAC</p>

                    <div className="sep"/>

                    <span>2</span>
                    <p>Connected</p>

                </div>
            </div>
        );
    }
});
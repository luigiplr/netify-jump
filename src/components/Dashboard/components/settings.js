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

                <div className="settings">

                    <div className="sep"/>
                    <span>Hotspot Enabled</span>

                    <div className="toggler">
                        <input type="checkbox" id="hotspot" className="toggle" style={{display:'none'}} checked/>
                        <label htmlFor="hotspot" className="lbl"></label>
                    </div>
                    <div className="sep"/>

                    <p className="input" >Hotspot SSID:</p>
                    <input className="text" />
                    <div className="sep"/>

                    <p className="input" >Hotspot Password:</p>
                    <input className="text"  type="password" />
                    <div className="sep"/>
                </div>

            </div>
        );
    }
});
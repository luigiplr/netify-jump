import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';
import {
    dialog
}
from 'remote';

import NetworkStore from '../../../stores/networkEngineStore';
import NetworkActions from '../../../actions/networkEngineActions';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});


export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            isCompatible: NetworkStore.getState().isCompatible,
            hotspot: NetworkStore.getState().hotspot,
            enabling: NetworkStore.getState().enabling,
            disabling: NetworkStore.getState().disabling,
            passwordOK: ((localStorage.getItem('hotspot-key') || '').length > 7),
            SSIDOK: ((localStorage.getItem('hotspot-ssid') || 'Netify Jump Hotspot').length > 0)
        };
    },

    componentWillMount() {
        NetworkStore.listen(this.update);
    },

    componentDidMount() {
        NetworkActions.settingsOK(((localStorage.getItem('hotspot-key') || '').length > 7) && ((localStorage.getItem('hotspot-ssid') || 'Netify Jump Hotspot').length > 0));
    },

    componentWillUnmount() {
        NetworkStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                isCompatible: NetworkStore.getState().isCompatible,
                hotspot: NetworkStore.getState().hotspot,
                enabling: NetworkStore.getState().enabling,
                disabling: NetworkStore.getState().disabling,
            });
        }
    },

    showError(error){
        dialog.showMessageBox({
            noLink: true,
            type: 'error',
            title: 'Netify Jump: Error!',
            message: error.message,
            detail: error.detail,
            buttons: ['Ok']
        });
    },

    handelToggle(){

        if(!this.state.isCompatible || this.state.isCompatible === 'checking')
            return this.showError({
                message: 'No compatible WiFi adaptor found!',
                detail: 'Netify Jump requires a wifi capable of hosting infrastructure mode hotspots to be enabled.'
            });

        var enabled = (this.state.hotspot.Status === 'Started') ? true : false;

        if(!this.state.SSIDOK || !this.state.passwordOK && !enabled)
            return this.showError({
                message: 'Invalid hotspot SSID or password',
                detail: 'Please review hotspot settings'
            });

        if(this.state.enabling || this.state.disabling)
            return false;

        if(!enabled){
            localStorage.setItem('hotspot-ssid', this.refs['hotspot-ssid'].value);
            localStorage.setItem('hotspot-key', this.refs['hotspot-key'].value);

            NetworkActions.enable(this.refs['hotspot-ssid'].value, this.refs['hotspot-key'].value);
        }else{
            NetworkActions.disable();
        }
    },

    validate(type){
        _.defer(()=>{
            switch(type) {
                case 'password':
                    this.setState({
                        passwordOK: (this.refs['hotspot-key'].value.length > 7)
                    });
                    break;
                case 'ssid':
                    this.setState({
                        SSIDOK: (this.refs['hotspot-ssid'].value.length > 0)
                    });
                    break;
            }
            NetworkActions.settingsOK((this.state.passwordOK && this.state.SSIDOK));
        });
    },

    render() {

        var running = (this.state.hotspot.Status === 'Started') ? true : false;

        return (
            <div className="section" style={{marginTop: '0px', height: '15px', width: '300px', right: '245px'}}>
                <h2>Settings</h2>

                <div className="settings">

                    <div className="sep"/>
                    <span>Hotspot Enabled</span>

                    <div className="toggler">
                        <input onClick={this.handelToggle} ref="hotspot-enabled" checked={((this.state.enabling && !this.state.disabling) ? true :((this.state.disabling) ? false : running))} type="checkbox" id="hotspot" className="toggle" style={{display:'none'}} />
                        <label htmlFor="hotspot" className="lbl"/>
                    </div>
                    <div className="sep"/>

                    <p className="input" >Hotspot SSID:</p>

                    <input ref="hotspot-ssid" onInput={this.validate.bind(this,'ssid')} defaultValue={localStorage.getItem('hotspot-ssid') || 'Netify Jump Hotspot'} className={this.state.SSIDOK ? '' : 'error'} />
                    <div className="sep"/>

                    <p className="input" >Hotspot Password:</p>
                    <input ref="hotspot-key" onInput={this.validate.bind(this,'password')} defaultValue={localStorage.getItem('hotspot-key') || ''}  className={this.state.passwordOK ? '' : 'error'}  type="password" />
                    <div className="sep"/>
                </div>

            </div>
        );
    }
});
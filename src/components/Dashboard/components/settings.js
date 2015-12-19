import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


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
            enabling: NetworkStore.getState().enabling
        };
    },

    componentWillMount() {
        NetworkStore.listen(this.update);
    },

    componentDidMount() {
        
    },

    componentWillUnmount() {
        NetworkStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                isCompatible: NetworkStore.getState().isCompatible,
                hotspot: NetworkStore.getState().hotspot,
                enabling: NetworkStore.getState().enabling
            });
        }
    },


    handelToggle(){

        var enabled = (this.state.hotspot.Status === 'Started') ? true : false;

        if(!enabled && !this.state.enabling){
            NetworkActions.enable(this.refs['hotspot-ssid'].value, this.refs['hotspot-key'].value);
        }else{
            NetworkActions.disable();
        }

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
                        <input onClick={this.handelToggle} ref="hotspot-enabled" checked={this.state.enabling ? true : running} type="checkbox" id="hotspot" className="toggle" style={{display:'none'}} />
                        <label htmlFor="hotspot" className="lbl"/>
                    </div>
                    <div className="sep"/>

                    <p className="input" >Hotspot SSID:</p>
                    <input ref="hotspot-ssid" defaultValue={this.state.hotspot['SSID name'] || ''} className="text" />
                    <div className="sep"/>

                    <p className="input" >Hotspot Password:</p>
                    <input ref="hotspot-key"  className="text"  type="password" />
                    <div className="sep"/>
                </div>

            </div>
        );
    }
});
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Status from './components/status';
import PC from './components/pc';
import Settings from './components/settings';
import WIFI from './components/wifi';
import BottomBar from './components/bottom';


import NetworkStore from '../../stores/networkEngineStore';
import NetworkActions from '../../actions/networkEngineActions';

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            online: NetworkStore.getState().online,
            isCompatible: NetworkStore.getState().isCompatible,
            settingsOK: NetworkStore.getState().settingsOK
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
                online: NetworkStore.getState().online,
                isCompatible: NetworkStore.getState().isCompatible,
                settingsOK: NetworkStore.getState().settingsOK
            });
        }
    },
    render() {

        return (
            <div className="main">

                <h1>Network Overview</h1>
                <object width="50px" type="image/svg+xml" data="images/Blank_globe.svg" className="globe"/>

                <div className="line vertical" style={{marginTop: '90px', height: '15px',marginBottom: '8px'}}/>

                <Status type="full" thinking={(typeof this.state.online === 'string')} checked={this.state.online} text="Internet"/>

                <div className="line vertical" style={{marginTop: '9px', height: '15px',marginBottom: '8px'}}/>

                <PC/>

                <div className="line horizontal left" style={{width: '230px',marginTop: '-55px'}}>
                    <div className="line curve left">
                        <div className="line vertical" style={{height: '30px', top:'20px', right: '11px'}}/>
                    </div>
                </div>
                <div className="line horizontal right" style={{width: '230px',marginTop: '-30px'}}>
                    <div className="line curve right ">
                        <div className="line vertical" style={{height: '6px', top:'20px', left: '10px'}}/>
                    </div>
                </div>

                <Status type="mini" style={{marginTop: '5px', right: '247px'}} checked={this.state.settingsOK}/>
                
                <Status type="mini"  thinking={(typeof this.state.isCompatible === 'string')} checked={this.state.isCompatible} style={{marginTop: '-20px', left: '249px'}}/>

                <div className="line vertical" style={{marginTop: '10px', height: '15px', marginBottom: '8px', right: '247px'}}/>

                <div className="line vertical" style={{marginTop: '-22px', height: '15px', marginBottom: '8px', left: '249px'}}/>
                <Settings />

                <WIFI />


                <div className="line horizontal right" style={{width: '230px', marginTop: '-135px'}}>
                    <div className="line curve up right"/>
                    <div className="line vertical" style={{height: '20px', top: '-40px', left: '134px'}}/>
                </div>

                <Status type="full" style={{left: '246px', marginTop: '-205px'}} checked={false} text="File Jump"/>
                <div className="line vertical" style={{height: '15px', top: '-43px', left: '249px'}} />
                <object width="55px" type="image/svg+xml" data="images/remote_storage_cloud_cloud_storage_folder.svg" className="jump"/>
                
                <BottomBar />
            </div>
        );
    }
});
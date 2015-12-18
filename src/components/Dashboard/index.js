import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Status from './components/status';
import PC from './components/pc';
import Settings from './components/settings';
import Clients from './components/clients';


export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {

        };
    },

    componentDidMount() {


        
    },

    componentWillUnmount() {



    },

    update() {
        if (this.isMounted()) {
            this.setState({

            });
        }
    },
    render() {

        return (
            <div className="main">

                <h1>Network Overview</h1>
                <object width="50px" type="image/svg+xml" data="images/Blank_globe.svg" className="globe"/>

                <div className="line vertical" style={{marginTop: '90px', height: '15px',marginBottom: '8px'}}/>

                <Status type="full" checked={true} text="Internet"/>

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

                <Status type="mini" style={{marginTop: '5px', right: '247px'}} checked={true}/>
                <Status type="mini" style={{marginTop: '-20px', left: '247px'}} checked={true}/>

                <div className="line vertical" style={{marginTop: '10px', height: '15px', marginBottom: '8px', right: '247px'}}/>

                <div className="line vertical" style={{marginTop: '-22px', height: '15px', marginBottom: '8px', left: '249px'}}/>
                <Settings />

                <Clients />


                <div className="line horizontal right" style={{width: '230px', marginTop: '-135px'}}>
                    <div className="line curve up right"/>
                    <div className="line vertical" style={{height: '20px', top: '-40px', left: '134px'}}/>
                </div>

                <Status type="full" style={{left: '241px', marginTop: '-205px'}} checked={true} text="File Jump"/>
                <div className="line vertical" style={{height: '15px', top: '-43px', left: '249px'}} />
                <object width="55px" type="image/svg+xml" data="images/remote_storage_cloud_cloud_storage_folder.svg" className="jump"/>

            </div>
        );
    }
});
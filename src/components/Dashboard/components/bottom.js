import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import shell from 'shell';
import Package from '../../../../package.json';


import updateStore from '../../../stores/updateStore';
import updateActions from '../../../actions/updateActions';


export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            update: updateStore.getState().update
        };
    },

    componentWillMount() {
        updateStore.listen(this.update);
    },

    componentWillUnmount() {
        updateStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                update: updateStore.getState().update
            });
        }
    },

    handelOpenURL(url){
		shell.openExternal(url);
    },

    render() {
        var updateText = this.state.update ? (<span className="update" onClick={updateActions.install.bind(this, this.state.update)}>Update Available</span>) : null;

        return (
            <div className="bottom-bar">
            	<i onClick={this.handelOpenURL.bind(this, 'https://github.com/luigiplr/netify-jump')} className="ion-social-github"/>
            	<i onClick={this.handelOpenURL.bind(this, 'https://twitter.com/luigiplr')} className="ion-social-twitter"/>
                <p className="version"><span onClick={this.handelOpenURL.bind(this, 'https://github.com/luigiplr/netify-jump/releases')}>v. {Package.version}</span>{updateText}</p>
        	</div>
        );
    }
});
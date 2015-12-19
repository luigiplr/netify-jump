import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import shell from 'shell';

export
default React.createClass({

    mixins: [PureRenderMixin],

    handelOpenURL(url){
		shell.openExternal(url);
    },

    render() {
        return (
            <div className="bottom-bar">
            	<i onClick={this.handelOpenURL.bind(this, 'https://github.com/luigiplr/netify-jump')} className="ion-social-github"/>
            	<i onClick={this.handelOpenURL.bind(this, 'https://twitter.com/luigiplr')} className="ion-social-twitter"/>
        	</div>
        );
    }
});
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
        var className = ((this.props.thinking) ? 'thinking': (this.props.checked) ? 'enabled' : 'disabled');
        var checkClass = ((this.props.thinking) ? 'ion-load-d': (this.props.checked) ? 'ion-checkmark-round' : 'ion-close-round');
        
        return (
            <div style={this.props.style || {}} className={'status '+ ((this.props.type === 'mini') ? 'check' : '')}>

                <div className={'check ' + className}>
                    <If test={(this.props.type === 'mini')}>
                        <div>
                            <div className="check-rip"/>
                            <div className="check-rip two"/>
                        </div>
                    </If>
                    <i className={checkClass}/>
                </div>
                <If test={(this.props.type === 'full')}>
                    <span>{this.props.text}</span>
                </If>
            </div>
        );
    }
});
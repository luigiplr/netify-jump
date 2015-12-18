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
            <div style={this.props.style || {}} className={'status '+ ((this.props.type === 'mini') ? 'check' : '')}>
                <div className="check">
                    <If test={(this.props.type === 'mini')}>
                        <div>
                            <div className="check-rip"/>
                            <div className="check-rip two"/>
                        </div>
                    </If>
                    <i className="ion-checkmark-round"/>
                </div>
                <If test={(this.props.type === 'full')}>
                    <span>{this.props.text}</span>
                </If>
            </div>
        );
    }
});
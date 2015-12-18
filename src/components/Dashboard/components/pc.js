import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({

    mixins: [PureRenderMixin],

    render() {
        return (
            <div className={'pc '+ process.platform}>
                <object type="image/svg+xml" data="images/Windows_logo.svg"/>
            </div>
        );
    }
});
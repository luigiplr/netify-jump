import React from 'react';
import {
    History
}
from 'react-router';
import HeaderStore from './store';
import HeaderActions from './actions';


export
default React.createClass({

    mixins: [History],

    getInitialState() {
        return {
            maximized: false,
            minimized: false
        };
    },
    componentWillMount() {
        HeaderStore.listen(this.update);
    },
    componentWillUnmount() {
        HeaderStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {

            var headerState = HeaderStore.getState();

            this.setState({
                maximized: headerState.maximized,
                minimized: headerState.minimized
            });
        }
    },
    render() {
        return (
            <header>
                <div className="controls win32">
                    <div className="close" onClick={HeaderActions.close}>
                        <i className="ion-ios-close-empty"></i>
                    </div>
                    <div className="toggle" onClick={HeaderActions.toggleMaximize}>
                        <i></i>
                        <i></i>
                    </div>
                    <div className="minimize" onClick={HeaderActions.toggleMinimize}>
                        <i></i>
                    </div>
                </div>
                <h1>Netify Jump</h1>
            </header>
        );
    }
});
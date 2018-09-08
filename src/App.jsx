import React from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/lib/raised-button';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles/base.less';

const App = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <div className='App'>
                {this.props.children}
            </div>
        );
    },

    handelList() {
      this.context.router.push('/lists');
    },

    handelLogIn() {
      this.context.router.push('/login');
    }
});

export default App;

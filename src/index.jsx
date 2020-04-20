import './styles/app.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return <h1>Welcome to uVote</h1>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

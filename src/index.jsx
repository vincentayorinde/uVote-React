import './styles/app.scss';
import './styles/materia-bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery'
import 'popper.js/dist/popper';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/layout/Header';

class App extends Component {
    render() {
        return <Header />;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

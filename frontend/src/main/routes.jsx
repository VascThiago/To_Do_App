import React from "react";
import { Redirect, Route, Router, hashHistory } from 'react-router';

import Todo from '../todo/todo';
import About from '../about/about';

export default props => (
    <Router history={hashHistory}>
        <Route path='/todos' component={Todo} />
        <Route path='/about' component={About} />

        <Redirect path='*' to='/todos' />
    </Router>
)
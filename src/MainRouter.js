import React from 'react';
import { BrowserRouter as Router, Route, Switch/*, Redirect*/ } from 'react-router-dom';
//import EventBus from './services/EventBus';

import PageNotFound from './PageNotFound';
import LandingView from './LandingView';
import DashboardView from './DashboardView';
import TestView from './TestView';

//import PrivateRoute from './PrivateRoute';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path = '/' component = { LandingView }/>
            <Route exact path = '/test' component = { TestView }/>
            <Route exact path = '/dashboard' component = { DashboardView}/>
            <Route component = { PageNotFound }/>
        </Switch>
    </Router>
)

export default Routes;
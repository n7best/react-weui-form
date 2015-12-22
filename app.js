"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route} from 'react-router';
import Home from './pages/home';
import All from './pages/all';
import SignupDemo from './pages/signupdemo';

ReactDOM.render((
<Router>
  <Route path="/" component={Home}/>
  <Route path="all" component={All}/>
  <Route path="signup" component={SignupDemo}/>
</Router>
), document.getElementById('container'));
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//App Entry/Control
import App from './modules/app/components/App';

//Location Calculator
import LocationCalculator from './modules/calculator/components/index';


export default ( 
  <Route path="/" component={ App }>
    <IndexRoute component={ LocationCalculator }/>
   	<Route path="users" component={ LocationCalculator }/>
  </Route>
);

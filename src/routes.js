import React from 'react';
import { Route, IndexRoute } from 'react-router';

//App Entry/Control
import App from './modules/app/components/App';

//Users
import AllUsers from './modules/users/components/AllUsers';


export default ( 
  <Route path="/" component={App}>
    <IndexRoute component={AllUsers}/>
   	<Route path="users" component={AllUsers}/>
  </Route>
);

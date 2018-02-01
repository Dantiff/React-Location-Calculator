import React from 'react';
import { Route, IndexRoute } from 'react-router';

//App Entry/Control
import App from './modules/app/components/App';
import LoggedIn from './modules/app/components/LoggedIn';

//Users
import AllUsers from './modules/users/components/AllUsers';


export default ( 
  <Route path="/" component={App}>
    <Route component={LoggedIn}>
      <Route path="users" component={AllUsers}/>
    </Route>
  </Route>
);

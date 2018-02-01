import React from 'react';
import { Route, IndexRoute } from 'react-router';

//App Entry/Control
import App from './modules/app/components/App';
import LoggedIn from './modules/app/components/LoggedIn';

//Sessions/Auth
import LogInPage from './modules/auth/components/LogInPage';
import Forgot from './modules/auth/components/Forgot';
import Reset from './modules/auth/components/Reset';
import ResetSuccess from './modules/auth/components/ResetSuccess';
import LogOut from './modules/auth/components/LogOut';

//Users
import AllUsers from './modules/users/components/AllUsers';
import ChangePassword from './modules/users/components/ChangePassword';

//Clients
import AllClients from './modules/clients/components/AllClients';
import Client from './modules/clients/components/Client';


export default ( 
  <Route path="/" component={App}>
    <IndexRoute component={LogInPage}/>
    <Route path="forgot-password" component={Forgot} />
    <Route path="password_resets/:tokenId/edit" name="reset-password" component={Reset} />
    <Route path="password_resets/success" name="reset-password-success" component={ResetSuccess} />
    <Route component={LoggedIn}>
      <Route path="users" component={AllUsers}/>
      <Route path="/LogOut" component={LogOut}/>
      <Route path="change_password" name="change_password" component={ChangePassword}/>
      <Route path="clients" name="clients" component={AllClients}/>
      <Route path="clients/:fingerprint" name="view-client" component={Client} />
    </Route>
  </Route>
);

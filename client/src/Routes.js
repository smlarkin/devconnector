import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Login,
  Register,
  Landing,
  Dashboard,
  PrivateRoute,
  CreateProfile,
} from './components'

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-profile" component={CreateProfile} />
      <Route component={Landing} />
    </Switch>
  )
}

export default Routes

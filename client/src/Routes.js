import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Login,
  Register,
  Landing,
  Dashboard,
  EditProfile,
  PrivateRoute,
  CreateProfile,
  AddExperience,
  AddEducation,
  Profiles,
  Profile,
} from './components'

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profiles/:handle" component={Profile} />
      <Route path="/profiles" component={Profiles} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-profile" component={CreateProfile} />
      <PrivateRoute path="/edit-profile" component={EditProfile} />
      <PrivateRoute path="/add-experience" component={AddExperience} />
      <PrivateRoute path="/add-education" component={AddEducation} />
      <Route component={Landing} />
    </Switch>
  )
}

export default Routes

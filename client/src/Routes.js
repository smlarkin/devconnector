import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login, Register, Landing } from './components'

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={Landing} />
    </Switch>
  )
}

export default Routes

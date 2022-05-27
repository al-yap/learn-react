import React from 'react'
import { Route, Switch } from 'react-router-dom'    // export 'Switch' (imported as 'Switch') was not found in 'react-router-dom' in v6.3.0. Downgrade to ver 5.2.0
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Menu from './core/Menu'

const MainRouter = () => {
    return (    
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                <Route path="/user/:userId" component={Profile}/>
            </Switch>
        </div>
    )
}

export default MainRouter
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Posts from '../pages/posts/posts';
import Register from '../pages/register/register';
import Users from '../pages/users/users';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/login" component={Register}/>
                <Route exact path="/register" component={Login}/>
                <Route exact path="/posts" component={Posts}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Navigation
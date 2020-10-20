import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/protectedRoute';
import CreatePost from '../pages/createPost/createPost';
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
                <ProtectedRoute exact path="/users" component={Users}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <ProtectedRoute path="/posts" component={Posts}/>
                <ProtectedRoute path="/createpost" component={CreatePost}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Navigation
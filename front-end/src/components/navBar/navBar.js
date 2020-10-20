import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../utils/context';
import NavButton from '../navButton/navButton';
const NavBar = () => {

    const { loggedIn, logOut } = useContext(UserContext);

    const postsButton = loggedIn ? <NavButton title="Posts" href="/posts"/>: null;
    const usersButton = loggedIn ? <NavButton title="Users" href="/users"/> : null;

    const loginButton = loggedIn ? 
    <li className="nav-item">
        <Link className = "nav-link justify-content-end text-dark" onClick={logOut}>Logout</Link>
    </li>
     : <NavButton title="Login" href="/login"/>

    const registerButton = loggedIn ? null : <NavButton title="Register" href="/register"/>
    const createPostButton = loggedIn ? <NavButton title="Create Post" href="/createpost"/> :  null    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 ">
            <Link className="navbar-brand" to="/"><h2>PostSite</h2></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-grow-1 text-right " id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto flex-nowrap" >
                    <NavButton title="Home" href="/"/>
                    {postsButton}
                    {usersButton}
                    {loginButton}
                    {registerButton}
                    {createPostButton}
                </ul>
            </div>
        </nav >
    )
}

export default NavBar;
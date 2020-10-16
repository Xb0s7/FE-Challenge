import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 ">
            <Link className="navbar-brand" to="#"><h2>PostSite</h2></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-grow-1 text-right " id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto flex-nowrap" >
                    <li className="nav-item">
                        <Link className="nav-link justify-content-end text-dark " to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/posts">Posts</Link>
                    </li >
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default NavBar;
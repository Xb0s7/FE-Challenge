import React from 'react';
import {Link} from 'react-router-dom';

const NavButton = ({title, href}) => {
    return (
        <li className="nav-item">
            <Link to={href} className="nav-link justify-content-end text-dark" >
                {title}
            </Link>
        </li>
    )
}

export default NavButton
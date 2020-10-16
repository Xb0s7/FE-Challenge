import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/wrapper/wrapper';
import UserContext from '../../utils/context';

const Home = () => {
    const { loggedIn, user } = useContext(UserContext);
    let welcomeTag = null
    console.log(user)
    if (loggedIn) {
        welcomeTag = <span >Welcome: {user.firstName} {user.lastName}</span>
    }
    else {
        welcomeTag = 'Welcome to our Company Website';
    }

    const showRegister = loggedIn ? null : <Link className="btn btn-primary btn-lg m-2 " to="register" role="button">Register</Link>;
    return (
        <Wrapper>
            <div className='d-flex  vh-100 w-100  flex-row align-items-center'>
                <div className="jumbotron text-center w-100 ">
                    <h1 className="display-4">{welcomeTag}</h1>
                    <p className="lead">Here you can be in touch with the lastest news of the company and around the world. </p>
                    <hr className="my-4" />
                    <p>Join our comunity or check our latest posts.</p>
                    {showRegister}
                    <Link className="btn btn-primary btn-lg m-2" to="posts" role="button">Posts</Link>
                </div>
            </div>
        </Wrapper>
    )
}

export default Home
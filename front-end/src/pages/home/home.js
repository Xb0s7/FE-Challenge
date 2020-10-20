import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/wrapper/wrapper';
import UserContext from '../../utils/context';

const Home = () => {
    const { loggedIn, user } = useContext(UserContext);

    const welcomeTag = loggedIn ? <span >Welcome: {user.firstName} {user.lastName}</span> : 'Welcome to our Company Website'; 

    const showRegister = loggedIn ? <Link className="btn btn-primary btn-lg m-2" to="posts" role="button">Posts</Link> 
    : <Link className="btn btn-primary btn-lg m-2 " to="register" role="button">Register</Link>;

    const noteText = loggedIn ? <p>Checkout our newest posts here.</p> : <p>Join our comunity to check our latest posts.</p>
    return (
        <Wrapper>
            <div className='d-flex  vh-100 w-100  flex-row align-items-center'>
                <div className="jumbotron text-center w-100 ">
                    <h1 className="display-4">{welcomeTag}</h1>
                    <p className="lead">Here you can be in touch with the lastest news of the company and around the world. </p>
                    <hr className="my-4" />
                    {noteText}
                    {showRegister}
                </div>
            </div>
        </Wrapper>
    )
}

export default Home
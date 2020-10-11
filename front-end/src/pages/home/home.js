import React from 'react';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navBar/navBar';

const Home = () => {
    return (
        <div className='d-flex  h-100 w-100  flex-column align-items-center'>
            <NavBar />
            <div className='d-flex  h-100 w-100  flex-row align-items-center'>
                <div className="jumbotron text-center w-100 ">
                    <h1 className="display-4">Welcome to our Company Website</h1>
                    <p className="lead">Here you can be in touch with the lastest news of the company and around the world. </p>
                    <hr className="my-4" />
                    <p>Join our comunity or check our latest posts.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
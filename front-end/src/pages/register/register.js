import React, { useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import { registerUser } from '../../api/index.js'; 

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [preferedPostsCategory] = useState('All');
    const [preferedUsersCategory] = useState('All');
    const [postedIn] = useState([]);
    const [titles] = useState([]);
    

    const handleSubmit = (e) => {
        registerUser(e, props, email, password, firstName, lastName, imgUrl, preferedPostsCategory, preferedUsersCategory, postedIn, titles)
    }

    return (
        <Wrapper>
            <div className='d-flex  vh-100 w-100  flex-row align-items-center justify-content-center text-dark'>
                <form onSubmit={handleSubmit} className='w-50 rounded d-flex bg-light flex-column justify-content-center align-items-center p-3'>
                    <div className="form-group d-flex flex-column text-center w-100 justify-content-center align-items-center ">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control w-50 " id="inputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group d-flex flex-row p-1 w-100 justify-content-center align-items-center ">
                        <label htmlFor="inputName" className='p-1 col-5'>First Name
                    <input type="text" className="form-control" id="inputName1" onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label htmlFor="inputName" className='col-5'>Last Name
                    <input type="text" className="form-control  " id="inputName" onChange={(e) => setLastName(e.target.value)} />
                        </label>
                    </div>
                    <div className="form-group d-flex flex-column text-center w-75 justify-content-center align-items-center">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" className="form-control w-100" id="img" onChange={(e) => setImgUrl(e.target.value)} />
                    </div>
                    <div className="form-group d-flex flex-column text-center w-50 justify-content-center align-items-center">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control w-100" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group d-flex flex-column text-center w-50 justify-content-center align-items-center">
                        <label htmlFor="exampleInputPassword1">Re-Password</label>
                        <input type="password" className="form-control w-100" id="inputRePassword" />
                    </div>
                    <button type="submit" className="btn btn-primary text-center m-2 btn-lg ">Register</button>
                </form>
            </div>
        </Wrapper>
    )
}

export default Register
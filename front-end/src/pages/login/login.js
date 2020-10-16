import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/wrapper/wrapper';
import UserContext from '../../utils/context';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useContext(UserContext)
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const promise = await fetch('http://localhost:3000/users');
            const users = await promise.json();
            const user = users.find(user => user.email === email);
          

            if (user && user.password === password) {
                console.log(user);
                logIn(user);
                document.cookie = `Authenticated=${user.email}`;
                props.history.push('/');
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (

        <Wrapper>
            <div className='d-flex  vh-100 w-100  flex-row align-items-center justify-content-center text-dark'>
                <form onSubmit={handleSubmit} className='w-25 rounded d-flex bg-light flex-column justify-content-center align-items-center p-5'>
                    <div className="form-group text-center w-100">
                        <label hmtlfor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control w-100 " id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-center w-100">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control w-100" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg  text-center m-2 ">Login</button>
                    <p className='m-2'>
                        You dont have an account?
                            <Link to="register"> Register Now!</Link>
                    </p>
                </form>
            </div>
        </Wrapper>
    )
}

export default Login
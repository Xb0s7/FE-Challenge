import React, { useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';

 
const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [preferedCategory, setCategory] = useState('All')
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const promise = await fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    imgUrl,
                    preferedCategory    
                }),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            const response = await promise.json();
            if (response.email) {
                props.history.push('/login');
            }
        }
        catch (e){
            console.log(e)
        }
    }
    return (
        <Wrapper>
            <div className='d-flex  vh-100 w-100  flex-row align-items-center justify-content-center text-dark'>
            <form onSubmit={handleSubmit} className='w-50 rounded d-flex bg-light flex-column justify-content-center align-items-center p-3'>
                <div className="form-group d-flex flex-column text-center w-100 justify-content-center align-items-center ">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control w-50 " id="inputEmail1" aria-describedby="emailHelp" onChange={(e)=> setEmail(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group d-flex flex-row p-1 w-100 justify-content-center align-items-center ">
                    <label htmlFor="inputName" className='p-1 col-5'>First Name
                    <input type="text" className="form-control" id="inputName1" onChange={(e)=>setFirstName(e.target.value)}/>
                    </label>
                    <label htmlFor="inputName" className='col-5'>Last Name
                    <input type="text" className="form-control  " id="inputName" onChange={(e)=>setLastName(e.target.value)}/>
                    </label>
                </div>
                <div className="form-group d-flex flex-column text-center w-75 justify-content-center align-items-center">
                    <label htmlFor="image">Image URL</label>
                    <input type="text" className="form-control w-100" id="img" onChange={(e)=> setImgUrl(e.target.value)}/>
                </div>
                <div className="form-group d-flex flex-column text-center w-50 justify-content-center align-items-center">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control w-100" id="inputPassword" onChange={(e)=> setPassword(e.target.value)}/>
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
import React, { useContext, useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import UserContext from '../../utils/context';

const CreatePost = () => {

    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [content, setContent] = useState("");
    const [creator] = useState(`${user.firstName} ${user.lastName}`)
    const [alert, setAlert] = useState(null);

    const updateUser = async () => {
        let postedIn;
        let titles;

        if(!user.postedIn.includes(category)){
            postedIn = [...user.postedIn, category];
            titles = [...user.titles, title];
        } else{
            titles = [...user.titles, title];
            postedIn = [...user.postedIn];
        }
        try {
            const promise = await fetch(`http://localhost:4000/users/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    postedIn,
                    titles
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        catch(e){
            console.log(e)
        }
        console.log(user.postedIn.includes(category))
        if(!user.postedIn.includes(category)){
            user.titles = [...user.titles, title];
            user.postedIn = [...user.postedIn, category];
        } else{
            user.titles = [...user.titles, title];
            user.postedIn = [...user.postedIn];
        }
    }
    const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const promise = await fetch("http://localhost:4000/posts", {
                    method: 'POST',
                    body: JSON.stringify({
                        title,
                        category,
                        imgUrl,
                        content,
                        creator
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const response = await promise.json();
                if (response.title) {
                    setAlert(
                        <div className="alert alert-success alert-dismissible fade show m-3" role="alert">
                            Post created successfully!
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>)
                }
            } catch (e) {
                console.log(e)
            }
            updateUser()
    }
        useEffect(() => {
            console.log(category);
        })
        return (
            <Wrapper>
                <div className='d-flex  vh-100 w-100  flex-row align-items-center justify-content-center text-dark'>
                    <form onSubmit={handleSubmit} className='w-50 h-75 rounded d-flex bg-light flex-column justify-content-center align-items-center p-3'>
                        <p className="display-4 p-4">Create Post</p>
                        <div className="input-group input-group-lg m-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-lg">Title</span>
                            </div>
                            <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="input-group m-3 ">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01" onChange={(e) => setCategory(e.target.value)}>
                                <option >Choose Category</option>
                                <option value="Cars">Cars</option>
                                <option value="Life">Life</option>
                            </select>
                        </div>
                        <div className="input-group m-3 ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">IMG URL</span>
                            </div>
                            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e) => setImgUrl(e.target.value)} />
                        </div>
                        <div className="input-group m-3 ">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Content</span>
                            </div>
                            <textarea className="form-control" aria-label="With textarea" onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary text-center m-2 btn-lg ">Create</button>
                        {alert}
                    </form>
                </div>
            </Wrapper>
        )
    }

    export default CreatePost
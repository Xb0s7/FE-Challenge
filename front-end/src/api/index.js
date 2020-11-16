import React from 'react';


export const createPost = async (e, title, category, imgUrl, content, creator, setAlert) => {
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
}

export const updateUser = async (id, postedIn, titles) => {
    
    try {
        const promise = await fetch(`http://localhost:4000/users/${id}`, {
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
    catch (e) {
        console.log(e)
    }
}

export const logInUser = async (e, props, email, password, logIn) => {
        
    e.preventDefault()

    try {
        const promise = await fetch('http://localhost:4000/users');
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

export const registerUser = async (e, props,  email, password, firstName, lastName, imgUrl, preferedPostsCategory, preferedUsersCategory, postedIn, titles) => {
    e.preventDefault();

    try {
        const promise = await fetch('http://localhost:4000/users', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                imgUrl,
                preferedPostsCategory,
                preferedUsersCategory,
                postedIn,
                titles
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await promise.json();
        console.log(props);
        if (response.email) {
            props.history.push('/login');
        }
    }
    catch (e) {
        console.log(e)
    }
}
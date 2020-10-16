import React, { useEffect, useState } from 'react';
import Post from '../../components/postCard/post';
import Wrapper from '../../components/wrapper/wrapper';

const Posts = () => {
    const [postsToRender, setPostsToRender] = useState([]);
    const [filter, setFilter] = useState('');
    const [allPosts, setAllPosts] = useState([]);

    const getPostsToRender = async () => {
        const promise = await fetch('http://localhost:3000/posts');
        const posts = await promise.json();
        const postsToRender = await posts.map(post => {
            return <Post key={post.id} {...post} />
        })
        setPostsToRender(postsToRender);
        setAllPosts(postsToRender)

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const news = allPosts.filter(post => post.props.title.toLowerCase().includes(filter.toLowerCase()))
        console.log(news)
        setPostsToRender(news)
    }
    const onChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }
    useEffect(() => {
        getPostsToRender();
    },[])

    return (

        <Wrapper>
            <div className="d-flex flex-row justify-content-center align-items-start">
            <div className='text-white w-25'>
                <p>dropdown</p>
            </div>
            <div className="d-flex flex-column w-100 ">

            <form className="form d-flex justify-content-end my-lg-0 p-3 " onSubmit={(e) => onSubmit(e)}>
                <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={(e) => onChange(e)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            {postsToRender}
            </div>
            
            </div>
        </Wrapper>

    )
}

export default Posts
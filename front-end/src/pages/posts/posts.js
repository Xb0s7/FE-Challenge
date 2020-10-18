import React, { useContext, useEffect, useState } from 'react';
import Post from '../../components/postCard/post';
import Wrapper from '../../components/wrapper/wrapper';
import UserContext from '../../utils/context';


const Posts = () => {
    const [postsToRender, setPostsToRender] = useState([]);
    const [filter, setFilter] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [isOrdered, setOrdered] = useState(false);

    const { user, loggedIn } = useContext(UserContext);

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
        const newPosts = allPosts.filter(post => post.props.title.toLowerCase().includes(filter.toLowerCase()))
        setPostsToRender(newPosts)
    }
    const onChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    const sort = (e) => {
        e.preventDefault();

        if (!isOrdered) {
            setOrdered(true);
            const orderedPosts = postsToRender.sort((a, b) => a.props.title.localeCompare(b.props.title))
            const newPosts = orderedPosts.filter(post => typeof post.props.title == 'string')
            return setPostsToRender(newPosts);
        } else {
            setOrdered(false);
            const orderedPosts = postsToRender.sort((b, a) => a.props.title.localeCompare(b.props.title))
            const newPosts = orderedPosts.filter(post => typeof post.props.title == 'string')
            return setPostsToRender(newPosts);
        }
    }
    const updateCategory = async (category) => {
        user.preferedCategory = category;
        const promise = await fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                preferedCategory: category
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const categorize = (category) => {
        updateCategory(category);
        switch (category) {
            case 'All':
                return setPostsToRender(allPosts);
            case 'Cars':
                const carPosts = allPosts.filter(post => post.props.category == 'Cars')
                return setPostsToRender(carPosts);
            case 'Life':
                const lifePosts = allPosts.filter(post => post.props.category == 'Life')
                return setPostsToRender(lifePosts);
            default:
                break;
        }
    }

    useEffect(() => {
        getPostsToRender();
    }, [])

    const menu = loggedIn ? 
    <div className="dropdown w-25 p-3 d-flex justify-content-start">
        <button className="btn btn-secondary dropdown-toggle w-75" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
    </button>
        <div className="dropdown-menu w-75" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button" onClick={(e) => { categorize('All') }}>All</button>
            <button className="dropdown-item" type="button" onClick={(e) => { categorize('Cars') }}>Cars</button>
            <button className="dropdown-item" type="button" onClick={(e) => { categorize('Life') }}>Life</button>
        </div>
    </div> : <div className=" w-25"></div> 
    
    return (

        <Wrapper>
            <div className="d-flex flex-row justify-content-center align-items-start w-100">
                {menu}
                <div className="d-flex flex-column w-100 ">
                    <div className="d-flex flex-row w-100 align-items-center justify-content-end pr-3">

                        <form className="form d-flex justify-content-end my-lg-0 p-3 w-100" onSubmit={(e) => onSubmit(e)}>
                            <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={(e) => onChange(e)} />
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>

                        </form>
                        <button className="btn btn-outline-primary" onClick={(e) => sort(e)}>Sort</button>
                    </div>
                    {postsToRender}
                </div>

            </div>
        </Wrapper>

    )
}

export default Posts
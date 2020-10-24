import React, { useContext, useEffect, useState } from 'react';
import Post from '../../components/postCard/post';
import Wrapper from '../../components/wrapper/wrapper';
import UserContext from '../../utils/context';
import ReactPaginate from 'react-paginate';
import styles from '../posts/posts.module.css';
import SearchBar from '../../components/search/search';
import CategoryMenu from '../../components/categoryMenu/categoryMenu';


const Posts = () => {
    const [postsToRender, setPostsToRender] = useState([]);
    const [filter, setFilter] = useState('');
    const [allPosts] = useState([]);
    const [postsToMap, setPostsToMap] = useState([]);
    const [isOrdered, setOrdered] = useState(false);

    const [startingIndex, setStartingIndex] = useState(0);
    const [perPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const { user } = useContext(UserContext);

    const getPostsToRender = async () => {

        const promise = await fetch('http://localhost:4000/posts');
        const posts = await promise.json();
        console.log(posts)
        const allPosts = posts.map(post => {
            return <Post key={post.id} {...post} />
        })
        console.log(allPosts);
        if (user.preferedPostsCategory !== 'All') {

            const postsToMap = posts.filter(post => post.category === user.preferedPostsCategory);
            setPostsToMap(postsToMap);
            setPageCount(Math.ceil(postsToMap.length / perPage));
            const postsToSlice = await postsToMap.map(post => {
                return <Post key={post.id} {...post} />
            })
            const postsToRender = postsToSlice.slice(startingIndex, startingIndex + perPage);
            setPostsToRender(postsToRender);
        } else {
            const postsToMap = posts;
            setPostsToMap(posts);
            setPageCount(Math.ceil(postsToMap.length / perPage));
            const postsToRender = allPosts.slice(startingIndex, startingIndex + perPage);
            setPostsToRender(postsToRender);
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const startingIndex = selectedPage * perPage;
        setStartingIndex(startingIndex);
        setCurrentPage(selectedPage);

        const newPosts = postsToMap.slice(startingIndex, startingIndex + perPage);
        const newPostsToRender = newPosts.map(post => {
            return <Post key={post.id} {...post} />
        })
        setPostsToRender(newPostsToRender);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newPosts = postsToMap.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()))
        const newPostsToRender = newPosts.map(post => {
            return <Post key={post.id} {...post} />
        })
        const postsFiltered = newPostsToRender.slice(startingIndex, startingIndex + perPage);
        setPostsToRender(postsFiltered);
        setPageCount(Math.ceil(newPosts.length / perPage))

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
            const newPosts = orderedPosts.filter(post => typeof post.props.title === 'string')
            return setPostsToRender(newPosts);
        } else {
            setOrdered(false);
            const orderedPosts = postsToRender.sort((b, a) => a.props.title.localeCompare(b.props.title))
            const newPosts = orderedPosts.filter(post => typeof post.props.title === 'string')
            return setPostsToRender(newPosts);
        }
    }
    const updateCategory = async (category) => {
        user.preferedPostsCategory = category;
        const promise = await fetch(`http://localhost:4000/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                preferedPostsCategory: category
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        getPostsToRender();
    }
    const categorize = (category) => {
        updateCategory(category);
        switch (category) {
            case 'All':
                return setPostsToRender(allPosts);
            case 'Cars':
                const carPosts = allPosts.filter(post => post.props.category === 'Cars')
                console.log(allPosts)
                return setPostsToRender(carPosts);
            case 'Life':
                const lifePosts = allPosts.filter(post => post.props.category === 'Life')
                return setPostsToRender(lifePosts);
            default:
                break;
        }
    }

    useEffect(() => {
        getPostsToRender();
    }, [])


    return (
        <Wrapper>
            <div className="d-flex flex-row justify-content-center align-items-start w-100">
                <CategoryMenu categorize={categorize}/>
                <div className="d-flex flex-column w-100 ">
                    <div className="d-flex flex-row w-100 align-items-center justify-content-end pr-3">
                        <SearchBar submit={onSubmit} change={onChange}></SearchBar>
                        <button className="btn btn-outline-primary" onClick={(e) => sort(e)}>Sort</button>
                    </div>
                    {postsToRender}
                    <div className="w-50 d-flex justify-content-end p-2">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={styles["pagination"]}
                            subContainerClassName={styles["pages-pagination"]}
                            activeClassName={styles["active"]} />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Posts
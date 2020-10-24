import React, { useContext, useEffect, useRef, useState } from 'react';
import User from '../../components/userCard/user';
import Wrapper from '../../components/wrapper/wrapper';
import styles from '../users/users.module.css'
import UserContext from '../../utils/context';
import ReactPaginate from 'react-paginate';
import SearchBar from '../../components/search/search';
import CategoryMenu from '../../components/categoryMenu/categoryMenu';

const Users = () => {

    const [usersToRender, setUsersToRender] = useState([]);
    const [filter, setFilter] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [usersToMap, setUsersToMap] = useState([]);

    const [startingIndex, setStartingIndex] = useState(0);
    const [perPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const { user } = useContext(UserContext);

    const getUsersToRender = async () => {

        const promise = await fetch('http://localhost:4000/users');
        const users = await promise.json();
        console.log(users);
        const allUsers = users.map(user => {
            return <User key={user.id} {...user} />
        })
        setAllUsers(allUsers);
        if (user.preferedUsersCategory !== 'All') {

            const usersToMap = users;
            setUsersToMap(usersToMap);
            setPageCount(Math.ceil(usersToMap.length / perPage));
            const usersToSlice = await usersToMap.map(user => {
                return <User key={user.id} {...user} />
            })
            const usersToRender = usersToSlice.slice(startingIndex, startingIndex + perPage);
            setUsersToRender(usersToRender);
        } else {
            const usersToMap = users;
            setUsersToMap(users);
            setPageCount(Math.ceil(usersToMap.length / perPage));
            const postsToRender = allUsers.slice(startingIndex, startingIndex + perPage);
            setUsersToRender(postsToRender);
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const startingIndex = selectedPage * perPage;
        setStartingIndex(startingIndex);
        setCurrentPage(selectedPage);

        const newUsers = usersToMap.slice(startingIndex, startingIndex + perPage);
        const newUsersToRender = newUsers.map(post => {
            return <useRef key={post.id} {...post} />
        })
        setUsersToRender(newUsersToRender);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newUsers = usersToMap.filter(user =>
        user.firstName.toLowerCase().includes(filter.toLowerCase()) || user.lastName.toLowerCase().includes(filter.toLowerCase()))
        const newUsersToRender = newUsers.map(user => {
            return <User key={user.id} {...user} />
        })
        const usersFiltered = newUsersToRender.slice(startingIndex, startingIndex + perPage);
        setUsersToRender(usersFiltered);
        setPageCount(Math.ceil(newUsers.length / perPage))

    }
    const onChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    const updateCategory = async (category) => {
        user.preferedUsersCategory = category;
        const promise = await fetch(`http://localhost:4000/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                preferedUsersCategory: category
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
                return setUsersToRender(allUsers);
            case 'Cars':
                console.log(allUsers)
                const carPostedUsers = allUsers.filter(user => user.props.postedIn.includes('Cars'))
                return setUsersToRender(carPostedUsers);
            case 'Life':
                const lifePostedUsers = allUsers.filter(user => user.props.postedIn.includes('Life'));
                return setUsersToRender(lifePostedUsers );
            default:
                break;
        }
    }

    useEffect(() => {
        getUsersToRender();
    }, [])


    return (
        <div>
            <Wrapper>
                <div className="d-flex flex-wrap flex-row justify-content-center align-items-center w-75  ">
                    <div className="d-flex w-100 ">
                    <CategoryMenu categorize={categorize} />
                        <div className="d-flex flex-row w-100 align-items-center justify-content-end pr-3">
                            <SearchBar submit={onSubmit} change={onChange}></SearchBar>
                        </div>
                    </div>
                    {usersToRender}
                    <div className="w-100 d-flex justify-content-center p-2">
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
            </Wrapper>
        </div >
    )
}

export default Users
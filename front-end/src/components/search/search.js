import React from 'react';

const SearchBar = (props) => {
    console.log(props);
    return (
        <form className="form d-flex justify-content-end my-lg-0 p-3 w-100" onSubmit={(e) => props.submit(e)}>
            <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={(e) => props.change(e)} />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}

export default SearchBar
import React from 'react';

const CategoryMenu = (props) => {
    
    return(
        <div className="dropdown w-25 p-3 d-flex justify-content-start">
            <button className="btn btn-secondary dropdown-toggle w-75" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
            </button>
            <div className="dropdown-menu w-75" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button" onClick={() => { props.categorize('All') }}>All</button>
                <button className="dropdown-item" type="button" onClick={() => { props.categorize('Cars') }}>Cars</button>
                <button className="dropdown-item" type="button" onClick={() => { props.categorize('Life') }}>Life</button>
            </div>
        </div> 
    )
}

export default CategoryMenu
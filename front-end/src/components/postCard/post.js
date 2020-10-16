import React from 'react';
const Post = ({ imgUrl, title, content }) => {

    return (
        <div className="card m-3 d-flex h-100 w-75 flex-column  justify-content-center">
            <div className="w-100 h-50">
            <img src={imgUrl} className='card-img-top h-50' alt="post IMG"/>
            </div>
            <div className="card-body h-100">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{content.slice(0,200) + "..."}</p>
            </div>
        </div>
    )
}

export default Post
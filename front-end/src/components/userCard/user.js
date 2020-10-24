import React from 'react';


const User = ({ firstName, lastName, titles, imgUrl, id }) => {
    let titlesToRender;
    if(titles.length > 5){
        let sliced = titles.slice(titles.length-5, titles.length)
        titlesToRender = sliced.map((title,index) => {
            return <p key={index}>- {title}</p>
        })
    } else {
        titlesToRender = titles.map((title,index) => {
            return <p key={index}>- {title}</p>
        })
    }
    return (
        <div className="card col-3 m-2">
            <img className="card-img-top mt-2 rounded-circle" src={imgUrl} alt="Card image cap" />
            <div className="card-body">
                <h3 className="card-title">{firstName} {lastName}</h3>
                <p className="card-text"></p>
                <button type="button" className="btn btn-dark w-75" data-toggle="collapse" data-target={`#demo${id}`}>Check Titles</button>
                <div id={`demo${id}`} className="collapse pt-3">
                    {titlesToRender}
                </div>
            </div>
        </div>
    )
}

export default User 
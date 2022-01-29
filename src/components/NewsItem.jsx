import React from 'react'

const NewsItem = (props) => {
    
        let {title, description, imgUrl, newsUrl, author, date, source} = props;
        return (
            <>
                <div className="card my-3" style={{height : "66vh"}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex : "1", left : "86%"}}>{source}</span>
                <img src={imgUrl} className="card-img-top" alt="..." style={{height : "25vh"}}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small class="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target ="_blank" className="btn btn-sm btn-dark">Read more...</a>
                </div>
                </div>
            </>
        )
    
}

export default NewsItem;

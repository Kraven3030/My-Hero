import React from 'react';
import { Link } from "react-router-dom";

function ComicResults({ id, thumbnail, title }) {

    return (
        <Link to={`/comics/${id}`}>
            <div>
                <img src={thumbnail} alt="thumbnail" />
                <h1 className="">{title}</h1>
            </div>
        </Link>
    )
}
export default ComicResults;

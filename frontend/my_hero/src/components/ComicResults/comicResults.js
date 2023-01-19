import React from 'react';
import { Card } from 'flowbite-react'
import { Link } from "react-router-dom";

function ComicResults({ id, thumbnail, title }) {


    return (
        <Link to={`/comic/${id}`}>
            <div className='max-w-sm'>
                <Card>
                    <img src={thumbnail} alt="thumbnail" />
                    <h1 className="">{title}</h1>
                </Card>
            </div>
        </Link>
    )
}
export default ComicResults;

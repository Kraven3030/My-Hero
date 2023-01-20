import React from 'react';
import { Card } from 'flowbite-react'
import { Link } from "react-router-dom";

function HeroResults({ id, thumbnail, name }) {

    return (
        <Link to={`/${id}`}>
            <div className='max-w-sm'>
                <Card>
                    <img src={thumbnail} alt="thumbnail" />
                    <h1 className="">{name}</h1>
                </Card>
            </div>
        </Link>
    )
}
export default HeroResults;

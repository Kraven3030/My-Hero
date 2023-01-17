import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react'
import { useParams, Link } from 'react-router-dom'
import { fetchComic } from '../../utils/api'

function AboutComic() {

    const { id } = useParams()
    const [comic, setComic] = useState()

    useEffect(() => {
        fetchComic(id)
            .then(data => setComic(data.data.results[0]))
            .catch(err => console.error(err))
    }, []);

    if (!comic) return

    return (
        <div className='flex justify-center pt-10 pb-10'>
            <div className="max-w-2xl">
                <Card>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.thumbnail} />
                    <h1 className="text-4xl text-gray-900">{comic.title}</h1>
                    {comic.description ? (<>
                        <p><strong>About:</strong>{comic.description}</p>
                    </>) : null}
                    <div>
                        <ul>
                            <h3><strong>Creators of series:</strong></h3>
                            {comic.creators.items.map((creators) => (
                                <li key={Math.random() * 1000}>{creators.name}</li>
                            ))}
                        </ul>
                    </div>
                    <Link to='/NewReview'><button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Leave A Review</button></Link>
                </Card>
            </div>
        </div>
    )
}

export default AboutComic 
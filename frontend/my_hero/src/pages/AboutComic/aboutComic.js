import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react'
import { useParams } from 'react-router-dom'
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
                </Card>
            </div>
        </div>
    )
}

export default AboutComic 
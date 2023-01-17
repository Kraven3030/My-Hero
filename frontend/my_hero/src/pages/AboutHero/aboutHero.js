import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react'
import { useParams, Link } from 'react-router-dom'
import { fetchHero } from '../../utils/api'

function AboutHero() {

    const { id } = useParams()
    const [hero, setHero] = useState()

    useEffect(() => {
        fetchHero(id)
            .then(data => setHero(data[0]))
            .catch(err => console.error(err))
    }, []);

    if (!hero) return

    return (
        <div className='flex justify-center pt-10 pb-10'>
            <div className="max-w-2xl">
                <Card>
                    <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.thumbnail} />
                    <h1 className="text-4xl text-gray-900">{hero.name}</h1>
                    {hero.description ? (<>
                        <p><strong>About:</strong>{hero.description}</p>
                    </>) : null}
                    <div>
                        <ul>
                            <h3><strong>Appears in:</strong></h3>
                            {hero.series.items.map((s) => (
                                <li key={Math.random() * 1000}>{s.name}</li>
                            ))}
                        </ul>
                    </div>
                    <Link to='/NewReview'><button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Leave A Review</button></Link>
                </Card>
            </div>
        </div>

    )
}

export default AboutHero
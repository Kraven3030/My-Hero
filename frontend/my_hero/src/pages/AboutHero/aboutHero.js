import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react'
import { useParams } from 'react-router-dom'
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
                </Card>
            </div>
        </div>

    )
}

export default AboutHero
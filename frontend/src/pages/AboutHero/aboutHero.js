import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react'
import { useParams } from 'react-router-dom'
import { fetchHero } from '../../utils/api'
import HeroModal from '../../components/HeroModal/heroModal'

function AboutHero() {

    const { id } = useParams()
    const [hero, setHero] = useState()
    const [heroModal, setHeroModal] = useState(false);

    useEffect(() => {
        fetchHero(id)
            .then(data => setHero(data[0]))
            .catch(err => console.error(err))
    }, []);

    if (!hero) return


    return (
        <div style={{
            backgroundColor: "rgb(229 231 235",
        }}>
            <div className='flex justify-center pt-10 pb-10'>
                <div className="max-w-2xl">
                    <Card>
                        <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.thumbnail} />
                        <h1 className="text-4xl text-gray-900">{hero.name}</h1>
                        {hero.description ? (<>
                            <p><strong style={{ color: '#e70909' }}>About: </strong>{hero.description}</p>
                        </>) : null}
                        <div>
                            <ul>
                                <h3><strong style={{ color: '#e70909' }}>Appears in: </strong></h3>
                                {hero.series.items.map((s) => (
                                    <li key={Math.random() * 1000}>{s.name}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => { setHeroModal(true); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Leave A Review</button>
                        {heroModal && <HeroModal closeModal={setHeroModal} />}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AboutHero
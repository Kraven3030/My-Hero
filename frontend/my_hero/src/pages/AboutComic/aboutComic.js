import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react'
import { useParams } from 'react-router-dom'
import { fetchComic } from '../../utils/api'
import ComicModal from '../../components/ComicModal/comicModal'

function AboutComic() {

    const { id } = useParams()
    const [comic, setComic] = useState()
    const [comicModal, setComicModal] = useState(false);

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
                        <p><strong style={{ color: '#ee7b08' }}>About: </strong>{comic.description}</p>
                    </>) : null}
                    <div>
                        <ul>
                            <h3><strong style={{ color: '#ee7b08' }}>Creators of series: </strong></h3>
                            {comic.creators.items.map((creators) => (
                                <li key={Math.random() * 1000}>{creators.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => { setComicModal(true); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Leave A Review</button>
                    {comicModal && <ComicModal closeModal={setComicModal} />}
                </Card>
            </div>
        </div>
    )
}

export default AboutComic 
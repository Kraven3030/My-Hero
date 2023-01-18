import { useEffect, useState, useMemo } from 'react'
import { fetchComics } from '../../utils/api'
import { Link } from "react-router-dom";

import './main.css'


function Main() {

    const [comics, setComics] = useState([]);
    const randomComics = useMemo(() => comics.sort(() => Math.random() - 0.5).slice(0, 8), [comics]);
    const names = ["Deadpool", "Wolverine", "Spider-Man", "Hulk", "Thor", "Black Widow", "Captain America", "X-Men", "Black Panther", "Daredevil", "Fantastic Four", "Doctor Doom", "Guardians of the galaxy", "She-Hulk", "Civil War"]

    useEffect(() => {
        fetchComics(names[Math.floor(Math.random() * names.length)]).then(data => setComics(data));
    }, []);


    return (

        <body className="antialiased bg-gray-200 text-gray-900 font-sans p-6">
            <h1 className="pt-5 pb-5 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase font-semibold text-gray-900 underline dark:text-white decoration-red-500">Popular Comics</h1>
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {randomComics.map((comic) => (
                        <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
                            <Link to={`/comic/${comic.id}`} className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <img className="Authorsolute inset-0 h-full w-full object-cover" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                                </div>
                                <div className="p-4">
                                    <h2 className="mt-2 mb-2  font-bold">{comic.title}</h2>
                                    <p className="text-sm">{comic.description ? comic.description : "No Description Available"}</p>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </body >
    )
}

export default Main
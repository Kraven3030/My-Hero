import { useEffect, useState } from 'react'
import { fetchComics } from '../../utils/api'
import { Link } from "react-router-dom";


function Main() {

    const [comics, setComics] = useState([]);

    useEffect(() => {
        setComics(() => comics.sort(() => Math.random() - 0.5).slice(0, 12), [comics]);
        const names = ["Deadpool", "Wolverine", "Spider-Man", "Hulk", "Thor", "Black Widow", "Captain America", "X-Men", "Black Panther", "Daredevil", "Fantastic Four", "Doctor Doom", "Guardians of the galaxy", "She-Hulk", "Civil War", "Cyclops", "Gambit"]
        fetchComics(names[Math.floor(Math.random() * names.length)]).then(data => setComics(data));
    }, []);


    return (

        <div className="antialiased bg-gray-200 text-gray-900 font-sans p-6 bg-cover bg-auto">
            <h1 className="pt-5 pb-5 text-center text-5xl font-bold text-black uppercase font-semibold underline" style={{ fontFamily: "'Luckiest Guy', cursive" }}>Popular Comics</h1>
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {comics.map((comic, i) => (
                        <div key={i} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
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
        </div>
    )
}

export default Main
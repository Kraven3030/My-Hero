import { useEffect, useState, useMemo } from 'react'
import { fetchComics } from '../../utils/api'
import { Link } from "react-router-dom";


function Main() {

    const [comics, setComics] = useState([]);

    //This line of code is creating a new variable called randomComics that is a random selection of the first 12 elements of the comics array. It does this by first randomly sorting the comics array and then taking the first 12 elements. This is being done by using the useMemo hook.
    const randomComics = useMemo(() => comics.sort(() => Math.random() - 0.5).slice(0, 12), [comics]);
    const names = ["Deadpool", "Wolverine", "Spider-Man", "Hulk", "Thor", "Black Widow", "Captain America", "X-Men", "Black Panther", "Daredevil", "Fantastic Four", "Doctor Doom", "Guardians of the galaxy", "She-Hulk", "Civil War", "Cyclops", "Gambit"]

    // Gets comics from the array of names above randomly 
    useEffect(() => {
        fetchComics(names[Math.floor(Math.random() * names.length)]).then(data => setComics(data));
    }, []);


    return (

        <body className="antialiased bg-gray-200 text-gray-900 font-sans p-6 bg-cover bg-auto">
            <h1 className="pt-5 pb-5 text-center text-5xl font-bold text-black uppercase font-semibold underline" style={{ fontFamily: "'Luckiest Guy', cursive" }}>Popular Comics</h1>
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
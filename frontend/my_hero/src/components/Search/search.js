import React from 'react';
import { useRef, useState } from 'react';
import { fetchHeroes, fetchComics } from '../../utils/api'


function Search({ setHeroes, setComics }) {
    const [searchType, setSearchType] = useState("heroes")
    // The useRef hook is used to create a reference variable which is used to store current values of the input fields.
    const input = useRef("")
    const inputComics = useRef("")
    const inputHero = useRef("")


    // Both handleClick functions below are both checking if the search type is equal to heroes or comics and if its true it then assigns a current value of the input ref to the value variable.
    const handleClickHero = async (event) => {
        event.preventDefault();
        // Checking to see if searchtype is equal to heroes
        const value = searchType === "heroes" ? input.current.value : inputHero.current.value
        if (value === "") return;

        // Function to fetch the heroes from the Marvel API using the value as the parameter.
        try {
            const heroes = await fetchHeroes(value)
            if (typeof setHeroes === 'function') setHeroes(heroes);
        } catch (err) {
            return console.error(err);
        }
    }


    const handleClickComic = async (event) => {
        event.preventDefault();
        // Checking to see if searchtype is equal to comics
        const value = searchType === "comics" ? input.current.value : inputComics.current.value;
        if (value === "") return;

        // Function to fetch the comics from the Marvel API using the value as the parameter.
        try {
            const comics = await fetchComics(value)
            if (typeof setComics === 'function') setComics(comics);
        } catch (err) {
            return console.error(err);
        }
    }


    const handleRadioChange = (event) => {
        setSearchType(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault();
        if (searchType === "heroes") {
            handleClickHero(event)
        } else {
            handleClickComic(event)
        }
    }



    return (
        <div className="flex justify-center pb-10 pt-10">
            <form className="flex flex-col items-center w-5/6">
                <label htmlFor="simple-search" className="sr-only">SEARCH</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-black dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input ref={input} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Marvel Hero or Comic..." required />
                </div>
                <div className="mt-4 flex">
                    <div className="ml-2">
                        <input ref={inputHero} type="radio" value="heroes" onChange={handleRadioChange} checked={searchType === "heroes"} className="form-radio text-blue-500 dark:text-black" />
                        <label className="ml-1 text-blue-500 font-medium dark:text-blue-500">SEARCH HERO</label>
                    </div>
                    <div className="ml-2">
                        <input ref={inputComics} type="radio" value="comics" onChange={handleRadioChange} checked={searchType === "comics"} className="form-radio text-blue-500 dark:text-blue-500" />
                        <label className="ml-1 text-blue-500 font-medium dark:text-blue-500">SEARCH COMIC</label>
                    </div>
                </div>
                <div className="pt-4">
                    <button onClick={handleClick} type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Search
                    </button>
                </div>
            </form>
        </div>


    )
}

export default Search
import React from 'react';
import { useRef, useState } from 'react';
import './search.css'
import { fetchHeroes, fetchComic } from '../../utils/api'


function Search({ setHeroes, setComics }) {
    const [searchType, setSearchType] = useState("heroes")
    const input = useRef("")
    const inputComics = useRef("")
    const inputHero = useRef("")

    const handleClickHero = async (event) => {
        event.preventDefault();
        const value = searchType === "heroes" ? input.current.value : inputHero.current.value
        if (value === "") return;

        try {
            const heroes = await fetchHeroes(value)
            if (typeof setHeroes === 'function') setHeroes(heroes);
        } catch (err) {
            return console.error(err);
        }
    }


    const handleClickComic = async (event) => {
        event.preventDefault();
        const value = searchType === "comics" ? input.current.value : inputComics.current.value;
        if (value === "") return;

        try {
            const comics = await fetchComic(value)
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
        <div className="flex justify-center pb-10">
            <form className="flex items-center place-items-center pt-20 w-5/6">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input ref={input} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Marvel Hero..." required />
                </div>
                <div>
                    <input ref={inputHero} type="radio" value="heroes" onChange={handleRadioChange} checked={searchType === "heroes"} /> Search for hero
                    <input ref={inputComics} type="radio" value="comics" onChange={handleRadioChange} checked={searchType === "comics"} /> Search for comic
                </div>


                <button onClick={handleClick} type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>

    )
}

export default Search
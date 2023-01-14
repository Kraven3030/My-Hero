import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

import SearchResults from '../SearchResults/searchResults'
import './search.css'

function Search() {

    const [heroResults, setHeroResults] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [mediaType, setMediaType] = useState("hero");

    useEffect(() => {
        if (searchString !== '') {
            getHero(searchString)
        } else {
            setHeroResults([]);
        }
    }, [searchString, mediaType]);

    const queryOptions = {
        api_key: process.env.REACT_APP_COMICSDB_API_KEY,
        api: 'https://comicvine.gamespot.com/api/search/',
        endpoint: `${mediaType}`
    };

    const handleChange = async (event) => {
        setSearchString(event.target.value);
    }

    const clearSearchBar = async () => {
        setSearchString("");
    }

    function getHero(searchString) {
        const url = `${queryOptions.api}${queryOptions.endpoint}?api_key=${queryOptions.api_key}&query=${searchString}`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                setHeroResults(response);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Navigate(`/search-results?query=${searchString}`)
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex items-center place-items-center pt-20 w-5/6">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input onChange={handleChange} value={searchString} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
                <SearchResults heroResults={heroResults}
                    mediaType={mediaType}
                    searchString={searchString}
                    clearSearchBar={clearSearchBar} />
            </form>
        </div>

    )
}

export default Search
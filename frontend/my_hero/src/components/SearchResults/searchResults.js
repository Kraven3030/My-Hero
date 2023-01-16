import React from 'react';
import { useState } from 'react'
// Imports for Hero and Comic results
import ComicResults from '../../ComicResults/comicResults';
import HeroResults from '../HeroResults/heroResults';

import Container from '../Container/container';
import Search from '../Search/search'
import './searchResults.css'

// Defining an image size based off of the documentation provided by marvel API.
const IMAGE_SIZE = 'portrait_uncanny'

const SearchResults = () => {
    const [heroes, setHeroes] = useState([])
    const [comics, setComics] = useState([])

    let heroCards, comicCards;

    //Checks if the heroes state variable is truthy, and if so, it maps over the array and creates a HeroResults component for each item in the array.
    // The HeroResults components then receives the name, id, key, and thumbnail props from the hero object
    if (heroes) {
        heroCards = heroes.map((hero) => (
            <HeroResults name={hero.name} id={hero.id} key={hero.id} thumbnail={`${hero.thumbnail.path}/${IMAGE_SIZE}.${hero.thumbnail.extension}`} />
        ))
    }

    // This block of code does the same as the above code but for comis instead.
    if (comics) {
        comicCards = comics.map((comic) => (
            <ComicResults creators={comic.creators} title={comic.title} id={comic.id} key={comic.id} thumbnail={`${comic.thumbnail.path}/${IMAGE_SIZE}.${comic.thumbnail.extension}`} />
        ))
    }


    return (
        <Container>
            <Search setHeroes={setHeroes} setComics={setComics} />
            <div className="grid grid-cols-3">
                {/* If heroCards or comicCards are not true, it will return an empty string. */}
                {heroCards ? heroCards : ""}
                {comicCards ? comicCards : ""}
            </div>
        </Container>
    )
}
export default SearchResults;

import React from 'react';
import { useState } from 'react'
// Imports for Hero and Comic results
import ComicResults from '../../ComicResults/comicResults';
import HeroResults from '../HeroResults/heroResults';

import Container from '../Container/container';
import Search from '../Search/search'
import './searchResults.css'

const IMAGE_SIZE = 'portrait_uncanny'

const SearchResults = () => {
    const [heroes, setHeroes] = useState([])
    const [comics, setComics] = useState([])

    let heroCards, comicCards;

    if (heroes) {
        heroCards = heroes.map((hero) => (
            <HeroResults name={hero.name} id={hero.id} key={hero.id} thumbnail={`${hero.thumbnail.path}/${IMAGE_SIZE}.${hero.thumbnail.extension}`} />
        ))
    }

    if (comics) {
        comicCards = comics.map((comic) => (
            <ComicResults name={comic.name} id={comic.id} key={comic.id} thumbnail={`${comic.thumbnail.path}/${IMAGE_SIZE}.${comic.thumbnail.extension}`} />
        ))
    }

    return (
        <Container>
            <Search setHeroes={setHeroes} setComics={setComics} />
            <div className="grid grid-cols-3">
                {heroCards ? heroCards : ""}
                {comicCards ? comicCards : ""}
            </div>
        </Container>
    )
}
export default SearchResults;

import React from 'react';
import { useState } from 'react'

import Container from '../Container/container';
import HeroResults from '../HeroResults/heroResults';
import Search from '../Search/search'


const SearchResults = () => {
    const [heroes, setHeroes] = useState([])


    return (
        <Container>
            <Search setter={setHeroes} />
            <HeroResults>

            </HeroResults>
        </Container>
    )
}
export default SearchResults;

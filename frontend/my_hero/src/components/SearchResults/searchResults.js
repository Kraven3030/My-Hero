import React from 'react';
import HeroResults from '../HeroResults/heroResults';

const SearchResults = ({ mediaResults, searchString, clearSearchBar }) => {
    // check if the mediaResults object exists
    if (mediaResults) {
        // check if the mediaResults object has a filters field
        if (mediaResults.filters) {
            // check if the filters field has any data
            if (mediaResults.filters.length > 0) {
                return (
                    <HeroResults mediaResults={mediaResults}
                        clearSearchBar={clearSearchBar} />
                )
            } else {
                if (searchString.length !== 0) {
                    return (
                        <h2 className="">No hero found!</h2>
                    )
                }
            }
        }
    }
}
export default SearchResults;

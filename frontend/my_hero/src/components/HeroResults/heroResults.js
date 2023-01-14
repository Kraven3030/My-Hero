import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function HeroResults({ mediaResults, clearSearchBar }) {
    const navigate = useNavigate()
    function handleClick() {
        navigate('/NewReview')
    }

    return (
        <div id="">
            {mediaResults.data.results.map(character => (
                <div className="card" key={character.id}>
                    <Link to={"/HeroReviews/"} onClick={() => { clearSearchBar() }} state={{
                        heroName: character.name,
                        heroImg: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                        heroDescription: character.description,
                        heroId: character.id
                    }}>
                        <img className="card-img-top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                    </Link>
                    <div>
                        <h1 className="card-title">{character.name}</h1>
                        <p>Description: {character.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default HeroResults;

import { Link, useNavigate } from "react-router-dom";

function HeroResults({ mediaResults, clearSearchBar }) {

    const navigate = useNavigate()
    function handleClick() {
        navigate('/NewReview')
    }

    return (
        <div id="">
            {mediaResults.results.map(hero => (
                <div className="card" key={hero.id}>
                    <Link to={"/HeroReviews/"} onClick={() => { clearSearchBar() }} state={{
                        heroName: hero.name,
                        heroImg: hero.image,
                        heroDescription: hero.description,
                        heroPublisher: hero.publisher,
                        heroId: hero.id,
                        heroReviewId: hero.review_id
                    }}>
                        <img className="card-img-top" src={hero.image} alt={hero.name} />
                    </Link>
                    <div>
                        <h1 className="card-title">{hero.name}</h1>
                        <p>Publisher: {hero.publisher}</p>
                        <p>Appearance in Issues: {hero.count_of_issue_appearances}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default HeroResults;

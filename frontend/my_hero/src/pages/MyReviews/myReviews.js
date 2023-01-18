import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from 'flowbite-react';
import { userReviews } from '../../utils/api';

function MyReviews() {

    const [personalReviews, setPersonalReviews] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchReviews = async () => {
            await userReviews(userId).then((res) => {
                setPersonalReviews(res)
            })
        }
        fetchReviews(userId)
    }, [userId])

    return (
        <div className="place-content-center">
            <h1 className="pt-10 pb-5 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">My personal Reviews</h1>            <div className="grid grid-cols-3">
                {personalReviews?.reviews?.map((review) => (
                    <Card className="w-96 mx-auto text-center">
                        {review.map((review) => (
                            <div>
                                <h3 className="text-center"><strong>Hero or Comic: </strong>{review.marvelTitle}</h3>
                                <h4 className="text-center"><strong>Title: </strong>{review.title}</h4>
                                <p className="text-center pb-2"><strong>Review: </strong>{review.body}</p>
                                <Link to={"/EditReview/"} state={{
                                    title: review.title,
                                    body: review.body,
                                    marvelTitle: review.marvelTitle,
                                    reviewId: review._id
                                }}>
                                    <button className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300
                dark:focus:ring- the same font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                        Edit Review
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </Card>
                ))}
            </div>
        </div>

    )
}

export default MyReviews
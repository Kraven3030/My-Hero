import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from 'flowbite-react';
import { userReviews } from '../../utils/api';

function MyReviews({ closeModal, isOpen }) {

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
        <>
            <div style={{
                backgroundColor: "rgb(229 231 235 ",
                minHeight: "100vh"
            }}>
                <h1 className="pt-10 pb-5 text-center text-4xl font-bold text-black bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">My personal Reviews</h1>
                <div className="place-content-center">
                    {personalReviews?.reviews?.map((review) => (
                        <div className="grid grid-cols-3" key={review._id}>
                            <div className="col-start-2">
                                {review.map((review, i) => (
                                    <Card key={i} className="w-96 mx-auto text-center" style={{
                                        backgroundColor: "white"
                                    }}>
                                        <div key={i}>
                                            <h3 className="text-center"><strong style={{ color: '#e70909' }}>Hero or Comic: </strong>{review.marvelTitle}</h3>
                                            <h4 className="text-center"><strong style={{ color: '#e70909' }}>Title: </strong>{review.title}</h4>
                                            <p className="text-center pb-2"><strong style={{ color: '#e70909' }}>Review: </strong>{review.div}</p>
                                            <Link to={"/EditReview/"} state={{
                                                title: review.title,
                                                div: review.div,
                                                marvelTitle: review.marvelTitle,
                                                reviewId: review._id
                                            }}>
                                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                                    Edit Review
                                                </button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyReviews
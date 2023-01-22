import { useState, useEffect } from "react";
import { allReviews } from "../../utils/api";
import { Card } from 'flowbite-react'


function Forum() {

    const [reviews, setReviews] = useState([]);
    const [marvelId, setMarvelId] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            await allReviews().then((res) => {
                setReviews(res)
            })
        }
        fetchReviews()
    }, []);



    return (
        <>
            <div style={{
                backgroundColor: "rgb(229 231 235",
            }}>
                <h1 className="pt-10 pb-5 text-center text-5xl font-bold text-black bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase underline">Public Forum</h1>
                <div className="pt-10 grid grid-cols-3">
                    {reviews.map(review => (
                        <div className="col-span-1" key={review._id}>
                            <Card className="" style={{
                                backgroundColor: "white"
                            }}>
                                <h1 className="text-2xl"><strong style={{ color: '#e70909' }}>Hero or Comic Reviewed: </strong> {review.marvelTitle}</h1>
                                <h2 className="text-xl font-bold tracking-tight text-black-900 dark:text-white">
                                    <strong style={{ color: '#e70909' }}>Title: </strong> "{review.title}"
                                </h2>
                                <h5 className="font-normal text-black-700 dark:text-gray-400">
                                    <strong style={{ color: '#e70909' }}>Review: </strong> "{review.body}"
                                </h5>
                                <p><strong style={{ color: '#e70909' }}>User: </strong> {review.reviewer.username}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Forum
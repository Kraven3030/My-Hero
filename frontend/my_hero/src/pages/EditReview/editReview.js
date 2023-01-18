import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { updateReview, deleteReview } from "../../utils/api";

function EditReview() {

    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [review, setReview] = useState({
        title: state.title,
        body: state.body,
        reviewId: state.reviewId
    })

    const handleChange = (event) => {
        setReview({ ...review, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reviewData = {
            title: review.title,
            body: review.body,
            reviewId: review.reviewId
        }
        await updateReview(reviewData)
        navigate('/MyReviews', { replace: true });
    }
    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteReview(review.reviewId);
        navigate('/MyReviews', { replace: true })
    }


    return (
        <div className="flex justify-center pt-40">
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md sm:p-6 md:p-8">
                <form className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900">Edit Review</h5>
                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title:</label>
                        <input
                            type="text"
                            id="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900">Review:</label>
                        <textarea
                            name="body"
                            id="large-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
                            value={review.body}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={(event) => handleSubmit(event)}>
                            Save Changes
                        </button>
                        <button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={(event) => handleDelete(event)}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default EditReview
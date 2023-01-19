import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { updateReview, deleteReview } from "../../utils/api";
import { TextInput, Label, Button } from 'flowbite-react'

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
        <div className="pt-40 flex justify-center h-screen">
            <form className="flex flex-col gap-4 w-3/4">
                <h2 className="text-2xl font-medium text-gray-900">Edit Review</h2>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="title">Title:</Label>
                    </div>
                    <TextInput
                        id="large-input"
                        type="text"
                        name="title"
                        value={review.title}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="body">Review:</Label>
                    </div>
                    <TextInput
                        id="large-input"
                        name="body"
                        value={review.body}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div className="flex justify-between">
                    <Button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={(event) => handleSubmit(event)}>
                        Save Changes
                    </Button>
                    <Button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={(event) => handleDelete(event)}>
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditReview
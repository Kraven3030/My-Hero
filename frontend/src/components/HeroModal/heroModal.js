import React, { useState } from 'react';
import { createReview } from "../../utils/api"


function HeroModal({ closeModal, isOpen }) {

    const [reviewData, setReviewData] = useState({
        marvelTitle: '',
        title: '',
        body: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReviewData({ ...reviewData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const reviewInfo = {
            marvelId: reviewData.marvelId,
            marvelTitle: reviewData.marvelTitle,
            title: reviewData.title,
            body: reviewData.body,
            reviewer: localStorage.getItem('userId')
        }
        createReview(reviewInfo)
            .then((data) => console.log(data))
        setReviewData({
            marvelId: '',
            marvelTitle: '',
            title: '',
            body: '',
            reviewer: localStorage.getItem('userId')
        })
        closeModal(false)
    }




    return (
        <div className="fixed top-0 left-0 h-full w-full bg-black opacity-95 z-50">
            <div className="flex justify-center pt-40">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Leave a Review</h5>
                        <div className="mb-6">
                            <label htmlFor="marvel-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hero or Comic name:</label>
                            <input
                                type="text"
                                id="marvel-title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="marvelTitle"
                                value={reviewData.marvelTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review Title:</label>
                            <input
                                type="text"
                                id="default-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="title"
                                value={reviewData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review:</label>
                            <textarea
                                name="body"
                                id="large-input"
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={reviewData.body}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-start">
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSubmit}
                        >
                            Post Review
                        </button>
                        <div className="text-center">
                            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => closeModal(false)}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}
export default HeroModal
import axios from 'axios';
import MD5 from 'crypto-js/md5'


//===============================================================
// Axios request for user signup
export async function createUser(formData) {
    const { data } = await axios.post('users/signup', formData)
    localStorage.setItem('username', data.username)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('token', data.token)
    return data
}
//================================================================
// Axios request to log in to user account
export async function loginToAccount(formData) {
    const { data } = await axios.post('users/login', formData)
    localStorage.setItem('username', data.username)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('token', data.token)
    return data
}
//=================================================================
// Axios request to get user data if user is logged in
export async function getUserdata(userId) {
    const { data } = await axios.get('users/', userId)
    return data
}
//==================================================================
// Axios request to get all users personal reviews is user is logged in
export async function userReviews(userId) {
    const { data } = await axios.get(`/reviews/user/${userId}`)
    return data
}
//==================================================================
//Get all reviews by Marvel ID
export async function allReviews(marvelId) {
    const { data } = await axios.get(`/reviews/`)
    return data
}
//==================================================================
// Axios request that will allow users to CREATE reviews once they are logged in
export async function createReview(reviewData) {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }
    const { data } = await axios.post('/reviews/create/', reviewData, config)
    return data
}
//=====================================================================
// Axios request that will allow users to UPDATE reviews once they are logged in
export async function updateReview(reviewData) {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
    const { data } = await axios.put('/reviews/update', reviewData, config)
    return data
}
//=======================================================================
// Axios request that will allow users to DELETE reviews once they are logged in
export async function deleteReview(reviewId) {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
    const { data } = await axios.delete(`/reviews/delete/${reviewId}`, config)
    return data
}

//===============================================================================================
// FUNCTIONS FOR MARVEL API DATABASE

const API_URL = process.env.REACT_APP_BASE_URL;
// This function concanenates 3 parameters into a single string. Then it is passed as an argument to the MD5 function.
// MD5 function is a javascript implementation of the MD5 hash alogorithm. It takes a string as an input and returns a 128-bit hash value.
// hash is required inorder to use the marvel API database along with ts(timestamp)
// Finally the hash is used to authenticate the API request to the Marvel API.
const getHash = (ts, secretKey, publicKey) => {
    return MD5(ts + secretKey + publicKey).toString();
}

// Function to fetch all heroes from Marvel database
// Uses a fetch method to call a specific url to the Marvel Api and passing the parameters to the url for a search
const fetchHeroes = async (value) => {
    //variable to concatenate the API endpoint and query parameters.
    const baseUrl = `${API_URL}/v1/public/characters`
    //time stamp
    const ts = Date.now().toString();
    // Public key provided my Marvel which is stored in the .env
    const api_key = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    // Private key provided by marvel which is also stored in the .env
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, api_key)
    const url = `${baseUrl}?ts=${ts}&apikey=${api_key}&hash=${hash}&nameStartsWith=${value}`

    // try- catch statement to catch any error that might happen during the fetching process, in case of an error, the function will log the error to the console and return undefined.
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.data.results
    } catch (err) {
        console.error(err)
        return
    }
}
// Funtion for fetc a sinle Hero by their ID
const fetchHero = async (id) => {
    const baseUrl = `${API_URL}/v1/public/characters/${id}`
    const ts = Date.now().toString();
    const api_key = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, api_key)
    const url = `${baseUrl}?ts=${ts}&apikey=${api_key}&hash=${hash}`;

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data.data.results
    } catch (err) {
        console.error(err)
        return
    }
}

//================================================================================================
// All code below is exactly the same as the code above but for comics instead of heroes...
// Function to get data for all comics once searched
const fetchComics = async (value) => {
    const baseUrl = `${API_URL}/v1/public/comics`
    const ts = Date.now().toString();
    const api_key = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, api_key)
    const url = `${baseUrl}?ts=${ts}&apikey=${api_key}&hash=${hash}&titleStartsWith=${value}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.data.results
    } catch (err) {
        console.error(err)
        return
    }
}

// Function to get data for a specific comic once chosen from search results
const fetchComic = async (id) => {
    const baseUrl = `${API_URL}/v1/public/comics/${id}`
    const ts = Date.now().toString();
    const api_key = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, api_key)
    const url = `${baseUrl}?ts=${ts}&apikey=${api_key}&hash=${hash}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
        return
    }
}

export { fetchHeroes, fetchHero, fetchComic, fetchComics }
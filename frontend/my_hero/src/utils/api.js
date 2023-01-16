import axios from 'axios';
import MD5 from 'crypto-js/md5'


//===============================================================
// Axios request for user signup
export async function createUser(formData) {
    const { data } = await axios.post('http://localhost:7500/users/signup', formData)
    return data
}
//================================================================
// Axios request to log in to user account
export async function loginToAccount(formData) {
    const { data } = await axios.post('http://localhost:7500/users/login', formData)
    return data
}


//===============================================================================================
// Function to fetch all heroes from Marvel database

const API_URL = process.env.REACT_APP_BASE_URL;
const getHash = (ts, secretKey, publicKey) => {
    return MD5(ts + secretKey + publicKey).toString();
}

const fetchHeroes = async (value) => {
    const baseUrl = `${API_URL}/v1/public/characters`
    const ts = Date.now().toString();
    const api_key = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, api_key)
    const url = `${baseUrl}?ts=${ts}&apikey=${api_key}&hash=${hash}&nameStartsWith=${value}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.data.results)
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
        return data.data.results
    } catch (err) {
        console.error(err)
        return
    }
}

//================================================================================================
const fetchComics = async (value) => {
    const baseUrl = `${API_URL}/v1/public/comics`
    const ts = Date.now().toString();
    const api_key = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, api_key)
    const url = `${baseUrl}?ts=${ts}&apikey=${api_key}&hash=${hash}&TitleStartsWith=${value}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.data.results)
        return data.data.results
    } catch (err) {
        console.error(err)
        return
    }
}

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
        console.log(data.data.results)
        return data
    } catch (err) {
        console.error(err)
        return
    }
}

export { fetchHeroes, fetchHero, fetchComic, fetchComics }
import axios from 'axios';
import MD5 from 'crypto-js/md5'


//============================================================
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


//===============================================================
// Function to fetch all heroes from Marvel database
const API_URL = process.env.REACT_APP_BASE_URL;

const getHash = (ts, secretKey, publicKey) => {
    return MD5(ts + secretKey + publicKey).toString();
}

const fetchHeroes = async (value) => {
    const baseUrl = `http://gateway.marvel.com/v1/public/characters`
    const ts = Date.now().toString();
    const apiKey = process.env.REACT_APP_MARVEL_API_KEY_PUBLIC
    const privateKey = process.env.REACT_APP_MARVEL_API_KEY_PRIVATE
    const hash = getHash(ts, privateKey, apiKey)
    const url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&nameStartsWith=${value}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        console.error(err)
        return
    }
}

export { fetchHeroes }
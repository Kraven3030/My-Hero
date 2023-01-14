import axios from 'axios';

// Axios request for user signup
export async function createUser(formData) {
    const { data } = await axios.post('http://localhost:7500/users/signup', formData)
    return data
}

// Axios request to log in to user account
export async function loginToAccount(formData) {
    const { data } = await axios.post('http://localhost:7500/users/login', formData)
    return data
}



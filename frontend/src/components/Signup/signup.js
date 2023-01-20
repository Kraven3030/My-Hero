// Import Dependencies
import { useState } from 'react'
import { createUser } from '../../utils/api'
import { useNavigate } from 'react-router-dom';



function Signup(props) {
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = event => {
        setSignupForm({ ...signupForm, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createUser(signupForm)
            .then((data) => {
                localStorage.token = data.token;
                localStorage.username = data.username;
                localStorage.userId = data.userId;
            })
        props.setIsLoggedIn(true);
        setSignupForm({
            username: '',
            password: ''
        })
        navigate('/', { replace: true });
    };

    return (
        <body style={{
            backgroundImage: `url(${"https://i.annihil.us/u/prod/marvel/i/mg/b/f0/5a6a3c922daf3/clean.jpg"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh"
        }}>
            <div className="flex justify-center pt-80">
                <div className="w-full max-w-3xl max-h-full p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Signup for a <strong>My Hero</strong> account</h5>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>

                            <input type="text" name="username" onChange={handleChange} value={signupForm.username} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required />

                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>

                            <input type="password" name="password" onChange={handleChange} value={signupForm.password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />

                        </div>
                        <button onClick={(event) => handleSubmit(event, signupForm)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create your account</button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have an account? <a href="/login" class="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default Signup
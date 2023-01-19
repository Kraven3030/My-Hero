// Import dependncies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginToAccount } from '../../utils/api';


function Login(props) {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    // Will keep track of what's inputted into the form
    const handleChange = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event, loginForm) => {
        event.preventDefault();
        loginToAccount(loginForm)
            .then((data) => {
                if (data.token) {
                    localStorage.token = data.token;
                    localStorage.username = data.username;
                    localStorage.userId = data.userId;
                    props.setIsLoggedIn(true);
                    setLoginForm({
                        username: '',
                        password: ''
                    })
                    navigate('/main', { replace: true })
                } else {
                    window.alert("Login error! Username or Password incorrect!");
                }
            })
    };

    return (
        <body style={{
            backgroundImage: `url(${"https://wallpapercave.com/wp/AI4xoXB.jpg"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh"
        }}>
            <div className="flex justify-center pt-80">
                <div className="w-full max-w-3xl max-h-full p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login to MY HERO</h5>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>

                            <input type="text" name="username" onChange={handleChange} value={loginForm.username} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required />

                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>

                            <input type="password" name="password" onChange={handleChange} value={loginForm.password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />

                        </div>
                        <button onClick={(event) => handleSubmit(event, loginForm)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Don't have an account? <a href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Signup</a>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default Login
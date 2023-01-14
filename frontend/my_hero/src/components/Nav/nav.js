import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

import './nav.css'

function Nav(props) {

    const navigate = useNavigate();
    const initialState = [<Link to='/searchbar' key="1"><button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Search</button></Link>]

    const handleLogout = () => {
        localStorage.clear();
        props.setIsLoggedIn(false);
        navigate("/", { replace: true });
    }

    const [navItems, setNavItems] = useState(initialState)

    useEffect(() => {
        if (props.isLoggedIn) {
            setNavItems(
                initialState.concat(
                    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul class="flex flex-wrap -mb-px">
                            <li key="2" class="mr-2">
                                <a href="/main" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300 dark:hover:text-gray-300">Home</a>
                            </li>
                            <li key="3" class="mr-2">
                                <a href="/" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 dark:hover:text-gray-300">My Reviews</a>
                            </li>
                            <li key="4" class="mr-2">
                                <button onClick={handleLogout}><a href="/" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-yellow-600 hover:border-yellow-300 dark:hover:text-gray-300"><strong>Logout</strong></a></button>
                            </li>
                        </ul>
                    </div>
                )
            )
        } else {
            setNavItems(
                initialState.concat([
                    <div>
                        <ul>
                            <li key="4">
                                <Link to="/login"> <a href="/login" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-green-600 hover:border-green-300 dark:hover:text-geen-300"><strong>Login</strong></a></Link>
                            </li>
                        </ul>
                    </div>
                ])
            )
        }
    }, [props.isLoggedIn])



    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="/" className="flex items-center">
                    <img
                        src="/my-hero-high-resolution-color-logo.png"
                        className="h-6 mr-3 sm:h-12"
                        alt="My Hero Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">My Hero</span>
                </a>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-search">
                    {navItems}
                </div>
            </div>
        </nav>

    )
}

export default Nav
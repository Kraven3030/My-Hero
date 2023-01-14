import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

import Searchbar from '../Searchbar/searchbar';
import './nav.css'

function Nav(props) {

    const navigate = useNavigate();
    const initialState = [<Link to='/main' key="1"><button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Home</button></Link>]

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
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <Link key="2"><button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            My Reviews
                        </button></Link>
                        <Link key="3" to="/"><button onClick={handleLogout} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            Logout
                        </button></Link>

                    </div >
                )
            )
        } else {
            setNavItems(
                initialState.concat([
                    <div>
                        <ul>
                            <li key="4">
                                <Link to="/login"><button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login</button></Link>
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
                <Searchbar />
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
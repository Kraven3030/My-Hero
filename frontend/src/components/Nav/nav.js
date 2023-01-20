import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './nav.css'

function Nav(props) {

    // Checks if user is logged in first before allowing them to use the search feature
    const handleSearch = () => {
        if (!props.isLoggedIn) {
            alert("You must be logged in to use search");
        } else {
            navigate("/search-results")
        }
    }
    const navigate = useNavigate();
    const initialState = [<button key="1" onClick={handleSearch} className="text-white bg-black shadow-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">SEARCH</button>]

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

                    <div key="2" className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="mr-2">
                                <a href="/main" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white text-base hover:text-green-600 hover:border-red-300 dark:hover:text-gray-300">HOME</a>
                            </li>
                            <li className="mr-2">
                                <a href="/MyReviews" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white text-base hover:text-blue-600 hover:border-blue-300 dark:hover:text-gray-300">MY REVIEWS</a>
                            </li>
                            <li className="mr-2">
                                <a href="/Forum" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white text-base hover:text-orange-600 hover:border-orange-300 dark:hover:text-gray-300">FORUM</a>
                            </li>
                            <li className="mr-2">
                                <button onClick={handleLogout}><a href="/" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white text-base hover:text-yellow-600 hover:border-yellow-300 dark:hover:text-gray-300"><strong>LOGOUT</strong></a></button>
                            </li>
                        </ul>
                    </div>

                )
            )
        } else {
            setNavItems(
                initialState.concat([
                    <div key="3">
                        <ul>
                            <li >
                                <Link to="/login" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white hover:text-green-600 hover:border-green-300 hover:text-geen-300"><strong>LOGIN</strong></Link>
                            </li>
                        </ul>
                    </div>
                ])
            )
        }
    }, [props.isLoggedIn])



    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">MY HERO</span>
                    </a>
                    <div className="items-center flex">
                        {navItems}
                    </div>

                </div>
            </nav>
        </>

    )
}

export default Nav
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="antialiased bg-gray-200 text-gray-900 font-sans p-6 bg-cover bg-auto" style={{
            backgroundImage: `url(${"https://sportshub.cbsistatic.com/i/2021/03/18/f2a9b347-f2e0-42d2-8801-681f672c333f/marvel-ultimate-universe-header-1230871.jpg"})`,
            minHeight: "100vh"
        }}>
            <div className="flex justify-center pt-40" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                <div className="w-5/6 p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <img className="pb-2 rounded-full w-96 h-96 inline-flex items-center justify-center" src="/my-hero-high-resolution-color-logo.png" alt="My Hero Logo" />
                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Step into the <strong
                        style={{ color: '#e70909' }}>MY HERO </strong>
                        universe, where you can leave reality behind and immerse yourself in the world of Marvel superheroes.</h5>
                    <p className="mb-5 text-base text-black sm:text-lg dark:text-gray-400">Explore the depths of your favorite heroes, discover hidden gems in their comics, and share your thoughts and experiences with fellow fans. Join the community of passionate enthusiasts and dive into the ultimate Marvel experience. Welcome to My Hero.</p>
                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                        <a href="/signup" className="w-full sm:w-auto focus:ring-4 focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                            <div className="text-left">
                                <Link to="/signup"><button style={{
                                    backgroundColor: '#e70909',
                                    color: 'white',
                                }}
                                    className="shadow-white hover:bg-black focus:ring-4 focus:outline-none dark:focus:ring-orange-800 shadow-lg font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2">Signup</button></Link>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
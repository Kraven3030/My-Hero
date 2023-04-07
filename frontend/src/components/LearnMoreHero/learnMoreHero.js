import React from 'react';

const LearnMoreHero = ({ hero }) => {
    const handleClick = () => {
        // Will navigate user to specific hero on Marvel webpage
        window.location.href = `https://www.marvel.com/comics/characters/${hero.id}/${hero.name}`;
    };

    return (
        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleClick}>Learn More</button>
    );
};

export default LearnMoreHero;

import React from 'react';
import Search from '../Search/search';

function Container({ children }) {

    // This container is being pass to and holds all child elements displayed on the search results page. This allows for easier styling/management of the content of that page
    return (
        <main className="flex justify-center">
            <div className='w-2/3'>
                {children}
            </div>
        </main>
    )
}
export default Container
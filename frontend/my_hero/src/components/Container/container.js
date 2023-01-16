import React from 'react';
import Search from '../Search/search';

function Container({ children }) {

    return (
        <main className="flex justify-center">
            <div className='w-2/3'>
                {children}
            </div>
        </main>
    )
}
export default Container
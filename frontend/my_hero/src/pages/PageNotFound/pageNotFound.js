import React from 'react';

function PageNotFound() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-4xl text-center">
                <h1>404 Error: Page Not Found</h1>
                <p>Sorry, the page you are trying to access does not exist.</p>
                <a href="/" className="text-blue-500 underline">Go to Homepage</a>
            </div>
        </div>
    );
}

export default PageNotFound;

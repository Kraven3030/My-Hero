import React from 'react';

function PageNotFound() {
    return (
        <body style={{
            backgroundColor: "rgb(229 231 235",
        }}>
            <div className="flex justify-center items-center h-screen">
                <div className="text-4xl text-center">
                    <h1>404 Error: Page Not Found</h1>
                    <p>Sorry, the page you are trying to access does not exist.</p>
                    <a href="/" className="text-blue-500 underline">Go to Homepage</a>
                </div>
            </div>
        </body>
    );
}

export default PageNotFound;

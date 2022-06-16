import React from 'react'
import './errorPage.css';

const ErrorPage = () => {
    return (
        <>
            <div className="wrapper">
                <main className='error-page'>
                    <header>
                        <h2>404</h2>
                        <h3>Error</h3>
                    </header>
                    <div className="text-box">
                        <h3>Page not found</h3>
                        <p>Oops . . . Something is wrong</p>
                        <p>The address you are looking for does not exist</p>
                    </div>
                </main>
            </div>

        </>
    )
}

export default ErrorPage
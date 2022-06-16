import React from 'react'

import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className='wrapper'>
                <header>
                    <h2>
                        Cinema Movie
                    </h2>
                </header>
                <div className='text-box'>
                    <p>
                        Cinema Movie (CM) is a site that provides users with a convenient way to view movie reviews.
                        We extracted movie information with API and established it to make it easy for users to find the movie information.
                        We run CM for the purpose of providing movie reviews, so we provide users with ratings, release dates, and overviews of movies.
                    </p>
                </div>
                <div className='copy-right'>
                    <p>
                        © COPYRIGHT CINEMA MOVIE SEWELL NJ - 2021
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

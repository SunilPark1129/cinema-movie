/*
The purpose of this page is to randomly recommend movies.
Recommend movies within the genre selected by the user.
*/

import React from 'react';
import { UpcomingHelper } from '../../helpers';
import { Loading } from '../../components';
import { CardOffset } from '../../helpers';

const Upcoming = ({ requestURL }) => {
    const { requestFetch, upcomingMovie, isLoading, isImageLoading } = UpcomingHelper(requestURL);
    const { cardLocation } = CardOffset();

    const handleDisplayMovie = (e) => {
        cardLocation(e.target.offsetParent.children[1], upcomingMovie);
    };

    const handleRefreshMovie = () => {
        requestFetch();
    };

    return <>
        <header className='movie__recommend__upcoming'>
            {
                !isLoading && upcomingMovie !== undefined ?
                    <>
                        <div className='movie__recommend__upcoming__UI'>
                            <h3>Upcoming:</h3>
                            <h2>
                                {upcomingMovie.title}
                            </h2>
                            <div className='btn-box'>
                                <button onClick={handleDisplayMovie}>More Detail</button>
                                <button onClick={handleRefreshMovie}><p>&#8635;</p></button>
                            </div>
                        </div>
                        <div className={`movie__recommend__upcoming__poster ${isImageLoading ? 'card__image' : 'card__image--ready'} `}>
                            <img src={`https://image.tmdb.org/t/p/w500/${upcomingMovie.backdrop_path}`} alt={upcomingMovie.title} />
                        </div>
                    </>
                    :
                    <Loading />
            }
        </header>
    </>
}


export default Upcoming
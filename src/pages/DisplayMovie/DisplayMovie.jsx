/*
Click on the movie poster card to make this page work.
What this page does is open a modal to show the fetched movie information.
*/

import React, { useState, useEffect } from 'react';
import logo from '../../assets/main_logo.png';
import { useIndexContext } from '../../context/IndexContext';
import { delay } from '../../hooks';
import genreId from '../../services/genreId';

const DisplayMovie = () => {
    const [context, setContext] = useIndexContext();
    // Sets the location value for the targeted card to show animation effect when opening the modal.
    const [cardProperty, setCardProperty] = useState({
        cardLeft: context.cardPosition.cardLeft,
        cardTop: context.cardPosition.cardTop,
        cardWidth: context.cardPosition.cardOffsetWidth,
        cardHeight: context.cardPosition.cardOffsetHeight,
        cardTranslateX: 'translateX(0)'
    });

    // Whenever a card is pressed, context.displayMovie becomes true and modal is opened.
    useEffect(() => {
        // Opens the modal with an animation effect from the targeted card position.
        delay(1).then(() => {
            setCardProperty({
                cardLeft: '50%',
                cardTop: '5%',
                cardWidth: '90%',
                cardHeight: '90%',
                cardTranslateX: 'translateX(-50%)'
            })
        })
        return (() => {
            setCardProperty({});
        })
    }, [context.displayMovie]);

    const popUpOnClick = () => {
        setContext({
            ...context, displayMovie: false
        });
    };

    return context.selectedMovie &&
        <div className='movie__modal' style={{ left: cardProperty.cardLeft, top: cardProperty.cardTop, width: cardProperty.cardWidth, height: cardProperty.cardHeight, transform: cardProperty.cardTranslateX }}>
            <div className='content'>
                <div onClick={popUpOnClick} className='movie__modal__close-icon'>&#10006;</div>
                <header className='movie__modal__header'>
                    <div className='movie__modal__header__poster'>
                        {context.selectedMovie.poster_path !== null ?
                            context.selectedMovie.backdrop_path !== null ?
                                <img src={`https://image.tmdb.org/t/p/w500/${context.selectedMovie.backdrop_path}`} alt={context.selectedMovie.title}></img>
                                :
                                <img src={`https://image.tmdb.org/t/p/w500/${context.selectedMovie.poster_path}`} alt={context.selectedMovie.title}></img>
                            : <img className='no-poster' src={logo} alt='CM-logo'></img>
                        }
                    </div>
                </header>
                <div className='movie__modal__body'>
                    <div className='movie__modal__body__title'>
                        <h3><span>{context.selectedMovie.title}</span></h3>
                        <p><b>Original Title</b> : {context.selectedMovie.original_title}</p>
                    </div>
                    <div className='movie__modal__body__info'>
                        <p><b>Genre</b> :
                            {context.selectedMovie.genre_ids != '' ?
                                context.selectedMovie.genre_ids.map((item, idx) => {
                                    return context.selectedMovie.genre_ids.length - 1 !== idx ? ` ${genreId(item)},` : ` ${genreId(item)}`
                                })
                                : ' ??'}
                        </p>
                        <p><b>Language</b> : {context.selectedMovie.original_language.toUpperCase() || ''}</p>
                        <p><b>Popularity</b> : {context.selectedMovie.popularity}</p>
                        <p><b>Released Date</b> : {context.selectedMovie.release_date || '??'}</p>
                        <p><span>Vote Average</span> : <span>&#10084; {context.selectedMovie.vote_average}</span></p>
                        <p><span>Vote Count</span> : <span>{context.selectedMovie.vote_count}</span></p>
                        <p><b>Overview</b> : {context.selectedMovie.overview || 'There are currently no overview for this film'}</p>
                        <p style={{ textAlign: 'center', margin: '1rem' }}><b>Main Poster</b></p>
                        {context.selectedMovie.poster_path !== null ?
                            <img src={`https://image.tmdb.org/t/p/w500/${context.selectedMovie.poster_path}`} alt={context.selectedMovie.title}></img>
                            : <p style={{ textAlign: 'center' }}>No Poster have found</p>
                        }
                    </div>
                </div>
            </div>
        </div>
}

export default DisplayMovie;
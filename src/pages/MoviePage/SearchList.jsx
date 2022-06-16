/*
This page lists the results of the user's search as cards.
If the parms id exists, start the search.
Params id is created when entering value in search-box.
The params id is delivered as an element of requestURL.
*/

import React, { useEffect } from 'react';
import APIUtils from '../../api/APIUtils';
import { CardOffset } from '../../hooks';
import { Loading } from '../../components';
import { ImageLoading } from '../../hooks';

const SearchList = ({ requestURL }) => {
    const { cardLocation } = CardOffset();
    const { movieItem, isLoading, requestSearch } = APIUtils();
    const { ImageLoad, isImageLoading } = ImageLoading();

    useEffect(() => {
        requestSearch(requestURL);
    }, [requestURL]);

    useEffect(() => {
        if (!isLoading) {
            for (let idx in movieItem) {
                if (movieItem[idx].poster_path !== null) {
                    ImageLoad(movieItem[idx].poster_path);
                }
            }
        }
    }, [isLoading]);

    function onClickHandler(e) {
        cardLocation(e.target.offsetParent.children[1], movieItem[e.target.attributes.value.value]);
    };

    return <>
        {
            !isLoading ?
                movieItem.length === 0 ?
                    <div className='movie__search__error-page'> {/* When searched result returns 0 */}
                        <h3>Oops!</h3>
                        <p>
                            There were no results matching the movie title you entered
                        </p>
                        <p>
                            Tip : Check if the spelling of the title you entered is correct.
                            If you're unsure of your spelling, type in each letter and check out the movie list of suggestions at the bottom of the search bar.
                        </p>
                    </div> :
                    <div className='movie__search__list'> {/* Displaying searched movies */}
                        <header className='movie__search__list__header'>
                            <p>You have searched: <b>{requestURL}</b></p>
                        </header>
                        <div className='movie__search__list__body'>
                            {movieItem.map((item, idx) => {
                                return (
                                    <div className='card' onClick={onClickHandler} key={item.title + idx}>
                                        {item.poster_path !== null ?
                                            <img className={isImageLoading ? 'card__image' : 'card__image--ready'} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} value={idx} alt={item.title} />
                                            : <div value={idx} className='card__poster-null'><p>{item.title}</p></div>
                                        }
                                        <div className='card__front-title'>
                                            <p>
                                                {item.title.length > 45 ? item.title.substring(0, 45) + '...' : item.title}
                                            </p>
                                            <p>
                                                <span>&#10084; {item.vote_average}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                :
                <Loading />
        }
    </>
}

export default SearchList

/*
This page lists the movies by genre.
Fetch 3 requestURLs and get 20 items each.
*/

import React, { useState, useEffect, useMemo } from 'react'
import APIUtils from '../../api/APIUtils';
import { CardSlide, CardOffset } from '../../helpers';
import { ImageLoading } from '../../hooks';
import { Loading } from '../../components';

function RankingList({ genreItem, requestURL, optionURL }) {
    const { cardLocation } = CardOffset();
    const { ImageLoad, isImageLoading } = ImageLoading();
    const { movieItem, isLoading, requestMovie } = APIUtils();
    const { slide, cardArray, positionIdx } = CardSlide(requestURL, optionURL);
    const [checked, setChecked] = useState(false);
    let left, right = false;

    useEffect(() => {
        requestMovie(requestURL + optionURL);
        setChecked(false);
    }, [requestURL, optionURL]);

    // check if the movie poster has finished downloading
    useEffect(() => {
        if (!isLoading) {
            for (let idx in movieItem) {
                if (movieItem[idx].poster_path !== null) {
                    ImageLoad(movieItem[idx].poster_path);
                }
            }
        }
    }, [isLoading]);

    const handleLeftRight = (e) => {
        left = e.target.parentNode.className.includes('card-position--left') ? true : false;
        right = e.target.parentNode.className.includes('card-position--right') ? true : false;
        if (left || right) {
            slide(left);
        }
    }

    const handleCard = (e) => {
        if (e.target.parentNode.className.includes('card-position--center')) {
            cardLocation(e.target, movieItem[e.target.attributes.value.value]);
        }
    }

    const handleChangeChecked = (e) => {
        setChecked(!checked);
    }

    return (
        <>
            <section className='movie__recommend__list'>
                {!isLoading ?
                    <>
                        <div className="movie__recommend__list__header">
                            <h3>{genreItem}</h3>
                            <label>
                                Show Lists
                                <input type="checkbox" onChange={handleChangeChecked} />
                                <span></span>
                            </label>
                        </div>
                        <div className='movie__recommend__list__body'>
                            <div className='card-box'>
                                {cardArray.map((array, idx) => {
                                    return (
                                        <div className={cardArray[idx]} onClick={handleLeftRight} key={idx}>
                                            {
                                                movieItem.map((item, itemIdx) => {
                                                    if ((idx + 0) * 4 <= itemIdx && itemIdx < (idx + 1) * 4) {
                                                        return (
                                                            <div className='card' onClick={handleCard} value={itemIdx} key={itemIdx}>
                                                                {item.poster_path === null ?
                                                                    <div className="card__poster-null">
                                                                        {item.title}
                                                                    </div>
                                                                    :
                                                                    <img className={isImageLoading ? 'card__image' : 'card__image--ready'} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='movie__recommend__list__page-bar'>
                            <span style={{ left: `${positionIdx[0] * 20}%` }} />
                        </div>
                        <table className={checked ? 'movie__recommend__list__table' : 'display-none'}>
                            <tbody>
                                {cardArray.map((array, idx) => {
                                    return (
                                        movieItem.map((item, itemIdx) => {
                                            if (positionIdx[0] === idx && (positionIdx[0] + 0) * 4 <= itemIdx && itemIdx < (positionIdx[0] + 1) * 4) {
                                                return (
                                                    <tr key={item.title}>
                                                        <td>{itemIdx + 1}</td>
                                                        <td>{item.title}</td>
                                                        <td>&#10084; {item.vote_average.toFixed(1)}</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    )
                                })}
                            </tbody>
                        </table>
                    </>
                    :
                    <Loading />
                }
            </section>
        </>
    )
}

export default RankingList
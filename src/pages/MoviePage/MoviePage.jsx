/*
This page is where users can view recommended movies and searched movies.
The user assigns a value to requestURL by clicking an option on the aside or by doing a search.
The requestURL is passed to APIUtils.jsx to fetch the movie.
*/

import './topMovies.css';
import logo from '../../assets/main_logo.png';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIndexContext } from '../../context/IndexContext';
import { AsideOption } from '../../helpers';
import { Upcoming, RankingList, SearchList, DisplayMovie } from '../';

function MoviePage() {
    const [context, setContext] = useIndexContext();
    const params = useParams();
    const { setOption, displayOption, genreIdx, hasReachedFooter, genreArray, requestURL, optionURL } = AsideOption();
    const [toggleLeft, setToggleLeft] = useState(false);

    // The user selects a genre or option from aside menu.
    const handleAsideOption = (e) => {
        setOption(e.target.value, e.target.name);
    };

    const handlePopUpClose = () => {
        setContext({
            ...context,
            asideToggle: false,
            displayMovie: false
        });
    };

    const handleMenuToggle = () => {
        setContext({
            ...context,
            asideToggle: !context.asideToggle
        });
    };

    const handleMenuHide = () => {
        setContext({
            ...context,
            asideToggle: false
        });
        setToggleLeft(!toggleLeft);
    };

    // Displays searched movie lists if the params id exists.
    useEffect(() => {
        params.id !== undefined &&
            setContext({
                ...context,
                displaySearch: true,
                asideToggle: false
            });
        window.scrollTo(0, 0);
    }, [params.id]);

    return (
        <div className="wrapper">
            <div className={`${(context.asideToggle || context.displayMovie) && 'pop-up-close'}`} onClick={handlePopUpClose}></div>

            {/* This is Aside Menu when screen width is desktop size */}
            <aside className={`aside ${context.asideToggle && 'aside--display'}`}>
                <div className='content'>

                    <div className='aside__design'>
                        <span className='aside__design__edge-block'></span>
                        <span className='aside__design__edge-block'></span>
                    </div>
                    <img className='aside__logo' src={logo} alt='CM-logo' />

                    {/* Select Genre */}
                    <section>
                        <h3>Genre</h3>
                        {genreArray.map((item, idx) => {
                            return (
                                <button
                                    className={`aside__btn ${genreIdx === idx && 'aside__btn--active'}`}
                                    key={idx}
                                    value={idx}
                                    name={'movie-genre'}
                                    onClick={handleAsideOption}>
                                    {`${item.genre[0]} , ${item.genre[1]} , ${item.genre[2]}`}
                                    <span></span>
                                </button>
                            )
                        })}
                    </section>

                    {/* Select Option */}
                    <section>
                        <h3>Sort By</h3>
                        <div className={`aside__radio ${!displayOption && 'aside__radio--opacity'}`} onChange={handleAsideOption}>
                            <input type='radio' value='popular' id='popular' name='movie-option' defaultChecked={'popular'} />
                            <label htmlFor='popular'>Popularity</label>
                            <input type='radio' value='voted' id='voted' name='movie-option' />
                            <label htmlFor='voted'>Voted</label>
                            <input type='radio' value='revenue' id='ravenue' name='movie-option' />
                            <label htmlFor='ravenue'>Revenue</label>
                        </div>
                    </section>

                    {/* Go to Search Home */}
                    <section>
                        <h3>Search</h3>
                        <button className={`aside__btn ${context.displaySearch && 'aside__btn--active'}`} onClick={handleAsideOption}>
                            Search Movies
                            <span></span>
                        </button>
                    </section>

                </div>
            </aside>

            {/* This is Aside Menu when screen width is under desktop size */}
            <div className={`minimized-aside ${(hasReachedFooter || context.displayMovie) && 'minimized-aside--opacity'}`} style={toggleLeft ? { left: '0' } : { left: '50%' }}>

                {/* Open the menu */}
                <div className='minimized-aside__btn' onClick={handleMenuToggle}>
                    <div className={`minimized-aside__btn__menu ${context.asideToggle && 'minimized-aside__btn__menu--active'}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                {/* Hide the menu */}
                <div className='minimized-aside__btn' onClick={handleMenuHide}>
                    <div className={`minimized-aside__btn__to-left ${toggleLeft && 'minimized-aside__btn__to-left--active'}`}>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={toggleLeft || context.asideToggle ? 'minimized-aside__blurry--off' : 'minimized-aside__blurry'}></div>
            </div>

            <main className='movie'>
                <div className='content'>
                    {requestURL !== null && !context.displaySearch ?
                        <div className='movie__recommend'> {/* Recommend Movie lists */}
                            <Upcoming requestURL={requestURL} />
                            {
                                context.genreList.map((genreItem, idx) => {
                                    return <RankingList
                                        key={idx}
                                        genreItem={genreItem}
                                        requestURL={requestURL[idx]}
                                        optionURL={optionURL}
                                    />
                                })
                            }

                        </div>
                        :
                        <div className='movie__search'> {/* Searched Movie list */}
                            {params.id === undefined ?
                                <div className='movie__search__home'>
                                    <img src={logo} alt="CM-logo" />
                                    <h3>
                                        Search for the movie title in the search bar at the top of the screen
                                        <span></span>
                                    </h3>
                                </div>
                                :
                                <SearchList requestURL={params.id} />
                            }
                        </div>

                    }
                </div>
            </main>

            {/* Opens the Modal when the Movie Card is pressed */}
            {context.displayMovie && <DisplayMovie />}
        </div>
    )
}

export default MoviePage
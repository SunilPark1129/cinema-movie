/*
This page is the main homepage.
There is nothing other than slide function and homepage description on this page.
*/

import React, { useState, useEffect, useRef } from 'react';
import './homePage.css';
import logo from '../../assets/main_logo.png';
import movieRecommend from '../../assets/movie-recommend.jpg';
import movieSearch from '../../assets/movie-search.jpg';
import { scrollEffect } from '../../helpers';

const HomePage = () => {
    const positionAboutFirst = useRef();
    const positionAboutSecond = useRef();
    const positionTip = useRef();
    const [scrollAboutFirst, setScrollAboutFirst] = useState(400);
    const [scrollAboutSecond, setScrollAboutSecond] = useState(400);
    const [scrollTip, setScrollTip] = useState(400);

    useEffect(() => {
        window.addEventListener('scroll', scroller);
        return (() => {
            window.removeEventListener('scroll', scroller);
        });
    }, []);

    // The closer the return value is to 0, the more targeted elements appear due to transform and opacity.
    const scroller = () => {
        setScrollAboutFirst(scrollEffect(positionAboutFirst));
        setScrollAboutSecond(scrollEffect(positionAboutSecond));
        setScrollTip(scrollEffect(positionTip));
    };

    return (
        <div className='wrapper'>
            <main className='home'>

                <section className='home__header'>
                    <h2>Cinema Movie</h2>
                    <div className='scroll-down-icon-ani' style={{ opacity: `${scrollAboutFirst === 0 ? 0 : 0 + (scrollAboutFirst / 3 * .01)}` }}><span></span></div>
                </section>

                <section className='home__about'>
                    <section ref={positionAboutFirst} className='content'>
                        <div className="home__about__text" style={{ transform: `translate3d(0, ${scrollAboutFirst}px, 0px)`, opacity: `${scrollAboutFirst === 0 ? 1 : 1 - (scrollAboutFirst / 3 * .01)}` }}>
                            <p>
                                Cinema Movie is a site that allows users to easily search for and recommend movies.
                                You can search directly by movie title, or it recommends 20 famous movies by genre through the pre-prepared feature.
                            </p>
                        </div>
                        <div className='home__about__image-box' style={{ transform: `translate3d(0px, ${scrollAboutFirst}px, 0px)`, opacity: `${scrollAboutFirst === 0 ? 1 : 1 - (scrollAboutFirst / 3 * .01)}` }}>
                            <img src={movieRecommend} alt='movie recommend lists' />
                        </div>
                    </section>

                    <section ref={positionAboutSecond} className='content'>
                        <div className="home__about__text" style={{ transform: `translate3d(0, ${scrollAboutSecond}px, 0px)`, opacity: `${scrollAboutSecond === 0 ? 1 : 1 - (scrollAboutSecond / 3 * .01)}` }}>
                            <p>
                                Before you watch a movie, look for a movie in Cinema Movie first.
                                We provide users with a movie's rating, release date, poster and overview.
                                We update from old movies to newest movies and provide listings of all types.
                            </p>
                        </div>
                        <div className='home__about__image-box' style={{ transform: `translate3d(0px, ${scrollAboutSecond}px, 0px)`, opacity: `${scrollAboutSecond === 0 ? 1 : 1 - (scrollAboutSecond / 3 * .01)}` }}>
                            <img src={movieSearch} alt='movie search lists' />
                        </div>
                    </section>
                </section>

                <section ref={positionTip} className='home__tip'>
                    <div className='home__tip__background-img' style={{ transform: `translate3d(${scrollTip}px, 0px, 0px)`, opacity: `${scrollTip === 0 ? 1 : 1 - (scrollTip / 3 * .01)}` }} />
                    <div className='content'>
                        <header style={{ transform: `translate3d(-${scrollTip}px, 0px, 0px)`, opacity: `${scrollTip === 0 ? 1 : 1 - (scrollTip / 3 * .01)}` }}>
                            <h2>Simple tips for ease of use:</h2>
                        </header>
                        <ul style={{ transform: `translate3d(0px, ${scrollTip}px, 0px)`, opacity: `${scrollTip === 0 ? 1 : 1 - (scrollTip / 3 * .01)}` }}>
                            <li>Searching for a movie will bring up a list of 20 movies associated with that title name</li>
                            <li>Whenever you type in the search bar, you can see related movie titles</li>
                            <li>You can check the rating, release date and overview of movies</li>
                            <li>You can find the most popular, voted and revenue movies by each of genres in Top Movies tap</li>
                            <li>You can easily view the posts and contents of the movie with couple of clicks</li>
                            <li>You can find everything from old movies to new movies</li>
                        </ul>
                    </div>
                </section>

                <section className='home__api-copyright'>
                    <header>
                        <h2>Application Programming Interface</h2>
                    </header>
                    <div className='logo-box'>
                        <img src={logo} className='logo' alt='CM-logo' />
                        <img src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' className='logo' alt='DB-logo' />
                    </div>
                    <div className='content'>
                        <p>
                            We use all information related to movies by importing from The Movie Database (TMDB).
                            Popular movies, votes and revenue are all information provided by TMDB's standards.
                            Movie posts, release date and overview were also taken from TMDB.
                            Other than importing information, we have not added our personal thoughts or additional content about the movie information.
                            We would like to inform that we received the license key from TMDB and used it for Current Movie.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default HomePage

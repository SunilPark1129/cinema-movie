/*
This page manages all features related to aside menu.
*/

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useIndexContext } from '../context/IndexContext';
import request from '../services/request';
import genreArray from '../services/genres';

const AsideOption = () => {
    const navigate = useNavigate();
    const [context, setContext] = useIndexContext();

    const
        [isLimitedAsideWidth, setLimitedAsideWidth] = useState(),
        [hasReachedFooter, setReachedFooter] = useState(false),
        [genreIdx, setGenreIdx] = useState(0),
        [displayOption, setDisplayOption] = useState(false),
        [optionURL, setOptionURL] = useState(''),
        [requestURL, setRequestURL] = useState(null);

    //---------------------- handle menu toggle -----------------------//

    // When current screen reached to the footer or width of the value, hide the menu.
    useEffect(() => {
        window.addEventListener('resize', resizer);
        window.addEventListener('scroll', scroller);
        return (() => {
            window.removeEventListener('resize', resizer);
            window.removeEventListener('scroll', scroller);
        })
    }, []);

    const scroller = () => {
        window.scrollY > document.documentElement.scrollHeight - document.body.offsetHeight - 150 ? setReachedFooter(true) : setReachedFooter(false);
    };

    const resizer = () => {
        window.innerWidth > 1040 ? setLimitedAsideWidth(true) : setLimitedAsideWidth(false);
    };

    useEffect(() => {
        isLimitedAsideWidth && setContext({ ...context, asideToggle: false });
    }, [isLimitedAsideWidth]);

    // --------------------- handle option ----------------------- //

    // gets the option value from the user and creates a new value for fetching.
    const setOption = (value, name) => {
        // if the user selected the genre button
        if (name === 'movie-genre') {
            setGenreIdx(Number(value));
            navigate('/movie');
        }
        // if the user selected the option button
        else if (name === 'movie-option') {
            if (value === 'popular') {
                setOptionURL(request.sortByPopular);
            }
            else if (value === 'voted') {
                setOptionURL(request.sortByVoted);
            }
            else {
                setOptionURL(request.sortByRevenue);
            };
        }
        // if the user selected Search Movie button
        else {
            setContext({
                ...context,
                displaySearch: true,
                asideToggle: false,
            });
        };
    };

    useEffect(() => {
        context.displaySearch && setGenreIdx(-1);
    }, [context.displaySearch]);

    // set up a new URL to fetch the item from APIutils
    useEffect(() => {
        if (genreIdx === -1) {
            setDisplayOption(false);
        }
        else {
            setRequestURL([
                genreArray[genreIdx].fetch[0],
                genreArray[genreIdx].fetch[1],
                genreArray[genreIdx].fetch[2]
            ]);
            setContext({
                ...context,
                genreList: genreArray[genreIdx].genre,
                displaySearch: false
            });
            setDisplayOption(true);
        }
        window.scrollTo(0, 0);
        return (() => {
            setRequestURL([]);
        })
    }, [genreIdx]);

    return { setOption, displayOption, genreIdx, hasReachedFooter, genreArray, requestURL, optionURL };
}

export default AsideOption;
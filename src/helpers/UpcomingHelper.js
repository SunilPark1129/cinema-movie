/*
This page randomly picks a number and returns the resulting value.
*/

import React, { useState, useEffect } from 'react'
import { ImageLoading } from '../hooks';
import APIUtils from '../api/APIUtils';

const UpcomingHelper = (requestURL) => {
    const { movieItem, isLoading, requestUpcoming } = APIUtils();
    const { ImageLoad, isImageLoading } = ImageLoading();
    const [upcomingMovie, setUpcomingMovie] = useState();
    const [lastNum, setLastNum] = useState();
    const [errorCount, setErrorCount] = useState();

    useEffect(() => {
        requestFetch();
    }, [requestURL]);

    // Fetch the movie whenever the user changes genre or refresh.
    function requestFetch() {
        requestUpcoming(requestURL[Math.floor(Math.random() * 3)]);
    }

    function pickMovie() {
        let randomNum = Math.floor(Math.random() * movieItem.length);
        setLastNum(movieItem[randomNum].id);

        // If the id of the last selected movie is the same as the id currently selected, select the RANDOM NUMBER again.
        if (movieItem[randomNum].id === lastNum) {
            pickMovie();
        }
        // If the selected movie has no poster, FETCH it again.
        else if (movieItem[randomNum].backdrop_path === null) {
            requestFetch();
        }
        else {
            setUpcomingMovie(movieItem[randomNum]);
            ImageLoad(movieItem[randomNum].backdrop_path);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            if (movieItem == '' && errorCount !== 3) {
                requestFetch();
                setErrorCount(errorCount+1);
            } 
            else {
                pickMovie();
                setErrorCount(0);
            };
        }
    }, [isLoading]);

    return { requestFetch, upcomingMovie, isImageLoading, isLoading, movieItem };
}

export default UpcomingHelper
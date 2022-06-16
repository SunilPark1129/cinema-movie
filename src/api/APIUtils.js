/*
This page fetches the requested search terms and movie contents.
All extracted contents are saved in the movieItem element.
*/

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useIndexContext } from '../context/IndexContext';

const API_KEY = 'api_key=b0a4d245d5b20ec7da2f1eb0a7b47d89';
const BASE_URL = 'https://api.themoviedb.org/3';

const APIUtils = () => {
    const unmounted = useRef(true);
    const [URL, setURL] = useState(['', true]);
    const [movieItem, setMovieItem] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [context, setContext] = useIndexContext();

    // Returns movieItem and isLoading.
    useEffect(() => {
        let cancelToken = axios.CancelToken.source();
        if (!unmounted.current) {
            const fetchItems = async () => {
                try {
                    await axios.get(URL[0], {
                        cancelToken: cancelToken.token
                    })
                        .then((items) => {
                            setMovieItem(items.data.results);
                            setLoading(false);
                        })
                } catch (error) {
                    throw error;
                };
            };
            fetchItems();
        }
        return () => {
            setLoading(true);
            cancelToken.cancel();
            unmounted.current = false;
        };
    }, [URL]);

    const requestSearch = (requestURL) => {
        setURL([BASE_URL + '/search/movie?' + API_KEY + '&query=' + requestURL, true]);
    }
    const requestMovie = (requestURL) => {
        setURL([BASE_URL + '/discover/movie?' + requestURL + API_KEY, true]);
    }
    const requestUpcoming = (requestURL) => {
        setURL([BASE_URL + '/movie/upcoming?' + requestURL + API_KEY, !URL[1]]);
    }

    return { movieItem, isLoading, requestSearch, requestMovie, requestUpcoming };
}

export default APIUtils
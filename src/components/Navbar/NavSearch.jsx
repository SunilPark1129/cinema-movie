/*
This page creates a value to fetch the movie to search.
*/

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import APIUtils from '../../api/APIUtils';
import Loading from '../Loading/Loading';
import { debounce } from '../../hooks';

const SearchQuery = () => {
    const navigate = useNavigate();
    const inputEl = useRef(null);
    const unmounted = useRef(true);
    const [hasFocus, setFocus] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    const [isInputEmpty, setInputEmpty] = useState(true);
    const { movieItem, isLoading, requestSearch } = APIUtils();

    // If there is no value in input, the search term is not displayed.
    const handleChangeInput = debounce(() => {
        if (inputEl.current.value !== '') {
            setCurrentInput(inputEl.current.value);
        }
        else {
            setCurrentInput('');
            setInputEmpty(true);
        }
    }, 500);

    const handleKeyDownInput = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    }

    const handleQuerryList = (e) => {
        inputEl.current.value = e.target.innerHTML;
        handleSubmit();
    }

    // When the search box loses focus, the query list will disappear
    useEffect(() => {
        if (!unmounted.current) {
            if (hasFocus) {
                if (currentInput !== '') {
                    requestSearch(currentInput);
                    setInputEmpty(false);
                }
            } else {
                setTimeout(() => {
                    setInputEmpty(true);
                }, 200);
            }
        }
        return (() => {
            unmounted.current = false;
        })
    }, [hasFocus, currentInput]);

    // Fetch the result value of input.
    const handleSubmit = () => {
        if (inputEl.current.value !== '') {
            // Prevents errors in URLs when navigating to a page.
            let movieURL = '';
            if (inputEl.current.value.includes('/')) {
                movieURL = inputEl.current.value.replaceAll('/', ' ');
            } else {
                movieURL = inputEl.current.value;
            }
            inputEl.current.value = '';
            setCurrentInput('');
            setInputEmpty(true);
            navigate(`movie/${movieURL}`);
        }
    }

    return <>
        <div className='search-box'>
            <input
                type='text'
                ref={inputEl}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder="Search Movie"
                maxLength={50}
                autoComplete="off"
                onChange={handleChangeInput}
                onKeyDown={handleKeyDownInput}
            >
            </input>
            <button type='submit' onClick={handleSubmit}>
                <span></span><span></span><span></span>
            </button>
            {
                !isInputEmpty &&
                <div className='search-box__query-list' onClick={handleQuerryList}>
                    {
                        isLoading ?
                            <Loading isQuery={true} />
                            :
                            movieItem.length === 0 ?
                                <p style={{ pointerEvents: 'none' }}>No results were found</p>
                                :
                                movieItem.map((item, idx) => {
                                    return idx < 8 && <p key={item.title + idx} value={item.title}>{item.title}</p>
                                })
                    }
                </div>
            }
        </div>
    </>
};

export default SearchQuery;
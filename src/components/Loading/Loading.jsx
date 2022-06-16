/*
This page shows the loading screen until the fetched item is completely received.
*/

import React from 'react';
import './loading.css';

const Loading = ({ isQuery }) => {
    return <>
        {
            !isQuery ?
                // Loading for fetching movie search and movie list
                <div className="fetch-loading__movie">
                    <div className="fetch-loading__movie__icon">
                        <p>Loading</p>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                :
                // Loading for fetching query list
                <div className='fetch-loading__query'><span></span></div>
        }
    </>
};

export default Loading;
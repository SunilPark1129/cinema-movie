/*
This is the page to set the slide when left or right is selected in the list body of the card.
It consists of 5 slides, and 3 slides are visible to the user.
The rest works outside the wrapper to give a natural slide effect.
*/

import React, { useState, useEffect } from 'react';
import { delay } from '../hooks'

const CardSlide = (requestURL, optionURL) => {
    let cardAttributes = [
        'card-position card-position--center',
        'card-position card-position--right',
        'card-position',
        'card-position',
        'card-position card-position--left'
    ];
    let countCenter = 0, countLeft = 4, countRight = 1;
    const [cardArray, setCardArray] = useState([]);
    const [positionIdx, setPositionIdx] = useState([]);

    // When a new requestURL is ready or when the window is refreshed
    useEffect(() => {
        setCardArray(cardAttributes);
        setPositionIdx([countCenter, countLeft, countRight]);
    }, [requestURL, optionURL]);

    // The slide position changes depending on whether the user selects the left or right card.
    const slide = (left) => {
        calcPosition(left);
        
        // Slide the OUTSIDE card INTO the card box.
        cardAttributes[countCenter] += left ? ' card-position--left' : ' card-position--right';
        cardAttributes[countLeft] += left ? ' card-position--left-left' : ' card-position--center';
        cardAttributes[countRight] += !left ? ' card-position--right-right' : ' card-position--center';
        setCardArray([cardAttributes[0], cardAttributes[1], cardAttributes[2], cardAttributes[3], cardAttributes[4]]);

        // Slide the card INSIDE to the OUTSIDE of the card box.
        delay(1).then(() => {
            cardAttributes[countCenter] = 'card-position card-position--center';
            cardAttributes[countLeft] = 'card-position card-position--left';
            cardAttributes[countRight] = 'card-position card-position--right';
            setCardArray([cardAttributes[0], cardAttributes[1], cardAttributes[2], cardAttributes[3], cardAttributes[4]]);
        });
    };

    // Each time a left or right card is selected, the card is recalculated.
    function calcPosition(left) {
        for (let i = 0; i < cardAttributes.length; i++) {
            cardAttributes[i] = 'card-position';
        }

        // When the slide reaches the end, it returns to the beginning.
        countCenter = left ? positionIdx[0] === 0 ? 4 : positionIdx[0] - 1 : positionIdx[0] === 4 ? 0 : positionIdx[0] + 1;
        countLeft = left ? positionIdx[1] === 0 ? 4 : positionIdx[1] - 1 : positionIdx[1] === 4 ? 0 : positionIdx[1] + 1;
        countRight = left ? positionIdx[2] === 0 ? 4 : positionIdx[2] - 1 : positionIdx[2] === 4 ? 0 : positionIdx[2] + 1;
        setPositionIdx([countCenter, countLeft, countRight]);
    };

    return { slide, cardArray, positionIdx };
}

export default CardSlide;
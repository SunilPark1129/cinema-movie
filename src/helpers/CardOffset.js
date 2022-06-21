/*
This page measures the current position and size of the card selected by the user.
This is for the purpose of animating effects while changing to a larger size.
*/

import { useIndexContext } from '../context/IndexContext';
const CardOffset = () => {
    const [context, setContext] = useIndexContext();

    const cardLocation = (event, movieItem) => {
        const target = event.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
        const clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

        const cardLeft = target.left + scrollLeft - clientLeft;
        const cardTop = target.top - clientTop;
        const cardOffsetWidth = event.offsetWidth + 10;
        const cardOffsetHeight = event.offsetHeight + 10;

        // when all execution is finished, the result is transferred to Display.jsx to display the result by useContext
        setContext({
            ...context,
            displayMovie: true,
            selectedMovie: movieItem,
            cardPosition: {cardLeft, cardTop, cardOffsetWidth, cardOffsetHeight}
        });
    }

    return { cardLocation };
};

export default CardOffset
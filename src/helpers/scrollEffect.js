/*
Returns the result by subtracting the current scroll position from the scroll position and the target element.
*/

const scrollEffect = (position) => {
    let value;
    if(position.current !== null) {
        if (400 < position.current.getBoundingClientRect().top) {
            value = (position.current.getBoundingClientRect().top - 400);
        }
        else {
            value = (0);
        }
    }
    return value
}

export default scrollEffect
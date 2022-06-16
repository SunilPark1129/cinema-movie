/*
By putting a debounce(delay) before fetching a search query, it increases efficiency.
*/

function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export default debounce;
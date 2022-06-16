/*
Store all datas here.
Recall saved data from this page as needed.
*/

import React, { useState, useEffect, useContext, createContext } from "react";

const IndexContext = createContext();

export function useIndexContext() {
    return useContext(IndexContext);
}

export function IndexProvider({ children }) {
    /*-----------------------------------------------------------------------------------------------------------------------------------------
          asideToggle = TRUE opens the menu.
          displayMovie = TRUE shows the contents of the movie.
          displaySearch = TRUE shows the page of search results.
          genreList = Each time the user changes the genre in the aside option, it applies here.
          randomIdx = Get two random numbers to find the recommended movie. the first number is for the genre index and the second number is for the movie index inside of the genre object.
          cardPosition = Store the position and size of the card the user clicked. the purpose is to put the animation effect in the targeted card.
          selectedMovie = Get the movie object here to display the contents of the movie at the display.jsx.
      ------------------------------------------------------------------------------------------------------------------------------------------*/
    const [context, setContext] = useState({
        asideToggle: false,
        displayMovie: false,
        displaySearch: false,
        genreList: [],
        randomIdx: [],
        cardPosition: [],
        selectedMovie: "",
    });

    useEffect(() => {
        context.asideToggle || context.displayMovie
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");
    }, [context.asideToggle, context.displayMovie]);

    return (
        <IndexContext.Provider value={[context, setContext]}>
            {children}
        </IndexContext.Provider>
    );
}

/*
Each time the user selects a genre, 3 genres are selected.
The selected genre is passed to APIUtils.js for fetch
*/

import request from "./request";

const genres = [
    {
        genre: ['Comedy', 'Action', 'Adventure'],
        fetch: [request.fetchComedy, request.fetchAction, request.fetchAdventure]
    },
    {
        genre: ['Animation', 'Music', 'TV-Movie'],
        fetch: [request.fetchAnimation, request.fetchMusic, request.fetchTVMovie]
    },
    {
        genre: ['Drama', 'Family', 'Romance'],
        fetch: [request.fetchDrama, request.fetchFamily, request.fetchRomance]
    },
    {
        genre: ['Mystery', 'Horror', 'Thriller'],
        fetch: [request.fetchMystery, request.fetchHorror, request.fetchThriller]
    },
    {
        genre: ['Fantasy', 'SF', 'Documentary'],
        fetch: [request.fetchFantasy, request.fetchSF, request.fetchDocumentary]
    },
    {
        genre: ['Crime', 'War', 'History'],
        fetch: [request.fetchCrime, request.fetchWar, request.fetchHistory]
    }
]

export default genres;

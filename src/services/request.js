/*
This page is pre-worked to fetch the values of genres and options.
*/

const request = {
    fetchComedy: 'with_genres=35&include_adult=false&',
    fetchAction: 'with_genres=28&include_adult=false&',
    fetchAdventure: 'with_genres=12&include_adult=false&',
    fetchAnimation: 'with_genres=16&include_adult=false&',
    fetchMusic: 'with_genres=10402&include_adult=false&',
    fetchDrama: 'with_genres=18&include_adult=false&',
    fetchFamily: 'with_genres=10751&include_adult=false&',
    fetchRomance: 'with_genres=10749&include_adult=false&',
    fetchCrime: 'with_genres=80&include_adult=false&',
    fetchHorror: 'with_genres=27&include_adult=false&',
    fetchThriller: 'with_genres=53&include_adult=false&',
    fetchWar: 'with_genres=10752&include_adult=false&',
    fetchMystery: 'with_genres=9648&include_adult=false&',
    fetchTVMovie: 'with_genres=10770&include_adult=false&',
    fetchFantasy: 'with_genres=14&include_adult=false&',
    fetchSF: 'with_genres=878&include_adult=false&',
    fetchDocumentary: 'with_genres=99&include_adult=false&',
    fetchHistory: 'with_genres=36&include_adult=false&',
    fetchWestern: 'with_genres=37&include_adult=false&',
    sortByPopular: 'sort_by=popularity.desc&',
    sortByVoted: 'sort_by=vote_count.desc&',
    sortByRevenue: 'sort_by=revenue.desc&',
}

export default request;
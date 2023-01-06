const url = new URL('https://api.jikan.moe/v4/anime');
/* to make query */

/* limit search param to be anime with g rating with descending highest score to grab top 10 */
url.search = new URLSearchParams({
    rating: 'g',
    start_date: 2022,
    // page: 1,
    limit: 10,
    order_by: 'score',
    sort: 'desc'
})

fetch(url)
    .then(res => {
        // console.log(res)
        return res.json();
    })
    .then(jsonResult => {
        
        console.log(jsonResult);
    })

const ff14Url = new URL('https://api.jikan.moe/v4/anime?start_date=2022&rating=g');
/* to make query */

fetch(ff14Url)
    // .then(res => res.json())
    .then(res => {
        // console.log(res)
        return res.json();
    })
    .then(jsonResult => {
        console.log(jsonResult);
    })

const url = new URL('https://api.jikan.moe/v4/anime?start_date=2022&rating=g');
/* to make query */



fetch(url)
    // .then(res => res.json())
    .then(res => {
        // console.log(res)
        return res.json();
    })
    .then(jsonResult => {
        
        console.log(jsonResult);
    })

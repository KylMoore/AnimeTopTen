/* namepspacing */
const animeTopTen = {};
animeTopTen.filtered = [];

/* base api url */
animeTopTen.url = 'https://api.jikan.moe/v4/anime';

animeTopTen.init = () => {
    animeTopTen.displayAll();
};

/* to make query */
const url = new URL(animeTopTen.url);

/* limit search param to be anime with g rating with descending highest score to grab top 10 */
url.search = new URLSearchParams({
    rating: 'pg13',
    start_date: 2020,
    // page: 1,
    limit: 25,
    order_by: 'score',
    // order_by: 'members',
    sort: 'desc',
    // type: 'tv'
})

animeTopTen.displayAll = () => {
    fetch(url)
        .then(res => {
            // console.log(res)
            return res.json();
        })
        .then(jsonResult => {
            // console.log(jsonResult);
            animeTopTen.rankTen = jsonResult.data;
            console.log(animeTopTen.rankTen);
            
            animeTopTen.rankTen.forEach( (anime) => {
                if (anime.members > 10000 && animeTopTen.filtered.length < 10) {
                    animeTopTen.filtered.push(anime)
                }
            })

            console.log(animeTopTen.filtered);
            animeTopTen.displayAnime();
        })
    };
    
    animeTopTen.displayAnime = () => {

        const ulEl = document.querySelector('.animeGallery');
        animeTopTen.filtered.forEach( (anime) => {

            const liEl = document.createElement('li');
            const titleEl = document.createElement('h3');
            const scoreEl = document.createElement('h4');
            const imgEl = document.createElement('img');
            const synopEl = document.createElement('p');

            titleEl.textContent = anime.title;
            scoreEl.textContent = anime.score;
            imgEl.src = anime.images.jpg.image_url;
            imgEl.alt = `poster picture for ${anime.title}`;
            /* 
            using character limit to ensure synopsis length are similar for each anime.
            technique found from: https://stackoverflow.com/questions/33718245/limit-characters-displayed-in-span
            */
            synopEl.style = `display:inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100ch;`
            synopEl.textContent = anime.synopsis;

            liEl.appendChild(titleEl);
            liEl.appendChild(scoreEl);
            liEl.appendChild(imgEl);
            liEl.appendChild(synopEl);

            ulEl.appendChild(liEl)
        });
    };


    animeTopTen.init();
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
            // console.log(animeTopTen.rankTen);

            animeTopTen.rankTen.forEach((anime) => {
                if (anime.members > 10000 && animeTopTen.filtered.length < 10) {
                    animeTopTen.filtered.push(anime)
                }
            })

            // console.log(animeTopTen.filtered);
            animeTopTen.displayAnime();
        })
};

animeTopTen.displayAnime = () => {

    const ulEl = document.querySelector('.animeGallery');
    animeTopTen.filtered.forEach((anime) => {
        // console.log(anime)

        const liEl = document.createElement('li');
        const aEl = document.createElement('a');
        const titleEl = document.createElement('h3');
        const scoreEl = document.createElement('h4');
        const imgEl = document.createElement('img');
        const linkEl = document.createElement('p');
        const themeEl = document.createElement('p');

        aEl.href = anime.url;
        titleEl.textContent = anime.title;
        scoreEl.textContent = anime.score;
        imgEl.src = anime.images.jpg.image_url;
        imgEl.alt = `poster picture for ${anime.title}`;
        linkEl.textContent = `Click image learn more`
        themeEl.classList.add('text')

        let themeTags = '';
        for (let index = 0; index < anime.themes.length; index++) {
            const element = anime.themes[index];
            if (index == anime.themes.length - 1) {
                themeTags += `${element.name}`
            } else {
                themeTags += `${element.name}, `
            }
        }

        themeEl.textContent = themeTags;
        liEl.appendChild(titleEl);
        liEl.appendChild(scoreEl); 
        liEl.appendChild(aEl);
        aEl.appendChild(imgEl);
        aEl.appendChild(linkEl);
        liEl.appendChild(themeEl);

        // console.log(aEl);

        ulEl.appendChild(liEl)
    });
};


animeTopTen.init();
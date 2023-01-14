/* namespacing */
const animeTopTen = {};
animeTopTen.filtered = [];

/* base api url */
animeTopTen.url = 'https://api.jikan.moe/v4/anime';

animeTopTen.init = () => {
    animeTopTen.displayAll();

    animeTopTen.setUpEventListeners();

    animeTopTen.pageLoad();
};

//to reset our selection to default on pageload
animeTopTen.pageLoad = () => {
    const yearEl = document.querySelector("#year");
    const genreEl = document.querySelector("#genre");

    yearEl[0].selected = true;
    genreEl[0].selected = true;
}

animeTopTen.displayAll = (year = "time-2021-Present", selectGenre = "") => {

    let yearStart = "";
    let yearEnd = 2023;



    if (year === 'time-2021-Present') {
        yearStart = 2021;
        yearEnd = 2023;
    } else if (year === 'all-Time') {
        yearStart = 1995;
        yearEnd = 2023;
    } else if (year === 'time-2001-2010') {
        yearStart = 2001;
        yearEnd = 2010;
    } else if (year === 'time-2011-2020') {
        yearStart = 2011;
        yearEnd = 2020;
    }

    /* to make query */
    const url = new URL(animeTopTen.url);


    /* limit search param to be anime with g rating with descending highest score to grab top 10 */
    url.search = new URLSearchParams({
        rating: 'pg13',
        start_date: yearStart,
        end_date: yearEnd,
        // page: 1,
        limit: 25,
        genres: selectGenre,
        order_by: 'score',
        // order_by: 'members',
        sort: 'desc',
        // type: 'tv'

        
    })
    
    
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(jsonResult => {

            document.querySelector(".animeGallery").innerHTML = "";

            animeTopTen.rankTen = jsonResult.data;


            animeTopTen.filtered = [];
            animeTopTen.rankTen.forEach((anime) => {
                if (anime.members > 10000 && animeTopTen.filtered.length < 10) {
                    animeTopTen.filtered.push(anime)
                }
            })

            animeTopTen.displayAnime();
        })
};

animeTopTen.displayAnime = () => {

    const ulEl = document.querySelector('.animeGallery');
    animeTopTen.filtered.forEach((anime) => {

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



        ulEl.appendChild(liEl)
    });
};



animeTopTen.setUpEventListeners = function () {
    document.querySelector("#search").addEventListener("click", function (e) {
        e.preventDefault();
        const year = document.querySelector("#year");
        const genre = document.querySelector("#genre");

        const selectedYear = year.selectedOptions[0].value;
        const selectedGenre = genre.selectedOptions[0].value;


        animeTopTen.displayAll(selectedYear, selectedGenre);
    });
}



animeTopTen.init();
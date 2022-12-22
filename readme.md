[Live Link](https://animetopten.netlify.app/)

<!-- Pseudocode!! -->


using Jikan API: https://jikan.moe/showcase
 
MVP: top 10 anime of the year with G age rating
 
to find the top10 anime use getAnimeSearch function in the api and query
 
top10 ranking system to use: using the score out of 10 from MyAnimeList
 
const animeSearch = {};
 
const url new URL
 
animeSearch.ten = array (to later add in 10 anime)
 
   header - title (h1)
   nav - user options
 
   10 anime listing ul
       li - order by ranking score: highest to lowest
           ( score, title (h3), poster (img), synopsis (p) ) * 10
  
   footer - with made by Kyle, Jimmy, add Juno?
       credit the api, and Myanimelist
 
url.Search
   page: 1
 
 
   make fetch
           .then(res)
               return res.json
           .then(jsonResult)
               run anime adding function
 
anime adding function
   use the jsonResult from the query and extract parts we want to display
   use loop and push data we want into the animeTen array

import myCards from "./components/myCards.js";
//creamos nuestra variable API
const API = "https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=1&language=es";
//importamos el componnte principla que es myCards
myCards.fragmentMyCards(API);
myCards.mySearch();
myCards.fragmentMyButtons();

  
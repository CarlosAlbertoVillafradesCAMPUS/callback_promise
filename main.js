const API ="https://anime-db.p.rapidapi.com/anime?page=1&size=1000&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc";

let options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b776fbfe3amsh0048685753f14b8p1432c1jsn68c4b0ee05ac",
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  },
};

//llamado a la API
const fetchData = async (urlAPI) => {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  console.log(data)

  return data;
};

//peticiones a la API

const anotherFunc = async (urlAPI) => {

    const animes = await fetchData(`${urlAPI}`);
    animes.data.map((val, id) => {
        document.querySelector(".animeList").insertAdjacentHTML("beforeend", `
        <div class="pokemon" style="border: 2px solid black; text-align: center;">
        <a href="${val.link}">
              <p>${val.title}</p>
              <img src="${val.image}" alt="${val.title}" />
              <p>Genero: ${val.genres[0]}</p>
              </a>       
        </div>`)
    }).join("");

    animes.data.map((val, id) => {
        document.querySelector(".listTypes").insertAdjacentHTML("beforeend", `
        <li style="border-bottom:1px solid black;">
        <a href="${val.link}" style="text-decoration: none">
                <p>${val.title}</p>
                </a>         
        </li>`)
    }).join("");
};

anotherFunc(API);


  
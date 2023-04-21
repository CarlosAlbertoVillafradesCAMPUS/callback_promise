const API ="https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=80&page=1";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b776fbfe3amsh0048685753f14b8p1432c1jsn68c4b0ee05ac',
		'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
	}
};

//llamado a la API
const fetchData = async (urlAPI) => {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  console.log(data)

  return data;
};


const  mostrarInformacion = async (event) => {
  let idAnime = event.target.id
  let newApi = `https://advanced-movie-search.p.rapidapi.com/movies/getdetails?movie_id=${idAnime}`;

  let informacionAnime = await fetchData(`${newApi}`);
  console.log(informacionAnime)
  let mostrarInfo = document.querySelector("#mostrarInfo")
  mostrarInfo.innerHTML = null
  mostrarInfo.insertAdjacentHTML("beforeend",  `
  <div style="background-image:url(${informacionAnime.backdrop_path});">
          <div class="py-5 mb-4 text-white text-center banner" style="background-color:  rgba(0, 0, 0, 0.5)">
            <h1 class="mt-5">${informacionAnime.original_title}</h1>
            <div class="d-flex justify-content-center">
            <p class="text-center w-75 textBanner">${informacionAnime.overview}</p>
            </div>
            <div class="mb-5" >
            <a class="btn btn-primary" href="${informacionAnime.homepage}">Ver Movie</a>
            </div>
          </div>
  </div>`)

}

//peticiones a la API
const anotherFunc = async (urlAPI) => {

    const movies = await fetchData(`${urlAPI}`);
    movies.results.map((val, id) => {
        document.querySelector(".animeList").insertAdjacentHTML("beforeend", `
        <li class="col-4 justify-content-center movies">
        <div class="text-center rounded anime"  style="background-image: url(${val.poster_path});background-repeat: no-repeat; background-size: cover;">
          <div class="p-5 w-100 h-100 info" id="${val.id}">
            <h3>${val.title}</h3>
            <p>Lanzamiento: ${val.release_date}</p>
          </div>   
        </div>
        </li>`)

        if(val.id == 804150){
          document.querySelector("#mostrarInfo").insertAdjacentHTML("beforeend", `
          <div style="background-image:url(${val.backdrop_path});">
          <div class="py-5 mb-4 text-white text-center banner" style="background-color:  rgba(0, 0, 0, 0.5);background-position: center;">
            <h1 class="mt-5">${val.title}</h1>
            <div class="d-flex justify-content-center">
            <p class="text-center w-75 textBanner">${val.overview}</p>
            </div>
            <div class="mb-5" >
            <a class="btn btn-primary" href="${val.link}">Ver Movie</a>
            </div>
          </div>
          </div>
          `)
            }
    }).join("");

    let anime = document.querySelectorAll('.info');
    for (let i = 0; i < anime.length; i++) {
      anime[i].addEventListener('click', mostrarInformacion);
    }
};

anotherFunc(API);

let search = document.querySelector("#search");
let list = document.querySelectorAll(".movies");
console.log(list);

  
  // // Función para renderizar la lista de películas
  // function renderMovieList(movies) {
  //     list.innerHTML = '';
  //     movies.forEach(movie => {
  //       list.insertAdjacentHTML("beforeend", `
  //       <li class="col-4 justify-content-center anime">
  //       <div class="text-center rounded anime"  style="background-image: url(${movie.poster_path});background-repeat: no-repeat; background-size: cover;">
  //         <div class="p-5 w-100 h-100 info" id="${movie.id}">
  //           <h3>${movie.title}</h3>
  //           <p>Lanzamiento: ${movie.release_date}</p>
  //         </div>   
  //       </div>
  //       </li>`)
  //     });
  // }
  
  // // Función para filtrar las películas según la búsqueda
  // const searchMovies = async (searchText) => {
  //   const movies = await fetchData(`${API}`);
  //     const filteredMovies = movies.results.filter(movie =>
  //         movie.title.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     renderMovieList(filteredMovies);
  // }
  
  // // Evento de entrada del teclado en el campo de búsqueda
  // search.addEventListener('input', (e) => {
  //     const searchText = e.target.value;
  //     searchMovies(searchText);
  // });
  
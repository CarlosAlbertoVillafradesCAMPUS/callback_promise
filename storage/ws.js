import api from "../API/api.js";
export let ws = {
    async showCards(urlAPI){
      //como la api se divide por paginas, primero se realiza una peticio a la primera pagina y luego a la sgeunda
    let moviesPage1 = await api.fetchData(urlAPI);
    let urlAPIPage2 = `https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=3&language=es`
    let moviesPage2 = await api.fetchData(urlAPIPage2);
    // se unen los dos resultados de las 2 paginas
    let allMovies = moviesPage1.results.concat(moviesPage2.results);
    console.log(allMovies);
    let plantilla = ""
        allMovies.forEach((val, id) => {   
          if(val.poster_path){
            plantilla += `
            <li class="col-6 col-lg-3 justify-content-center">
            <div class="text-center rounded movie"  style="background-image: url(https://image.tmdb.org/t/p/w780${val.poster_path});background-size: cover;">
              <div class="d-flex flex-column justify-content-between pt-3 w-100 h-100 info" >
                <h3>${val.title}</h3>
                <div>
                <p class="m-0">Fecha Lanzamiento:</p>
                <p>${val.release_date}</p>
                </div>
                <buttom class="btn btn-danger buttomInfo" id="${val.id}">Mas Info</buttom>
              </div>   
            </div>
            </li>`
          }
         });
      return plantilla
   },

   async showSearch(name) {
    let plantilla = ""
    let movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=3df70b20cbd027249f00bb9372cbadf9&query=${name}`
    const movies = await api.fetchData(movieSearchUrl);
      movies.results.forEach(async (val, id) => {
        if(val.poster_path){
              plantilla+=`
             <li class="col-6 col-lg-3 justify-content-center">
              <div class="text-center rounded movie"  style="background-image: url(https://image.tmdb.org/t/p/w780${val.poster_path});background-size: cover;">
                <div class="d-flex flex-column justify-content-between w-100 h-100 info">
                  <h3>${val.title}</h3>
                  <div>
                  <p class="m-0">Fecha Lanzamiento:</p>
                  <p>${val.release_date}</p>
                  </div>
                  <buttom class="btn btn-danger buttomInfo" id="${val.id}">Mas Info</buttom>
                </div>   
              </div>
              </li>` }
      });
    
    return plantilla;
},

   async showBanner(urlAPI){
    let movie = await api.fetchData(urlAPI);
    let plantilla = `
    <div style="background-image:url(https://image.tmdb.org/t/p/w780${movie.backdrop_path});background-repeat: no-repeat; background-size: cover; background-position: center;">
            <div class="py-5 mb-4 text-white text-center banner" style="background-color:  rgba(0, 0, 0, 0.5)">
              <h1 class="mt-5">${movie.title}</h1>
              <div class="d-flex justify-content-center">
              <p class="text-center w-75 textBanner">${movie.overview}</p>
              </div>
              <div class="mb-5" >
              <a class="btn btn-danger" href="">Ver Trailer</a>
              </div>
            </div>
    </div>`
    
      return plantilla
   }
   
}
//recibir mensaje
self.addEventListener("message", async(e)=>{
    const res = await ws[`${e.data.module}`](e.data.data)
    postMessage(res)
    //Promise.resolve(ws[`${e.data.module}`](e.data.data)).then(res => postMessage(ws[`${e.data.module}`](e.data.data)))
    
})
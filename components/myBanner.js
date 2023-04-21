/* export default {
    API: "https://anime-db.p.rapidapi.com/anime?page=1&size=50",

  myBanner()  {
  const ws = new Worker("storage/ws.js", {type:"module"});
  ws.postMessage({module:"showCards"})

  ws.addEventListener("message", (e) =>{
    let doc = new DOMParser().parseFromString(e.data, "text/html")
    document.querySelector(".animeList").append(...doc.body.children)
    ws.terminate()
  })
    const movies = await api.fetchData(API, options);
    movies.results.map((val, id) => {
        document.querySelector(".animeList").insertAdjacentHTML("beforeend", `
        <li class="col-6 col-lg-3 justify-content-center movies">
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
}


} */
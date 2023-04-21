export default {
    API: "https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=100&limit_suggestions=20&lang=en",
    mostrarInformacion(movies){
        console.log(movies);
            for (let i = 0; i < movies.length; i++) {
              movies[i].addEventListener('click', (e) => {
                let idAnime = e.target.id
                console.log(idAnime);
                let newApi = `https://netflix-data.p.rapidapi.com/title/details/?ids=${idAnime}`;
              
                const ws = new Worker("storage/wsMyBanner.js", { type: "module" });
                ws.postMessage({ module: "showBanner", data: newApi })
        
                ws.addEventListener("message", (e) => {
                    let doc = new DOMParser().parseFromString(e.data, "text/html")
                    let mostrarInfo = document.querySelector("#mostrarInfo");
                    mostrarInfo.innerHTML = null;
                    mostrarInfo.append(...doc.body.children)
                    ws.terminate()
                })
                window.scrollTo(0, 0);
              });
            }
    },
    anotherFunc() {
        const ws = new Worker("storage/ws.js", { type: "module" });
        ws.postMessage({ module: "showCards", data: this.API })
        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html")
            document.querySelector(".animeList").append(...doc.body.children)
            ws.terminate()
            let movies = document.querySelectorAll(".info");
            this.mostrarInformacion(movies);
        }
        )
        /*  const movies = await api.fetchData(API, options);
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
         }).join(""); */

        /*  let anime = document.querySelectorAll('.info');
         for (let i = 0; i < anime.length; i++) {
           anime[i].addEventListener('click', mostrarInformacion);
         } */
    }
}
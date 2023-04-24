import myBanner from "./myBanner.js";
export default {
  //creamos nuestra variable API
    API: "https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=2&language=es",
    
  //funcion de las cards
    fragmentMyCards() {
      //creacion y funcionamiento del worker
        const ws = new Worker("storage/ws.js", { type: "module" });
        ws.postMessage({ module: "showCards", data: this.API })
        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html")
            document.querySelector(".movieList").append(...doc.body.children)
            ws.terminate()
      //se agrega evento de escucha a lo botones de las cards
            let buttomMovies = document.querySelectorAll(".buttomInfo");
      // se llama el archivo my banner con su respectivas funcion para tambien mostrar nuestro banner
            myBanner.fragmentMyBanner(buttomMovies[0].id)
            for (let i = 0; i < buttomMovies.length; i++) {
              buttomMovies[i].addEventListener('click', (e) => {
                myBanner.fragmentMyBanner(e)
              })}
        }
        );
        //se llama el funcionamineto del buscador
        this.mySearch()
    },
    mySearch() {
      const search = document.querySelector("#search");
      search.addEventListener("input", (e) => { //evento de input para el buscador
        let valor = e.target.value
          if (search.value) {
            //creacion del worker
            const ws = new Worker("./storage/ws.js", { type: "module" });
            ws.postMessage({ module: "showSearch", data: valor })
            ws.addEventListener("message", (e) => {
              let doc =  new DOMParser().parseFromString(e.data, "text/html");
              console.log(doc);
              let movieList = document.querySelector(".movieList")
              movieList.innerHTML = null;
              movieList.append(...doc.body.children)
                ws.terminate()
                let buttomMovies = document.querySelectorAll(".buttomInfo");
                //se agrega evento de escucha a lo botones de las cards
                for (let i = 0; i < buttomMovies.length; i++) {
                  buttomMovies[i].addEventListener('click', (e) => {
                    myBanner.fragmentMyBanner(e)
                  })}
                
            })
          } 
      })
  },
}
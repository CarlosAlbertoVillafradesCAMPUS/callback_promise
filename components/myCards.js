import myBanner from "./myBanner.js";
export default {
  //funcion de las cards
  fragmentMyCards(urlApi) {
    //creacion y funcionamiento del worker
    const ws = new Worker("storage/ws.js", { type: "module" });
    ws.postMessage({ module: "showCards", data: urlApi })
    ws.addEventListener("message", (e) => {
      let doc = new DOMParser().parseFromString(e.data, "text/html")
      let movieList = document.querySelector(".movieList");
      movieList.innerHTML = null
      movieList.append(...doc.body.children)
      ws.terminate()
      //se agrega evento de escucha a lo botones de las cards
      let buttomMovies = document.querySelectorAll(".buttomInfo");
      // se llama el archivo my banner con su respectivas funcion para tambien mostrar nuestro banner
      if (this.page == 1) {
        myBanner.fragmentMyBanner(buttomMovies[0].id)
      }
      for (let i = 0; i < buttomMovies.length; i++) {
        buttomMovies[i].addEventListener('click', (e) => {
          myBanner.fragmentMyBanner(e)
        })
      }
      window.scrollTo(0, 0);
    }
    );
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
          let doc = new DOMParser().parseFromString(e.data, "text/html");
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
            })
          }

        })
      } else {
        this.fragmentMyCards("https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=1&language=es")
      }
    })
  },
  page: 1,

  fragmentMyButtons() {
    const ws = new Worker("storage/ws.js", { type: "module" });
    ws.postMessage({ module: "showButtons", data: this.page })

    ws.addEventListener("message", (e) => {
      let doc = new DOMParser().parseFromString(e.data, "text/html")
      let containerButtons = document.querySelector("#containerButtons");
      containerButtons.innerHTML = null;
      containerButtons.append(...doc.body.children)
      ws.terminate()
      this.funcionamientoButtons();
    })
  },

  funcionamientoButtons() {
    document.querySelector("#btnNext").addEventListener("click", (e) => {
      this.page += 1
      let urlPages = `https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=${this.page}&language=es`;
      console.log(urlPages);
      this.fragmentMyCards(urlPages);
      this.fragmentMyButtons()
    });
    if (this.page > 1) {
      document.querySelector("#btnPrevious").removeAttribute("disabled")
    }
    document.querySelector("#btnPrevious").addEventListener("click", (e) => {
      this.page -= 1
      let urlPages = `https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=${this.page}&language=es`;
      this.fragmentMyCards(urlPages);
      this.fragmentMyButtons()
    });
  }

}
export default {
  fragmentMyBanner(e){
            let idMovie;
            //condicion para identificar el id
            (typeof e != "object")
            ? idMovie = e 
            : idMovie = e.target.id
            //creamos nuestra nueva API para hacer la nueva peticion
            let newApi = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=3df70b20cbd027249f00bb9372cbadf9`;
          
            const ws = new Worker("storage/ws.js", { type: "module" });
            ws.postMessage({ module: "showBanner", data: newApi })
    
            ws.addEventListener("message", (e) => {
                let doc = new DOMParser().parseFromString(e.data, "text/html")
                let mostrarInfo = document.querySelector("#mostrarInfo");
                mostrarInfo.innerHTML = null;
                mostrarInfo.append(...doc.body.children)
                ws.terminate()
            })
            
},
}
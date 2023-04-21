import api from "./api.js";
export let wsMyBanner = {
    options: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b776fbfe3amsh0048685753f14b8p1432c1jsn68c4b0ee05ac',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
        }
    },
    async showBanner(urlAPI){
        let movie = await api.fetchData(urlAPI, this.options);
        console.log(movie[0]);
        let plantilla = `
        <div style="background-image:url(${movie[0].details.backgroundImage.url});background-repeat: no-repeat; background-size: cover; background-position: center;">
                <div class="py-5 mb-4 text-white text-center banner" style="background-color:  rgba(0, 0, 0, 0.5)">
                  <h1 class="mt-5">${movie[0].details.title}</h1>
                  <div class="d-flex justify-content-center">
                  <p class="text-center w-75 textBanner">${movie[0].details.synopsis}</p>
                  </div>
                  <div class="mb-5" >
                  <a class="btn btn-primary" href="">Ver Movie</a>
                  </div>
                </div>
        </div>`
        
          return plantilla
       }
   
}
self.addEventListener("message", async(e)=>{
    console.log(e.data.data);
    const res = await wsMyBanner.showBanner(e.data.data)
    postMessage(res)
    //Promise.resolve(ws[`${e.data.module}`](e.data.data)).then(res => postMessage(ws[`${e.data.module}`](e.data.data)))
    
})
import api from "./api.js";
export let ws = {
    API:"https://netflix-data.p.rapidapi.com/search/?query=all&offset=0&limit_titles=50&limit_suggestions=20",
    options: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b776fbfe3amsh0048685753f14b8p1432c1jsn68c4b0ee05ac',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    },
    async showCards(){
    let movies = await api.fetchData(this.API, this.options);
    console.log(movies);
    let plantilla = ""
        movies.titles.forEach(async (val, id) => {      
                plantilla += `
                 <li class="col-6 col-lg-3 justify-content-center movies">
                 <div class="text-center rounded anime"  style="background-image: url(${val.jawSummary.backgroundImage.url});background-position: center;">
                   <div class="p-5 w-100 h-100 info" id="${val.jawSummary.id}">
                     <h3>${val.jawSummary.title}</h3>
                     <p>Director: ${val.jawSummary.directors[0].name}</p>
                   </div>   
                 </div>
                 </li>`
         });
      return plantilla
   },
   
}
self.addEventListener("message", async(e)=>{
    const res = await ws.showCards()
    postMessage(res)
    //Promise.resolve(ws[`${e.data.module}`](e.data.data)).then(res => postMessage(ws[`${e.data.module}`](e.data.data)))
    
})
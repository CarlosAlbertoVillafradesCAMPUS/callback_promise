export default {
    API: "https://anime-db.p.rapidapi.com/anime?page=1&size=50",

    showCards(){
        const ws = new Worker("storage/ws.js", {type:"module"});
        ws.postMessage({module:"fetchData", data: this.API});

        ws.addEventListener("message", (e) => {
            let doc = e.data
            console.log(doc);
        })
        ws.terminate()
    }
}
let hibiAPI:string = "https://hibiapi.getloli.com/api/";

// let hibiAPI:string = "https://dengfenglai-hibiapi.hf.space/api/"; //備用

// let hibiAPI:string = "https://api.imki.moe/api/"; //備用(這個要繞CORS)

async function setNewHibiAPI() {
    await fetch(hibiAPI + "pixiv/illust_new?content_type=illust",{
        method:'GET',
    })
    .then(response => {
        console.log("HibiAPI can connect success.");
        if(response.status == 404){
            console.log("But the server is not active.\nChange the api.");
            hibiAPI = "https://dengfenglai-hibiapi.hf.space/api/"; //備用
        }
    })
    .catch(error => {
        console.log("HibiAPI can connect failed.");
        console.log(error);
    }) 
}

function getHibiAPI():string{
    return hibiAPI;
}

let pixivUrl:string = "https://www.pixiv.net/";

let porxyImage:string = "https://i.pixiv.cat/";

let porxtCORS:string = "https://cors-anywhere.herokuapp.com/";

let saucenaoAPI:string = "https://saucenao.com/search.php?dbs[]=5&dbs[]=41&output_type=2&testmode=1&numres=10&hide=2";
const saucenaoAPIkey = "60808f72fc93b3d19184a04d0c60966d9d9e20c7";


export const config = {setNewHibiAPI,getHibiAPI,porxyImage,porxtCORS,saucenaoAPI,pixivUrl,saucenaoAPIkey};
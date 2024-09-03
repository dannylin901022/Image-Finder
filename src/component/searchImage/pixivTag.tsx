import { config } from "../config";

async function searchTag(searchtData:any){
    let tags:any = [];
    let id:string = '';
    let i = 0;

    let url = config.getHibiAPI() + 'pixiv/illust?id=';
    // let url = '/api/search';

    while(tags.length <= 0){
        while(searchtData[i].header.thumbnail.indexOf('pixiv') == -1){
            i++;
        }

        id = searchtData[i].data.pixiv_id;
    
        await fetch(url + id, {
            method:'GET',
        })
        .then(response => response.json())
        .then(data => tags = data.illust.tags)
        .catch(error => console.log(error));

        i++;
    }

    return tags;
}


export const pixivTag = {searchTag};
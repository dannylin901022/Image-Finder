async function searchTag(searchtData:any){
    let tags:any = [];
    let id:string = '';

    let url = 'https://api.adoreanime.com/api/pixiv/illust?id=';
    // let url = '/api/search';

    let i = 0;
    while(searchtData[i].data.ext_urls[0].indexOf('pixiv') !== -1){
        id = searchtData[i].data.pixiv_id;
        i++;
    }

    await fetch(url + id, {
        method:'GET',
    })
    .then(response => response.json())
    .then(data => tags = data.illust.tags)
    .catch(error => console.log(error));

    return tags;
}


export const pixivTag = {searchTag};
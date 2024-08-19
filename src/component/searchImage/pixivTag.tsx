async function searchTag(searchtData:any){
    let tags:any = [];

    let url = 'https://api.adoreanime.com/api/pixiv/illust?id=';
    // let url = '/api/search';

    await fetch(url + searchtData[0].data.pixiv_id, {
        method:'GET',
    })
    .then(response => response.json())
    .then(data => tags = data.illust.tags)
    .catch(error => console.log(error));

    return tags;
}


export const pixivTag = {searchTag};
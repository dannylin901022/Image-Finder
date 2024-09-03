import {config} from "../configAPI"

let previewImage:any = {};

async function getPixivImage(){
    let url = config.getHibiAPI() + 'pixiv/illust_new?content_type=illust';
    // let url = '/api/search';

    await fetch(url, {
        method:'GET',
    })
    .then(response => response.json())
    .then(data => previewImage = data)
    .catch(error => console.log(error));

    return previewImage;
}

export default getPixivImage;
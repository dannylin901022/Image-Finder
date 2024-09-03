import { config } from "../config";

let search_data:any = {};
async function get_image(file:File){
    let formData = new FormData();
    const apiKey = config.saucenaoAPIkey;

    formData.append('file', file);
    formData.append('api_key', apiKey);

    //原本的方法：proxy server(github page不吃)
    // let url = '/api/saucenao/search.php?db=999&output_type=2&testmode=1&numres=16';
    

    //這邊改用corsproxy.io繞過cors，但因為是公共的cors代理伺服器，有安全疑慮，但因為上到github page不能用原本的方法，所以只能先找個替代方案
    //有時間再看看有沒有辦法改用自建代理伺服器
    let url = config.porxtCORS + config.saucenaoAPI;

    // let url = '/api/search';


    await fetch(url, {
      method:'POST',
      //headers: {'Content-Type': 'multipart/form-data'},
      body:formData,
    })
    .then(response => response.json())
    .then(data => search_data = data)
    .catch(error => {
      console.log(error)
      search_data = null;
    });

    console.log(search_data);
    return search_data;
  }

  async function get_image_by_text(urlInput:string){

    let url = config.porxtCORS + config.saucenaoAPI + '&api_key=' + config.saucenaoAPIkey + '&url=';
    // let url = '/api/search';

    await fetch(url + urlInput, {
      method:'GET',
    })
    .then(response => response.json())
    .then(data => search_data = data)
    .catch(error => console.log(error));

    console.log(search_data);
    return search_data;
  }

export const getImage = {get_image, get_image_by_text, search_data}
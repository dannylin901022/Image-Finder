let search_data:any = {};
async function get_image(file:File){
    let formData = new FormData();
    const apiKey = 'd2bacaebba6a54a89d3e9432905237167c3dfe23';
    formData.append('file', file);
    formData.append('api_key', apiKey);

    let url = '/api/saucenao/search.php?db=999&output_type=2&testmode=1&numres=16';
    // let url = '/api/search';

    await fetch(url, {
      method:'POST',
      //headers: {'Content-Type': 'multipart/form-data'},
      body:formData
    })
    .then(response => response.json())
    .then(data => search_data = data)
    .catch(error => console.log(error));

    console.log(search_data);
    return search_data;
  }

  async function get_image_by_text(urlInput:string){

    let url = '/api/saucenao/search.php?db=999&output_type=2&testmode=1&numres=16&api_key=d2bacaebba6a54a89d3e9432905237167c3dfe23&url=';
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
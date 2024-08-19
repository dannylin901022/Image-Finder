import {pixivTag} from './pixivTag';
let searchtData:any = [];

const showSearch:any = async(data:any)=>{
    searchtData = data.results;
    let searchList:string = '<h3 style="text-align:start;">Tags：</h3><div id="tag" style="display:flex; flex-wrap:wrap; margin-bottom:50px;">';
    let tags = await pixivTag.searchTag(searchtData);
    console.log(tags);

    if(tags != null && tags.length != 0){
        tags.forEach((element:any) => {
            searchList += '<p style="height:0px;">#' + element.name + '　</p>';
        });
    }
    
    searchList += '</div>'
    searchtData.forEach((element:any) => {
        if(element.data.ext_urls != null && element.data.ext_urls[0] != ''){
            if(element.data.ext_urls[0].indexOf('pixiv') !== -1){
                searchList = searchList +
                '<div style="display:flex; justify-content:flex-start; border: 1px solid; border-radius: 30px; padding:5px; margin-top:10px; cursor:pointer;" onClick="window.open(\'' + element.data.ext_urls[0] + '\', \'_blank\')" data-aos="fade-up" >' +
                '<img style="max-height:300px; max-width:300px; margin-left:30px;" src="' + element.header.thumbnail + '">' +
                '<div style="text-align: right; margin-left:20px; margin-top: 10px; width:100vw; margin-right:10px; ">' +
                '<p>相似度：' + element.header.similarity + '%</p>' +
                '<p>來源網站：' + 'Pixiv' + '</p>' + 
                '<p>作者名稱：' + element.data.member_name + '</p>' + 
                '<p>標題：' + element.data.title + '</p>' + 
                '<p>網址：' + element.data.ext_urls[0] + '</p>' + 
                '</div>' +
                '</div>'
            }
            else if(element.data.ext_urls[0].indexOf('twitter') !== -1){
                searchList = searchList +
                '<div style="display:flex; justify-content:flex-start; border: 1px solid; border-radius: 30px; padding:5px; margin-top:10px; cursor:pointer;" onClick="window.open(\'' + element.data.ext_urls[0] + '\', \'_blank\')" data-aos="fade-up" >' +
                '<img style="max-height:300px; max-width:300px; margin-left:30px; " src="' + element.header.thumbnail + '">' +
                '<div style="text-align: right; margin-left:20px; margin-top: 10px; width:100vw; margin-right:10px; ">' +
                '<p>相似度：' + element.header.similarity + '%</p>' +
                '<p>來源網站：' + 'Twitter' + '</p>' + 
                '<p>Twitter ID：' + element.data.twitter_user_handle + '</p>' + 
                '<p>網址：' + element.data.ext_urls[0] + '</p>' + 
                '</div>' +
                '</div>'
            }
        }
    });
    let searchList_string: any =  document.getElementById('searchList');
    searchList_string.innerHTML = searchList;

}

function searchList(){
    return(
        <>
            <div id='searchList' style={{marginTop:'30px'}}>
            </div>
        </>
    );
}

export const show_search_result = {searchList, showSearch};

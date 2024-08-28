import { useEffect, useState } from "react";
import "./seachByWord.css"


let searchData:any = null;
let contentUrl:string[] = [];
let title:string[] = [];
let author:string[] = [];

async function getImageBySearchWord(content:string){
    const url = "https://api.adoreanime.com/api/pixiv/search?word=" + content + "&mode=partial_match_for_tags&order=date_desc&page=1&size=30&include_translated_tag_results=true"
    await fetch(url,{
            method:'GET',
        })
      .then(response => response.json())
      .then(data => searchData = data.illusts)
      .catch(error => console.log(error));
}

function setImgType(data:any){
    let imageUrl:string[] = [];
    data.forEach((element:any) => {
        let str = element.image_urls.large.substring(element.image_urls.large.length - 3);
        if(str=='jpg'){
            imageUrl.push('https://pixiv.cat/' + element.id + '.jpg');
        }
        else if(str=='png'){
            imageUrl.push('https://pixiv.cat/' + element.id + '.png');
        }
        else if(str=='gif'){
            imageUrl.push('https://pixiv.cat/' + element.id + '.gif');
        }

        contentUrl.push('https://www.pixiv.net/artworks/' + element.id);
        title.push(element.title);
        author.push(element.user.name);
    });

    return imageUrl;
}
function searchByWordPage(){
    const [searchContent, setSearchContent] = useState<string[]>([]);
    useEffect(() => {
        const setData = async() => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let imgUrl = setImgType(searchData);
            setSearchContent(imgUrl);
            console.log(searchContent);
        }
        setData();
    });

    function clickImage(index:number){
        window.open(contentUrl[index],'_blank');
    }

    return(
        <>
        {/* 有些圖沒辦法正常顯示 */}
            <div id="searchImgMain">
                {searchContent.map((item, index) => (
                    <><div className="imgArea">
                        <img className="searchImg" src={item} onClick={() => clickImage(index)}></img>
                        <p className="title">{title[index]}</p>
                        <p className="author">{author[index]}</p>
                    </div></>
                ))}
            </div>
        </>
    )
}

export const searchPage = {searchByWordPage,getImageBySearchWord};
import { useEffect, useState } from "react";
import { config } from "../configAPI"
import "./seachByWord.css"
import { Link } from "react-router-dom";
import { navElement } from "../nav/nav";
import { imagePage } from "../imagePage/imagePage";

let searchData:any = null;

async function getImageBySearchWord(content:string){
    const url = config.getHibiAPI() + "pixiv/search?word=" + content + "&mode=partial_match_for_tags&order=date_desc&page=1&size=30&include_translated_tag_results=true&search_ai_type=true"
    await fetch(url,{
            method:'GET',
        })
      .then(response => response.json())
      .then(data => searchData = data.illusts)
      .catch(error => console.log(error));
}

async function setImgType(data:any){
    let imageUrl:string[] = [];
    for(const element of data){
        let tags:string[] = [];
        for(const tag of element.tags){
            tags.push(tag.name);
        }
        if(tags.includes('R-18') || tags.includes('R-18G')){
            continue;
        }
        imageUrl.push(config.porxyImage + element.image_urls.large.substring(20,element.image_urls.large.length));

    }
    return imageUrl;
}

async function setT(data:any){ //setTitle
    let title:string[] = [];
    for(const element of data){
        let tags:string[] = [];
        for(const tag of element.tags){
            tags.push(tag.name);
        }
        if(tags.includes('R-18') || tags.includes('R-18G')){
            continue;
        }
        title.push(element.title);
    }
    return title;
}

async function setC(data:any){ //setContentUrl
    let contentUrl:string[] = [];
    for(const element of data){
        let tags:string[] = [];
        for(const tag of element.tags){
            tags.push(tag.name);
        }
        if(tags.includes('R-18') || tags.includes('R-18G')){
            continue;
        }
        contentUrl.push(config.pixivUrl + 'artworks/' + element.id);
    }
    return contentUrl;
}

async function setA(data:any){ //setAuthor
    let author:string[] = [];
    for(const element of data){
        let tags:string[] = [];
        for(const tag of element.tags){
            tags.push(tag.name);
        }
        if(tags.includes('R-18')){
            continue;
        }
        author.push(element.user.name);
    }
    return author;
}

function searchByWordPage(){
    const [searchContent, setSearchContent] = useState<string[]>([]);
    const [contentUrl, setContentUrl] = useState<string[]>([]);
    const [title, setTitle] = useState<string[]>([]);
    const [author, setAuthor] = useState<string[]>([]);

    useEffect(() => {
        const setData = async() => {
            setTimeout(async () => {
            let imgUrl:any = await setImgType(searchData);
            setSearchContent(imgUrl);

            let titleSet:any = await setT(searchData);
            setTitle(titleSet);
            
            let contentUrlSet:any = await setC(searchData);
            setContentUrl(contentUrlSet);

            let authorSet:any = await setA(searchData);
            setAuthor(authorSet);

        }, 1000);
        }
        setData();
    },[searchData]);

    // function clickImage(index:number){
    //     window.open(contentUrl[index],'_blank');
    // }

    function clickImage(index:number){
        navElement.changePage("image");
        imagePage.getImage(contentUrl[index].substring(31,contentUrl[index].length));
    }

    return(
        <>
            <div id="searchImgMain">
                {searchContent.map((item, index) => (
                    <div key={index}>
                        <Link className="imgArea" to="/image" onClick={() => clickImage(index)}>
                            <img className="searchImg" src={item} alt="imageFailed"></img>
                            <p className="title">{title[index]}</p>
                            <p className="author">{author[index]}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export const searchPage = {searchByWordPage,getImageBySearchWord};
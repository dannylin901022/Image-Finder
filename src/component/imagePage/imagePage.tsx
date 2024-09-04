import { useEffect, useState } from "react";
import { config } from "../configAPI";

import "./imagePage.css"

let imageData:any = null;
async function getImage(id:string){
    const url = config.getHibiAPI() + "pixiv/illust?id=" + id;
    await fetch(url,{
            method:'GET',
        })
      .then(response => response.json())
      .then(data => imageData = data.illust)
      .catch(error => console.log(error));
}

function showImage(){
    const [imageContent, setImageContent] = useState<string>('');
    // const [imageUrl, setImageUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    // const [author, setAuthor] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const setData = async() => {
            setTimeout(async () => {
                setImageContent(config.porxyImage + imageData.image_urls.large.substring(20,imageData.image_urls.large.length));
                // setImageUrl(config.pixivUrl + 'artworks/' + imageData.id);
                setTitle(imageData.title);
                // setAuthor(imageData.user.name);
                setTags(imageData.tags);
        }, 1000);
        }
        setData();
    },[imageData]);

    return(
        <>
            <div id="imagePage">
                <div id="contentArea">
                    <img id="image" src={imageContent} alt="imageFailed"></img>
                    <h2 id="imageTitle">{title}</h2>
                    <div id="tagsArea">
                        {tags.map((item:any, index) => (
                            <div key={index}>
                                <p className="tags">{'#' + item.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* <p id="imageAuthor">{author}</p> */}
                </div>
            </div>
        </>
    );
}

export const imagePage = {showImage,getImage};
import getPixivImage from "./getPixivImage.tsx"
import {previewImage} from "./showPreviewImage.tsx"

import "./defaultImage.css"


async function pixivImage(){
    let previewData = await getPixivImage();
    await previewImage.showPreviewImage(previewData);
}

function defaultImage(){
    return(
        <>
        <div id="defaultBody">
            <h1>Pixiv Finder</h1>
            <div>
                <p>輸入想查詢的關鍵字</p>
                <div id="searchArea">
                    <input id="searchInput" type="text" />
                    <button id="search">搜尋</button>
                </div>
            </div>
        </div>
        <div id="defaultPreview">
            <previewImage.illustList/>
        </div>
        </>
    );
}

export const DefaultImage = {defaultImage,pixivImage};
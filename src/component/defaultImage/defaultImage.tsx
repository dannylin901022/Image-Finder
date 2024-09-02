import getPixivImage from "./getPixivImage.tsx"
import {searchPage} from "../searchWord/seachByWord.tsx"
import {previewImage} from "./showPreviewImage.tsx"
import { Link } from 'react-router-dom';
import {navElement} from '../nav/nav.tsx';


import "./defaultImage.css"
import { useState } from "react";

async function pixivImage(){
    let previewData = await getPixivImage();
    await previewImage.showPreviewImage(previewData);
}

function searchWord(context:string){
    let searchCounter:any = document.getElementById("searchCounter");
    searchCounter.value = Number(searchCounter.value) + 1;

    navElement.changePage("search");
    searchPage.getImageBySearchWord(context);
}

function defaultImage(){
    const [searchInputValue,setSearchInputValue] = useState('');

    return(
        <>
        <div id="defaultBody">
            <h1>Image Finder</h1>
            <div>
                {/* <p>輸入想查詢的關鍵字</p> */}
                <div id="searchArea">
                    <input id="searchInput" type="text" placeholder="輸入關鍵字" value={searchInputValue} onChange={(v) => setSearchInputValue(v.target.value)}/>
                    <Link to="/search">
                        <button id="search" onClick={() => searchWord(searchInputValue)}>搜尋</button>
                    </Link>
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
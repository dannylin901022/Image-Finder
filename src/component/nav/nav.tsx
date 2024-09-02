import { useState } from 'react';
import {preview} from '../searchImage/previewImage.tsx';
import "./nav.css";
import { Link } from 'react-router-dom';

function changePage(to:string){
    if(to == "search"){
        let searchCounter:any = document.getElementById("searchCounter");
        if(Number(searchCounter.value) <= 0){
            return
        }
    }
    let menuBtn:any = document.getElementsByClassName("menuBtn");
    for(let i = 0; i < menuBtn.length; i++){
        menuBtn[i].disabled = true;
    }

    let loader:any = document.getElementById("loader");
    loader.style.transition = "0.2s";
    loader.style.opacity = "1";

    let main:any = document.getElementById("main");
    main.style.transition = "0s";
    main.style.opacity = "0";

    setTimeout(() => {
        for(let i = 0; i < menuBtn.length; i++){
            menuBtn[i].disabled = false;
        }

        loader.style.opacity = "0";
        loader.style.transition = "1s";
        main.style.transition = "1s";
        main.style.opacity = "1";
    }, 2000);
}

function nav(){
    const[navBar, setNavBar] = useState("navBar-close");
    const[menuBtn, setMenuBtn] = useState("menuBtn-close");
    
    function navOpen(){
        if (navBar != "navBar-open"){
            setNavBar("navBar-open");
            setMenuBtn("menuBtn-open");
        }
        else{
            setNavBar("navBar-close");
            setMenuBtn("menuBtn-close");
        }
    };

    return(
        <>
        <i id={menuBtn} className="fa-solid fa-bars" onClick={navOpen}></i>
        <div id={navBar} >
            <div id="itemList">
                <Link to="/" onClick={() => {changePage("home")}}>
                    <button id="homeBtn" className='menuBtn'>
                    <i className="fa-solid fa-house">首頁</i>
                    </button>
                </Link>
                <preview.previewImage/>
                <Link to="/setting" onClick={() => {changePage("setting")}}>
                    <button id="settingBtn" className='menuBtn'>
                    <i className="fa-solid fa-gear">設定</i>
                    </button>
                </Link>
                <Link to="/search" onClick={() => {changePage("search")}}>
                    <button id="searchPageBtn" className='menuBtn'>
                    <i className="fa-solid fa-solid fa-clock-rotate-left">搜尋紀錄</i>
                    <input id="searchCounter" defaultValue={0}/>
                    </button>
                </Link>
            </div>
        </div>

        <div id="loader" className="loader"></div>
        </>
    )
}


export const navElement = {nav,changePage};



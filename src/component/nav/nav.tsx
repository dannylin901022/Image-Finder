import { useState } from 'react';
import PreviewImage from '../searchImage/previewImage.tsx';
import "./nav.css";
import { Link } from 'react-router-dom';


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
                <Link to="/">
                    <button id="homeBtn">
                    <i className="fa-solid fa-house">首頁</i>
                    </button>
                </Link>
                <PreviewImage/>
                <Link to="/setting">
                    <button id="settingBtn">
                    <i className="fa-solid fa-gear">設定</i>
                    </button>
                </Link>
            </div>
        </div>
        </>
    )
}


export const navElement = {nav};



import { useEffect, useState } from 'react';
import './showPreviewImage.css';


let imageUrl:any = [];
let url:any = [];
let currentSlideIndex = 1;
let mousePoint = true;

async function showPreviewImage(data:any){
    let illusts = data.illusts;
    illusts.forEach((element:any) => {
        let str = element.image_urls.large.substring(element.image_urls.large.length - 3);
        if(str=='jpg'){
            imageUrl.push('https://pixiv.cat/' + element.id + '.png');
        }
        else if(str=='png'){
            imageUrl.push('https://pixiv.cat/' + element.id + '.jpg');
        }
        else if(str=='gif'){
            imageUrl.push('https://pixiv.cat/' + element.id + '.gif');
        }

        url.push('https://www.pixiv.net/artworks/' + element.id);
    });
}


function clickImage(){
    window.open(url[currentSlideIndex-1],'_blank');
}

function illustList(){
    const[slidesOpacity, setSlidesOpacity] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            if(imageUrl[currentSlideIndex - 1] != null || imageUrl.length != 0){
                setSlides(imageUrl[currentSlideIndex - 1]);
                setHoverImage(imageUrl[currentSlideIndex - 1]);
                setSlidesOpacity(1);
            }
        },1000);
      }, []);

    const[slides, setSlides] = useState("");
    const[hoverImage, setHoverImage] = useState("");

    function changeSlide(index:number){
        mousePoint = false;
        currentSlideIndex = currentSlideIndex + index;
     
        if (currentSlideIndex < 1) {
            currentSlideIndex = imageUrl.length;
        } else if (currentSlideIndex > imageUrl.length) {
            currentSlideIndex = 1;
        }
    
        setSlides(imageUrl[currentSlideIndex - 1]);
        setHoverImage(imageUrl[currentSlideIndex - 1]);
    }


    const[hoverImageOpacity, sethoverImageOpacity] = useState(0);
    function MouseEnter() {
        mousePoint = true;
        setTimeout(() => {
            if(mousePoint){
                setSlidesOpacity(0);
                sethoverImageOpacity(1);
                mousePoint = false;
            }
        }, 1500);
        
    };

    function MouseLeave() {
        mousePoint = false;
    
        if(!mousePoint){
            setSlidesOpacity(1);
            sethoverImageOpacity(0);
        }
    };

    return(
        <>
            <h3 style={{marginTop:'30px'}}>新增畫作</h3>
            <div id="illusts" className="illusts" style={{opacity:slidesOpacity}} >
                <button className="prev" onClick={() => changeSlide(-1)}>＜</button>
                <div id="imageArea">
                    <img id="slideImg" src={slides}
                    onMouseEnter={MouseEnter}
                    onMouseLeave={MouseLeave}
                    onClick={clickImage}></img>
                </div>
                <button className="next" onClick={() => changeSlide(1)}>＞</button>
            </div>
            <img style={{opacity:hoverImageOpacity}} src={hoverImage} id="hoverImage"></img>
        </>
    );
}

export const previewImage = {illustList, showPreviewImage};
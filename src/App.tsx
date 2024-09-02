//function from export
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {navElement} from './component/nav/nav';
import {DefaultImage} from './component/defaultImage/defaultImage';
import {searchPage} from './component/searchWord/seachByWord';

import './App.css'

const HomePage: React.FC = () => <DefaultImage.defaultImage/>

const SearchPage: React.FC = () =>{
  let counter:any = document.getElementById("searchCounter");
  let searchCounter:number = 0;
  if(counter != null){
    searchCounter = Number(counter.value);
  }
  if(searchCounter > 0){
      return <searchPage.searchByWordPage/>
  }
  else{
    alert("尚未有搜尋紀錄");
  }  
}

function App() {
  useEffect(() => {
    initAOS();
    DefaultImage.pixivImage();
  }, []);

  return (
    <>
      <Router basename="/Image-Finder/">
        <navElement.nav/>
        <main id='main'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/setting" element={<SettingPage />} /> */}
            <Route path="/search" element={<SearchPage/>} />
          </Routes>
        </main>
    </Router>
    </>
    
  )
}

function initAOS(){
    const AOS = (window as any).AOS;
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      //debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      //throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: -1000, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      //duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
}

export default App

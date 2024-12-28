import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { config } from './component/configAPI.tsx'

async function startApp(){
  // alert("本網站'圖片搜尋'功能目前是透過CORS Anywhere來繞過CORS限制，在使用該功能時需開啟臨時金鑰。\n\n~0ω0)/");
  await config.setNewHibiAPI();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

startApp();

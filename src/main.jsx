import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';//css檔案
import 'bootstrap/dist/js/bootstrap.js';//js檔案

import { RouterProvider } from 'react-router-dom';
import router from './router';

import { Provider } from 'react-redux'//使用ReduxToolkit時引入
import { store } from './store.js'//使用ReduxToolkit時引入

import './assets/styles/all.scss';//scss

import 'swiper/css';//swiper

import "chart.js/auto";//chart.js圖表套件

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = { store }>
      <RouterProvider router ={ router }>
      </RouterProvider>
    </Provider>
  </StrictMode>,
)

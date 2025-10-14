


// src/api.js
import axios from 'axios';

// 只暴露 BASE_URL 給其他模組使用（不改動 axios 的預設行為）
export let BASE_URL = ''; 

export const axiosWithCookie = axios.create({
  withCredentials: true, 
});
//這個作用是只要使用api就會自動帶入可攜帶cookie(withCredentials: true)的設定

export async function initApi() {
  const url = `${import.meta.env.BASE_URL}config.json?v=${Date.now()}`;
  //import.meta.env.BASE_URL固定讀取vite.config.js中的base
  //會得到類似這樣格式的內容 /Come-Buy-team-work/config.json?v=1699999999999
  //這種路徑會指向「前端自己網站裡的靜態檔案」
  const res = await axios.get(url, { withCredentials: false });
  //axios 會向「你目前網站的網址」發出一個 GET 請求
  //網址類似如下:https://a072682.github.io/Come-Buy-team-work/config.json?v=1699999999999
  //在https://a072682.github.io/Come-Buy-team-work/之後的內容會尋找在public中尋找同名的檔案也就是config.json檔案
  //如果是https://a072682.github.io/Come-Buy-team-work/aaa那就會在public中尋找aaa這個檔案
  //因為是跟自己的內部找資料因此不需要cookie所以才設定withCredentials: false
  //res會是一個物件
  //res.data才是裡面真正的內容
  const cfg = res.data || {};
  //此時的cfg依然是個物件內容為:
  // {"BASE_URL": "https://come-buy-team-server.onrender.com"}

  // 設定全域存取（可選）
  BASE_URL = cfg.BASE_URL;

  //設定api的初始路徑，只要是api開頭的都會帶入config.js中的BASE_URL
  // api.defaults.baseURL = cfg.BASE_URL || '';

  if (!BASE_URL) {
    console.warn('[initApi] BASE_URL is empty. Check public/config.json');
  }
}

/** 取用目前的 BASE_URL（可選，用於 debug 或特殊需求） */
export function getBaseUrl() {
  return api.defaults.baseURL || '';
}

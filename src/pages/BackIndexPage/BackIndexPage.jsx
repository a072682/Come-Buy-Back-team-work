

import './_BackIndexPage.scss';
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginContetnt from './LoginContent/LoginContetnt';
import { getChartData, getLineChartData } from '../../slice/loginSlice';
import { getBarChartData } from '../../slice/orderSlice';






function BackIndexPage (){

    //#region 讀取中央登入資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.login.isLogin
            )
        })

        useEffect(()=>{
            console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 儲存圓環圖資料狀態宣告
        const [chartData,setChartData] = useState(null);
        useEffect(()=>{console.log("確認資料",chartData)},[chartData]);
    //#endregion

    //#region 取得圓環圖資料
        useEffect(()=>{
            if(!loginState){
                return;
            }
            const handelGetChartData01 = async()=>{
                try{
                    const getChartData01 = await dispatch(getChartData()).unwrap();
                    setChartData(getChartData01.ChartData);
                }catch(error){
                    console.log("取得圓環圖資料失敗:",error);
                }
            }
            handelGetChartData01();
        },[loginState]);
    //#endregion

    //#region 儲存長條圖資料狀態宣告
        const [chartBarData,setChartBarData] = useState([]);
        useEffect(()=>{},[chartBarData]);
        const [chartBarTotalData,setChartBarTotalData] = useState(null);
        useEffect(()=>{},[chartBarTotalData]);
        // const [timeData,setTimeData] = useState(null);
        // useEffect(()=>{console.log("確認資料04",timeData)},[timeData]);
    //#endregion

    //#region 長條圖用日期格式轉換函式
        const dayChange = new Intl.DateTimeFormat('zh-TW', 
            //'zh-TW'：繁體中文
            //Intl.DateTimeFormat 用來把 Date 物件格式化成字串
            {
                timeZone: 'Asia/Taipei',
                //台北時區
                month: '2-digit',
                //兩位數（01–12）
                day: '2-digit',
                //兩位數（01–31）
                weekday: 'short',
                //「週一、週二…」
            }
        );
        //dayChange.format(new Date('2025-10-05T00:00:00Z')); // 可能回 "10/05 週日"

        function labelTW(yyyyMMdd) {
            const [year, month, day] = yyyyMMdd.split('-').map(Number);
            //yyyyMMdd.split('-') => 把 '2025-10-05' 切成 ['2025','10','05']
            //.map(Number)：轉成數字 [2025, 10, 5]
            //解構賦值：y = 2025, m = 10, d = 5
            const dayData = new Date(Date.UTC(year, month - 1, day));
            //建立一個時間物件
            const dayparts = dayChange.formatToParts(dayData);
            //.formatToParts會把輸入的時間物件拆開
            const monthParts = dayparts.find(item => item.type === 'month').value;
            //取出type為'month'的數值
            const dayParts = dayparts.find(p => p.type === 'day').value;
            //取出type為'day'的數值
            const weekParts = (dayparts.find(p => p.type === 'weekday')?.value || '').replace('週','').replace('周','');

            return `${monthParts}/${dayParts}(${weekParts})`;
        }

        // const timeData = chartBarData.map(labelTW);
        // console.log("測試時間",timeData);
    //#endregion

    //#region 取得長條圖資料
        useEffect(()=>{
            if(!loginState){
                return;
            }
            const handelGetBarChartData = async()=>{
                try{
                    const getBarChartDataRef = await dispatch(getBarChartData()).unwrap();
                    setChartBarData(getBarChartDataRef.dayData.map(labelTW));
                    setChartBarTotalData(getBarChartDataRef.totalData);
                }catch(error){
                    console.log("取得長條圖資料失敗:",error);
                }
            }
            handelGetBarChartData();
        },[loginState]);
    //#endregion

    //#region 儲存折線圖資料狀態宣告
        const [lineDayData,setLineDayData] = useState([]);
        useEffect(()=>{},[lineDayData]);
        const [userTotalData,setUserTotalData] = useState(null);
        useEffect(()=>{console.log("確認資料01",userTotalData)},[userTotalData]);
        const [vipTotalData,setVipTotalData] = useState(null);
        useEffect(()=>{},[vipTotalData]);
        const [vendorTotalData,setVendorTotalData] = useState(null);
        useEffect(()=>{},[vendorTotalData]);
    //#endregion

    //#region 折線圖用日期格式轉換函式
        const lineDayChange = new Intl.DateTimeFormat('zh-TW', 
            //'zh-TW'：繁體中文
            //Intl.DateTimeFormat 用來把 Date 物件格式化成字串
            {
                timeZone: 'Asia/Taipei',
                //台北時區
                month: '2-digit',
                //兩位數（01–12）
                day: '2-digit',
                //兩位數（01–31）
            }
        );
        //dayChange.format(new Date('2025-10-05T00:00:00Z')); // 可能回 "10/05 週日"

        function LinelabelTW(yyyyMMdd) {
            const [year, month, day] = yyyyMMdd.split('-').map(Number);
            //yyyyMMdd.split('-') => 把 '2025-10-05' 切成 ['2025','10','05']
            //.map(Number)：轉成數字 [2025, 10, 5]
            //解構賦值：y = 2025, m = 10, d = 5
            const dayData = new Date(Date.UTC(year, month - 1, day));
            //建立一個時間物件
            const dayparts = lineDayChange.formatToParts(dayData);
            //.formatToParts會把輸入的時間物件拆開
            const monthParts = dayparts.find(item => item.type === 'month').value;
            //取出type為'month'的數值
            const dayParts = dayparts.find(p => p.type === 'day').value;

            return `${monthParts}/${dayParts}`;
        }

        // const timeData = chartBarData.map(labelTW);
        // console.log("測試時間",timeData);
    //#endregion

    //#region 取得折線圖資料
        useEffect(()=>{
            if(!loginState){
                return;
            }
            const handelGetLineChartData = async()=>{
                try{
                    const getLineChartDataRef = await dispatch(getLineChartData()).unwrap();
                    setLineDayData(getLineChartDataRef.dayData.map(LinelabelTW));
                    setUserTotalData(getLineChartDataRef.userTotalData);
                    setVipTotalData(getLineChartDataRef.vipTotalData);
                    setVendorTotalData(getLineChartDataRef.vendorTotalData);
                }catch(error){
                    console.log("取得折線圖資料失敗:",error);
                }
            }
            handelGetLineChartData();
        },[loginState]);
    //#endregion

    

    //#region 圖表設定
        //#region 圓環圖設定
        const data01 = {
            labels: ["一般會員", "VIP會員", "供應商"],
            //每個資料的名稱（文字標籤）
            datasets: [
                {
                    data: chartData,
                    //引入的資料的數值
                    backgroundColor: ["#FFA7B7", "#D94A62", "#8B0018"],
                    //圓環/小色塊的顏色
                    borderColor: ["#FFA7B7", "#D94A62", "#8B0018"],    
                    //圓環/小色塊外框顏色
                    borderWidth: 5,                                     
                    //圓環/小色塊外框寬度（數字=px）

                    // （hover 狀態）
                    hoverBackgroundColor: ["#FFA7B7", "#D94A62", "#8B0018"], 
                    // 圓環的顏色（hover 狀態）
                    hoverBorderColor: ["#FFA7B7", "#D94A62", "#8B0018"],     
                    // 圓環外框顏色（hover 狀態）
                    hoverOffset: 0,        
                    // 滑過時扇形外推距離（像是浮出來的感覺，單位=px）

                    // 圓環的「中空比例」
                    cutout: "55%",         
                    // 0=圓餅，越大中空越大。字串百分比或數字(px)皆可

                    // 扇形之間的間距（僅部分情境支援，Chart.js 4+ 有效）
                    spacing: 0,            
                    // 扇形彼此保留的縫隙（px）
                },
            ],
        };
        //labels的數量跟data的數量為相等的這樣才能互相對應包含後面的backgroundColor的是對應labels的數量
        
        // ====== 外觀/互動 options ======
        const options01 = {
            // 響應式設定
            responsive: true,          
            // 跟著容器大小自適應
            maintainAspectRatio: false,
            // 取消固定比例（常用在高度要撐滿卡片時）

            // 版面留白
            layout: {
                padding: 0,              
                //整個版面的padding（px）
            },

            // 動畫
            animation: {
                duration: 600,           
                // 初次與更新動畫時間（ms）
                easing: "easeOutQuart",  
                // 動畫曲線
            },

            // 圖表插件（圖例、提示、標題...）
            plugins: {
                // 圖例（右側的小色塊 + 文字
                legend: {
                    display: false,         
                    // 是否顯示圖例
                    position: "right",
                    //顯示位置(主要)
                    // 'top' | 'bottom' | 'left' | 'right'
                    align: "center",   
                    //顯示位置(次要)
                    // 在 top/bottom 時可用 'start' | 'center' | 'end'
                    labels: {
                        boxWidth: 15,      
                        //小色塊寬度  
                        boxHeight: 15,       
                        //小色塊高度
                        padding: 10,      
                        // 單個圖例項目的內距(不算外框)
                        usePointStyle: false,
                        // true 會用圓點/方塊圖示
                        // color: "#333",     
                        // // 圖例文字顏色（不寫就跟隨 CSS）
                        // font: { size: 12, weight: "500" }, 
                        // // 圖例文字字型
                    },
                },
                // 提示（滑過扇形的浮層）
                tooltip: {
                    position: "average", 
                    // 預設，取整個元素的中心點
                    //position: "nearest",
                    //顯示在最接近滑鼠的點上
                    enabled: true,         
                    // 滑鼠在圓環時是否啟用提示
                    intersect: true,       
                    // 游標需進入元素才觸發
                    callbacks: {
                    // 自訂每一列的文字內容（例如顯示「數值 + 百分比」）
                        label: (ctx) => {
                            const dataset = ctx.dataset;                     
                            // 目前這組 dataset
                            const total = dataset.data.reduce((a, b) => a + b, 0); 
                            // 全部加總
                            const value = ctx.raw;                           
                            // 目前這一塊的值
                            const pct = ((value / total) * 100).toFixed(1);  
                            // 百分比(到小數1位)
                            return `${ctx.label}: ${value} 人（${pct}%）`;   
                            // 顯示的字串
                        },
                    },
                    // backgroundColor: "rgba(0,0,0,0.8)",               
                    // // 提示框背景色
                    // titleColor: "#fff", bodyColor: "#fff",            
                    // // 提示文字顏色
                    // padding: 10,                                       
                    // // 提示框內距
                },
                // 標題（可選）
                title: {
                    display: false,          
                    // 顯示標題
                    text: "會員統計",       
                    // 標題文字
                    padding: { top: 4, bottom: 20 }, 
                    // 與圖表的距離
                    // color: "#222",
                    // font: { size: 16, weight: "600" },
                },
            },
        };
        //#endregion

        //#region 長條圖設定
        const data02 = {
            labels: chartBarData,
            datasets: [
                {
                    label: "訂單數",
                    data: chartBarTotalData,
                    backgroundColor: ["#800020",],
                    borderRadius: 5,         
                    // 長條四角圓角
                    barPercentage: 0.5,      
                    // 每根長條的寬度比例（0~1）
                    // 在categoryPercentage的前提下的寬度比例
                    categoryPercentage: 1, 
                    // 每組（類別）的整體寬度比例(1為全滿)
                },
            ],
        };

        const options02 = {
            responsive: true, // 隨容器大小縮放
            maintainAspectRatio:false,
            // 取消固定比例（常用在高度要撐滿卡片時）
            plugins: {
                legend: {
                    display: false, // 不顯示圖例
                },

                tooltip: {
                    callbacks: {
                        label: (ctx) => `訂單數: ${ctx.raw} 筆`, // 自訂提示文字
                    },
                },

                title: {
                    display: false,
                    text: "每日訂單統計",
                    font: { size: 16, weight: "bold" },
                    padding: { top: 10, bottom: 20 },
                    position: "bottom",
                    // "top"
                    // "left"
                    // "bottom"
                    // "right"
                },
            },
            // 🔑 控制座標軸與長條圖外觀
            scales: {
                x: {
                // X 軸（水平軸，顯示日期）
                    grid: {
                        display: true,        
                        // 是否顯示網格線
                        color: "#202020",
                        // 網格線顏色
                    },
                    ticks: {
                        font: { size: 12 },    
                        // 標籤字型
                        maxRotation: 0,        
                        // 文字角度，0=水平
                    },
                    // barPercentage / categoryPercentage 控制條的寬度
                    // barPercentage 越小 → 每根條更細
                    // categoryPercentage 控制「群組寬度佔整體比例」
                    stacked: false,          // 多資料集時，是否堆疊
                },
                y: {
                    // Y 軸（垂直軸，顯示數值）
                    beginAtZero: true,       
                    // 是否從 0 開始
                    max: 80,                
                    // 上限數值（例如固定到 100）
                    ticks: {
                        stepSize: 20,          
                        // 每格的間距
                        color: "#800020",   
                        //設定刻度文字顏色
                        font: {
                            size: 14,
                            weight: "bold"
                        }
                    },
                    grid: {
                        color: "#202020",         
                        // 網格線顏色
                    },
                },
            },
        };
        //#endregion

        //#region 折線圖設定
        const data03 = {
            labels: lineDayData,
            datasets: [
                {
                    label: "人次",
                    data: vipTotalData,
                    // 線條樣式
                    borderColor: "#800020",      
                    // 線條顏色
                    borderWidth: 2,              
                    // 線條粗細
                    tension: 0,                
                    // 線條彎曲程度 (0=折線，1=貝茲曲線很圓滑)
                    borderDash: [1, 0],          // 線條虛線樣式 [實線長度, 空格長度]
                    // borderDashOffset: 2,       // 虛線偏移量

                    // 點樣式
                    pointBackgroundColor: "#800020", // 點的填色
                    pointBorderColor: "#800020",  // 點邊框顏色
                    pointBorderWidth: 2,          // 點邊框粗細
                    pointRadius: 5,               // 點半徑 (預設 3)
                    pointHoverRadius: 8,          // 滑過點的大小
                    pointStyle: "circle",         // 點樣式 ('circle', 'rect', 'triangle', 'cross'...)

                    // 填色區域
                    fill: false,                   // 是否填滿線下方區域
                    backgroundColor: "rgba(128,0,32,0.1)", // 填色顏色（透明紅色）

                    // 動畫
                    hoverBorderWidth: 2,          // 滑過時原點外框線條變粗
                },
                {
                    label: "人次",
                    data: userTotalData,
                    // 線條樣式
                    borderColor: "#dc546b",      
                    // 線條顏色
                    borderWidth: 2,              
                    // 線條粗細
                    tension: 0,                
                    // 線條彎曲程度 (0=折線，1=貝茲曲線很圓滑)
                    borderDash: [1, 0],          // 線條虛線樣式 [實線長度, 空格長度]
                    // borderDashOffset: 2,       // 虛線偏移量

                    // 點樣式
                    pointBackgroundColor: "#dc546b", // 點的填色
                    pointBorderColor: "#dc546b",  // 點邊框顏色
                    pointBorderWidth: 2,          // 點邊框粗細
                    pointRadius: 5,               // 點半徑 (預設 3)
                    pointHoverRadius: 8,          // 滑過點的大小
                    pointStyle: "circle",         // 點樣式 ('circle', 'rect', 'triangle', 'cross'...)

                    // 填色區域
                    fill: false,                   // 是否填滿線下方區域
                    backgroundColor: "rgba(128,0,32,0.1)", // 填色顏色（透明紅色）

                    // 動畫
                    hoverBorderWidth: 2,          // 滑過時原點外框線條變粗
                },
                {
                    label: "人次",
                    data: vendorTotalData,
                    // 線條樣式
                    borderColor: "#d6d6d6",      
                    // 線條顏色
                    borderWidth: 2,              
                    // 線條粗細
                    tension: 0,                
                    // 線條彎曲程度 (0=折線，1=貝茲曲線很圓滑)
                    borderDash: [1, 0],          // 線條虛線樣式 [實線長度, 空格長度]
                    // borderDashOffset: 2,       // 虛線偏移量

                    // 點樣式
                    pointBackgroundColor: "#d6d6d6", // 點的填色
                    pointBorderColor: "#d6d6d6",  // 點邊框顏色
                    pointBorderWidth: 2,          // 點邊框粗細
                    pointRadius: 5,               // 點半徑 (預設 3)
                    pointHoverRadius: 8,          // 滑過點的大小
                    pointStyle: "circle",         // 點樣式 ('circle', 'rect', 'triangle', 'cross'...)

                    // 填色區域
                    fill: false,                  // 是否填滿線下方區域
                    backgroundColor: "rgba(128,0,32,0.1)", // 填色顏色（透明紅色）

                    // 動畫
                    hoverBorderWidth: 2,          // 滑過時原點外框線條變粗
                },
            ],
        };

        const options03 = {
            responsive: true, // 隨容器大小縮放
            maintainAspectRatio: false,
            // 讓圖表吃容器高度
            plugins: {
                legend: {
                    display: false,
                    position: "top",             
                    // 圖例位置 ('top' | 'left' | 'bottom' | 'right')
                },
                title: {
                    display: false,
                    text: "每日人次統計",
                    font: { size: 16, weight: "bold" },
                    padding: { top: 10, bottom: 20 },
                },
                tooltip: {
                    mode: "index",               
                    // 同一 x 軸顯示多組數據
                    intersect: false,            
                    // 游標不必完全碰到點
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} 人`, // 自訂提示文字
                    },
                },
            },
            // 座標軸設定
            scales: {
                x: {
                    grid: { 
                        display: true,
                        // X 軸網格線是否顯示
                        color: "rgba(92, 92, 92, 0.3)", 
                        // X 軸網格線顏色
                    },    
                    
                    ticks: { maxRotation: 0 },   
                    // X 軸文字水平顯示
                },
                y: {
                    beginAtZero: true,           
                    // Y 軸從 0 開始
                    min: 0,                      
                    // 最小值
                    max: 3,                    
                    // 最大值（強制上限）
                    ticks: {
                        stepSize: 1,             
                        // 每格間距
                    },
                    grid: {
                        display: true,
                        // y 軸網格線是否顯示
                        color: "rgba(95, 95, 95, 0.3)",             
                        // 網格線顏色
                    },
                },
            },
        };
        //#endregion
    //#endregion


    return(
        <>
            <div className='BackIndexPage'>
                <div className='BackIndexPage-content'>
                    {
                        loginState?
                        (
                            <>
                                <div className="top">
                                    <div className='chartGroup02-set'>
                                        <div className='title-box'>
                                            <h4>圓環圖</h4>
                                        </div>
                                        <div className='chartGroup-box'>
                                            <Doughnut data={data01} options={options01} />
                                        </div>
                                    </div>
                                    <div className='chartGroup03-set'>
                                        <div className='title-box'>
                                            <h4>訂單統計</h4>
                                        </div>
                                        <div className='chartGroup-box'>
                                            <Bar data={data02} options={options02} />
                                        </div>
                                        <div className="chartTitle">
                                            <span className="legendBox"></span>
                                            訂單數
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className='chartGroup01-set'>
                                        <div className='title-box'>
                                            <h4>人次統計</h4>
                                        </div>
                                        <div className='chartGroup-box'>
                                            <Line data={data03} options={options03} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        :
                        (
                            <LoginContetnt />
                        )
                    }
                    
                </div>
            </div>
        </>
    )
}
export default BackIndexPage;
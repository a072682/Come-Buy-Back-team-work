import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";//一開始先import createSlice(系統通常會自動抓取)
import { axiosWithCookie, BASE_URL } from "../api";


//此區塊為測試開發用內容
        // import axios from "axios";
        // axios.defaults.withCredentials = true; 

        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        // const API_PATH = import.meta.env.VITE_API_PATH;
//此區塊為測試開發用內容

//其內部結構1.name(名子)2.initialState(初始值)
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData:null,
    orderMsg:null,
  },
  reducers: {
    //訂單資料上傳
    orderUpLoad: (state, action) => {
        state.orderData = action.payload;
    },
    //訂單資料上傳

    //訂單訊息上傳
    orderMsgUpLoad: (state, action) => {
        state.orderMsg = action.payload;
    },
    //訂單資料上傳
  },
});
export const { orderUpLoad,orderMsgUpLoad } = orderSlice.actions;
//輸出時為元件slice名稱+.reducer

//#region
//#endregion


//#region 取得所有訂單資料
    export const getAllOrderData = createAsyncThunk(
        "order/getAllOrderData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getAllOrderDataRef = await axiosWithCookie.get(`${BASE_URL}/adminOrder/getAllOrder`);
                console.log("取得所有訂單資料成功",getAllOrderDataRef.data.message);
                //更新訂單資料
                dispatch(orderUpLoad(getAllOrderDataRef.data.allOrderData));
                //更新訂單訊息
                dispatch(orderMsgUpLoad(getAllOrderDataRef.data.message));
                return(getAllOrderDataRef.data);
            } catch (error) {
                console.log("取得所有訂單資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

//#region 取得長條圖資料 getChartData
    export const getBarChartData = createAsyncThunk(
        "login/linkTest",
        async (_,{ dispatch }) => {
            try {
                const getBarChartDataRef = await axiosWithCookie.get(`${BASE_URL}/adminOrder/getBarChartData`);
                console.log("取得長條圖資料成功",getBarChartDataRef.data);
                return(getBarChartDataRef.data.ChartData);
            } catch (error) {
                console.log("取得長條圖資料失敗",error.response.data);
                return(error.response.data);
            }
        }
    );
//#endregion

//#region 取得今日所有訂單資料
    export const getToDayOrderData = createAsyncThunk(
        "order/getToDayOrderData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getToDayOrderDataRef = await axiosWithCookie.get(`${BASE_URL}/adminOrder/getToDayOrder`);
                console.log("取得今日訂單資料成功",getToDayOrderDataRef.data.message);
                return(getToDayOrderDataRef.data);
            } catch (error) {
                console.log("取得今日訂單資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

//#region 審核訂單資料
    export const reviewOrderData = createAsyncThunk(
        "order/reviewOrderData",
        async ({orderData}, { dispatch, rejectWithValue }) => {
            try {
                const reviewOrderDataRef = await axiosWithCookie.post(`${BASE_URL}/adminOrder/reviewOrder`,orderData);
                console.log("審核訂單資料成功",reviewOrderDataRef.data.message);
                return(reviewOrderDataRef.data.reviewData);
            } catch (error) {
                console.log("審核訂單資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

//#region 訂單刪除函式
    export const orderDataDelete = createAsyncThunk(
        "order/orderDataDelete",
        async ({orderId},{ dispatch,rejectWithValue }) => {
            try {
                const orderDataDeleteRef = await axiosWithCookie.delete(`${BASE_URL}/adminOrder/deleteSingleOrder/${orderId}`);
                //console.log("訂單刪除成功:",orderDataDeleteRef.data);
                //刪除成功後，再次抓取最新訂單列表
                dispatch(getAllOrderData());
            } catch (error) {
                console.log("訂單刪除失敗",error);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

export default orderSlice.reducer;
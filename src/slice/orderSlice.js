import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";//一開始先import createSlice(系統通常會自動抓取)
import axios from "axios";
axios.defaults.withCredentials = true; 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

//其內部結構1.name(名子)2.initialState(初始值)
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    
  },
  reducers: {
    
  },
});
export const { } = orderSlice.actions;
//輸出時為元件slice名稱+.reducer

//#region
//#endregion


//#region 取得所有訂單資料
    export const getAllOrderData = createAsyncThunk(
        "order/getAllOrderData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getAllOrderDataRef = await axios.get(`${BASE_URL}/adminOrder/getAllOrder`);
                console.log("取得所有訂單資料成功",getAllOrderDataRef.data.message);
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
                const getBarChartDataRef = await axios.get(`${BASE_URL}/adminOrder/getBarChartData`);
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
                const getToDayOrderDataRef = await axios.get(`${BASE_URL}/adminOrder/getToDayOrder`);
                console.log("取得所有訂單資料成功",getToDayOrderDataRef.data.message);
                return(getToDayOrderDataRef.data);
            } catch (error) {
                console.log("取得所有訂單資料失敗",error.response.data);
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
                const reviewOrderDataRef = await axios.post(`${BASE_URL}/adminOrder/reviewOrder`,orderData);
                console.log("審核訂單資料成功",reviewOrderDataRef.data.message);
                return(reviewOrderDataRef.data.reviewData);
            } catch (error) {
                console.log("審核訂單資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion



export default orderSlice.reducer;
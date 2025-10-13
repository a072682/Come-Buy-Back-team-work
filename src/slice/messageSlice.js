import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";//一開始先import createSlice(系統通常會自動抓取)
import axios from "axios";
axios.defaults.withCredentials = true; 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

//其內部結構1.name(名子)2.initialState(初始值)
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    
  },
  reducers: {
    
  },
});
export const { } = messageSlice.actions;
//輸出時為元件slice名稱+.reducer

//#region
//#endregion


//#region 取得所有留言資料
    export const getAllMessageData = createAsyncThunk(
        "order/getAllMessageData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getAllMessageDataRef = await axios.get(`${BASE_URL}/adminMessage/getAllMessage`);
                console.log("取得所有留言資料成功",getAllMessageDataRef.data.message);
                return(getAllMessageDataRef.data);
            } catch (error) {
                console.log("取得所有留言資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

//#region 取得今日所有留言資料
    export const getToDayMessageData = createAsyncThunk(
        "order/getToDayMessageData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getToDayMessageDataRef = await axios.get(`${BASE_URL}/adminMessage/getToDayMessage`);
                console.log("取得所有留言資料成功",getToDayMessageDataRef.data.message);
                return(getToDayMessageDataRef.data);
            } catch (error) {
                console.log("取得所有留言資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion



export default messageSlice.reducer;
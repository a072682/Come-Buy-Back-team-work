import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";//一開始先import createSlice(系統通常會自動抓取)
import { BASE_URL } from "../api";
import axios from "axios";

//此區塊為測試開發用內容
        // import axios from "axios";
        // axios.defaults.withCredentials = true; 

        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        // const API_PATH = import.meta.env.VITE_API_PATH;
//此區塊為測試開發用內容

//其內部結構1.name(名子)2.initialState(初始值)
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageTrigger:0,
  },
  reducers: {
    messageTriggerUpLoad: (state, action) => {
        state.messageTrigger = state.messageTrigger + 1;
    },
  },
});
export const { messageTriggerUpLoad } = messageSlice.actions;
//輸出時為元件slice名稱+.reducer

//#region
//#endregion


//#region 取得所有留言資料
    export const getAllMessageData = createAsyncThunk(
        "message/getAllMessageData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getAllMessageDataRef = await axios.get(`${BASE_URL}/adminMessage/getAllMessage`);
                //console.log("取得所有留言資料成功",getAllMessageDataRef.data.message);
                
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
        "message/getToDayMessageData",
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

//#region 刪除留言資料
    export const deleteMessageData = createAsyncThunk(
        "message/deleteMessageData",
        async ({orderId}, { dispatch, rejectWithValue }) => {
            try {
                const deleteMessageDataRef = await axios.delete(`${BASE_URL}/adminMessage/deleteMessage/${orderId}`);
                //console.log("刪除留言資料成功",deleteMessageDataRef.data);
                dispatch(messageTriggerUpLoad());
                return(deleteMessageDataRef.data);
            } catch (error) {
                console.log("刪除留言資料失敗",error.response);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion



export default messageSlice.reducer;
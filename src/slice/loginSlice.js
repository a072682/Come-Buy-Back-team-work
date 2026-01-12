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
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    linkState:false,//連線狀態
    isLogin: false,  // 是否登入
  },
  reducers: {
    linkStateTrue: (state, action) => {
        state.linkState = true;
    },
    linkStateFalse: (state, action) => {
        state.linkState = false;
    },
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload; // 儲存登入的使用者資訊
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
});
export const { login, logout, linkStateTrue, linkStateFalse,  } = loginSlice.actions;
//輸出時為元件slice名稱+.reducer

//#region
//#endregion

//#region 測試連線
    //測試連線
    export const linkTest = createAsyncThunk(
        "login/linkTest",
        async (_,{ dispatch }) => {
            dispatch(linkStateFalse()); 
            try {
                const response = await axios.get(`${BASE_URL}/test-db`);
                console.log("連線成功",response.data);
                dispatch(linkStateTrue()); 
                return(response.data);
            } catch (error) {
                console.log("連線失敗",error.response.data);
                dispatch(linkStateFalse()); 
                return(error.response.data);
            }
        }
    );
    //測試連線
//#endregion

//#region 取得圓環圖資料 getChartData
    export const getChartData = createAsyncThunk(
        "login/getChartData",
        async (_,{ dispatch }) => {
            try {
                const getChartDataRef = await axios.get(`${BASE_URL}/admin/getChartData`);
                //console.log("取得圓環資料成功",getChartDataRef.data);
                return(getChartDataRef.data);
            } catch (error) {
                console.log("取得圓環資料失敗",error.response.data);
                return(error.response.data);
            }
        }
    );
//#endregion

//#region 取得折線圖資料 getChartData
    export const getLineChartData= createAsyncThunk(
        "login/getLineChartData",
        async (_,{ dispatch }) => {
            try {
                const getLineChartDataRef = await axios.get(`${BASE_URL}/admin/getLineChartData`);
                //console.log("取得折線資料成功",getLineChartDataRef.data);
                return(getLineChartDataRef.data.ChartData);
            } catch (error) {
                console.log("取得折線資料失敗",error.response.data);
                return(error.response.data);
            }
        }
    );
//#endregion

//#region 會員登入API
    //會員登入API
    export const loginUser = createAsyncThunk(
        "login/loginUser",
        async (account, { dispatch, rejectWithValue }) => {
            try {
                const handleLoginRef = await axios.post(`${BASE_URL}/admin/adminlogin`, account);
                //console.log("登入成功",handleLoginRef.data);

                //取出token並取名為tokenData
                const tokenData = handleLoginRef.data.token;
                //取出token並取名為tokenData

                //如果tokenData存在則存入 localStorage並取名為token
                if (tokenData) {
                    //console.log("token存入成功");
                    localStorage.setItem("token", tokenData);
                }

                dispatch(logout());
                return({
                    login:handleLoginRef.data,
                });
            } catch (error) {
                console.log("登入失敗",error.response.data);
                dispatch(logout());
                return rejectWithValue(error.response.data);
            }
        }
    );
    //會員登入API
//#endregion

//#region 登入確認
    //登入確認 API 請求
    export const checkLogin = createAsyncThunk(
            "login/checkLogin",
            async (_,{ dispatch, rejectWithValue }) => {
                try {
                    const checkLoginRef = await axios.post(`${BASE_URL}/admin/adminlogInCheck`);
                    //console.log("登入確認成功",checkLoginRef.data);
                    dispatch(login());
            } catch (error) {
                console.log("登入確認失敗",error.response.data);
                dispatch(logout());
                return rejectWithValue(error.response.data);
            }
        }
    );
    //登入確認 API 請求
//#endregion



//#region 登出
    //登出
    export const logoutUser = createAsyncThunk(
        "login/logoutUser",
        async (_, { dispatch }) => {
            try {
                const handleLogoutRef = await axios.post(`${BASE_URL}/admin/adminlogout`);
                //console.log("登出成功(Slice端)");
            } catch (error) {
                console.log("登出失敗(Slice端)");
            } finally {
                //移除token
                localStorage.removeItem("token");
                dispatch(logout());
            }
        }
    );
    //登出
//#endregion  

//#region 取得所有會員資料
    export const getAllUserData = createAsyncThunk(
        "login/getAllUserData",
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const getAllUserDataRef = await axios.get(`${BASE_URL}/admin/getAllUser`);
                console.log("所有會員資料取得成功:",getAllUserDataRef.data.allUserData);
                return(getAllUserDataRef.data.allUserData);
            } catch (error) {
                console.log("所有會員資料取得失敗");
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

//#region 搜尋會員資料
    export const searchUserData = createAsyncThunk(
        "login/searchUserData",
        async ({searchData}, { dispatch, rejectWithValue }) => {
            try {
                const searchUserDataRef = await axios.post(`${BASE_URL}/admin/searchUser`,searchData);
                console.log("搜尋會員資料成功:",searchUserDataRef.data.message);
                return(searchUserDataRef.data.searchUserData);
            } catch (error) {
                console.log("搜尋會員資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion

//#region 修改會員權限
    export const roleChange = createAsyncThunk(
        "login/roleChange",
        async ({userData}, { dispatch, rejectWithValue }) => {
            try {
                const roleChangeRef = await axios.post(`${BASE_URL}/admin/roleChange`,userData);
                console.log("修改會員權限成功:",roleChangeRef.data);

            } catch (error) {
                console.log("修改會員權限失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion  

//#region 刪除會員資料
    export const deleteUser = createAsyncThunk(
        "login/deleteUser",
        async ({id}, { dispatch, rejectWithValue }) => {
            try {
                const roleChangeRef = await axios.delete(`${BASE_URL}/admin/deleteUser`,{data: { id }});
                console.log("刪除會員資料成功:",roleChangeRef.data);
                return(roleChangeRef.data);
            } catch (error) {
                console.log("刪除會員資料失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
//#endregion  

  



export default loginSlice.reducer;



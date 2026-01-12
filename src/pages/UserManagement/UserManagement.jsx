

import './_UserManagement.scss';
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUserData, searchUserData } from '../../slice/loginSlice';
import RoleModal from './roleModal/roleModal';



function UserManagement (){

    //#region 讀取登入狀態
    const loginState = useSelector((state)=>{
        return(
            state.login.isLogin
        )
    })

    useEffect(()=>{
        //console.log("loginState狀態:",loginState);
    },[loginState])
    //#endregion

    //#region 讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 所有會員資料宣告
        const [userItemData,setUserItemData] = useState(null);
        useEffect(()=>{},[userItemData]);
    //#endregion

    //#region 取得所有會員資料
    const handleGetAllUserData = async()=>{
        try{
            const handleGetAllUserDataRef = await dispatch(getAllUserData()).unwrap();
            console.log("取得會員資料成功:",handleGetAllUserDataRef);
            setUserItemData(handleGetAllUserDataRef);
        }catch(error){
            console.log("登入檢查失敗");
        }
    };
    useEffect(()=>{
        handleGetAllUserData();
    },[]);
    //#endregion

    //#region 搜尋用會員資料宣告
        const [userSearchData,setUserSearchData] = useState({
            id:"",
            email:"",
            username:"",
            role:"",
        });
        useEffect(()=>{console.log();},[userSearchData]);
    //#endregion

    //#region 搜尋用會員資料寫入函式
        const inputChange = (e) => {
            const { name, value } = e.target;
            setUserSearchData((item) => (
                {   ...item, 
                    [name]: value 
                }
            ));
        };
    //#endregion

    //#region input群組內容
        const inputData = [
            {
                title:"電子信箱",
                labelName:"電子信箱",
                type:"email",
                name:"email",
                value:userSearchData.email,
                placeholder:"請輸入信箱"
            },
            {
                title:"會員名稱",
                labelName:"會員名稱",
                type:"text",
                name:"username",
                value:userSearchData.username,
                placeholder:"請輸入會員名稱"
            },
            {
                title:"會員角色",
                labelName:"會員角色",
                type:"text",
                name:"role",
                value:userSearchData.role,
                placeholder:"請輸入會員資料"
            },
        ]
    //#endregion

    //#region 搜尋會員資料函式
        const handleSearchUserData = async()=>{
            try{
                if(!userSearchData.email && !userSearchData.username && !userSearchData.role){
                    const handleGetAllUserDataRef = await dispatch(getAllUserData()).unwrap();
                    console.log("取得會員資料成功:",handleGetAllUserDataRef);
                    setUserItemData(handleGetAllUserDataRef);
                }else{
                    const handleSearchUserDataRef = await dispatch(searchUserData({ searchData:userSearchData })).unwrap();
                    console.log("搜尋會員資料成功:",handleSearchUserDataRef);
                    setUserItemData(handleSearchUserDataRef);
                }
            }catch(error){
                console.log("登入檢查失敗");
            }
        };
    //#endregion

    //#region 更改會員權限資料宣告
        const [userRoleData,setUserRoleData] = useState({
            id:"",
            email:"",
            username:"",
            role:"",
        });
        useEffect(()=>{console.log();},[userRoleData]);
    //#endregion

    //#region 搜尋用會員資料寫入函式
        const handleUserRoleDataInput = (data) => {
            setUserRoleData({
                id:data.id,
                email:data.email,
                username:data.username,
                role:data.role,
            });
        };
    //#endregion

    //#region 刪除會員資料函式
        const handleDeleteUser = async(id) => {
            console.log("確認id",id);
            try{
                const handleDeleteUserRef = await dispatch(deleteUser({ id })).unwrap();
                console.log("刪除會員資料成功:",handleDeleteUserRef.data);
                await handleGetAllUserData();
            }catch(error){
                console.log("刪除會員資料失敗",error);
            }
        };
    //#endregion

    //#region 控制RoleModal
        //控制RoleModal
        const [handleRoleModal,setHandleRoleModal] = useState(null);
        useEffect(()=>{},[handleRoleModal]);

        //紀錄RoleModal狀態
        const [roleModalShow,setRoleModalShow] = useState(false);
        useEffect(()=>{},[roleModalShow]);
    //#endregion

    //#region 控制RoleModal
        const handleRoleModalOpen = ()=>{
            handleRoleModal?.show();
            setRoleModalShow(true);
        }
    //#endregion


    return(
        <>
            <div className='UserManagement'>
                <div className='UserManagement-content'>
                    {
                        loginState?
                        (
                            <>
                                <div className='BasicInformationTitle-box'>
                                    <h3 className='title-set'>會員中心 - 基本資訊</h3>
                                </div>

                                <div className='userSearch'>
                                    <div className='userSearchTitle-box'>
                                        <h3 className='title-set'>搜尋</h3>
                                    </div>
                                    <div className='inputGroup-box'>
                                        {
                                            inputData?.map((item)=>{
                                                return(
                                                    <div key={item.title} className='inputGroup-set'>
                                                        <label className='Label-set'>{item.title}：</label>
                                                        <input
                                                            className='form-item Input-set'
                                                            type={item.type}
                                                            name={item.name}
                                                            value={item.value}
                                                            onChange={inputChange}
                                                            placeholder={item.placeholder}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='userSearchBtn-box'>
                                        <button className='btn-set' onClick={()=>{handleSearchUserData();}}>
                                            搜尋
                                        </button>
                                    </div>
                                    {/* <div className="userResult">
                                        <table>
                                            <thead>
                                                <tr className='userResultTitle-box'>
                                                    <th className='title-set'>會員名稱</th>
                                                    <th className='title-set'>電子信箱</th>
                                                    <th className='title-set'>會員角色</th>
                                                    <th className='title-set'>電話號碼</th>
                                                    <th className='title-set'>是否啟用</th>
                                                    <th className='title-set'>編輯</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='userResultContent-box'>
                                                    <td className='item-set'>PS Chen</td>
                                                    <td className='item-set'>ps@comebuy.com.tw</td>
                                                    <td className='item-set'>VIP</td>
                                                    <td className='item-set'>0900123456</td>
                                                    <td className='item-set'>
                                                        <span className="material-symbols-outlined item-icon">
                                                            check_small
                                                        </span>
                                                    </td>
                                                    <td className='item-set'> 
                                                        <button className='editBtn-set'>
                                                            編輯
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> */}
                                </div>

                                <div className='userManagementTitle-box'>
                                    <h3 className='title-set'>會員列表</h3>
                                </div>

                                <div className='userManagement-box'>
                                    <table>
                                        <thead>
                                            <tr className='userManagementItemTitle-box'>
                                                <th className='title-set'>會員名稱</th>
                                                <th className='title-set'>電子信箱</th>
                                                <th className='title-set'>會員角色</th>
                                                {/* <th className='title-set'>是否啟用</th> */}
                                                <th className='title-set'>編輯</th>
                                                <th className='title-set'>刪除會員</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userItemData?.map((item)=>{
                                                    return(
                                                        <tr key={item.id} className='userManagementItemContent-box'>
                                                            <td className='item-set'>{item.username}</td>
                                                            <td className='item-set'>{item.email}</td>
                                                            <td className='item-set'>{item.role}</td>
                                                            {/* <td className='item-set'>
                                                                <span className="material-symbols-outlined item-icon">
                                                                    check_small
                                                                </span>
                                                            </td> */}
                                                            <td className='item-set'> 
                                                                <button className='editBtn-set' onClick={()=>{handleRoleModalOpen();handleUserRoleDataInput(item);}}>
                                                                    編輯權限
                                                                </button>
                                                            </td>
                                                            {
                                                                item.role === "admin"?
                                                                (null)
                                                                :
                                                                (
                                                                <td className='item-set'> 
                                                                    <button className='editBtn-set' 
                                                                    onClick={()=>{handleDeleteUser(item.id);}}>
                                                                        刪除會員
                                                                    </button>
                                                                </td>
                                                                )
                                                            }
                                                            
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                {/* <div className='userManagementTitle-box'>
                                    <h3 className='title-set'>會員角色管理</h3>
                                </div>

                                <div className='memberRights'>
                                    <table>
                                        <thead>
                                            <tr className='memberRightsTitle-box'>
                                                <th className='title-set'>名稱</th>
                                                <th className='title-set'>運費計算</th>
                                                <th className='title-set'>是否啟用</th>
                                                <th className='title-set'>編輯權限</th>
                                                <th className='title-set'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='memberRightsContent-box'>
                                                <td className='item-set'>Administrators</td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined cancel-icon">
                                                        close_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined check-icon">
                                                        check_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined check-icon">
                                                        check_small
                                                    </span>
                                                </td>
                                                <td className='item-set'> 
                                                    <button className='editBtn-set'>
                                                        編輯權限
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr className='memberRightsContent-box'>
                                                <td className='item-set'>USER</td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined check-icon">
                                                        check_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined check-icon">
                                                        check_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined cancel-icon">
                                                        close_small
                                                    </span>
                                                </td>
                                                <td className='item-set'> 
                                                    <button className='editBtn-set'>
                                                        編輯權限
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr className='memberRightsContent-box'>
                                                <td className='item-set'>VIP</td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined cancel-icon">
                                                        close_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined check-icon">
                                                        check_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined cancel-icon">
                                                        close_small
                                                    </span>
                                                </td>
                                                <td className='item-set'> 
                                                    <button className='editBtn-set'>
                                                        編輯權限
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr className='memberRightsContent-box'>
                                                <td className='item-set'>供應商</td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined cancel-icon">
                                                        close_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined check-icon">
                                                        check_small
                                                    </span>
                                                </td>
                                                <td className='item-set'>
                                                    <span className="material-symbols-outlined cancel-icon">
                                                        close_small
                                                    </span>
                                                </td>
                                                <td className='item-set'> 
                                                    <button className='editBtn-set'>
                                                        編輯權限
                                                    </button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div> */}
                            </>
                        )
                        :
                        (
                            <div className='NoActive'>
                                <h3 className='NoActive-title-set'>請先進行管理員登陸</h3>
                            </div>
                        )
                    }

                    
                </div>
            </div>
            <RoleModal  setHandleRoleModal = {setHandleRoleModal}
                        roleModalShow = {roleModalShow}
                        setRoleModalShow = {setRoleModalShow}

                        userRoleData = {userRoleData}
                        setUserRoleData = {setUserRoleData}

                        setUserItemData={setUserItemData}
            />
        </>
    )
}
export default UserManagement;


import { useDispatch, useSelector } from 'react-redux';
import './_CustomerMessageManagement.scss';
import { useEffect, useState } from 'react';
import { getAllMessageData, getToDayMessageData } from '../../slice/messageSlice';



function CustomerMessageManagement (){

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

    //#region 儲存訊息狀態宣告
        const [msgData,setMsgData] = useState(null);
        useEffect(()=>{},[msgData]);
    //#endregion

    //#region 儲存所有留言資料狀態宣告
        const [allMessageData,setAllMessageData] = useState(null);
        useEffect(()=>{},[allMessageData]);
    //#endregion

    //#region 儲存單一訂單資料狀態宣告
        const [messageData,setMessageData] = useState(null);
        useEffect(()=>{console.log("確認留言",messageData)},[messageData]);
    //#endregion

    //#region 取得所有留言資料函式
        const handleGetAllMessageData = async()=>{
            try{
                const handleGetAllMessageDataRef = await dispatch(getAllMessageData()).unwrap();
                console.log("取得所有留言資料成功:",handleGetAllMessageDataRef);
                setAllMessageData(handleGetAllMessageDataRef.allMessageData);
                setMsgData(handleGetAllMessageDataRef.message);
                setMessageData(null);
            }catch(error){
                console.log("取得所有留言資料失敗");
            }
        };
    //#endregion

    //#region 開場執行取得所有訂單資料函式
        useEffect(()=>{
            handleGetAllMessageData();
        },[])
    //#endregion

    //#region 取得今日所有訂單資料函式
        const handleGetToDayMessageData = async()=>{
            try{
                const handleGetToDayMessageDataRef = await dispatch(getToDayMessageData()).unwrap();
                console.log("取得所有留言資料成功:",handleGetToDayMessageDataRef);
                setAllMessageData(handleGetToDayMessageDataRef.toDayMessageData);
                setMsgData(handleGetToDayMessageDataRef.message);
                setMessageData(null);
            }catch(error){
                console.log("取得所有留言資料失敗");
            }
        };
    //#endregion

    return(
        <>
            <div className='customerMessageManagement'>
                <div className='customerMessageManagement-content'>
                    {
                        loginState?
                        (
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="messageBtn-box">
                                            <button className='messageBtn-set' onClick={()=>{handleGetToDayMessageData();}}>
                                                今日留言
                                            </button>
                                            <button className='messageBtn-set' onClick={()=>{handleGetAllMessageData();}}>
                                                所有留言
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-4'>
                                        <div className='messageList-box'>
                                            <div className='listTitle-box'>
                                                <h3 className='listTitle-set'>留言列表</h3>
                                            </div>
                                            <div className='listItem-box'>
                                                {
                                                    allMessageData ?
                                                    (
                                                        allMessageData?.map((item)=>{
                                                            return(
                                                                <button key={item.id} className='listItem-set' onClick={()=>{setMessageData(item);}}>
                                                                    <p className='listText-set'>會員名稱: <span>{item.username}</span> </p>
                                                                    <p className='listText-set'>留言時間: <span>{item.created_at.slice(0, 10)}</span> </p>
                                                                    <p className='listText-set'>留言簡介: <span>{item.message_content.slice(0, 10)}</span> </p>
                                                                </button>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <h4>{msgData}</h4>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-8'>
                                        <div className='messageContent-box'>
                                            {
                                                messageData?
                                                (
                                                    <>
                                                        <div className='messageTitle-box'>
                                                            <h3 className='messageTitle-set'>留言內容</h3>
                                                        </div>
                                                        <div className='messageItem-box'>
                                                            <p className='itemText-set'>會員名稱: <span>{messageData.username}</span> </p>
                                                            <p className='itemText-set'>留言時間: <span>{messageData.created_at.slice(0, 10)}</span> </p>
                                                            <p className='itemText-set itemAll'>留言內容: <span>{messageData.message_content}</span> </p>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <h4>請選擇留言</h4>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        </>
    )
}
export default CustomerMessageManagement;
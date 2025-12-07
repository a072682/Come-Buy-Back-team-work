

import { useDispatch, useSelector } from 'react-redux';
import './_OrderManagement.scss';
import { useEffect, useState } from 'react';
import { getAllOrderData, getToDayOrderData, orderDataDelete } from '../../slice/orderSlice';
import OrderModal from './OrderModal/OrderModal';
import ReviewModal from './ReviewModal/ReviewModal';

function OrderManagement (){

    //#region 讀取中央登入資料
        //讀取中央資料
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
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 儲存所有訂單資料狀態宣告
        const [allOrderData,setAllOrderData] = useState(null);
        useEffect(()=>{},[allOrderData]);
    //#endregion

    //#region 儲存單一訂單資料狀態宣告
        const [orderData,setOrderData] = useState(null);
        useEffect(()=>{
            //console.log("確認資料",orderData)
        },[orderData]);
    //#endregion

    //#region 儲存訊息狀態宣告
        const [msgData,setMsgData] = useState(null);
        useEffect(()=>{},[msgData]);
    //#endregion

    //#region 讀取訂單資料
        //讀取中央資料
        const orderDataRef = useSelector((state)=>{
            return(
                state.order.orderData
            )
        })
        useEffect(()=>{
            setAllOrderData(orderDataRef);
            //console.log("列表資料",orderDataRef);
        },[orderDataRef])
    //#endregion

    //#region 讀取訂單訊息
        //讀取中央資料
        const orderMsgRef = useSelector((state)=>{
            return(
                state.order.orderMsg
            )
        })
        useEffect(()=>{
            setMsgData(orderMsgRef);
            //console.log("訊息資料",orderMsgRef)
        },[orderMsgRef])
    //#endregion

    //#region 取得所有訂單資料函式
        const handleGetAllOrderData = async()=>{
            try{
                const handleGetAllOrderDataRef = await dispatch(getAllOrderData()).unwrap();
                //console.log("取得所有訂單資料成功:",handleGetAllOrderDataRef);
            }catch(error){
                console.log("取得所有訂單資料失敗");
            }
        };
    //#endregion

    //#region 開場執行取得所有訂單資料函式
        useEffect(()=>{
            handleGetAllOrderData();
        },[])
    //#endregion

    //#region 取得今日所有訂單資料函式
        const handleGetToDayOrderData = async()=>{
            try{
                const handleGetToDayOrderDataRef = await dispatch(getToDayOrderData()).unwrap();
                //console.log("取得所有訂單資料成功:",handleGetToDayOrderDataRef);
                setAllOrderData(handleGetToDayOrderDataRef.toDayOrderData);
                setMsgData(handleGetToDayOrderDataRef.message);
            }catch(error){
                console.log("取得所有訂單資料失敗");
            }
        };
    //#endregion

    //#region 控制orderModal相關函數
    
        //#region 控制orderModal狀態
            const[handleOrderModal,setHandleOrderModal]=useState(null);
            useEffect(()=>{},[handleOrderModal]);
        //#endregion

        //#region 紀錄orderModal狀態
            const[orderModalShow,setOrderModalShow]=useState(false);
            useEffect(()=>{},[orderModalShow]);
        //#endregion
        
    //#endregion

    //#region 控制orderModal開啟函式
    const handleOrderModelOpen = (data) => {
        setOrderData(data);
        handleOrderModal?.show();
        setOrderModalShow(true);
    }
    //#endregion

    //#region 控制ReviewModal相關函數
    
        //#region 控制ReviewModal狀態
            const[handleReviewModal,setHandleReviewModal]=useState(null);
            useEffect(()=>{},[handleReviewModal]);
        //#endregion

        //#region 紀錄ReviewModal狀態
            const[reviewModalShow,setReviewModalShow]=useState(false);
            useEffect(()=>{},[reviewModalShow]);
        //#endregion
        
    //#endregion

    //#region 控制ReviewModal開啟函式
    const handleReviewModalOpen = (data) => {
        setOrderData(data);
        handleReviewModal?.show();
        setReviewModalShow(true);
    }
    //#endregion

    //#region 刪除訂單函式
    const handleDeleteOrderData = (id) =>{
        dispatch(orderDataDelete({orderId: id}));
    }
    //#endregion

    return(
        <>
            <div className='orderManagement'>
                <div className='orderManagement-content'>
                    {
                        loginState?
                        (
                            <>
                                <div className='orderManagementTitle-box'>
                                    <h3 className='title-set'>訂單管理頁面</h3>
                                </div>

                                <div className='orderManagementSearch'>

                                    <div className='orderBtn-box'>
                                        <button className='btn-set' onClick={()=>{handleGetToDayOrderData();}}>
                                            顯示今日訂單
                                        </button>
                                        <button className='btn-set' onClick={()=>{handleGetAllOrderData()}}>
                                            顯示所有訂單
                                        </button>
                                    </div>

                                    <div className='order-box'>
                                        {
                                            allOrderData ?
                                            (
                                                <table>
                                                    <thead>
                                                        <tr className='orderTitle-box'>
                                                            <th className='title-set'>訂單編號</th>
                                                            <th className='title-set'>會員名稱</th>
                                                            <th className='title-set'>檔案縮圖</th>
                                                            <th className='title-set'>訂單詳情</th>
                                                            <th className='title-set'>審核狀態</th>
                                                            <th className='title-set'>預計開案時間</th>
                                                            <th className='title-set'>訂單審核</th>
                                                            <th className='title-set'>訂單刪除</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allOrderData?.map((item)=>{
                                                                return(
                                                                    <tr key={item.id} className='orderContent-box'>
                                                                        <td className='item-set'>{item.id}</td>
                                                                        <td className='item-set'>{item.username}</td>
                                                                        <td className='item-set'>
                                                                            <img    className='orderImg-set' 
                                                                                    src={item.imgfileurl} alt={item.imgfileid} />
                                                                        </td>
                                                                        <td className='item-set'>
                                                                            <button className='orderBtn-set' 
                                                                                    onClick={()=>{handleOrderModelOpen(item);}}>
                                                                                訂單詳情
                                                                            </button>
                                                                        </td>
                                                                        <td className='item-set'>
                                                                            {
                                                                                item.state === 'approved' ? '已核准'
                                                                                : item.state === 'wait'    ? '審核中'
                                                                                : item.state === 'rejected'? '已駁回'
                                                                                : null
                                                                            }
                                                                        </td>
                                                                        <td className='item-set'>
                                                                            {item.productiontime.slice(0, 10)}
                                                                        </td>
                                                                        <td className='item-set'> 
                                                                            <button className='editBtn-set' 
                                                                                    onClick={()=>{handleReviewModalOpen(item)}}>
                                                                                審核訂單
                                                                            </button>
                                                                        </td>
                                                                        <td className='item-set'>
                                                                            <button className='orderBtn-set' 
                                                                                    onClick={()=>{handleDeleteOrderData(item.id);}}>
                                                                                訂單刪除
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        } 
                                                    </tbody>
                                                </table>
                                            )
                                            :
                                            (
                                                <h4>{msgData}</h4>
                                            )
                                        }
                                        
                                    </div>
                                </div>
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
            <OrderModal     setHandleOrderModal = {setHandleOrderModal}
                            orderModalShow = {orderModalShow}
                            setOrderModalShow = {setOrderModalShow}

                            orderData = {orderData}
                            setOrderData = {setOrderData}
            />
            <ReviewModal    setHandleReviewModal = {setHandleReviewModal}
                            reviewModalShow = {reviewModalShow}
                            setReviewModalShow = {setReviewModalShow}

                            orderData = {orderData}
                            setOrderData = {setOrderData}

                            setAllOrderData = {setAllOrderData}
            />
        </>
    )
}
export default OrderManagement;
import { Modal } from "bootstrap"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_OrderModal.scss';





function OrderModal ({setHandleOrderModal,orderModalShow,setOrderModalShow,orderData,setOrderData}){

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    const navigate = useNavigate();

    //#region
    //#endregion
    
    //#region 元件控制
        //元件控制
            //元件控制用ref
            const orderModalRef = useRef(null);
            //元件控制用ref

            //元件控制狀態
            const [orderModal,setOrderModal] = useState(null);
            //元件控制狀態
            useEffect(()=>{
                if (orderModalRef.current) {
                    const instance = new Modal(orderModalRef.current,{
                        backdrop:false
                    });
                    //元件控制狀態
                    setOrderModal(instance);
                    //元件控制狀態

                    // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                        //外部控制狀態
                    if (setHandleOrderModal) {
                        setHandleOrderModal(
                        //外部控制狀態
                                {
                                    show: () => instance.show(),
                                    hide: () => instance.hide(),
                                }
                            );
                    }
                }
            },[]);

            const btnByOrderModalOpen = ()=>{
                orderModal?.show();
            }
            const btnByOrderModalClose = ()=>{
                document.activeElement?.blur();  
                // 焦點移除
                setOrderData(null);
                setOrderModalShow(false);
                orderModal?.hide();
            }
        //元件控制
    //#endregion

    //#region 控制上一頁問題
        //控制上一頁問題
            useEffect(() => {
                if (orderModalShow) {
                    document.body.style.overflow = "hidden"; // 🔒 禁止滾動
                    //console.log("滾動鎖住");
                }else if(!orderModalShow){
                    document.body.style.overflow = "auto"; // ✅ 恢復滾動
                    //console.log("滾動解除");
                }
                return () => {
                    //console.log("組件解散");
                };
            }, [orderModalShow]);
        //控制上一頁問題
    //#endregion
    
    //#region顯示訂單用資料
        const orderTypeMap = {
            slow: '不急單',
            normal: '一般單',
            urgent: '急單',
        };
        const orderItemData = [
            {
                id:"orderItemData01",
                title:"樣品圖縮圖",
                content:orderData?.imgfileurl,
            },
            {
                id:"orderItemData02",
                title:"價格估算",
                content: (Number(orderData?.num) || 0) * (Number(orderData?.price) || 0),
            },
            {
                id:"orderItemData03",
                title:"製程",
                content:orderData?.technique,
            },
            {
                id:"orderItemData04",
                title:"材料",
                content:orderData?.material,
            },
            {
                id:"orderItemData05",
                title:"顏色",
                content:orderData?.color,
            },
            {
                id:"orderItemData06",
                title:"數量",
                content:orderData?.num,
            },
            {
                id:"orderItemData07",
                title:"支撐材",
                content:orderData?.supportmaterial,
            },
            {
                id:"orderItemData08",
                title:"支撐材密度",
                content:orderData?.supportdensity,
            },
            {
                id:"orderItemData09",
                title:"壁厚",
                content:orderData?.wallthickness,
            },
            {
                id:"orderItemData10",
                title:"工期類型",
                content: orderTypeMap[orderData?.ordertype],
            },
            {
                id:"orderItemData11",
                title:"預計訂單製作時間",
                content:orderData?.productiontime,
            },
            {
                id:"orderItemData12",
                title:"預計訂單完成時間",
                content:orderData?.productionendtime,
            },
        ]
    //#endregion


    return(
        <>
            {/* 遮罩 */}
            <div ref={orderModalRef} id="productModal_orderModel" className="modal orderModel" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                {/* 定位至置中效果 */}
                <div className="modal-dialog modal-dialog-centered">

                    {/* model整體元件 */}
                    <div className="modal-content border-0 ">

                        {/* header設定 */}
                        <div className="modal-header orderModalHeaderBgSet">
                            <h4 className="title-set">訂單明細</h4>
                            <button onClick={()=>{btnByOrderModalClose()}} type="button" className="orderModalBtnClose" aria-label="Close">
                                <span className="material-symbols-outlined materialPageModalBtnCloseImgSet">
                                    close
                                </span>
                            </button>
                        </div>

                        {/* model本體背景 */}
                        <div className="orderModal-body-set">
                            <div className="bodyContent-box">
                                {
                                    orderItemData?.map((item)=>{
                                        return(
                                            item.title === "樣品圖縮圖"?
                                            (
                                                
                                                <div key={item.id} className="item-set">
                                                    <div className="title-box">
                                                        <h4 className="title-set">樣品圖縮圖</h4>
                                                    </div>
                                                    <div className="img-box">
                                                        <img className="img-set" 
                                                            src={item.content || null} 
                                                            alt={item.title} />
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div key={item.id} className="item-set">
                                                    <div className="title-box">
                                                        <h4 className="title-set">{item.title}</h4>
                                                    </div>
                                                    <div className="text-box">
                                                        <p className="text-set">{item.content}</p>
                                                    </div>
                                                </div>
                                            )
                                            
                                        )
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderModal;
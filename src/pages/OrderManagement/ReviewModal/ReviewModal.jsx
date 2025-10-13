import { Modal } from "bootstrap"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_reviewModal.scss';
import { getAllUserData, roleChange } from "../../../slice/loginSlice";
import { getAllOrderData, reviewOrderData } from "../../../slice/orderSlice";




function ReviewModal ({setHandleReviewModal,reviewModalShow,setReviewModalShow,orderData,setOrderData,setAllOrderData}){

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
            const reviewModalRef = useRef(null);
            //元件控制用ref

            //元件控制狀態
            const [reviewModal,setReviewModal] = useState(null);
            //元件控制狀態
            useEffect(()=>{
                if (reviewModalRef.current) {
                    const instance = new Modal(reviewModalRef.current,{
                        backdrop:false
                    });
                    //元件控制狀態
                    setReviewModal(instance);
                    //元件控制狀態

                    // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                        //外部控制狀態
                    if (setHandleReviewModal) {
                        setHandleReviewModal(
                        //外部控制狀態
                                {
                                    show: () => instance.show(),
                                    hide: () => instance.hide(),
                                }
                            );
                    }
                }
            },[]);

            const btnByReviewModalOpen = ()=>{
                reviewModal?.show();
            }
            const btnByReviewModalClose = ()=>{
                document.activeElement?.blur();  
                // 焦點移除
                setOrderData(null);
                setReviewModalShow(false);
                reviewModal?.hide();
            }
        //元件控制
    //#endregion

    //#region 控制上一頁問題
        useEffect(() => {
            if (reviewModalShow) {
                document.body.style.overflow = "hidden"; // 🔒 禁止滾動
                console.log("滾動鎖住");
            }else if(!reviewModalShow){
                document.body.style.overflow = "auto"; // ✅ 恢復滾動
                console.log("滾動解除");
            }
            return () => {
                console.log("組件解散");
            };
        }, [reviewModalShow]);
    //#endregion

    //#region 審核資料寫入函式
        const handleReviewDataChange = (event) =>{
            setOrderData({
                ...orderData,
                state:event.target.value,
            })
        }
    //#endregion

    //#region 權限更改函式
        const handleReviewChange = async() =>{
            try{
                await dispatch(reviewOrderData({ orderData:orderData })).unwrap();
                console.log("審核成功");
                const handleGetAllOrderDataRef = await dispatch(getAllOrderData()).unwrap();
                console.log("取得所有訂單資料成功",handleGetAllOrderDataRef);
                setAllOrderData(handleGetAllOrderDataRef.allOrderData);
                btnByReviewModalClose();
            }catch(error){
                console.log("權限更改失敗",error);
            }
        }
    //#endregion



    

    return(
        <>
            {/* 遮罩 */}
            <div ref={reviewModalRef} id="productModal_reviewModal" className="modal reviewModal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                {/* 定位至置中效果 */}
                <div className="modal-dialog modal-dialog-centered">

                    {/* model整體元件 */}
                    <div className="modal-content border-0 ">

                        {/* header設定 */}
                        <div className="modal-header reviewModalHeaderBgSet">
                            <h3 className="title-set">訂單審核</h3>
                            <button onClick={()=>{btnByReviewModalClose()}} type="button" className="reviewModalBtnClose" aria-label="Close">
                                <span className="material-symbols-outlined materialPageModalBtnCloseImgSet">
                                    close
                                </span>
                            </button>
                        </div>

                        {/* model本體背景 */}
                        <div className="reviewModal-body-set">
                            <div className="bodyContent-box">
                                
                                <div className="card rounded-0">
                                    <input  id="review01" 
                                            type="radio" 
                                            name="review" 
                                            value="approved" 
                                            checked={orderData?.state === "approved"} 
                                            onChange={handleReviewDataChange}/>
                                    <label htmlFor="review01" className="mb-0 custom-checkout-label ">
                                        核准
                                    </label>
                                </div>

                                <div className="card rounded-0">
                                    <input  id="review02" 
                                            type="radio" 
                                            name="review" 
                                            value="wait" 
                                            checked={orderData?.state === "wait"} 
                                            onChange={handleReviewDataChange}/>
                                    <label htmlFor="review02" className="mb-0 custom-checkout-label ">
                                        審核中
                                    </label>
                                </div>
                                
                                <div className="card rounded-0">
                                    <input  id="review03" 
                                            type="radio" 
                                            name="review" 
                                            value="rejected" 
                                            checked={orderData?.state === "rejected"} 
                                            onChange={handleReviewDataChange}/>
                                    <label htmlFor="review03" className="mb-0 custom-checkout-label">
                                        駁回
                                    </label>
                                </div>

                                <button className='reviewModalBtn-set' onClick={()=>{handleReviewChange();}}>
                                    審核訂單
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReviewModal;
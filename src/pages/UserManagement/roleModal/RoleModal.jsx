import { Modal } from "bootstrap"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_RoleModal.scss';
import { getAllUserData, roleChange } from "../../../slice/loginSlice";




function RoleModal ({setHandleRoleModal,roleModalShow,setRoleModalShow,userRoleData,setUserRoleData,setUserItemData}){

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
            const roleModalRef = useRef(null);
            //元件控制用ref

            //元件控制狀態
            const [roleModal,setRoleModal] = useState(null);
            //元件控制狀態
            useEffect(()=>{
                if (roleModalRef.current) {
                    const instance = new Modal(roleModalRef.current,{
                        backdrop:false
                    });
                    //元件控制狀態
                    setRoleModal(instance);
                    //元件控制狀態

                    // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                        //外部控制狀態
                    if (setHandleRoleModal) {
                        setHandleRoleModal(
                        //外部控制狀態
                                {
                                    show: () => instance.show(),
                                    hide: () => instance.hide(),
                                }
                            );
                    }
                }
            },[]);

            const btnByRoleModalOpen = ()=>{
                roleModal?.show();
            }
            const btnByRoleModalClose = ()=>{
                document.activeElement?.blur();  
                // 焦點移除
                setUserRoleData({
                    id:"",
                    email:"",
                    username:"",
                    role:"",
                })
                setRoleModalShow(false);
                roleModal?.hide();
            }
        //元件控制
    //#endregion

    //#region 控制上一頁問題
        useEffect(() => {
            if (roleModalShow) {
                document.body.style.overflow = "hidden"; // 🔒 禁止滾動
                console.log("滾動鎖住");
            }else if(!roleModalShow){
                document.body.style.overflow = "auto"; // ✅ 恢復滾動
                console.log("滾動解除");
            }
            return () => {
                console.log("組件解散");
            };
        }, [roleModalShow]);
    //#endregion

    //#region 權限更改資料寫入函式
        const handleUserRoleDataChange = (event) =>{
            setUserRoleData({
                ...userRoleData,
                role:event.target.value,
            })
        }
    //#endregion

    //#region 權限更改函式
        const handleRoleChange = async() =>{
            try{
                await dispatch(roleChange({ userData:userRoleData })).unwrap();
                console.log("權限更改成功");
                const handleGetAllUserDataRef = await dispatch(getAllUserData()).unwrap();
                console.log("取得會員資料成功",handleGetAllUserDataRef);
                setUserItemData(handleGetAllUserDataRef);
                btnByRoleModalClose();
            }catch(error){
                console.log("權限更改失敗",error);
            }
        }
    //#endregion



    

    return(
        <>
            {/* 遮罩 */}
            <div ref={roleModalRef} id="productModal_roleModal" className="modal roleModal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                {/* 定位至置中效果 */}
                <div className="modal-dialog modal-dialog-centered">

                    {/* model整體元件 */}
                    <div className="modal-content border-0 ">

                        {/* header設定 */}
                        <div className="modal-header roleModalHeaderBgSet">
                            <h3 className="title-set">權限編輯</h3>
                            <button onClick={()=>{btnByRoleModalClose()}} type="button" className="roleModalBtnClose" aria-label="Close">
                                <span className="material-symbols-outlined materialPageModalBtnCloseImgSet">
                                    close
                                </span>
                            </button>
                        </div>

                        {/* model本體背景 */}
                        <div className="roleModal-body-set">
                            <div className="bodyContent-box">
                                
                                <div className="card rounded-0">
                                    <input  id="salutation01" 
                                            type="radio" 
                                            name="salutation" 
                                            value="admin" 
                                            checked={userRoleData.role === "admin"} 
                                            onChange={handleUserRoleDataChange}/>
                                    <label htmlFor="salutation01" className="mb-0 custom-checkout-label ">
                                        管理員
                                    </label>
                                </div>
                                
                                <div className="card rounded-0">
                                    <input  id="salutation02" 
                                            type="radio" 
                                            name="salutation" 
                                            value="user" 
                                            checked={userRoleData.role === "user"} 
                                            onChange={handleUserRoleDataChange}/>
                                    <label htmlFor="salutation02" className="mb-0 custom-checkout-label">
                                        會員
                                    </label>
                                </div>

                                <div className="card rounded-0">
                                    <input  id="salutation03" 
                                            type="radio" 
                                            name="salutation" 
                                            value="vip" 
                                            checked={userRoleData.role === "vip"} 
                                            onChange={handleUserRoleDataChange}/>
                                    <label htmlFor="salutation03" className="mb-0 custom-checkout-label">
                                        VIP會員
                                    </label>
                                </div>

                                <div className="card rounded-0">
                                    <input  id="salutation04" 
                                            type="radio" 
                                            name="salutation" 
                                            value="vendor" 
                                            checked={userRoleData.role === "vendor"} 
                                            onChange={handleUserRoleDataChange}/>
                                    <label htmlFor="salutation04" className="mb-0 custom-checkout-label">
                                        供應商
                                    </label>
                                </div>

                                <button className='roleModalBtn-set' onClick={()=>{handleRoleChange();}}>
                                    編輯權限
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoleModal;
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Offcanvas, Button, Nav, Navbar as BootstrapNavbar, Container, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_Header.scss';
import OffcanvasPage from "./OffcanvasPage/OffcanvasPage";
import UserDropdown from "./UserDropdown/UserDropdown";
import { checkLogin, linkTest } from "../../../slice/loginSlice";




function Header(){

    // const[testStage,setTestStage] = useState(false);

    //#region 
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 連線測試
        //連線測試
        useEffect(()=>{
            dispatch(linkTest()); 
        },[])
        //連線測試
    //#endregion

    //#region 登入確認
        //登入確認
        useEffect(()=>{
            const getUserData = async()=>{
                try{
                    const getUserDataRef = await dispatch(checkLogin()).unwrap();
                    
                }catch(error){
                    console.log("登入檢查失敗");
                }
            };
            getUserData();
        },[]);
        //登入確認
    //#endregion

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

    //#region 側邊狀態
        const [onOpen, setOnOpen] = useState(false); // 控制 offcanvas 開關
        useEffect(()=>{},[onOpen]);

        const handleOpen = () => setOnOpen(true);
        const handleClose = () => setOnOpen(false);
    //#endregion

    const [expanded, setExpanded] = useState(false);
    
    return(
        <>
            <Navbar expand="lg" className="navBg-set" expanded={expanded} id="siteHeader">
                <Container>

                    <div className='navbar-box'>
                        {/* 左上角 Logo */}
                        <Link to="/BackIndexPage" className='navbarLogo-box'>
                            <img className="navbarLogoImg-set" src={`${import.meta.env.BASE_URL}images/Header/logo.png`} alt="home-section2-1" />
                        </Link>
                        {/* 左上角 Logo */}
                        

                        
                        {/* lg 以上選項區塊 */}
                        <div className="navbarItem-box d-none d-lg-flex">
                            
                            <Nav.Link as={NavLink} to="/BackIndexPage" className="navbarItem-set">後台首頁</Nav.Link>
                            <Nav.Link as={NavLink} to="/UserManagement" className="navbarItem-set">會員管理</Nav.Link>
                            <Nav.Link as={NavLink} to="/OrderManagement" className="navbarItem-set">訂單管理</Nav.Link>
                            <Nav.Link as={NavLink} to="/CustomerMessageManagement" className="navbarItem-set">客戶留言管理</Nav.Link>
                            {/* <button className="testBtn" onClick={()=>{setTestStage(!testStage)}}></button> */}
                        </div>
                        {/* lg 以上選項區塊 */}

                        {/* lg 以上會員頭像 */}
                        {
                            loginState?
                            (
                                <UserDropdown />
                            )
                            :
                            (
                                <button className="userImg-box d-none d-lg-flex"
                                        onClick={()=>{handleLogInModalShow()}}
                                >
                                    <img className="userImg-set" src={`${import.meta.env.BASE_URL}images/Header/log01.png`} alt="log01" />
                                </button>
                            )
                        }
                        
                        {/* lg 以上會員頭像 */}
                        


                        {/* lg 以下的右上角：漢堡選單按鈕 */}
                        <div className="navbarMenuIcon-box d-flex d-lg-none">
                            <button className="MenuIconBtn-set" onClick={()=>{handleOpen()}}>
                                <img className="MenuIconImg-set" src={`${import.meta.env.BASE_URL}images/Header/齒輪.png`} alt="齒輪" />
                            </button>
                        </div>
                        {/* lg 以下的右上角：漢堡選單按鈕 */}
                    </div>
                    
                </Container>
            </Navbar>
            <OffcanvasPage  onOpen={onOpen}
                            handleClose={handleClose}
                            loginState={loginState}
            />
        </>
    )
}

export default Header;

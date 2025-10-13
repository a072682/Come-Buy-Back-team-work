import { useState } from 'react';
import './_UserDropdown.scss';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../slice/loginSlice';
import { useDispatch } from 'react-redux';




function UserDropdown() {

  //#region 
  //#endregion
  
  const [show, setShow] = useState(false);//紀錄是否開啟視窗

  const navigate = useNavigate();//頁面跳轉宣告

  //#region 讀取中央函式前置宣告
      //讀取中央函式前置宣告
      const dispatch = useDispatch();
  //#endregion

  //#region 登出函式
    const handleLogoutUser = async()=>{
      try{
        await dispatch(logoutUser()).unwrap();
        console.log("登出成功");
        setShow(false);
      }catch(error){
        console.log("登出失敗:",error);
      }
    }
  //#endregion

  return (
    <>
      
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        
        <Dropdown.Toggle as="div" className='user-dropdown-toggle'>

            <Nav.Link as="div" className="userItem-set">
                <div className="userItemImg-set textVer">{("admin".trim()?.charAt(0) || '?').toUpperCase()}</div>
            </Nav.Link>

        </Dropdown.Toggle>
        
        <Dropdown.Menu className="userDropdown-list-wrapper">

            <Link className="dropdown-item-set" 
                  onClick={()=>{
                    setShow(false);handleLogoutUser();
                  }}>
                    登出
            </Link>

        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default UserDropdown;

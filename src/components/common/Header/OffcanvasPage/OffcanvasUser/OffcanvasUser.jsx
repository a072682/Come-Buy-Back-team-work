import { useState } from 'react';
import './_OffcanvasUser.scss';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../../slice/loginSlice';


function OffcanvasUser({handleClose}) {
  
  const [openDefault, setOpenDefault] = useState(false);

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
        
        <button className="offcanvasUserItem-set" onClick={() => setOpenDefault(!openDefault)}>
            <div className="userItemImg-set textVer">{("admin".trim()?.charAt(0) || '?').toUpperCase()}</div>
        </button>
        <Collapse in={openDefault}>
            <div className='Collapse-box'>
                <Link className="Collapse-item-set" onClick={()=>{handleClose();handleLogoutUser();}}>
                    登出
                </Link>
            </div>
        </Collapse>
    </>
  );
}

export default OffcanvasUser;

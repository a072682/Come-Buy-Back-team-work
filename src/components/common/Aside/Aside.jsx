import { Link, NavLink } from "react-router-dom";
import './_Aside.scss';
import { Nav } from "react-bootstrap";

function Aside(){



    return(
        <>
            <div className="aside">
                <div className="aside-content">
                    <div className="aside-item-box">
                        <Nav.Link as={NavLink} to="/BackIndexPage" className="asideItem-set">後台首頁</Nav.Link>
                        <Nav.Link as={NavLink} to="/UserManagement" className="asideItem-set">會員管理</Nav.Link>
                        <Nav.Link as={NavLink} to="/OrderManagement" className="asideItem-set">訂單管理</Nav.Link>
                        <Nav.Link as={NavLink} to="/CustomerMessageManagement" className="asideItem-set">客戶留言管理</Nav.Link>
                    </div>
                </div>        
            </div>
        </>
    )
}
export default Aside;
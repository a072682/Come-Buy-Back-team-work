import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";
import Aside from "../components/common/Aside/Aside";
import './_FrontLayout.scss';
import TabMb from "../components/common/TabMb/TabMb";



function FrontLayout(){
    return(
        <>
            <Header />
            <TabMb />
            <div className="before-box"></div>
            <div className="main-box">
                <Aside />
                <div className="Outlet-box">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default FrontLayout;
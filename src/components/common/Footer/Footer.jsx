import { Link } from "react-router-dom";
import './_Footer.scss';

function Footer(){

    const footerContactGroupData = [
        {
            title:"地址",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Location.png`,
            alt:"地址",
            text:"地址：台中市大雅區神仙路1號",
        },
        {
            title:"Email",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Email.png`,
            alt:"Email",
            text:(
                <>
                    come_and_buy@
                    <span className="d-block d-lg-none"></span>
                    comebuy.com
                </>
            ),
        },
        {
            title:"電話",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Phone.png`,
            alt:"電話",
            text:"(04)9408-1688",
        },
        {
            title:"營業時間",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Time.png`,
            alt:"營業時間",
            text:"9:00am - 18:00pm",
        },
    ]

    const footerItemData = [
        {
            title:"線上估價",
            to:"/EstimatePage",
        },
        {
            title:"材料介紹",
            to:"/MateriaPage",
        },
        {
            title:"運費說明",
            to:"/QaPage",
        },
        {
            title:"服務項目",
            to:"/IndexPage",
        },
        {
            title:"公司介紹",
            to:"/AboutusPage",
        },
        {
            title:"聯絡我們",
            to:"/AboutusPage",
        },
        {
            title:"最新消息",
            to:"/IndexPage",
        },
    ]

    const footerIconData = [
        {
            title:"Facebook",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Facebook.png`,
            alt:"Facebook",
        },
        {
            title:"Instagram",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Instagram.png`,
            alt:"Instagram",
        },
        {
            title:"Line",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-Line.png`,
            alt:"Line",
        },
        {
            title:"YouTube",
            img:`${import.meta.env.BASE_URL}images/Footer/footer-YouTube.png`,
            alt:"YouTube",
        },
    ]

    return(
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-content-box">
                                {/* Logo */}
                                <div className="footer-logo">
                                    <Link to="/" className="logo-box">
                                        <picture>
                                            <source srcSet={`${import.meta.env.BASE_URL}images/Footer/footer-sm-logo.png`} media="(max-width:992px)" />
                                            <img
                                                className="logoImg-set" 
                                                src={`${import.meta.env.BASE_URL}images/Footer/footer-logo.png`}
                                                alt="footer-logo"
                                            />
                                        </picture>
                                        <div className="logoText-set">
                                            Come & Buy
                                        </div>
                                    </Link>
                                </div>

                                {/* 主體區域 */}
                                <div className="footerMain-box">
                                    {/* 聯絡資訊 */}
                                    <div className="contact-box">
                                        {
                                            footerContactGroupData?.map((item)=>{
                                                return(
                                                    
                                                        <div key={item.title} className="contactGroup">
                                                            <div className="GroupImg-box">
                                                                <img className="GroupImg-set" src={item.img} alt={item.alt} />
                                                            </div>
                                                            <div className="GroupText-set">
                                                                <p className="m-0">{item.text}</p>
                                                            </div>
                                                        </div>
                                                    
                                                )
                                            })
                                        }
                                    </div>
                                    
                                    <div className="footer-right-box">

                                        {/* 連結導航 */}
                                        <div className="item-box">
                                            {
                                                footerItemData?.map((item)=>{
                                                    return(
                                                        
                                                            <Link key={item.title} className="item-set" to={item.to}>
                                                                {item.title}
                                                            </Link>
                                                        
                                                    )
                                                })
                                            }
                                        </div>

                                        {/* 社群媒體 */}
                                        <div className="footerIcon-box">
                                            {
                                                footerIconData?.map((item)=>{
                                                    return(
                                                        
                                                            <div key={item.title} className="footerIconImg-box">
                                                                <img className="footerIconImg-set" src={item.img} alt={item.alt} />
                                                            </div>
                                                        
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    
                                </div>

                                {/* 版權聲明 */}
                                <div className="CopyrightNotice-set">
                                    Come_and_Buy © 2021, In Here. All Rights Reserved. 隱私權政策
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;
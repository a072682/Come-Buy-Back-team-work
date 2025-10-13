
import { Nav } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import './_TabMb.scss';
import { NavLink } from 'react-router-dom';


function TabMb (){

    const tabdata = [
        {
            title:"後台首頁",
            key:"/BackIndexPage",
            disabled: false,
        },
        {
            title:"會員管理",
            key:"/UserManagement",
            disabled: false,
        },
        {
            title:"訂單管理",
            key:"/OrderManagement",
            disabled: false,
        },
        {
            title:"客戶留言管理",
            key:"/CustomerMessageManagement",
            disabled: false,
        },
    ]

    return(
        <>
            {/* Tab-手機板 選單區 */}
            <div className='tabMb'>
                <div className='tab-mb-btn-box'>
                    <span className="material-symbols-outlined tab-mb-btnR">
                        keyboard_arrow_right
                    </span>
                    <span className="material-symbols-outlined tab-mb-btnL">
                        keyboard_arrow_left
                    </span>
                </div>
                <div className='tab-mb-swiper'>
                    <Swiper
                        className='w-100'
                        modules={[ Navigation, ]}
                        slidesPerView={3}
                        navigation={{ prevEl: ".tab-mb-btnL", nextEl: ".tab-mb-btnR" }}
                        loop={true}
                        spaceBetween={0}
                        breakpoints={{
                            576: { 
                                slidesPerView:4,
                                loop:false,
                            },
                        }}
                        >
                        {
                            tabdata?.map((item)=>{
                                return(
                                    
                                        <SwiperSlide key={item.key}>
                                            
                                            <Nav.Link   className={`tab-mb-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                        to={item.key}
                                                        as={NavLink}
                                                        aria-disabled={item.disabled} 
                                                        eventKey={item.key}>
                                                {item.title}
                                            </Nav.Link>
                                            
                                        </SwiperSlide>
                                    
                                )
                                
                            })
                        }
                    </Swiper>
                </div>
            </div>
            {/* Tab-手機板 選單區 */}
        </>
    )
}
export default TabMb;

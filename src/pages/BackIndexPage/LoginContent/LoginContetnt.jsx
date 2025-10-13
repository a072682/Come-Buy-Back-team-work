import { useEffect, useId, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './_LoginContetnt.scss';
import { checkLogin, loginUser } from "../../../slice/loginSlice";







function LoginContetnt (){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginEmail = useId();       // 例如: :r1:-email
    const loginPassword = useId();    // 例如: :r1:-password

    //#region 帳號資料初始狀態
        //帳號資料初始狀態
            const [account,setAccount]=useState({
                email:"",
                password:""
            });
        //帳號資料初始狀態
    //#endregion

    //#region 帳號資料輸入處理
        //帳號資料輸入處理
            const handleInputChange = (event)=>{
                const{ value, name }= event.target;
                setAccount({
                    ...account,
                    [name]:value
                })
            }
        //帳號資料輸入處理
    //#endregion

    //#region 宣告錯誤訊息狀態
        const [emailErrorMsg,setEmailErrorMsg] = useState("");
        useEffect(()=>{},[emailErrorMsg]);
        const [passWordErrorMsg,setPassWordErrorMsg] = useState("");
        useEffect(()=>{},[passWordErrorMsg]);
        const [errorMsg,setErrorMsg] = useState("");
        useEffect(()=>{},[errorMsg]);
    //#endregion

    //#region 確認錯誤訊息函式
        const errorsMsgCheck = () => {
            // 先清空舊錯誤
            setEmailErrorMsg('');
            setPassWordErrorMsg('');

            let ok = true;

            const email = (account?.email ?? '').toString().trim();
            const passWord  = (account?.password ?? '').toString().trim();

            if (!email) {
                setEmailErrorMsg('請填寫信箱');
                ok = false;
            }else if(email.length < 6){
                setEmailErrorMsg('信箱至少需 6 碼');
                ok = false;
            }

            if (!passWord) {
                setPassWordErrorMsg('請填寫新密碼');
                ok = false;
            }else if(passWord.length < 6){
                setPassWordErrorMsg('密碼至少需 6 碼');
                ok = false;
            }

            return ok;  // ✅ 回傳是否通過
        };
    //#endregion

    //#region 會員登入函式
        //會員登入函式
        const handleLogin = async(event)=>{

            event.preventDefault();

            // 有錯就中斷，不要送出
            if (!errorsMsgCheck()){
                return; 
            }
            // 有錯就中斷，不要送出
            try{
                await dispatch(loginUser(account)).unwrap();
                // console.log("成功登入:", data);
                await dispatch(checkLogin()).unwrap();
                //前端使用.unwrap() 配合後端 rejectWithValue搭配使用
                setAccount({
                    email:"",
                    password:""
                });
                setEmailErrorMsg("");
                setPassWordErrorMsg("");
                setErrorMsg("")
            }catch(error){
                console.log("登入失敗",error);
                setErrorMsg(error.error);
            }
        }
        //會員登入函式
    //#endregion

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <form onSubmit={handleLogin} className="LoginForm-set">                      
                            <div className="emailGroup">
                                <label htmlFor={loginEmail}>Email address</label>
                                <input  value={account.email} 
                                        onChange={handleInputChange} 
                                        name="email" 
                                        type="email" 
                                        className="form-item" 
                                        id={loginEmail}
                                        placeholder="name@example.com" 
                                        autoComplete="email"
                                />
                                {emailErrorMsg && <div className="text-danger mt-1">{emailErrorMsg}</div>}
                            </div>
                            
                            <div className="passWordGroup">
                                <label htmlFor={loginPassword}>Password</label>
                                <input  value={account.password} 
                                        onChange={handleInputChange} 
                                        name="password" 
                                        type="password" 
                                        className="form-item" 
                                        id={loginPassword} 
                                        placeholder="Password" 
                                        autoComplete="password"
                                />
                                {passWordErrorMsg && <div className="text-danger mt-1">{passWordErrorMsg}</div>}
                            </div>

                            <div className="submitBtnGroup">
                                {errorMsg && <div className="text-danger mt-1">{errorMsg}</div>}
                                <button type="onSubmit" className="formBtn-set">登入</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default LoginContetnt;
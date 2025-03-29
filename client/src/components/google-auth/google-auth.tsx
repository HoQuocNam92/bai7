import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from '@context/AuthContext';
const GoogleAuth = ()=>{
    const [searchParams] = useSearchParams();
    const {LoginWithGoogle} =useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
       const Login = async()=>{
        const token = searchParams.get("token");
        const userString  = searchParams.get("user");
        if(token && userString ) {
            const user = JSON.parse(decodeURIComponent(userString));
             await LoginWithGoogle(user , token);
        }
        navigate("/")
       }
       Login()
    },[])



return <p>Đang đăng nhập với Google ....</p>



}

export default GoogleAuth;
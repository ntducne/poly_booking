import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { cookies } from "../../config/cookie";
import { convertFromNowToSeconds } from "../../config/convertDate";
import { message } from "antd";
export default function GoogleCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    React.useEffect(() => {
        if(!location.search) navigate('/auth/login');
        if(location.search) navigate('/auth/social/callback');
        fetch(`${import.meta.env.VITE_URL_AUTH}/callback/google/${location.search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(values => {
            if(values.status === true){

                cookies().Set(
                    "userInfo",
                    JSON.stringify(Object.values(values)),
                    convertFromNowToSeconds(values.accessToken.expires_at)
                    );
            }
            if(values.status === false){
                message.error(values.message);
                navigate('/auth/login')
            }
        })
    }, [location.search]);
    return <></>
}
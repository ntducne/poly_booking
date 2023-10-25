import React from 'react'
import { useCookies } from 'react-cookie'
// import { useNavigate } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

export default function IsLogin({ children }: Props) {
    // const navigate = useNavigate()
    const [cookies] = useCookies(['userInfo']);
    console.log(cookies)
    // useEffect(() => {
    //     if (!cookies?.userInfo?.accessToken) navigate("/auth/login")
    // }, [cookies])
    return (
        <div>
            {children}
        </div>
    )
}
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

type Props = {
    children: React.ReactNode
}

export default function IsLogin({ children }: Props) {
    const navigate = useNavigate()
    const user = useAppSelector((state: any) => state.user)

    useEffect(() => {
        // console.log(user)
        if (user.isLogin) {
            navigate("/")
        } else {
            navigate("/auth/login")
        }
    }, [user.isLogin])
    return (
        <div>
            {children}
        </div>
    )
}
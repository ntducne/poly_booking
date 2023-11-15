import { Outlet } from 'react-router-dom'
import HeaderAuth from './Header'

type Props = {}


export default function LayoutAuth({ }: Props) {
    return (
        <div>
            <HeaderAuth />
            <Outlet />
        </div>
    )
}
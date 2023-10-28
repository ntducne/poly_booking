import { useCookies } from "react-cookie";

export const BookingRepository = () => { 
    const [cookies] = useCookies();
    const token = cookies.userInfo.token
    const process = async (data: any) => { 

    }
    
}
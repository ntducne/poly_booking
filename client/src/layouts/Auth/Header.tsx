import { HomeOutlined } from "@ant-design/icons"
import { useState } from "react"
import { Link } from "react-router-dom"



export default function HeaderAuth() {
    const [header] = useState(true)
    return (
        <div className={`bg-white shadow-lg py-[3px] px-[50px] top-0 z-40 w-full transition-all duration-300 ${header ? 'relative' : 'absolute'}`}>
            <div className="container mx-auto lg:flex-row lg:justify-between lg:gap-y-0 flex justify-between ">
                <div className={`flex gap-5 items-center ${header ? 'relative' : 'absolute'}`}>
                    <Link to=''>
                        <img className='w-[90px]' src={"https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png"} />
                    </Link>
                    <div className={`${header ? "text-dark py-6" : "text-white  py-4"} lg:flex gap-2 lg:gap-x-8 md:tracking-[3px] tracking-[1px] md:text-[15px] items-center hidden`}>

                    </div>
                </div>
                <div className={`${header ? "text-dark py-6" : "text-white  py-4"} flex gap-2 lg:gap-x-8 md:tracking-[3px] tracking-[1px] md:text-[15px] items-center `}>
                    <Link to='/' className='relative transition text-[16px] flex items-center gap-x-2 group'>
                        <HomeOutlined className='text-[15px] mb-1' />
                        <span>
                            Quay lại trang chủ
                        </span>
                        <span className="absolute left-0 w-0 bg-black h-0 bottom-[1%] transition-all duration-300 group-hover:w-full group-hover:h-[1px] "></span>
                    </Link>
                </div>
            </div>
        </div>

    )
}


import { BarsOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/2587107.png';

type Props = {}



export default function Header({ }: Props) {
  const [header, setHeader] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    })
  })
  return (
    <div className={`${header ? 'bg-white shadow-lg py-[3px]' : 'bg-transparent py-[3px]'} fixed px-[50px] top-0 z-40 w-full transition-all duration-300`}>
      <div className="container mx-auto lg:flex-row lg:justify-between lg:gap-y-0 flex justify-between">
        {/* logo */}
        <div className='flex gap-5 items-center '>

          <Link to=''>
            {header ? <img className='w-[90px]' src={"https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png"} />
              :
              <img className='w-[90px]' src={"https://res.cloudinary.com/dteefej4w/image/upload/v1696338751/logo_31_olx95j.png"} />}
          </Link>


          <div className={`${header ? "text-dark py-6" : "text-white  py-4"} lg:flex gap-2 lg:gap-x-8 md:tracking-[3px] tracking-[1px] md:text-[15px] 
          items-center hidden 
          `}>
            <Link to='/' className='relative transition text-[16px] group'>
              Trang chủ
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
            <Link to='/rooms' className='relative transition text-[16px] group'>
              Phòng
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
            <Link to='/contact' className='relative transition text-[16px] group'>
              Liên hệ
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
            <Link to='/about' className='relative transition text-[16px] group'>
              Về chúng tôi
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
          </div>
        </div>

        <div className={`${header ? "text-dark py-6" : "text-white  py-4"} flex gap-2 lg:gap-x-8 md:tracking-[3px] tracking-[1px] md:text-[15px] 
          items-center
          `}>
          <Link to='auth/login' className='relative transition text-[16px] flex items-center gap-x-2 group'>
            <LockOutlined className='text-[15px] mb-1' />
            <span>
              Đăng nhập
            </span>
            <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
          </Link>
          <Link to='' className='relative transition text-[16px] flex items-center gap-x-2 group lg:hidden'>
            <BarsOutlined className='text-[22px]' />
          </Link>

        </div>
      </div>
    </div>
  )
}
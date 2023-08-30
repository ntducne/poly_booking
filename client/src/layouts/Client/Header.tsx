import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
type Props = {}

export default function Header({ }: Props) {
  const [header, setHeader] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    })
  })
  return (
    <div className={`${header ? 'bg-white shadow-lg' : 'bg-transparent  '} fixed px-[50px] top-0 z-50 w-full transition-all duration-300`}>
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* logo */}
        <Link to=''>
          {header ? <img className='w-[100px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/480px-Android_O_Preview_Logo.png' />
            :
            <img className='w-[100px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/480px-Android_O_Preview_Logo.png' />}
        </Link>


        <div className={`${header ? "text-dark py-6" : "text-white"} flex gap-x-4 lg:gap-x-8 font-extralight tracking-[3px] text-[12px]  md:text-[15px] 
        items-center uppercase 
        `}>
          <Link to='' className='hover:text-red-500 transition'>
            Trang chủ
          </Link>
          <Link to='' className='hover:text-red-500 transition'>
            Phòng
          </Link>
          <Link to='' className='hover:text-red-500 transition'>
            Liên hệ
          </Link>
          <Link to='' className='hover:text-red-500 transition flex'>
            <UserOutlined />
          </Link>

        </div>
      </div>
    </div>
  )
}
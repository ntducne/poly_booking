import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/2587107.png';

type Props = {}


const items: MenuProps['items'] = [
  {
    label: <Link className=' block px-3 py-[3px]' to=''>Thông tin</Link>,
    key: '0',
  },
  {
    label: <Link to='' className='block px-3 py-[3px]'>Phòng đã đặt</Link>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to='' className='block px-3 py-[3px]'>Đăng xuất</Link>,
    key: '3',
  },
];

export default function Header({ }: Props) {
  const [header, setHeader] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    })
  })
  return (
    <div className={`${header ? 'bg-white shadow-lg py-4' : 'bg-transparent py-4'} fixed px-[50px] top-0 z-40 w-full transition-all duration-300`}>
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* logo */}
        <Link to=''>
          {header ? <img className='w-[100px]' src={Logo} />
            :
            <img className='w-[100px]' src={Logo} />}
        </Link>


        <div className={`${header ? "text-dark py-6" : "text-white  py-4"} flex gap-x-4 lg:gap-x-8 font-extralight md:tracking-[3px] tracking-[1px] text-[12px]  md:text-[15px] 
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
            <Dropdown className='' menu={{ items }} trigger={['click']}>
              <UserOutlined />
            </Dropdown>
          </Link>

        </div>
      </div>
    </div>
  )
}
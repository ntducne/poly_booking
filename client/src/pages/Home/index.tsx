import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImgHome from '../../assets/images/Home/view.jpg'
type Props = {}

export default function Home({ }: Props) {
  const [bg, setBg] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 390 && window.scrollY < 900 ? setBg(true) : setBg(false)
    })
  })
  return (
      <div className={`py-[80px] lg:py-[70px]  ${bg ? 'bg-[#202020]' : 'bg-white'} h-[10000px]  transition-all duration-300`}>
        <div className="flex flex-col justify-center items-center lg:flex-row ">
          <div className='relative inline-block'>
            <img src={ImgHome} className='md:max-w-[780px] rounded lg:translate-x-[-20%]' alt="" />
            <div className='lg:absolute hidden lg:block lg:top-1/2 lg:right-[-25%] lg:transform lg:-translate-y-1/2
             text-white'>
              <div className='mb-5'>
                <span className=''>For luxury seekers</span>

              </div>
              <h2 className='max-w-[383px] text-[40px] '>Discover a hotel that defines a new dimension of luxury. Emotional luxury.</h2>
              <Link to='#' className='underline text-[24px]'>Views More</Link>
            </div>

          </div>
          <div className='text-white mt-[30px] flex flex-col lg:hidden items-center'>
              <div className='mb-5'>
                <span className=''>For luxury seekers</span>

              </div>
              <h2 className='max-w-[383px] text-[25px] text-center'>Discover a hotel that defines a new dimension of luxury. Emotional luxury.</h2>
              <Link to='#' className='underline text-[24px] mt-[30px]'>View More</Link>
            </div>
        </div>
      </div>
  )
}
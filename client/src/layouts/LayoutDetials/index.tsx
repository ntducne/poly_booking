import { Outlet } from 'react-router-dom'

import HeroSlide from '../../components/HeroSlide'
import Footer from '../Client/Footer'
import Header from '../Client/Header'

type Props = {}


export default function LayoutDetial({ }: Props) {
  return (
    <div>
      <Header />

      <HeroSlide />

      <div className='h-[1500px] lg:mt-[100px]'>

        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
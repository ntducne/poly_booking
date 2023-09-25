import React from 'react'
import { Outlet } from 'react-router-dom'

import HeroSlide from '../../components/HeroSlide'
import BookForm from '../../components/BookForm'
import Header from '../Client/Header'
import Footer from '../Client/Footer'

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
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HeroSlide from '../../components/HeroSlide'
import BookForm from '../../components/BookForm'

type Props = {}


export default function LayoutClient({ }: Props) {
  return (
    <div>
      <Header />

      <HeroSlide />
      <BookForm />
      <Outlet />
      <Footer />
    </div>
  )
}
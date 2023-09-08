import { Outlet } from 'react-router-dom'
import BookForm from '../../components/BookForm'
import Footer from './Footer'
import Header from './Header'

type Props = {}


export default function LayoutClient({ }: Props) {
  return (
    <div>
      <Header />
<<<<<<< .merge_file_e3ca3a
=======

      {/* <HeroSlide />
      <BookForm /> */}
>>>>>>> .merge_file_CIRGVf
      <Outlet />
      <Footer />
    </div>
  )
}
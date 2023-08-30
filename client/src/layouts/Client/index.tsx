import { Outlet } from 'react-router-dom'
import BookForm from '../../components/BookForm'
import Footer from './Footer'
import Header from './Header'

type Props = {}


export default function LayoutClient({ }: Props) {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
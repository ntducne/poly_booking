import { motion, useScroll } from "framer-motion"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

type Props = {}


export default function LayoutClient({ }: Props) {
  const { scrollYProgress } = useScroll();
  return (
    <div>
      {/* <motion.div
        className="fixed top-0 z-100 left-0 right-0 h-[5px] mb-[10px] origin-left bg-pink-600 z-50"
        style={{ scaleX: scrollYProgress }}
      /> */}
      <Header />

      {/* <HeroSlide />
      <BookForm /> */}
      <Outlet />
      <Footer />
    </div>
  )
}
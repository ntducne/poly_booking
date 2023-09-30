import { Link } from 'react-router-dom'
import Room1 from '../../assets/images/Home/ViewRooms/Room1.jpg'
import Room2 from '../../assets/images/Home/ViewRooms/Room2.jpg'
import Room3 from '../../assets/images/Home/ViewRooms/Room3.jpg'
type Props = {}

export default function RoomsView({ }: Props) {
  return (
    <div className='mt-[100px] px-4'>
      <div className='flex justify-center mb-[60px]'>
        <h2 className='text-normal text-center text-[#202020] max-w-[600px] font-text font-light'>
          Tune Hotels tells potential customers what they can expect when they visit – a beautiful and luxurious 5-star sleeping experience, at a very affordable 1-star price.
        </h2>
      </div>
      <div className='flex justify-center flex-col md:flex-row gap-[30px] md:gap-3'>
        <Link to='' className='relative group'>
          <img src={Room1} className='w-full md:max-w-[350px] object-cover h-[450px]' alt="" />
          <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
            <h3 className='text-[30px] font-text_2nd text-center'>Deluxe Suite</h3>
            <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100'>
              "Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped."
            </p>

          </div>
        </Link>
        <Link to='' className='relative group'>
          <img src={Room2} className='w-full md:max-w-[350px] object-cover h-[450px]' alt="" />
          <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
            <h3 className='text-[30px] font-text_2nd text-center'>Deluxe Suite</h3>
            <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
              "Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped."
            </p>

          </div>
        </Link>
        <Link to='' className='relative group'>
          <img src={Room3} className='w-full md:max-w-[350px] object-cover h-[450px]' alt="" />
          <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
            <h3 className='text-[30px] font-text_2nd text-center'>Deluxe Suite</h3>
            <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
              "Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped."
            </p>

          </div>
        </Link>

      </div>
    </div>
  )
}
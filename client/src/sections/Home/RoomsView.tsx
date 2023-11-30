import { Link } from 'react-router-dom'
import Room1 from '../../assets/images/Home/ViewRooms/Room1.jpg'
import Room2 from '../../assets/images/Home/ViewRooms/Room2.jpg'
import Room3 from '../../assets/images/Home/ViewRooms/Room3.jpg'
type Props = {}

export default function RoomsView({ }: Props) {
  return (
    <div className='mt-[100px] px-4'>
      <div className='flex justify-center mb-[60px]'>
        <h2 className='text-normal text-center text-[#202020] max-w-[600px] font-text_roboto font-light'>
          PolyDev Hotels cho khách hàng tiềm năng biết những gì họ có thể mong đợi khi ghé thăm – trải nghiệm ngủ 5 sao đẹp và sang trọng với mức giá 1 sao rất phải chăng.        </h2>
      </div>
      <div className='flex justify-center flex-col md:flex-row gap-[30px] md:gap-3'>
        <Link to='' className='relative group'>
          <img src={Room1} className='w-full md:max-w-[350px] object-cover h-[450px]' alt="" />
          <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
            <h3 className='text-[30px] font-text_2nd text-center'>Lôi cuốn </h3>
            <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100'>
              "Không gian sang trọng và lôi cuốn. Ánh đèn mềm mại nổi bật trong từng góc phòng, kết hợp cùng với nghệ thuật trang trí tinh tế, tạo nên không khí huyền bí và lôi cuốn khó cưỡng."
            </p>

          </div>
        </Link>
        <Link to='' className='relative group'>
          <img src={Room2} className='w-full md:max-w-[350px] object-cover h-[450px]' alt="" />
          <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
            <h3 className='text-[30px] font-text_2nd text-center'>Ưu đãi</h3>
            <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
              "Hãy đắm chìm trong thế giới spa tuyệt vời, thưởng thức những món ăn ngon tuyệt vời tại nhà hàng sang trọng, hoặc trải nghiệm các gói dịch vụ đặc biệt mà chúng tôi dành riêng cho bạn."</p>

          </div>
        </Link>
        <Link to='' className='relative group'>
          <img src={Room3} className='w-full md:max-w-[350px] object-cover h-[450px]' alt="" />
          <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
            <h3 className='text-[30px] font-text_2nd text-center'>Lịch lãm</h3>
            <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
              "Thiết kế nội thất tinh tế được chăm chút đến từng chi tiết, từ các tác phẩm nghệ thuật sang trọng treo trên tường đến những đèn trang trí sáng tạo. Sự kết hợp của các yếu tố hiện đại và cổ điển tạo ra một không gian tràn ngập lịch lãm và phong cách."
            </p>
          </div>
        </Link>

      </div>
    </div>
  )
}
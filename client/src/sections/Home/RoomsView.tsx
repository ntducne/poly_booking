import { Link } from "react-router-dom";
import Room1 from "../../assets/images/Home/ViewRooms/Room1.jpg";
import Room2 from "../../assets/images/Home/ViewRooms/Room2.jpg";
import Room3 from "../../assets/images/Home/ViewRooms/Room3.jpg";
type Props = {};
import { MdBed } from "react-icons/md";

export default function RoomsView({ }: Props) {
  return (
    <div className="mt-[100px] px-4">
      <div className="flex justify-center mb-[60px]">
        <h2 className="text-[40px] flex flex-col items-center text-[#202020] max-w-[600px] font-text_2nd font-bold">
          <p>
            <MdBed className="text-[50px]" />
          </p>
          <p>Về chúng tôi</p>
        </h2>
      </div>
      <div className="flex justify-center flex-col md:flex-row gap-[30px] md:gap-3">
        <Link to="" className="relative group">
          <img
            src={Room1}
            className="w-full md:max-w-[350px] object-cover h-[450px]"
            alt=""
          />
          <div className="absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white">
            <h3 className="text-[30px] font-text_2nd text-center">
              Sang trọng
            </h3>
            <p
              className="text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100"
            >
              "Khách sạn chúng tôi tự hào là điểm đến sang trọng, nơi mang đến không gian lưu trú đẳng cấp với thiết kế và trang trí độc đáo, tạo nên trải nghiệm sang trọng và tiện nghi."
            </p>
          </div>
        </Link>
        <Link to="" className="relative group">
          <img
            src={Room2}
            className="w-full md:max-w-[350px] object-cover h-[450px]"
            alt=""
          />
          <div className="absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white">
            <h3 className="text-[30px] font-text_2nd text-center">
              Tiện ích đa dạng
            </h3>
            <p
              className="text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 "
            >
              "Với một loạt các tiện nghi và dịch vụ đa dạng như nhà hàng 5 sao, spa, và hồ bơi tiêu chuẩn quốc tế, khách sạn chúng tôi mang đến cho du khách trải nghiệm đắm chìm trong sự thoải mái và tiện lợi."
            </p>
          </div>
        </Link>
        <Link to="" className="relative group">
          <img
            src={Room3}
            className="w-full md:max-w-[350px] object-cover h-[450px]"
            alt=""
          />
          <div className="absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white">
            <h3 className="text-[30px] font-text_2nd text-center">
              Thân thiện
            </h3>
            <p
              className="text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 "
            >
              "Khách sạn chúng tôi chào đón bạn với không khí ấm cúng và sự thân thiện đầy tràn từ đội ngũ nhân viên. Từ lúc bạn bước vào lễ tân cho đến lúc bạn rời đi, mỗi cử chỉ đều được chăm sóc tận tình, tạo nên một cảm giác như bạn đang ở nhà."
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

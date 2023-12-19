import { Link } from "react-router-dom";
import FormatPrice from "../../utils/FormatPrice";

export default function Room(props: any) {
  const {
    name,
    adults,
    children,
    description,
    num_of_bed,
    slug,
    branch,
    room_empty,
    price,
    discount,
    images,
    image,
  } = props?.data;
  return (
    <div className="bg-bgr overflow-hidden max-w-[804px] shadow-lg">
      <div className="lg:hidden block">
        <Link to={`/rooms/${slug}`}>
          <img
            className="group-hover:scale-110 transition-all duration-300 w-full"
            src={images?.[0]?.image ?? image}
            alt=""
          />
        </Link>

        <div className="mt-5 px-5">
          <div>
            <Link to={`/rooms/${slug}`}>
              <h3 className="text-h3 mb-[5px] font-bold overflow-hidden font-text_2nd">
                {name}
              </h3>
            </Link>
            <span className="text-gray-500">Great for families</span>
          </div>
          <div className="text-[16px] flex flex-col gap-3 text-text mt-[25px] text-gray-500">
            <li>Người lớn: {adults || 1}</li>
            <li>Trẻ em: {children || 2}</li>
            <li>Mô tả: {description}</li>
            <li>Loại giường: Đơn</li>
            <li>Số giường: {num_of_bed}</li>
          </div>
        </div>

        <div className="mt-[20px] px-[20px]">
          <h3>
            <span className="font-bold text-[18px] text-gray-500">
              Giá một đêm:
            </span>{" "}
            <span className="text-[20px] text-gray-500 font-bold">
              <FormatPrice price={price} />
            </span>
          </h3>
        </div>
        <div className="border my-[20px]"></div>
        <div className="flex items-center px-3 pb-[20px]">
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 py-3 
                    text-xs uppercase leading-normal text-white
                    transition duration-150 ease-in-out hover:bg-primary-600 font-bold "
            onClick={() => props?.handleBooking(props.data)}
          >
            Đặt phòng ngay
          </button>
        </div>
      </div>

      <div className="gap-3 w-full lg:flex hidden">
        <Link to={`/rooms/${slug}`} className="max-w-[300px] max-h-[200px]">
          <img
            className="group-hover:scale-110 transition-all duration-300 w-full h-full object-cover"
            src={images?.[0]?.image ?? image}
            alt=""
          />
        </Link>
        <div className="flex gap-2 ">
          <div className="py-2">
            <h1 className="text-[16px] font-bold">{name}</h1>
            <p className="text-[12px] mb-2 italic">Khách sạn</p>
            <p className="text-[13px] overflow-hidden whitespace-nowrap overflow-ellipsis min-w-[350px]">
              {description}
            </p>
            <div className="text-[12px] mt-3 gap-5 text-black w-full">
              <div className="flex flex-wrap max-w-[700px] gap-2">
                <p className="text-center px-4 bg-gray-200 rounded-2xl">
                  {children} trẻ em
                </p>
                <p className="text-center px-4 bg-gray-200 rounded-2xl">
                  {adults} người lớn
                </p>
                <p className="text-center px-4 bg-gray-200 rounded-2xl">
                  Số giường: {num_of_bed}
                </p>
              </div>
            </div>
          </div>
          <div className="h-full w-[1px] bg-gray-200"></div>
          <div className="min-w-[200px] flex flex-col justify-end p-3">
            <p className="text-[16px] text-gray-500 font-bold flex-col flex items-end justify-end mb-3">
              <p className="text-[12px] text-black mt-1">{branch.name}</p>
            </p>
            <p className="text-[16px] text-gray-500 font-bold flex-col flex items-end justify-end">
              <p className="text-[14px] text-gray-400 ">
                <del>
                  {discount > 95 ? (
                    <FormatPrice price={discount} />
                  ) : (
                    discount + "%"
                  )}
                </del>
              </p>

              <FormatPrice price={price} />
              <p className="text-[12px] text-black mt-1">
                Còn {room_empty} phòng
              </p>
            </p>
            <div className="text-right mt-4">
              <button
                type="button"
                className="inline-block rounded bg-primary  
                    text-xs uppercase leading-normal text-white py-2 px-3 
                    transition duration-150 ease-in-out hover:bg-primary-600 font-bold max-w-[150px]"
                onClick={() => props?.handleBooking(props.data)}
              >
                Đặt phòng ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

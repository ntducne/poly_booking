import FormatPrice from '../../utils/FormatPrice'

export default function Room(data: any) {
    const { name, description, area, adults, children, num_of_bed, branch, id } = data?.data
    return (
        <div className='bg-bgr overflow-hidden max-w-[864px]'>
            {/* <Link to={`/rooms/${id}`}> */}
            <img className='group-hover:scale-110 transition-all duration-300 w-full' src={"https://hotellerv1.themegoods.com/cultural/wp-content/uploads/sites/6/2018/09/pic-0203-04.jpg"} alt="" />
            {/* </Link> */}

            <div className='mt-5'>
                <div>
                    <h3 className='text-h3 mb-[5px] font-bold overflow-hidden font-text_2nd'>{name}</h3>
                    <span className='text-gray-500'>Great for families</span>
                </div>
                <div className='text-[16px] flex flex-col gap-3 text-text mt-[25px] text-gray-500'>
                    <li>Người lớn: {adults || 1}</li>
                    <li>Trẻ em: {children || 2}</li>
                    <li>Mô tả: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet molestiae debitis ipsum natus, fugiat labore alias numquam quisquam quo fuga suscipit quam similique rem tempora, quidem eligendi optio consequatur quia.</li>
                    <li>Diện tích: {area} m²</li>
                    <li>Loại giường: Đơn</li>
                    <li>Số giường: 3</li>
                </div>
            </div>
            <div className='mt-[20px]'>
                <h3><span className='font-bold text-[18px] text-gray-500'>Giá một đêm:</span> <span className='text-[20px] text-gray-500 font-bold'><FormatPrice price={1231312312} /></span></h3>
            </div>
            <div className='border my-[32px]'></div>
            <button
                type="button"
                className="inline-block rounded bg-primary px-6 py-3 
                    text-xs uppercase leading-normal text-white
                    transition duration-150 ease-in-out hover:bg-primary-600 font-bold"
            >
                Đặt phòng ngay
            </button>
        </div>
    )
}
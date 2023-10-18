
import HeroSlide from '../../components/HeroSlide'




const Checkout = () => {
    return (
        <div>
            <HeroSlide />

            <div className=' max-w-[973px]  m-auto  h-full pb-16 z-50' >
                <div>
                    <p className='pt-[15px] pb-[15px] '>
                        <span className='text-2xl'>
                            <b>
                                Đặt phòng khách sạn
                            </b>
                        </span>
                    </p>
                    <p className='pt-[15px] pb-[15px]'>
                        Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác trước khi tiến hành thanh toán.
                    </p>
                </div>
                <div className='  flex flex-col lg:flex-row'>

                    <div className='w-full h-full lg:w-[60%] mr-[30px]'>
                        <div className='bg-white max-w-[973px] max-h-[154px] flex p-[16px] rounded-md mb-[32px]'>
                            <div>
                                <img className='min-w-[100px] h-[100px]' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/334a43706b543daaa27995a60d895f2a.png" alt="" />
                            </div>
                            <div className='w-70% ml-[16px]'>
                                <div><span className='text-xl'>
                                    <b>
                                        Đăng nhập hoặc Đăng ký và tận hưởng ưu đãi dành riêng cho thành viên
                                    </b>
                                </span></div>
                                <div className='mt-[20px] text-cyan-400 text-xl font-bold'><a href="">Đăng nhập hoặc đăng ký</a></div>
                            </div>
                        </div>

                        <div className='mb-[32px]'>
                            <div><span className='text-xl'>
                                <b>
                                    Chi tiết liên hệ (cho Vé điện tử/Phiếu xác nhận)
                                </b>
                            </span></div>
                            <div className='bg-white max-w-[973px]  flex p-[16px] rounded-md mt-[16px]'>
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="full_name" className='text-bold'>Full Name</label>
                                                <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 min-w-[530px] bg-gray-50" value="" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="email">Email Address</label>
                                                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 min-w-[530px] bg-gray-50" value="" placeholder="email@domain.com" />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Address / Street</label>
                                                <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 min-w-[280px] bg-gray-50" value="" placeholder="" />
                                            </div>

                                            <div className="md:col-span-2 ml-[100px]">
                                                <label htmlFor="city">City</label>
                                                <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 min-w-[180px] bg-gray-50" value="" placeholder="" />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="country">Country / region</label>
                                                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                    <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                                    <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                    <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 ">
                                                <label htmlFor="state">State / province</label>
                                                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                    <input name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                                    <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                    <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:col-span-1  ml-[24px]">
                                                <label htmlFor="zipcode">Zipcode</label>
                                                <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 min-w-[180px] border mt-1 rounded px-4  bg-gray-50" placeholder="" value="" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <div className="inline-flex items-center">
                                                    <input type="checkbox" name="billing_same" id="billing_same" className="htmlForm-checkbox" />
                                                    <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>





                            </div>
                        </div>

                        <div>
                            <div ><span className='text-xl'>
                                <b>
                                    Yêu cầu đặc biệt
                                </b>
                            </span></div>
                            <div className=' max-w-[973px] max-h-[154px]  rounded-md mb-[32px]'>
                                <div className='p-[8px] bg-slate-100 mt-[16px]'><span >
                                    <b>
                                        Cơ sở lưu trú sẽ cố gắng đáp ứng yêu cầu của bạn dựa trên tình trạng sẵn có.
                                        Lưu ý rằng bạn có thể phải trả thêm phí cho một số yêu cầu và bạn không thể sửa yêu cầu sau khi đã gửi.
                                    </b>
                                </span></div>
                                <div className=' bg-white'>

                                    <div className=" grid gap-4 grid-cols-3 grid-rows-3 p-[16px]">
                                        <div className="flex items-center mr-4 ml-[20px]">

                                            <input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 1</label>

                                        </div>
                                        <div className="flex items-center mr-4">
                                            <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-2-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                                        </div>
                                        <div className="flex items-center mr-4 ">
                                            <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-2-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                                        </div>
                                        <div className="flex items-center mr-4 ml-[20px]">
                                            <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-2-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                                        </div>
                                        <div className="flex items-center mr-4 ">
                                            <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-2-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                                        </div>
                                        <div className="flex items-center mr-4 ">
                                            <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-2-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className='mt-[76px] mb-[36px]'>
                            <div ><span className='text-xl'>
                                <b>
                                    Chính sách hủy đặt phòng
                                </b>
                            </span></div>
                            <div className=' max-w-[973px] max-h-[154px]  rounded-md mb-[32px]'>

                                <div className=' bg-white p-[8px] mt-[16px] font-bold' >

                                    <p>Đặt phòng này không thể hoàn tiền và không thể đổi lịch.</p>

                                </div>
                            </div>
                        </div>

                        <div>
                            <div ><span className='text-xl'>
                                <b>
                                Tiện Ích Bổ Sung cho Kỳ Nghỉ Của Bạn
                                </b>
                            </span></div>
                            <div className=' max-w-[973px] max-h-[154px]  rounded-md mb-[32px]'>
                                <div className='p-[8px] bg-white mt-[16px]'><span >
                                    <div className="flex items-center mr-4 ml-[20px]">

                                        <input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="inline-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bảo hiểm Du lịch Chubb - Hotel Protect</label>

                                    </div>
                                    <p className='pl-[16px] pt-[8px]'>Bảo vệ kỳ nghỉ của Quý khách khỏi rủi ro bị hủy, mất đặt phòng khách sạn, và hơn thế nữa.</p>
                                </span></div>
                                <div className=' bg-white border-t-2 p-[16px]'>

                                    <ul ><li>- Bảo hiểm lên đến tối đa VND 850,000/phòng/đêm cho Quyền lợi Hủy hoặc Gián đoạn Đặt phòng khách sạn.</li>
                                        <li className='pt-[5px]'>- Bảo hiểm lên đến tối đa VND 850,000/phòng/đêm cho Quyền lợi Đặt phòng khách sạn.</li>
                                        <li className='pt-[5px]'>- Bảo hiểm lên đến VND 210,000,000 cho Quyền lợi Tai nạn cá nhân</li>
                                        <li className='pt-[5px]'>- Bảo hiểm lên đến VND 20,000,000 cho Quyền lợi Mất hoặc hư hại hành lý, quần áo và vật dụng cá nhân</li>
                                    </ul >

                                    <div className='pt-[16px] pl-[420px]'>
                                        <p className='font-bold text-xl'> VND43.500</p>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className='mt-[200px]'>
                            <div ><span className='text-xl'>
                                <b>
                                    Chi tiết giá
                                </b>
                            </span></div>
                            <div className=' max-w-[973px] max-h-[154px]  rounded-md mb-[32px]'>
                                <div className='p-[8px] bg-white mt-[16px]'>
                                    <div className='flex'>
                                        <div className='pt-[8px] '>
                                            <h1 className='font-bold text-xl'>Thành tiền</h1>
                                        </div>
                                        <div className='pt-[8px] pl-[320px]'>
                                            <p className='font-bold text-xl'> VND43.500</p>
                                        </div>
                                    </div>
                                    <div className=' flex p-[8px] mt-[8px]'>
                                        <img className='min-w-[30px] max-h-[30px]'  src="https://ik.imagekit.io/tvlk/image/imageResource/2022/09/13/1663036323265-71c4f62650fd2a96cda8cd045e2ab935.webp?tr=h-24,q-75" alt="" />
                                        <p className='pl-[10px] text-cyan-400  font-bold'>
Thuế và phí là các khoản được Traveloka chuyển trả cho khách sạn. Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của Traveloka để được giải đáp</p>
                                    </div>
                                    <div className='border-t-2'>
                                    <div className='flex'>
                                        <div className='pt-[8px] pt-[16px]'>
                                            <h1 className=''>(1x) Deluxe City View (1 đêm)</h1>
                                        </div>
                                        <div className='pt-[8px] pl-[235px] pt-[16px]'>
                                            <p className=''> VND43.500</p>
                                        </div>
                                    </div>
                                    <div className='flex pt-[16px]'>
                                        <div className='pt-[8px] '>
                                            <h1 className=''>Thuế và phí</h1>
                                        </div>
                                        <div className='pt-[8px] pl-[350px] pt-[16px] '>
                                            <p className=''> VND43.500</p>
                                        </div>
                                    </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                        <div className='mt-[100px]'>
                            <button className='min-w-[200px] ml-[380px] bg-cyan-500 rounded-xl h-[60px] mt-[30px] text-2xl font-semibold text-white'><p>Tiếp tục</p></button>
                        </div>

                    </div>
                    <div className='w-full h-full lg:w-[40%]  float-left'>
                        <div className='w-full bg-white '>
                            <div className='text-base p-[8px] tracking-wide  flex'>
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg" alt="" />
                               <div className='pl-[16px]'>
                               <span className='font-bold'>Cozrum Homes - Sonata Residence</span>
                               <p>Cozrum Homes - Sonata Residence</p>
                               </div>
                                
                            </div>
                            <div className='font-mono inline-block  font-black bg-slate-100 p-[16px] flex'>
                                <span className='w-[48%]'>Ngày nhận phòng <strong>12:00 - 12/02/2003</strong></span>
                                <span className='w-[45%]'>Ngày trả phòng <strong>12:00 - 12/02/2003</strong></span>
                            </div>
                            <div className='bg-white p-[16px]'>
                                <div>
                                    <p className='text-xl font-bold'>(1x) Deluxe City View</p>
                                </div>
                                <div>
                                    <div className='grid gap-4 grid-cols-2 grid-rows-2 mt-[10px]'>
                                        <div>Khách phòng</div>
                                        <div>2 khách</div>
                                        <div>Khách phòng</div>
                                        <div>2 khách</div>
                                    </div>
                                    <div className='mt-[10px] flex'>
                                       <div> <img className='min-w-[80px] max-h-[80px] rounded-xl' src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20016842-3078abf5cf90a3ec8b59453f05737775.jpeg?_src=imagekit&tr=h-80,q-40,w-80" 
                                       alt="" /></div>
                                       <div className='p-[8px] ml-[80px]'>
                                            <p >Ko bữa sáng</p>
                                            <p className='pt-[4px]'>Wifi free</p>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Checkout
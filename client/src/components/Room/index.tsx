import { ArrowsAltOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


export default function Room(data: any) {
    const { name, description, area, adults, children, num_of_bed , branch} = data?.data
    console.log(data.data)

    return (
        <div className='bg-bgr group overflow-hidden'>
            <div className='overflow-hidden'>
                <Link to='/'>
                    <img className='group-hover:scale-110 transition-all duration-300 w-full' src={"https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="" />
                </Link>
            </div>
            {/* detail */}
            <div className="bg-bgr shadow-md  max-w-[430px] mx-auto h-[60px]
            -translate-y-1/2 flex justify-center items-center uppercase font-medium tracking-[1px] text-[16px]
            
            ">
                <div className='flex justify-between flex-wrap gap-1 w-[80%]'>
                    <div className='flex items-center gap-x-2'>
                        <div className='text-primary flex items-center'>
                            <ArrowsAltOutlined className='text-[15px]' />
                        </div>
                        <div className='flex gap-x-1 items-center font-text_2nd'>
                            <div>Diện tích</div>
                            <div>{area}</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 '>
                        <div className='text-primary flex items-center'>
                            <UsergroupAddOutlined className='text-[15px]' />
                        </div>
                        <div className='flex gap-x-1 items-center font-text_2nd'>
                            <div>Số người</div>
                            <div>{adults + children}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' font-text_2nd bg-bgr'>
                <div className=' w-full'>
                    <Link to='' className='flex justify-between flex-wrap'>
                        <h3 className='text-h3 font-bold '>{name}</h3>
                        <h3 className='text-h3 font-bold '>112.000.000 vnđ</h3>
                    </Link>
                    <div className='mb-3 text-[20px] flex flex-col md:flex-row justify-between'>
                        <div className='max-w-[250px]'> 
                            <p className='max-w-[300px]'><span className='font-normal text-desc'>{ description.length > 70 ? description?.slice(0,70) + "..." : description}</span></p>
                        </div>
                        <div>
                            <p className='font-bold'>Vị trí: <span className='font-medium'>{branch.address}</span></p>
                            <p className='font-bold'>Diện tích: <span className='font-medium'>Thành phố</span></p>
                            <p className='font-bold'>Số giường: <span className='font-medium'>{num_of_bed}</span></p>
                            <p className='font-bold'>Diện tích: <span className='font-medium'>30m2</span></p>
                        </div>
                    </div>
                </div>
                <div className='mb-5 md:mb-[30px]'>

                    <Link to='/' className='text-normal  font-bold border-b hover:text-[#a27b49] hover:border-b-[#a27b49] transition-all duration-600'>Xem chi tiết</Link>
                </div>
            </div>
        </div>
    )
}
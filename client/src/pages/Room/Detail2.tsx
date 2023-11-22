import { AiOutlineCoffee, AiOutlineRight, AiOutlineShake } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { FaHotel } from 'react-icons/fa'
import { ImManWoman } from 'react-icons/im'
import { MdOutlineKingBed } from 'react-icons/md'
import SlideImages from './Slideimage'
import { motion } from "framer-motion"
import {
    Rating,
    initTE,
} from "tw-elements";
import { useNavigate, useParams } from 'react-router-dom'
import { useGetDetialQuery, usePostRatesMutation } from '../../api/Room'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { Button, Form, Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import FormatPrice from '../../utils/FormatPrice'
import { useProcessReviewMutation } from '../../api/User'


initTE({ Rating });



export default function RoomDetail() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { data } = useGetDetialQuery(slug)
    const [, setCookie, removeCookie] = useCookies(['roomBooking']);

    const [postRate] = usePostRatesMutation()
    const [processReview] = useProcessReviewMutation({})

    const [cookies] = useCookies(['userInfo']);
    const booking = () => {
        console.log(data.room);
        removeCookie('roomBooking', { path: '/' })
        setCookie('roomBooking', data.room, { path: '/' })
        navigate('/demo')
    }

    const onFinish = (values: any) => {
        const valuesRate = {
            ...values,
            room_id: data?.room?.id,
        }
        fetch('http://localhost:8000/user/rate', {
            method: 'POST',
            body: JSON.stringify(valuesRate),
            headers: {
                'Authorization': Bearer ${token},
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    };
        

    };

    const [form] = Form.useForm();
    return (
        <div className='pb-[100px] '>
            {/* <SlideRooms /> */}
            <form action="">


                <div className='h-[600px] lg:h-[860px]'>
                    <div className='text-white h-full bg-pink-300 relative flex items-center justify-center'>
                        <div className='z-20 text-white text-center'>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 105 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                initial="hidden"
                                animate='visible'
                            >
                                <div className='uppercase tracking-[6px] mb-5'>Just enjoy and relax</div>
                                <h1 className='text-[32px] font-extralight uppercase tracking-[3px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>{data?.room?.name}</h1>
                                <button className='btn mx-auto'>Great for business trip</button>
                            </motion.div>
                        </div>
                        <div className='absolute top-0 w-full h-full'>
                            <img src="https://images.pexels.com/photos/5615059/pexels-photo-5615059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='object-cover h-full w-full' />
                        </div>
                        <div className='absolute w-full h-full bg-black/70'></div>
                    </div>
                </div>
                <div className=' max-w-[1425px] bg-white m-auto  h-full pb-16 z-50'
                    style={{
                        transform: 'translateY(-20%)'
                    }}
                >
                    <div className='p-[50px]  flex flex-col lg:flex-row'>
                        <div className='w-full h-full lg:w-[60%] mr-[30px]'>
                            <p className='pt-[15px] pb-[15px] '>
                                <span className='text-2xl'>
                                    <b>
                                        Great choice for a relaxing vacation for families with children or a group of friends.
                                    </b>
                                </span>
                            </p>
                            <p className='pt-[15px] pb-[15px]'>
                                Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum.&nbsp;
                                <em>

                                    <strong>Aliquip veniam delectus, Marfa eiusmod Pinterest</strong>

                                </em>
                                &nbsp;in do umami readymade swag.&nbsp;Selfies iPhone Kickstarter, drinking vinegar jean vinegar stumptown&nbsp;yr pop-up artisan.
                            </p>

                            <p className='pt-[15px] pb-[15px]'>See-through delicate embroidered organza blue
                                lining luxury acetate-mix stretch pleat detailing.
                                Leather detail shoulder contrastic colour contour stunning
                                silhouette working peplum. Statement buttons cover-up tweaks patch
                                pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.
                                Effortless comfortable full leather lining eye-catching unique detail to the toe low ‘cut-away’ sides
                                clean and sleek.&nbsp;Polished finish elegant court shoe work duty stretchy slingback strap mid kitten
                                heel this ladylike design&nbsp;slingback strap mid kitten heel this ladylike design.
                            </p>

                            <p className="pt-[15px] pb-[15px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis erat. Aliquam interdum semper luctus. Aenean ex tellus,
                                gravida ut rutrum dignissim, malesuada vitae nulla. Sed viverra, nisl dapibus lobortis porttitor.</p>
                        </div>
                        <div className='w-full h-full lg:w-[30%] border-s-4 float-left'>
                            <div className='w-full  ml-[50px]'>
                                <div className='text-base font-semibold tracking-wide '>
                                    Form
                                </div>
                                <div className='font-mono text-6xl font-black ml-[50px]'>
                                    <span>{<FormatPrice price={data?.room?.discount}/>}</span>
                                    {/* <span>VNĐ</span> */}
                                </div>
                                <button onClick={() => booking()} className='w-full bg-cyan-500 rounded-xl h-[60px] mt-[30px] text-2xl font-semibold text-white'> <span>Book now</span></button>
                            </div>
                            <div className='w-full  ml-[50px] mt-[30px] '>
                                <div>
                                    <div className='flex'>
                                        <MdOutlineKingBed className='w-[90px] h-[50px]' />
                                        <span className='ml-[50px] text-2xl'>King bed</span>
                                    </div>
                                    <div className='flex mt-[10px]'>
                                        <ImManWoman className='w-[90px] h-[50px] mt-[10px]' />
                                        <span className='ml-[50px] text-2xl mt-[3px]'>
                                            {data?.room?.adults}&nbsp;Adults&nbsp;
                                            {data?.room?.children}&nbsp;Children&nbsp;
                                        </span>
                                    </div>
                                    <div className='flex mt-[10px]'>
                                        <FaHotel className='w-[90px] h-[50px] mt-[10px]' />
                                        <span className='ml-[50px] text-2xl mt-[3px]'>{data?.room?.area}m²</span>
                                    </div>
                                    <div className='flex mt-[10px]'>
                                        <BsFillSunFill className='w-[90px] h-[50px] mt-[10px]' />
                                        <span className='ml-[50px] text-2xl mt-[3px]'>Sea view</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        transform: 'translateY(-26%)'
                    }}
                    className='max-w-full bg-primary text-white m-auto flex flex-col lg:flex-row pt-[80px] pb-[80px]'>
                    <div className='w-full h-full lg:w-[50%] m-auto  flex flex-col lg:flex-row '>
                        <div className='w-full h-full lg:w-[30%] flex text-xl ml-[30%]'>
                            <div><AiOutlineShake className="w-[40px] h-[45px]" /></div>
                            <span className='mt-[5px] ml-[20px] text-2xl font-semibold'>Amenities			</span>
                        </div>
                        <div className='w-full h-full lg:w-[50%]  mt-3'>
                            <div className='flex '>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full lg:w-[50%] flex flex-col lg:flex-row'>
                        <div className='w-full h-full lg:w-[30%] flex text-xl'>
                            <div>
                                <AiOutlineCoffee className="w-[40px] h-[45px]" />
                            </div>
                            <span className='mt-[5px] ml-[20px] font-semibold text-2xl'>Services</span>
                        </div>
                        <div className='w-full h-full lg:w-[50%]  mt-3'>
                            <div className='flex '>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5'>40-inch Samsung® LED TV</span>
                            </div>
                            <div className='flex mt-4'>
                                <div className='mt-1'> <AiOutlineRight /></div>
                                <span className='ml-5 font-light'>40-inch Samsung® LED TV</span>
                            </div>

                        </div>
                    </div>

                </div>
            </form>


            <div className='mt-[-120px]'>
                {/* <SlideImages /> */}
            </div>

            <section className="bg-white py-8 antialiased max-w-[70%] m-auto">
                <div className="w-70% mx-auto px-4">
                    <div className="flex mb-6">
                        <h2 className="lg:text-2xl font-bold text-gray-900 text-3xl">Đánh giá </h2>
                    </div>
                    
                    <article className="text-base bg-white rounded-lg ">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough" />Michael Gough</p>
                                <p className="text-sm text-gray-600 "><time
                                    title="February 8th, 2022">Feb. 8, 2022</time></p>
                            </div>


                            <div id="dropdownComment1"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow ">
                                <ul className="py-1 text-sm text-gray-700 "
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 ">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 ">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 ">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <div className=' mb-2'>

                            <div className="flex items-center space-x-1 ">
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-gray-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </div>

                        </div>
                        <p className="text-gray-500 ">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                            instruments for the UX designers. The knowledge of the design tools are as important as the
                            creation of the design strategy.</p>
                        
                    </article>

                    <div className="flex mb-6 mt-4">
                        <h2 className="lg:text-2xl font-bold text-gray-900 text-3xl">Hãy để lại đánh giá của bạn</h2>
                    </div>
                    <Form className="mb-6" form={form} onFinish={onFinish}>
                        <Form.Item
                            name="rate"
                        >
                            <Rate className="my-1 flex list-none gap-1 p-0 mb-5" onChange={(value) => {
                                console.log(value);

                            }} />
                        </Form.Item>


                        <Form.Item
                            name="comment"
                            rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
                        >
                            <TextArea rows={4} placeholder="Write a comment..." />
                        </Form.Item>

                        <Button
                            htmlType="submit"

                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-500 rounded-xl focus:ring-4 focus:ring-primary-200  hover:bg-primary-800">
                            Post comment
                        </Button>
                    </Form>

                </div>
            </section>
            <div>

            </div>
        </div>


    )
}
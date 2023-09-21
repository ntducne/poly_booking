import React from 'react'
import { AiOutlineWifi } from 'react-icons/Ai'
import { PiCoffee } from 'react-icons/Pi'
import { LuBath } from 'react-icons/Lu'
import { FaParking, FaBreadSlice, FaCheck } from 'react-icons/Fa'
import { TbSwimming } from 'react-icons/Tb'
import { CgGym } from 'react-icons/Cg'
import BookForm from '../../components/BookForm'
import Checkin from './Bookformdetial/checkin'
import Checkout from './Bookformdetial/checkout'
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Space
} from 'antd';
import HeroSlide from '../../components/HeroSlide'
import SlideImages from './Slideimage'
import Room from '../../components/Room'
type Props = {}

const Detail = (props: Props) => {
    return (
        <div className='pb-[100px]'>
            <HeroSlide />
            <div className='container mx-auto'>

                <div className='flex flex-col lg:flex-row h-full py-24 '>
                    <div className='w-full h-full lg:w-[60%] px-6 '>
                        <h2 className='mb-4 text-4xl tracking-tight font-extrabold  text-gray-900 dark:text-white'>
                            Great choice for a relaxing vacation for families with children or a group of friends.
                        </h2>
                        <p className=' lg:mb-16 font-light  text-gray-500 dark:text-gray-400 sm:text-xl'>
                            Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed.
                            Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum.
                            Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami readymade swag.
                            Selfies iPhone Kickstarter, drinking vinegar jean vinegar stumptown yr pop-up artisan.
                        </p>
                        <p className='mb-8 lg:mb-16 font-light  text-gray-500 dark:text-gray-400 sm:text-xl'>
                            See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing.
                            Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement
                            buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching
                            cropped jacket. Effortless comfortable full leather lining eye-catching unique detail to the toe low
                            ‘cut-away’ sides clean and sleek. Polished finish
                            elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design slingback strap mid kitten heel this ladylike design.
                        </p>
                        <img className='mb-8' src="https://www.duyenharesorts.com/Data/Sites/1/News/103/lnom2253.jpg" alt="" />
                        <div className='mt-12'>
                            <h3 className='h3 mb-3 text-3xl font-extrabold'>
                                Tiện nghi phòng
                            </h3>
                            <p className='mb-12'>  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis erat. Aliquam interdum semper luctus.
                                Aenean ex tellus,
                                gravida ut rutrum dignissim, malesuada vitae nulla. Sed viverra, nisl dapibus lobortis porttitor.</p>
                            <div className='grid grid-cols-3 gap-6 mb-12 fonr-text'>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><AiOutlineWifi /></div>
                                    <div className='text-base ml-1'>Wifi</div>
                                </div>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><PiCoffee /></div>
                                    <div className='text-base ml-1'>Coffee</div>
                                </div>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><LuBath /></div>
                                    <div className='text-base ml-1'>Bath</div>
                                </div>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><FaParking /></div>
                                    <div className='text-base ml-1'>Parking</div>
                                </div>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><TbSwimming /></div>
                                    <div className='text-base ml-1'>Swimming</div>
                                </div>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><FaBreadSlice /></div>
                                    <div className='text-base ml-1'>Breakfast</div>
                                </div>
                                <div className='flex items-center -gap-x-3 flex-1 '>
                                    <div className='text-3xl text-accent' ><CgGym /></div>
                                    <div className='text-base ml-1'>Gym</div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='w-full h-full lg:w-[40%]'>
                        <div className='py-8 px-6 bg-yellow-100 mb-12'>
                            <div className='flex flex-col space-y-4 mb-4'>
                                <h3 className='h3 mb-3 text-4xl font-extrabold'>

                                    Đặt phòng của bạn
                                </h3>
                                <div className='h-[60px]'>
                                    <Checkin />
                                </div>
                                <div className='h-[60px]'>
                                    <Checkout />
                                </div>
                                <div className='flex-1 lg:border-r h-[60px]'>

                                    <Form.Item name="Start-end2">
                                        <Select
                                            placeholder='Trẻ nhỏ'
                                            className=''
                                        >
                                            <Select.Option value="1">1</Select.Option>
                                            <Select.Option value="2">2</Select.Option>
                                            <Select.Option value="3">3</Select.Option>
                                            <Select.Option value="4">4</Select.Option>
                                            <Select.Option value="5">5</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='flex-1 lg:border-r h-[60px]'>
                                    <Form.Item name="Start-end2 ">
                                        <Select
                                            placeholder='Người lớn'
                                            className='rounded-none'
                                        >
                                            <Select.Option value="1">1</Select.Option>
                                            <Select.Option value="2">2</Select.Option>
                                            <Select.Option value="3">3</Select.Option>
                                            <Select.Option value="4">4</Select.Option>
                                            <Select.Option value="5">5</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="mb-4">
                                    <button type="button" className=' h-[50px] flex max-w-sm w-full b text-white  
                                    uppercase bg-orange-500 hover:bg-orange-600 font-bold shadow-md rounded-full mx-auto items-center'>

                                        <p className="mx-auto">Dat phong</p>

                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-3xl font-extrabold'>Nội quy phòng</h3>
                            <p className='mb-6 mt-[20px] font-text'>
                                The spacious room is decorated with modern furnishings and luxurious amenities,
                                offering skyline view from the balcony
                            </p>
                            <ul className='font-text'>
                                <li className='flex items-center gap-x-4'>
                                    <FaCheck />
                                    Check-in : 3:00 PM - 9:00 PM
                                </li>
                                <li className='flex items-center gap-x-4 mt-2'>
                                    <FaCheck />
                                    Check-out : 10:00 AM
                                </li>
                                <li className='flex items-center gap-x-4 mt-2'>
                                    <FaCheck />
                                    No Pets
                                </li>
                                <li className='flex items-center gap-x-4 mt-2'>
                                    <FaCheck />
                                    No Smoking
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
            <div>
                <SlideImages />
            </div>
         
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased w-70%">
                <div className="w-70% mx-auto px-4">
                    <div className="flex   mb-6">
                        <h2 className="lg:text-2xl font-bold text-gray-900 text-3xl dark:text-white">Discussion (20)</h2>
                    </div>
                    <form className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment" rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Post comment
                        </button>
                    </form>
                    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough"/>Michael Gough</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time 
                                    title="February 8th, 2022">Feb. 8, 2022</time></p>
                            </div>
                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                        
                            <div id="dropdownComment1"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                            instruments for the UX designers. The knowledge of the design tools are as important as the
                            creation of the design strategy.</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="Jese Leos"/>Jese Leos</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time 
                                    title="February 12th, 2022">Feb. 12, 2022</time></p>
                            </div>
                            <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                        
                            <div id="dropdownComment2"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                    alt="Bonnie Green"/>Bonnie Green</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                    title="March 12th, 2022">Mar. 12, 2022</time></p>
                            </div>
                            <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                       
                            <div id="dropdownComment3"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                    alt="Helene Engels"/>Helene Engels</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time 
                                    title="June 23rd, 2022">Jun. 23, 2022</time></p>
                            </div>
                            <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                       
                            <div id="dropdownComment4"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                </div>
            </section>
            <div>

            </div>
        </div>

    )
}

export default Detail
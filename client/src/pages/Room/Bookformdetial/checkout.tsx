import { DatePicker } from 'antd';
import React, { useState } from 'react'
import { BsCalendar } from 'react-icons/Bs'


const Checkout = () => {
    const [startDate, setStartDate] = useState(false);

  return (
    <div className='relatetive flex items-center justify-end h-full'>
        <div className='absolute z-10 pr-8'>
            <div>
                <BsCalendar className='text-accent text-base'/>
            </div>
        </div>
        <DatePicker
            className='w-full h-full'
            selected={startDate}
            placeholderText='Check out'
            onChangge={(date:any) => setStartDate(date)}
        />
    </div>
  )
}

export default Checkout
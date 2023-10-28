import React from 'react'

interface IFormat {
    price: number;
    discount?: number
}

export default function FormatPrice({ price, discount = 0 }: IFormat) {
    return (<span>
        {new Intl.NumberFormat('vi-VN').format(Math.floor(price - (price * discount) / 100))} vnđ
    </span>)
}
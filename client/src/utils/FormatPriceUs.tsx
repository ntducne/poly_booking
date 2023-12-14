import React from "react";

interface IFormat {
  price: number;
  discount?: number;
}

export default function FormatPriceUs({ price, discount = 0 }: IFormat) {
  const exchangeRate = 24000;

  // Tính giá trị trong đơn vị USD
  const priceInUSD = (price - (price * discount) / 100) / exchangeRate;

  // Làm tròn đến 2 chữ số phần thập phân
  const roundedPriceInUSD: any = priceInUSD.toFixed(2);
  return (
    <span>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(roundedPriceInUSD)}{" "}
      USD
    </span>
  );
}

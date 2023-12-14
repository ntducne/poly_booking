import ReactApexChart from "react-apexcharts";

export default function ChartFour(props: any) {
  function generateMonths(count: any) {
    const months = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const month = new Date();
      month.setMonth(today.getMonth() - i);
      months.push(month.toISOString());
    }
    return months;
  }

  const bookingData = props?.data?.booking || [];
  const cancelData = props?.data?.cancel || [];

  const state = {
    series: [
      {
        name: "Đặt phòng",
        type: "line",
        data: bookingData,
      },
      {
        name: "Huỷ đặt phòng",
        type: "line",
        data: cancelData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1],
      },
      xaxis: {
        type: "datetime",
        categories: generateMonths(
          Math.max(bookingData.length, cancelData.length)
        ).reverse(),
        tickAmount: 10,
        labels: {
          formatter: function (timestamp: any) {
            const date = new Date(timestamp);
            return `${date.getMonth() + 1}/${date.getFullYear()}`;
          },
        },
      },
      title: {
        text: "Đặt và Hủy phòng",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      markers: {
        size: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
      },
    },
  } as any;

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}

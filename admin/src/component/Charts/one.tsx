import ReactApexChart from "react-apexcharts";

export default function ChartOne(props: any) {

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
  const dataRevenue = props?.data || [];

  const state = {
    series: [
      {
        name: "Số tiền",
        data: dataRevenue,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: generateMonths(dataRevenue.length).reverse(),
        tickAmount: 10,
        labels: {
          formatter: function (timestamp: any) {
            const date = new Date(timestamp);
            return `${date.getMonth() + 1}/${date.getFullYear()}`;
          },
        },
      },
      title: {
        text: "Doanh thu",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value);
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

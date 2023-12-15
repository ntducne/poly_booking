import ReactApexChart from "react-apexcharts";

export default function ChartFive(props: any) {
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
  const userData = props?.data || [];

  const state = {
    series: [
      {
        name: "User",
        data: userData,
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
        categories: generateMonths(userData.length).reverse(),
        tickAmount: 10,
        labels: {
          formatter: function (timestamp: any) {
            const date = new Date(timestamp);
            return `${date.getMonth() + 1}/${date.getFullYear()}`;
          },
        },
      },
      title: {
        text: "Người dùng",
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
        min: 0,
        max: Math.max(...props.data),
        labels: {
          formatter: function (value: number) {
            return Math.floor(value);
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

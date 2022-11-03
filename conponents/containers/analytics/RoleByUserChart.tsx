import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// @mui
import {Box, Card, CardHeader} from '@mui/material';
// utils
// components
import {useChart} from '../../elements/chart';

// ----------------------------------------------------------------------

//@ts-ignore
export default function RoleByUserChart(props) {
  const {title, subheader, chartData, ...other} = props;

  // @ts-ignore
  const chartLabels = chartData.map((i) => i.name);

  // @ts-ignore
  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: {show: false},
      y: {
        // @ts-ignore
        formatter: (seriesName) => (seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {horizontal: true, barHeight: '28%', borderRadius: 2},
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader}/>

      <Box sx={{mx: 3}} dir="ltr">
        <ReactApexChart type="bar" series={[{data: chartSeries}]} options={chartOptions} height={364}/>
      </Box>
    </Card>
  );
}
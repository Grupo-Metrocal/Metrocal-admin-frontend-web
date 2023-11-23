import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { chartConfigs } from './configs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

type BarChartProps = {
  data: number[]
  labels: string[]
  title: string
  backgroundColors: string[]
}

export const BarChart = ({
  data,
  labels,
  title,
  backgroundColors,
}: BarChartProps) => {
  const datasets = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: backgroundColors,
        barThickness: 30,
        borderRadius: 5,
      },
    ],
  }

  return <Bar data={datasets} options={chartConfigs as any} />
}

export const chartConfigs = {
  responsive: true,
  maintainAspectRatio: false,
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      // sin decimales en el eje Y
      ticks: {
        precision: 0,
      },
    },
  },
}

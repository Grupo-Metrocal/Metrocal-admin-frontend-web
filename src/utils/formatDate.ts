export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric', // 2-digit, numeric
    month: 'short', // 2-digit, numeric, long, short, narrow
    day: 'numeric', // 2-digit, numeric
  })
}

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
}

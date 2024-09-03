export const isDateOutOfRange = (
  dateToCompare: string | Date,
  rangeInDays: number,
): boolean => {
  const currentDate = new Date()
  const compareDate = new Date(dateToCompare)

  const differenceInTime = currentDate.getTime() - compareDate.getTime()

  const differenceInDays = differenceInTime / (1000 * 3600 * 24)

  return Math.abs(differenceInDays) > rangeInDays
}

export const renderValue = (value: any) => {
  if (typeof value === 'object' && value !== null && '_error' in value) {
    return value._error || 'Error'
  }
  return value != null ? value.toString() : ''
}

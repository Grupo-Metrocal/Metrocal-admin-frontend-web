export const formatPrice = (price = 0, fractions = 2) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: fractions,
    maximumFractionDigits: fractions,
  }).format(price)
}

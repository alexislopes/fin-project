export function currency(amount) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(amount))

}

export function percentage(value) {
  return `${Number(value || 0).toFixed(2)}%`
}

export function capitalize(str) {
  if (typeof str === 'string') {
    return str.replace(/^\w/, c => c.toUpperCase());
  } else {
    return '';
  }
};

export const formatDate = (date) => {
  date = new Date(date);
  return `${date.toLocaleString('default', { month: 'short' }).toUpperCase()} ${date.getFullYear()}`
}
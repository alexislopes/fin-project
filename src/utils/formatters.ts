export function currency(amount) {
  return `R$ ${amount}`
}

export function percentage(value) {
  return `${value.toFixed(2)}%`
}

export function capitalize(str)  {
  if(typeof str === 'string') {
      return str.replace(/^\w/, c => c.toUpperCase());
  } else {
      return '';
  }
};
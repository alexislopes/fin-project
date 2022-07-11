export function isSameMonth(timestampA: number, timestampB: number) {
  const dateA = new Date(timestampA);
  const dateB = new Date(timestampB);
  
  return dateA.getMonth() + dateA.getFullYear() === dateB.getMonth() + dateB.getFullYear()
}
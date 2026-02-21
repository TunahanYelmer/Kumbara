export function getMonthYear(date: Date) {
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  };
}
export function getPreviousMonthYear(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  if (month == 0) {
    return { month: 11, year: year - 1 };
  }
  return { month: month - 1, year };
}

export function isSameMonth(date1: Date, month: number, year: number): boolean {
  return date1.getMonth() === month && date1.getFullYear() === year;
}

export function isSameDay(
  taskDate: Date | string,
  selectedDate: Date,
): boolean {
  if (!taskDate || !selectedDate) return false;

  const d1 = new Date(taskDate);
  const d2 = new Date(selectedDate);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return d1.toDateString() === d2.toDateString();
}

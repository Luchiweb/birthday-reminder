export function isTodayBirthday(date: Date): boolean {
  const today = new Date();

  date.setHours(0);
  date.setFullYear(today.getFullYear());

  if (date < today) date.setFullYear(today.getFullYear() + 1);
  return today.getDate() === date.getDate() && today.getMonth() === date.getMonth();
}

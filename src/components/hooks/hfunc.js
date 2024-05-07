export const getCurrentWeekNumber = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek)+1;
  const dayOfWeek = now.getDay() || 7;
  const correctedWeekNumber = dayOfWeek === 1 ? weekNumber + 2 : weekNumber + 1;

  return (
    now.getFullYear() + "-W" + String(correctedWeekNumber).padStart(2, "0")
  );
};

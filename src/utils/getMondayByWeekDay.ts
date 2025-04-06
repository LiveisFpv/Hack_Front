export const getMondayByWeekDay = (weekDate: Date): Date => {
  const mondayDate = new Date(weekDate);
  mondayDate.setDate(mondayDate.getDate() - ((mondayDate.getDay() + 6) % 7));
  return mondayDate;
};

export function* generateWeekDates(mondayDate: Date) {
  for (let index = 0; index < 7; index++) {
    const newDate = new Date(mondayDate);
    newDate.setDate(newDate.getDate() + index);
    yield newDate;
  }
}

const getFullWeekStartingFromSunday = (date) => {
  let days = [];
  let currentDate = new Date(date);
  let currentDay = currentDate.getDay();

  // check if already on Sunday

  if (currentDay === 6) {
    let sunday = new Date(currentDate);
    sunday = sunday.toISOString();
    days.push(sunday);
  } else {
    // go back to Sunday of the week

    while (currentDay !== 0) {
      currentDate.setDate(currentDate.getDate() - 1);
      currentDay = currentDate.getDay();
    }

    // add the sunday to the array
    // had a bug where it was overwitting the array so made a separate var just for sunday
    currentDate.setDate(currentDate.getDate() - 1);
    let Sunday = currentDate.toISOString();
    days.push(Sunday);
  }

  // now go forward to Saturday overwriting "currentDate"
  for (let i = 1; i < 7; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    let currentDateString = currentDate.toISOString();
    days.push(currentDateString);
  }

  return days;
};

// export as module
module.exports = getFullWeekStartingFromSunday;

import { getFullWeekStartingFromSunday } from "../Utils/getFullWeekStartingFromSunday";

let users = {};

const fakeCreateUser = (id, at) => {
  // gets an array of dates going back to Sunday and forward to Saturday
  const days = getFullWeekStartingFromSunday(at);
  let user = users[id];
  // if there is no user just make one
  if (!user) {
    users[id] = {
      rewards: days.map((day) => {
        // set expires to one day from available date
        let expires = new Date(day);
        expires.setDate(expires.getDate() + 1);
        // convert expires to ISO string
        expires = expires.toISOString();

        return {
          availableAt: day,
          redeemedAt: null,
          expiresAt: expires,
        };
      }),
    };
    // if there is a user, check if the date current date is in week range. If not, make a new array
  } else if (user.rewards[0].availableAt != days[0]) {
    user.rewards = days.map((day) => {
      // set expires to one day from available date
      let expires = new Date(day);
      expires.setDate(expires.getDate() + 1);
      // convert expires to ISO string
      expires = expires.toISOString();
      return {
        availableAt: day,
        redeemedAt: null,
        expiresAt: expires,
      };
    });
  }
  // send only this user
  return { [id]: users[id] };
};

export { fakeCreateUser };

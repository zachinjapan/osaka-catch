import { daysOfTheWeek } from "../Utils/daysOfTheWeek";
import { getFullWeekStartingFromSunday } from "../Utils/getFullWeekStartingFromSunday.js";
import { getUsersFromServer } from "../Utils/clientAPIs";
import { fakeCreateUser } from "./fakeAPIRoutes";

///////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

test("the first day of the week array is Sunday", () => {
  expect(daysOfTheWeek[0]).toBe("Sunday");
});

test("given an iso date that is a Sunday the returned array is a full week starting on Sunday", () => {
  const isoDate = "2022-04-03T00:00:00.000Z";
  const expected = [
    "2022-04-03T00:00:00.000Z",
    "2022-04-04T00:00:00.000Z",
    "2022-04-05T00:00:00.000Z",
    "2022-04-06T00:00:00.000Z",
    "2022-04-07T00:00:00.000Z",
    "2022-04-08T00:00:00.000Z",
    "2022-04-09T00:00:00.000Z",
  ];
  expect(getFullWeekStartingFromSunday(isoDate)).toEqual(expected);
});

test("given an iso date that is not a Sunday the function returns an array starting on the Sunday of that week", () => {
  // Monday
  const isoDate = "2022-04-04T00:00:00.000Z";
  const expected = [
    "2022-04-03T00:00:00.000Z",
    "2022-04-04T00:00:00.000Z",
    "2022-04-05T00:00:00.000Z",
    "2022-04-06T00:00:00.000Z",
    "2022-04-07T00:00:00.000Z",
    "2022-04-08T00:00:00.000Z",
    "2022-04-09T00:00:00.000Z",
  ];
  expect(getFullWeekStartingFromSunday(isoDate)).toEqual(expected);
});

///////////////////////////////////////////////////////////////////////////////
// Fake Routes (had issue using Jest with the real server.js)
///////////////////////////////////////////////////////////////////////////////

// /users (GET) gets all users from the server

test("the get users from server function returns an JS object", () => {
  const users = getUsersFromServer();
  expect(typeof users).toBe("object");
});

// /users/1/rewards/at=2022-04-03T00:00:00.000Z (GET) create a new user if one does not exist

test("the fake create user function when given a new user id creates a correct oject", () => {
  const userId = "1";
  const date = "2022-04-03T00:00:00.000Z";
  const user = fakeCreateUser(userId, date);
  expect(user).toEqual({
    1: {
      rewards: [
        {
          availableAt: "2022-04-03T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-04T00:00:00.000Z",
        },
        {
          availableAt: "2022-04-04T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-05T00:00:00.000Z",
        },

        {
          availableAt: "2022-04-05T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-06T00:00:00.000Z",
        },

        {
          availableAt: "2022-04-06T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-07T00:00:00.000Z",
        },

        {
          availableAt: "2022-04-07T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-08T00:00:00.000Z",
        },

        {
          availableAt: "2022-04-08T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-09T00:00:00.000Z",
        },

        {
          availableAt: "2022-04-09T00:00:00.000Z",
          redeemedAt: null,
          expiresAt: "2022-04-10T00:00:00.000Z",
        },
      ],
    },
  });
});

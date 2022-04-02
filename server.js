// require express

import express from "express";
const app = express();
app.use(express.json());

// for using the nested create-react-apps

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));

// users object

let users = {};

//helper functions

import { getFullWeekStartingOnSunday } from "./helperFunctions.js";

///////////////////////////////////////////////////////////////////////////////
// Routes
///////////////////////////////////////////////////////////////////////////////

// gets all users from the server

app.get("/users", (req, res) => {
  res.json(users);
});

// create or update a user

app.get("/users/:id/rewards?", (req, res) => {
  const { id } = req.params;
  const { at } = req.query;

  // thow an error if the user id is not a nubmer and the at date is not a valid date
  if (!parseInt(id) || new Date(at) == "Invalid Date") {
    res.send("Invalid user id or date");
    throw new Error("Invalid user id or date");
  }
  // gets an array of dates going back to Sunday and forward to Saturday
  const days = getFullWeekStartingOnSunday(at);
  let user = users[id];
  // if there is no user just make one with the correct days
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
  res.json({ [id]: users[id] });
});

// redeem a reward

app.patch("/users/:id/rewards/:date/redeem", (req, res) => {
  const { id } = req.params;
  let { date } = req.params;
  date = new Date(date);
  let user = users[id];

  if (!user) {
    res.json({ message: "user not found" });
    throw new Error("user not found");
  }

  user.rewards.forEach((reward) => {
    if (
      // same day as being redeemed
      reward.availableAt === date.toISOString() &&
      // not expired
      reward.expiresAt > date.toISOString()
    ) {
      if (!reward.redeemedAt) {
        reward.redeemedAt = new Date();
      } else {
        res.json({ message: "Reward already redeemed" });
        throw new Error("Reward already redeemed");
      }

      // send only this user
      res.json({ [id]: users[id] });
    }
  });
  //send error message to client
  // res.json({ message: "Reward not found" });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

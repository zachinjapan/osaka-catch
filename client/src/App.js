import "./Assets/App.css";
import React, { useState } from "react";
// api calls
import { getUsersFromServer, createUser, redeemReward } from "./clientRoutes";
// helper function to get days
import { daysOfTheWeek } from "./Utils/daysOfTheWeek";

function App() {
  // use state to store users
  const [users, setUsers] = useState({});
  const [userId, setUserId] = useState(1);
  // The date is the variable that the form uses to display the date
  const [date, setDate] = useState(new Date());
  // the convertedDate is the date that is sent to the server
  const [convertedDate, setConvertedDate] = useState("");

  return (
    <div className="App">
      <h1>Osaka Catch</h1>
      <button
        onClick={() => {
          getUsersFromServer().then((data) => {
            setUsers(data);
          });
        }}
      >
        Show All Users
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <form>
          <label>
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(e) => {
                if (e.target.value > 0) {
                  setUserId(e.target.value);
                } else {
                  alert("Please enter a valid user ID");
                }
              }}
            />
          </label>
          <label>
            Requested At:
            <input
              type="date"
              value={date}
              onChange={(e) => {
                // convert to ISO 8601
                setDate(e.target.value);
                setConvertedDate(new Date(e.target.value).toISOString());
              }}
            />
          </label>
        </form>
        <button
          onClick={() => {
            if (userId && convertedDate) {
              createUser({ userId, convertedDate }).then((data) => {
                setUsers(data);
              });
            } else {
              alert("Please enter a user id and date");
            }
          }}
        >
          Request User
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <form>
          <label>
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </label>
          <label>
            Redeemed At:
            <input
              type="date"
              value={date}
              onChange={(e) => {
                // convert to ISO 8601
                setDate(e.target.value);
                setConvertedDate(new Date(e.target.value).toISOString());
              }}
            />
          </label>
        </form>
        <button
          type="submit"
          onClick={() => {
            redeemReward(userId, convertedDate).then((data) => {
              setUsers(data);
            });
          }}
        >
          Redeem rewards
        </button>
      </div>

      <div>
        <h2>User</h2>
        {users &&
          Object.keys(users).map((userId) => {
            const user = users[userId];
            return (
              <div
                key={userId}
                style={{
                  width: "100vw",
                }}
              >
                <h3>
                  User {userId} (week of{" "}
                  {user.rewards[0].availableAt.slice(2, 10)})
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100vw",
                    height: "100%",
                    border: "1px solid black",
                    overflow: "scroll",
                  }}
                >
                  {user.rewards.map((reward, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "200px",
                          width: "100%",
                          height: "100%",
                          border: "1px solid black",
                        }}
                      >
                        <h4>{daysOfTheWeek[index]} </h4>
                        <p key={reward.availableAt}>
                          availableAt {reward.availableAt}
                        </p>
                        <p key={reward.redeemedAt}>
                          redeemedAt {reward.redeemedAt}
                        </p>
                        <p key={reward.expiresAt}>
                          expiresAt {reward.expiresAt}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

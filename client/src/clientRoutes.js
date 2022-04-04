const getUsersFromServer = async () => {
  let url = "/users";
  // fetch the data from the server and also alert the user if there is an error
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (data.message) {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    alert("error getting users");
    throw new Error("Error getting users");
  }
};

const createUser = async ({ userId, convertedDate }) => {
  let url = "/users/" + userId + "/rewards?at=" + convertedDate;
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (data.message) {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

const redeemReward = async (userId, date) => {
  let url = "/users/" + userId + "/rewards/" + date + "/redeem";
  try {
    let response = await fetch(url, {
      method: "PATCH",
    });

    let data = await response.json();
    if (data.message) {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Error redeeming reward");
  }
};
export { getUsersFromServer, createUser, redeemReward };

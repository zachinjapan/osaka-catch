// require express

const express = require("express");
const app = express();
app.use(express.json());

//import routes
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const port = 5000;

// for using the nested create-react-apps

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

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

const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

const userRoute = require("./src/controllers/routes/user");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//userRouter endpoints
app.use("/auth", userRoute);

app.listen(port, () => {
  console.log(`Server started at Port: ${port}`);
});

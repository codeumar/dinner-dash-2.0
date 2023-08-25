const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const expressfileupload = require("express-fileupload");

const userRoute = require("./src/controllers/routes/user");
const restaurantRouter = require("./src/controllers/routes/restaurant");

const itemRouter = require("./src/controllers/routes/item");
const orderRouter = require("./src/controllers/routes/order");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(expressfileupload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: true }));

//userRouter endpoints
app.use("/auth", userRoute);

app.use("/restaurants", restaurantRouter);
app.use("/items", itemRouter);
app.use("/order", orderRouter);

app.listen(port, () => {
  console.log(`Server started at Port: ${port}`);
});

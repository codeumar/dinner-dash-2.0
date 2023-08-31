const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const expressfileupload = require("express-fileupload");

const restaurantRouter = require("./src/controllers/routes/restaurant");

const itemRouter = require("./src/controllers/routes/item");
const orderRouter = require("./src/controllers/routes/order");
const cartRouter = require("./src/controllers/routes/cart");
const categoryRouter = require("./src/controllers/routes/category");
const userRoute = require("./src/routes/user");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(expressfileupload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: true }));

//userRouter endpoints
app.use("/auth", userRoute);

app.use("/restaurants", restaurantRouter);
app.use("/items", itemRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);

app.listen(port, () => {
  //(`Server started at Port: ${port}`);
});

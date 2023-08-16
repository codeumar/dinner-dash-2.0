const express =require( "express");
const userRouter = require("./src/controllers/routes/user");
const port =  3001;
const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//userRouter endpoints
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server started at Port: ${port}`);
});

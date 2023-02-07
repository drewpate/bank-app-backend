const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/api/users-route");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://www.andrew-pate-fullstack-banking-app.com"],
    optionSuccessStatus: 200,
    credentials: true,
  })
);

//express parser
app.use(express.json());

// use routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const subscriberRouter = require("./routes/subscribers");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful"))
  .catch(error => console.error(error.message));

app.use(express.json());
app.use("/subscribers", subscriberRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

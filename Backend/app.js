const express = require("express");
const app = express();
var morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const mailchimp = require("@mailchimp/mailchimp_marketing")
const md5 = require("md5")
require("dotenv/config");

const port = process.env.PORT || 3000;

const driversRoute = require("./routes/drivers");
const eventsRoute = require("./routes/events");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get("", (req, res) => res.send("Hello"));
app.use("/api/uploads", express.static("uploads"));
app.use("/api/drivers", driversRoute);
app.use("/api/events", eventsRoute);
app.use("/api/user", userRoute);
app.use("/api/images", imageRoute);

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  const listId = process.env.MAILCHIMP_LIST_ID;
  const mailChimpAPIKey = process.env.MAILCHIMP_API_KEY;
  const serverCode = process.env.MAILCHIMP_SERVER_CODE;

  mailchimp.setConfig({
    apiKey: mailChimpAPIKey,
    server: serverCode
  });

  const subscriberHash = md5(email.toLowerCase());
  
  const response = await mailchimp.lists.setListMember(
    listId,
    subscriberHash,
    {
      email_address:email,
      status_if_new:"subscribed"
    }
  );

  res.status(200).send({
    "message":"OK",
    response:response
  });
});

//Listening
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on: http://localhost:${port}/`);
    });
  });

module.exports = app;

//init code
// require('dotenv').config() // No need...
const mongoose = require("mongoose");
const assert = require("assert");
const db_url = process.env.DB_URL;

//connection code
mongoose.connect(
  db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  function (error, link) {
    // check error
    assert.equal(error, null, "DB Connect Fail...");

    // Ok
    console.log("DB Connect Success...");
    // console.log(link);
  }
);

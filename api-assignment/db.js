const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";

const dbName = "student";

async function connect() {
  await mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
}

function getDatabase() {
  return mongoose.connection;
}

module.exports = { connect, getDatabase };

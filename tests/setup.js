const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close(process.env.MONGODB_URL);
});

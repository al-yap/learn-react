import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    // useCreateIndex: true, # this is always true in mongoose 6
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb database");
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

// devBundle.compile(app)

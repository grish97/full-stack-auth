import mongoose from "mongoose";

console.log(process.env.DB_URI, "DB");
const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log("MongoDB ready"))
  .catch(console.error);

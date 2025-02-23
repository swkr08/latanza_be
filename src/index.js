import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./constants.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(`Run up with some error : ${err}`);
    });

    app.listen(PORT, () => {
      console.log(`🔥 server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`❌ MongoDB Connection Failed : ${err}`);
    throw err;
  });










  
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// console.log(process.env.MONGODB_URL);

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

//     app.on("error", (err) => {
//       console.log(`Error ${err}`);
//       throw err;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`Application is running on port : ${process.env.PORT}`);
//     });
//   } catch (err) {
//     console.log(`Error : ${err}`);
//     throw err;
//   }
// })();

// function connectDB(){

// }

// connectDB();

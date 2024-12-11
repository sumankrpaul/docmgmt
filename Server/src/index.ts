import * as dotenv from "dotenv";
import mongoose from "mongoose";
import App from "./app";
dotenv.config();

const PORT: number = process.env.SERVER_PORT? parseInt(process.env.SERVER_PORT):8000;
const URI: string | null = process.env.MONGO_URI? process.env.MONGO_URI: null;

const start = async ()=>{
  if(URI){
    await mongoose.connect(URI);
    console.log("Mongo DB is connected");
  } else {
    throw new Error("MONGO_URI is required");
  }
}

App.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

start()

import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB successfully connected");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error: ", err);
    });
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
}

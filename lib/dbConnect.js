import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// DB CONNECTION
async function dbConnect() {
  try {
    if (cached.conn) {
      console.log("Database connection already exist")
      return cached.conn;
    }

    if (!cached.promise) {

      cached.db = await mongoose.connect(MONGODB_URI).then((mongoose) => {
        console.log("Database connected successfully");
        return mongoose;
      });
    }
    cached.conn = await cached.db;
    return cached.conn;
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;

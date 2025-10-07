import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); 
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined. Check your environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); 
  }
};

export default connectDB;

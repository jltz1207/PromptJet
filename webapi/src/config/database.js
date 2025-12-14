import mongoose from "mongoose";
import dotenv from 'dotenv'
const connectDB = async () => {

  try {
    if(!process.env){
      throw new Error('.env is not imported')
    }
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined')
    }
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
    const conn = await mongoose.connect(process.env.DATABASE_URL, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Port: ${conn.connection.port}`);
  }
  catch(error){
    console.error('Database connection error:', error);
    process.exit(1);
  }
}
export default connectDB;
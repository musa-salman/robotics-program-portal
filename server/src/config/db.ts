import mongoose from "mongoose";

const uri: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/';

const connectDB = async () => {
    try {
        await mongoose.connect(uri,);
        console.log('Connected to the database');
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
import mongoose from "mongoose";

export async function initializeDb() {
    const dbConnectionString = process.env.DB_CONNECTION_STRING!;
    return mongoose.connect(dbConnectionString);
}

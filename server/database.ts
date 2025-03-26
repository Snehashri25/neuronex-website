import { dbConfig } from "./config";
import { Client } from "pg";

export const connectToDatabase = async () => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
  return client;
};
// ...existing code...

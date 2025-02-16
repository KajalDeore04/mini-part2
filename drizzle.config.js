/**@type {import ("drizzle-kit").Config} */

import dotenv from "dotenv";

// Load environment variables from `.env.local`
dotenv.config({ path: ".env.local" });
export default {
  schema: "./configs/schema.jsx",
  out: "./drizzle",  
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
};
// Error  Either connection "url" or "host", "database" are required for PostgreSQL database connection 
// sometimes it struggles to catch env files so even if all the env variables work fine but for this file it needs dotenv module
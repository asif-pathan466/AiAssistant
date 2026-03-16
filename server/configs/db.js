import {neon} from '@neondatabase/serverless'

import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env file");
}

const sql = neon(process.env.DATABASE_URL);

export default sql;

(async () => {
  try {
    await sql`SELECT NOW()`;
    console.log("Database connected");
  } catch (error) {
    console.log("Database failed:",error);
  }
})();
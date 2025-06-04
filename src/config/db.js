import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();
//Create a sql connection using neon
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
    try {
        await sql`CREATE TABLE if not exists transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount decimal(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log("Table created successfully");
    }
    catch(e){
        console.error("Error creating table", e);
        process.exit(1); // 1 means failure , 0 means success
    }
}
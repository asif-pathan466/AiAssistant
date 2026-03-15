import {neon} from "@neondatabase/serverless"
import "dotenv/config"

const sql = neon(process.env.DATABASE_URL);

export default sql;

(async () => {
    try {
         const res = await sql`SELECT NOW()`;
        console.log("DataBase connected")
    } catch (error) {
        console.log("dataBase Failed");
    }
})();
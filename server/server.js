import express, { json } from "express"
import "dotenv/config"
import cors from 'cors'
import aiRoute from "./routes/aiRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("server is live")
})

app.use('/api/ai', aiRoute)
app.use('/api/auth', userRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running on port no ${port}`)
})
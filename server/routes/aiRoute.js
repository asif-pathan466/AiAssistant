import express from "express"
import { message } from "../contrllers/aicontroller.js";

const router = express.Router()

router.post("/ai", message);

export default router;
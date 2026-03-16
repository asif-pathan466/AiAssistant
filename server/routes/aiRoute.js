import express from "express"
import { message } from "../contrllers/aicontroller.js";

const router = express.Router()

router.post("/aicontent", message);

export default router;
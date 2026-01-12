import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendMessage } from "./controllers/sendControllers.js";
import { cartController } from "./controllers/cartControllers.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/send-message", sendMessage);

app.post("/cart", cartController);

app.listen(PORT, () => {
  console.log(`✅ Сервер працює на порту ${PORT}`);
});

import express from "express";
import cors from "cors";
import "dotenv/config";
import { sendMessage } from "./controllers/sendControllers.js";
import { cartController } from "./controllers/cartControllers.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/send-message", sendMessage);
app.post("/cart", cartController);

app.use(notFoundHandler);
// app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Сервер працює на порту ${PORT}`);
});

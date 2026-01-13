import express from "express";
import cors from "cors";
import "dotenv/config";
import { eventRegistrationController } from "./controllers/eventController.js";
import { cartController } from "./controllers/cartControllers.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { eventRegistrationValidator } from "./validators/eventRegistrationValidation.js";
import { errors } from "celebrate";
import { cartValidator } from "./validators/cartValidation.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post(
  "/event-registration",
  eventRegistrationValidator,
  eventRegistrationController
);
app.post("/cart", cartValidator, cartController);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Сервер працює на порту ${PORT}`);
});

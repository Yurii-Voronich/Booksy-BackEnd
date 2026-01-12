import { appendToSheet } from "../services/googleSheets.js";
import { sendToTelegram } from "../services/telegramService.js";
import {
  formatCartMessage,
  formatCartSummary,
  generateOrderId,
} from "../utils/cartFormatter.js";

export const cartController = async (req, res) => {
  const cartData = req.body;
  const orderId = generateOrderId();
  const textForTelegram = formatCartMessage(cartData, orderId);

  await sendToTelegram(textForTelegram);

  const { summaryText, total } = formatCartSummary(cartData);
  const date = new Date().toISOString().split("T")[0];

  await appendToSheet({
    range: "Лист2",
    values: [[orderId, date, summaryText, total]],
  });

  res.status(200).json({ message: "Замовлення надіслано", orderId });
};

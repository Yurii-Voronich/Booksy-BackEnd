import createHttpError from "http-errors";
import { appendToSheet } from "../services/googleSheets.js";
import { sendToTelegram } from "../services/telegramService.js";

export const sendMessage = async (req, res, next) => {
  const { name, email, message, dataid } = req.body;

  if (!name || !email) {
    return next(createHttpError(400, "Поля імʼя та email обовʼязкові"));
  }
  let text = `<b>📩 Івент ${dataid}:</b>
👤 <b>Імʼя:</b> ${name}
📧 <b>Email:</b> ${email}`;

  if (message && message.trim() !== "") {
    text += `\n💬 <b>Повідомлення:</b> ${message}`;
  }

  await sendToTelegram(text);

  await appendToSheet({
    range: "Лист1",
    values: [[new Date().toISOString(), dataid, name, email, message || "—"]],
  });

  res.status(200).json({
    success: true,
    message: "Надіслано в Telegram і записано у Google Таблицю!",
  });
};

import { appendToSheet } from "../services/googleSheets.js";
import { sendToTelegram } from "../services/telegramService.js";

export const eventRegistrationController = async (req, res, next) => {
  const { name, email, message, dataid } = req.body;

  let text = `<b>📩 Event ${dataid}:</b>
👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}`;

  if (message && message.trim() !== "") {
    text += `\n💬 <b>Message:</b> ${message}`;
  }

  await sendToTelegram(text);

  await appendToSheet({
    range: "Лист1",
    values: [[new Date().toISOString(), dataid, name, email, message || "—"]],
  });

  res.status(200).json({
    success: true,
  });
};

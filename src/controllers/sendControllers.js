import "dotenv/config";
import { getSheetsClient } from "../services/googleSheets.js";
import { sendToTelegram } from "../services/telegramService.js";
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
export const sendMessage = async (req, res) => {
  const { name, email, message, dataid } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "поля ім'я та email обовʼязкові" });
  }

  const text = `
<b>📩 Івент ${dataid}:</b>
👤 <b>Імʼя:</b> ${name}
📧 <b>Email:</b> ${email}
💬 <b>Повідомлення:</b> ${message}
  `.trim();

  try {
    await sendToTelegram(text);
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Лист1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [new Date().toISOString(), dataid, name, email, message || "—"],
        ],
      },
    });

    res.status(200).json({
      success: true,
      message: "Надіслано в Telegram і записано у Google Таблицю!",
    });
  } catch (error) {
    console.error("Telegram/Sheets error:", error);
    res.status(500).json({ error: "Не вдалося обробити запит" });
  }
};

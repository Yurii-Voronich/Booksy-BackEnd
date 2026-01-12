import { getSheetsClient } from "../services/googleSheets.js";
import { sendToTelegram } from "../services/telegramService.js";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
export const cartController = async (req, res) => {
  const cartData = req.body;

  const generateOrderId = () => {
    return `ID-${Date.now().toString().slice(-6)}`;
  };
  const orderId = generateOrderId();

  function formatCartMessage(cartData, orderId) {
    let message = `📦 <b>Замовлення ${orderId}</b>:\n\n`;
    let totalSum = 0;

    cartData.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      totalSum += itemTotal;
      message += `${index + 1}. ${item.title} — кількість: ${item.qty}, ціна: ${
        item.price
      } грн, разом: ${itemTotal} грн\n`;
    });

    message += `\n💰 <b>Сума до сплати:</b> ${totalSum} грн`;

    return message;
  }

  const textForTelegram = formatCartMessage(cartData, orderId);

  try {
    await sendToTelegram(textForTelegram);
  } catch (error) {
    console.error("Telegram error:", error.message);
  }

  const formatCartSummary = (cart) => {
    let total = 0;
    const itemsText = cart.map((item) => {
      const sum = item.price * item.qty;
      total += sum;
      return `${item.title} x${item.qty} — ${sum} грн`;
    });

    return {
      summaryText: itemsText.join("; "),
      total,
    };
  };

  const { summaryText, total } = formatCartSummary(cartData);
  const date = new Date().toISOString().split("T")[0];

  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Лист2",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[orderId, date, summaryText, total]],
    },
  });

  res.status(200).json({ message: "Замовлення надіслано", orderId });
};

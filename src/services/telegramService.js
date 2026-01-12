export const sendToTelegram = async (text) => {
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.description || "Unknown Telegram error");
  }
};

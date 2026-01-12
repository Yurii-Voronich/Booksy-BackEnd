export const generateOrderId = () => {
  return `ID-${Date.now().toString().slice(-6)}`;
};

export const formatCartMessage = (cartData, orderId) => {
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
};

export const formatCartSummary = (cart) => {
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

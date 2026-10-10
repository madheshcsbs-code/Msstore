export const WHATSAPP_NUMBER = "REPLACE_WITH_BUSINESS_NUMBER";

export function createWhatsAppOrderLink(product, quantity = 1) {
  const message = `Hi MS Store!\n\nI would like to order:\n\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice: ₹${product.price}\nTotal: ₹${product.price * quantity}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCartLink(cartItems) {
  let message = `Hi MS Store!\n\nI would like to order the following items:\n\n`;
  let total = 0;
  
  cartItems.forEach(item => {
    message += `- ${item.product.name} (x${item.quantity}) - ₹${item.product.price * item.quantity}\n`;
    total += item.product.price * item.quantity;
  });
  
  message += `\nTotal Amount: ₹${total}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

import { FormData } from '../types/stepper';

export async function sendTelegramNotification(
  formData: FormData
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId   = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram env vars missing');
    return false;
  }

  const text = `
🏠 *New Interior Design Form Submission*

*BHK Details:*
• Type: ${formData.bhkType}
• Size: ${formData.bhkSizes?.[formData.bhkType] || 'N/A'}

*Rooms to Design:*
• Living Room: ${formData.rooms.livingRoom}
• Kitchen: ${formData.rooms.kitchen}
• Bedroom: ${formData.rooms.bedroom}
• Bathroom: ${formData.rooms.bathroom}
• Dining: ${formData.rooms.dining}

*Package:* ${formData.package}

*Contact Information:*
• Name: ${formData.contactInfo.name}
• Email: ${formData.contactInfo.email}
• Phone: ${formData.contactInfo.countryCode} ${formData.contactInfo.phone}
• Property: ${formData.contactInfo.propertyName}
• WhatsApp Updates: ${formData.contactInfo.subscribeWhatsapp ? 'Yes' : 'No'}

*Submitted:* ${new Date().toLocaleString()}
  `.trim();

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
      }
    );
    if (!res.ok) console.error('Telegram API error', await res.text());
    return res.ok;
  } catch (e) {
    console.error('Telegram network error', e);
    return false;
  }
}

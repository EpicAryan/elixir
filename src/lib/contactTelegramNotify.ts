interface ContactFormData {
  propertyType: string;
  propertyLocation: string;
  name: string;
  phone: string;
  whatsappUpdates: boolean;
}

export async function sendContactTelegramNotification(
  formData: ContactFormData
): Promise<{ success: boolean }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN; 
  const chatId = process.env.CONTACT_TELEGRAM_CHAT_ID;     

  if (!botToken || !chatId) {
    console.error('Contact Telegram env vars missing');
    return { success: false };
  }

  const text = `
🏠 *New Contact Form Submission*

*Property Details:*
• Type: ${formData.propertyType}
• Location: ${formData.propertyLocation}

*Contact Information:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• WhatsApp Updates: ${formData.whatsappUpdates ? 'Yes' : 'No'}

*Submitted:* ${new Date().toLocaleString('en-IN')}
  `.trim();

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text, 
          parse_mode: 'Markdown' 
        }),
      }
    );
    
    if (!res.ok) {
      console.error('Contact Telegram API error', await res.text());
    }
    
    return { success: res.ok };
  } catch (e) {
    console.error('Contact Telegram network error', e);
    return { success: false };
  }
}

import { NextRequest } from 'next/server';
import { sendTelegramNotification } from '../../../lib/telegramNotify';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const success = await sendTelegramNotification(formData);
    
    if (success) {
      return Response.json({ message: 'Notification sent successfully' });
    } else {
      return Response.json({ message: 'Failed to send notification' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

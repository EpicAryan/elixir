

import { NextRequest } from 'next/server';
import { appendToGoogleSheet } from '../../../lib/googleSheets';
import { sendTelegramNotification } from '../../../lib/telegramNotify';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const sheetSuccess = await appendToGoogleSheet(formData);
    const telegramSuccess = await sendTelegramNotification(formData);
    
    if (sheetSuccess && telegramSuccess) {
      return Response.json({ message: 'success' });
    }

    return Response.json(
      { message: 'partial', sheetSuccess, telegramSuccess },
      { status: 207 }
    );
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'server error' }, { status: 500 });
  }
}

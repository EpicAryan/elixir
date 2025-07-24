

import { NextRequest, NextResponse } from 'next/server';
import { appendToGoogleSheet } from '../../../lib/googleSheets';
import { sendTelegramNotification } from '../../../lib/telegramNotify';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    await appendToGoogleSheet(formData);
    const telegramResult = await sendTelegramNotification(formData);

     return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      priceRange: telegramResult.priceRange
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request' 
      }, 
      { status: 500 }
    );
  }
}

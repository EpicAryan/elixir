

import { NextRequest, NextResponse } from 'next/server';
import { appendToGoogleSheet } from '../../../lib/googleSheets';
import { sendTelegramNotification } from '../../../lib/telegramNotify';
import { calculatePrice } from '@/utils/priceCalculator';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const totalPrice = calculatePrice(formData);
    await appendToGoogleSheet(formData);
    await sendTelegramNotification(formData);

     return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      totalPrice
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

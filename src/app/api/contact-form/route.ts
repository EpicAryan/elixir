import { NextRequest, NextResponse } from 'next/server';
import { appendToContactSheet } from '../../../lib/contactGoogleSheets';
import { sendContactTelegramNotification } from '../../../lib/contactTelegramNotify';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Send to Google Sheets
    await appendToContactSheet(formData);
    
    // Send Telegram notification
    await sendContactTelegramNotification(formData);

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully'
    });
  } catch (e) {
    console.error('Contact form submission error:', e);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request' 
      }, 
      { status: 500 }
    );
  }
}

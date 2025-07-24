import { google } from 'googleapis';
import { FormData } from '../types/stepper';
import { calculatePrice } from '@/utils/priceCalculator';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const appendToGoogleSheet = async (formData: FormData) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    const priceResult = calculatePrice(formData); 

    await sheets.spreadsheets.get({ spreadsheetId });
    const rowData = [
      new Date().toLocaleString('en-IN'),
      formData.bhkType,
      formData.bhkSizes?.[formData.bhkType] || 'N/A',
      formData.rooms.livingRoom,
      formData.rooms.kitchen,
      formData.rooms.bedroom,
      formData.rooms.bathroom,
      formData.rooms.dining,
      formData.package,
      priceResult.range, 
      formData.contactInfo.name,
      formData.contactInfo.email,
      formData.contactInfo.phone,
      formData.contactInfo.propertyName,
      formData.contactInfo.subscribeWhatsapp ? 'Yes' : 'No'
    ];
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:O1',
    });
    
    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        'Timestamp', 'BHK Type', 'BHK Size', 'Living Room', 'Kitchen', 
        'Bedroom', 'Bathroom', 'Dining', 'Package', 'Total Price Range', 'Name', 'Email', 
        'Phone', 'Property Name', 'WhatsApp Updates'
      ];
      
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A1:O1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });
    } else {
      console.log('Headers already exist');
    }
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:O',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    });

    return true;
  } catch (error) {
    console.error('Detailed Google Sheets error:', error);
    return false;
  }
};

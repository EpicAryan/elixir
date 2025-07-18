import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

interface ContactFormData {
  propertyType: string;
  propertyLocation: string;
  name: string;
  phone: string;
  whatsappUpdates: boolean;
}

export const appendToContactSheet = async (formData: ContactFormData) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.CONTACT_GOOGLE_SHEETS_SHEET_ID; // Different sheet ID

    await sheets.spreadsheets.get({ spreadsheetId });
    
    const rowData = [
      new Date().toLocaleString('en-IN'),
      formData.propertyType,
      formData.propertyLocation,
      formData.name,
      formData.phone,
      formData.whatsappUpdates ? 'Yes' : 'No'
    ];

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:F1',
    });
    
    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        'Timestamp', 'Property Type', 'Property Location', 'Name', 'Phone', 'WhatsApp Updates'
      ];
      
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A1:F1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });
    }
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    });
    
    console.log('Contact form data successfully added to Google Sheets');
    return true;
  } catch (error) {
    console.error('Detailed Contact Google Sheets error:', error);
    return false;
  }
};

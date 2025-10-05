// Google Apps Script for Early Adopter Email Collection
// Deploy this as a Web App and use the URL in your backend

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source']);
    }
    
    // Add the new row
    sheet.appendRow([
      new Date().toISOString(),
      data.name,
      data.email,
      data.source || 'early_adopter_form'
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email added to Google Sheet successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error adding email to Google Sheet: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this manually
function testAddEmail() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        source: 'test'
      })
    }
  });
}

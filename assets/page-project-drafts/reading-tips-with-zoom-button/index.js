const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure the email transport using your preferred service (e.g., Gmail, SendGrid, Mailgun)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Update with real credentials
    pass: 'your-app-password'
  }
});

exports.onSupportMessageCreated = functions.firestore
  .document('support_messages/{messageId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: 'LettersGR Help Desk <noreply@lettersgr.com>',
      to: 'contact@lettersgr.com',
      subject: `New ${data.type} from ${data.email}`,
      html: `
        <h1>New Support Message</h1>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p style="padding: 10px; background: #f4f4f4; border-radius: 5px;">${data.message}</p>
        <hr />
        <h3>Context Data</h3>
        <pre>${JSON.stringify(data.context, null, 2)}</pre>
        ${data.attachmentUrl ? `<p><strong>Attachment:</strong> <a href="${data.attachmentUrl}">View Screenshot</a></p>` : ''}
        <p><em>Auto-generated via LettersGR Cloud Functions</em></p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Support email sent successfully');
    } catch (error) {
      console.error('Error sending support email:', error);
    }
  });

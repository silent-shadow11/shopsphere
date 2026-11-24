
import "dotenv/config";
import { google } from "googleapis";
import { Apierror } from "./ApiError.js";


// Check environment variables
const requiredEnv = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
  "GOOGLE_REFRESH_TOKEN",
  "GMAIL_USER",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Apierror(500, `${key} is not configured`);
  }
}

// OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Gmail API
const gmail = google.gmail({
  version: "v1",
  auth: oauth2Client,
});

// Send email
const sendEmail = async (to, subject, html) => {
  if (!to || !subject || !html) {
    throw new Apierror (
      400,
      "Recipient, subject, and email content are required"
    );
  }

  try {
    const message = [
      `From: ShopSphere <${process.env.GMAIL_USER}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      html,
    ].join("\r\n");

    const encodedMessage = Buffer
      .from(message)
      .toString("base64url");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    return response.data;

  } catch (error) {
    console.error("Gmail API Error:", error.message);

    throw new Apierror(
      502,
      "Unable to send email through Gmail"
    );
  }
};

export { sendEmail };

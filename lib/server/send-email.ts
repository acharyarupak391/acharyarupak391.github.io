import { Resend } from "resend";

type ContactNotification = {
  name: string;
  email: string;
  relationship: string;
  purpose: string;
  message: string;
  socials: string;
  notionPageId?: string;
  notionError?: string;
};

function formatValue(value: string) {
  return value.trim() || "Not provided";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlValue(value: string) {
  return escapeHtml(formatValue(value)).replace(/\n/g, "<br />");
}

function createEmailHtml({
  name,
  email,
  relationship,
  purpose,
  message,
  socials,
  notionStatus,
  notionError,
}: ContactNotification & { notionStatus: string }) {
  const statusLabel = notionError ? "NOTION ERROR" : "NOTION SAVED";
  const statusColor = notionError ? "#2e4a5e" : "#5b7a5e";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New portfolio contact message</title>
    <style>
      @media only screen and (max-width: 640px) {
        .email-shell { padding: 12px !important; }
        .email-header, .email-content, .email-footer { padding-left: 22px !important; padding-right: 22px !important; }
        .email-title { font-size: 34px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#e8e7e2; color:#101113; font-family:Arial,Helvetica,sans-serif;">
    <div class="email-shell" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px; margin:0 auto;">
        <tr>
          <td style="height:4px; background:#46677d; font-size:0; line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td class="email-header" style="padding:28px 36px 34px; background:#0d0e10; color:#f4f4f0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:1.8px; text-transform:uppercase; color:#b4b6b3;">RUPAK ACHARYA</td>
                <td align="right" style="font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:1.8px; text-transform:uppercase; color:#6f7174;">INBOUND // 06.F</td>
              </tr>
            </table>
            <div style="height:1px; margin:24px 0 28px; background:#3a3b3e;"></div>
            <div style="font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:1.8px; text-transform:uppercase; color:#d5dde3;">NEW CONTACT FORM MESSAGE</div>
            <h1 class="email-title" style="margin:14px 0 0; color:#f4f4f0; font-size:42px; line-height:1; letter-spacing:-1.8px; font-weight:700;">Someone reached out.</h1>
          </td>
        </tr>
        <tr>
          <td class="email-content" style="padding:28px 36px 32px; background:#f2f1ed;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding-bottom:22px; font-family:'Courier New',Courier,monospace; font-size:11px; line-height:1.6; letter-spacing:1px; text-transform:uppercase; color:${statusColor};">
                  <span style="display:inline-block; padding:7px 10px; border:1px solid ${statusColor};">● &nbsp;${statusLabel}</span>
                  <span style="display:block; margin-top:10px; color:#54565a; letter-spacing:.5px; text-transform:none;">${escapeHtml(notionStatus)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 20px; border-top:2px solid #101113; border-bottom:1px solid #c4c5c1;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td width="50%" valign="top" style="padding:0 12px 18px 0;">
                        <div style="font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#8a8c8f;">FROM</div>
                        <div style="padding-top:6px; font-size:16px; line-height:1.4; font-weight:700; color:#101113;">${htmlValue(name)}</div>
                      </td>
                      <td width="50%" valign="top" style="padding:0 0 18px 12px;">
                        <div style="font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#8a8c8f;">EMAIL</div>
                        <div style="padding-top:6px; font-size:15px; line-height:1.4; word-break:break-word;"><a href="mailto:${escapeHtml(email)}" style="color:#2e4a5e; text-decoration:none;">${htmlValue(email)}</a></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" valign="top" style="padding:0 12px 0 0;">
                        <div style="font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#8a8c8f;">RELATIONSHIP</div>
                        <div style="padding-top:6px; font-size:15px; line-height:1.4; color:#101113;">${htmlValue(relationship)}</div>
                      </td>
                      <td width="50%" valign="top" style="padding:0 0 0 12px;">
                        <div style="font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#8a8c8f;">PURPOSE</div>
                        <div style="padding-top:6px; font-size:15px; line-height:1.4; color:#101113;">${htmlValue(purpose)}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding-top:28px;">
                  <div style="font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#46677d;">MESSAGE // TRANSMISSION</div>
                  <div style="margin-top:10px; padding:20px; background:#0d0e10; color:#f4f4f0; font-size:16px; line-height:1.65;">${htmlValue(message)}</div>
                </td>
              </tr>
              <tr>
                <td style="padding-top:24px;">
                  <div style="font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#8a8c8f;">SOCIAL SIGNALS</div>
                  <div style="padding-top:7px; color:#54565a; font-family:'Courier New',Courier,monospace; font-size:13px; line-height:1.7;">${htmlValue(socials)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="email-footer" style="padding:22px 36px; background:#1a1b1d; color:#6f7174; font-family:'Courier New',Courier,monospace; font-size:10px; line-height:1.7; letter-spacing:1px; text-transform:uppercase;">
            Automated notification // portfolio contact endpoint<br />
            Reply directly to this email to contact ${htmlValue(name)}.
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;
}

export async function sendEmail({
  name,
  email,
  relationship,
  purpose,
  message,
  socials,
  notionPageId,
  notionError,
}: ContactNotification) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_TO_EMAIL) {
    throw new Error("RESEND_API_KEY or RESEND_TO_EMAIL is not set.");
  }

  const notionStatus = notionError
    ? `Failed to save to Notion: ${notionError}`
    : `Saved to Notion${notionPageId ? ` (page ID: ${notionPageId})` : ""}`;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: process.env.RESEND_TO_EMAIL,
    replyTo: email,
    subject: notionError
      ? "Notion error: new portfolio contact message"
      : "New portfolio contact message",
    html: createEmailHtml({
      name,
      email,
      relationship,
      purpose,
      message,
      socials,
      notionPageId,
      notionError,
      notionStatus,
    }),
    text: [
      "New portfolio contact form submission",
      "",
      `Notion status: ${notionStatus}`,
      "",
      `Name: ${formatValue(name)}`,
      `Email: ${formatValue(email)}`,
      `Relationship: ${formatValue(relationship)}`,
      `Purpose: ${formatValue(purpose)}`,
      `Socials: ${formatValue(socials)}`,
      "",
      "Message:",
      formatValue(message),
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send the email.");
  }

  return data;
}

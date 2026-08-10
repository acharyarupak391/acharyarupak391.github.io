// app/api/submit-form/route.ts

import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/server/send-email";

type ContactFormData = {
  name: string;
  email: string;
  relationship: string;
  relationshipOther?: string;
  purpose: string;
  purposeOther?: string;
  message: string;
  socialTwitter?: string;
  socialLinkedin?: string;
  socialGithub?: string;
};

// Initialize Notion Client (API Key is secured via environment variables)
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

export async function POST(request: Request) {
  let body: ContactFormData;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in form data." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Form data must be a JSON object." },
      { status: 400 },
    );
  }

  const { name, email, message, purpose, relationship, purposeOther, relationshipOther,
    socialGithub,
    socialLinkedin,
    socialTwitter
  } = body;

  const finalPurpose = purpose === "other" ? purposeOther || "Other" : purpose;
  const finalRelationship = relationship === "other" ? relationshipOther || "Other" : relationship;
  const finalSocials = `${socialGithub ? `GitHub: ${socialGithub}\n` : ""}${socialLinkedin ? `LinkedIn: ${socialLinkedin}\n` : ""}${socialTwitter ? `Twitter: ${socialTwitter}\n` : ""}`;

  if (!name?.trim() || !email?.trim() || !message?.trim() || !purpose || !relationship) {
    return NextResponse.json(
      { error: "Missing required fields in form data." },
      { status: 400 }
    );
  }

  let pageId: string | undefined;
  let notionError: string | undefined;

  try {
    if (!DATABASE_ID) {
      throw new Error("NOTION_DATABASE_ID is not set in environment variables.");
    }

    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Name: {
          title: [{
            text: {
              content: name,
            },
          }],
        },
        Email: {
          email: email,
        },
        Message: {
          rich_text: [{
            text: {
              content: message,
            },
          }],
        },
        Purpose: {
          rich_text: [{
            text: {
              content: finalPurpose,
            },
          }],
        },
        Relationship: {
          select: {
            name: finalRelationship,
          },
        },
        'Social Media': {
          rich_text: [{
            text: {
              content: finalSocials,
            },
          }],
        },
        "Date Received": {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    pageId = response.id;
    console.log("Successfully added entry to Notion:", pageId);
  } catch (error) {
    console.error("Notion API Error:", error);
    notionError = error instanceof Error ? error.message : "Unknown Notion error.";
  }

  try {
    await sendEmail({
      name,
      email,
      relationship: finalRelationship,
      purpose: finalPurpose,
      message,
      socials: finalSocials,
      notionPageId: pageId,
      notionError,
    });
  } catch (error) {
    console.error("Resend email error:", error);
  }

  if (notionError) {
    return NextResponse.json(
      { success: false, error: "Failed to save data due to server error." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, pageId }, { status: 201 });
}

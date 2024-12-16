import { isValidEmail } from "utils";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    } else if (!isValidEmail(email)) {
      return Response.json({ message: "Email invalid" }, { status: 400 });
    }

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      throw new Error("Missing Mailchimp environment variables");
    }

    const url = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `api_key ${MailchimpKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        { error: errorData.detail },
        { status: response.status },
      );
    }

    const received = await response.json();
    return Response.json(received);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
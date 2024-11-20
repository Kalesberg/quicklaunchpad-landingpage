import Mailgun from "mailgun.js";
import { isValidEmail } from "utils";
import FormData from "form-data";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const MailGunKey = process.env.MAILGUN_API_KEY;
    const MailGunListAddress = process.env.MAILGUN_LIST_ADDRESS as string;

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: MailGunKey || "",
    });

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 500 });
    } else if (!isValidEmail(email)) {
      return Response.json({ message: "Email invalid" }, { status: 500 });
    }

    if (!MailGunKey || !MailGunListAddress) {
      throw new Error("Missing Mailgun environment variables");
    }

    const response = mg.lists.members
      .createMember(MailGunListAddress, {
        address: email,
        name: email,
        vars: "",
        subscribed: "yes",
        upsert: "yes", // optional, choose yes to insert if not exist, or update it exist
      })
      .then((data) => {
        return Response.json({ data: data }, { status: 201 });
      })
      .catch((err) => {
        return Response.json({ error: err.message }, { status: err.status });
      });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

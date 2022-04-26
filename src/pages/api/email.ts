import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

import FormValidator from "utils/classes/FormValidator";

interface EmailFields {
  [key: string]: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const isEmailFields = (
  fields: { [key: string]: any } = {}
): fields is EmailFields => {
  const isString = (v: unknown): v is string => typeof v === "string";

  const validName =
    isString(fields.name) &&
    !isString(FormValidator.ofLengthRange(1, 25)(fields.name));
  const validEmail =
    isString(fields.email) && !isString(FormValidator.isEmail(fields.email));
  const validSubject = isString(fields.subject);
  const validMessage =
    isString(fields.message) &&
    !isString(FormValidator.ofMinLength(25)(fields.message));

  return validName && validEmail && validSubject && validMessage;
};

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_DESTINATION = process.env.EMAIL_DESTINATION;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const fields = req.body;

  if (!fields) {
    return res.status(400).json({ message: "No fields were provided." });
  }

  if (!isEmailFields(fields)) {
    return res
      .status(400)
      .json({ message: "An incorrect field was provided." });
  }

  let test = false;

  const host = EMAIL_HOST;
  const port = parseInt(EMAIL_PORT);
  let user = EMAIL_USER;
  let pass = EMAIL_PASSWORD;

  if (!user || !pass) {
    test = true;
    const testAccount = await nodemailer.createTestAccount();
    user = testAccount.user;
    pass = testAccount.pass;
  }

  const transporterOptions = {
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  const transporter = nodemailer.createTransport(transporterOptions);

  const { name, email: replyTo, subject: _subject, message } = fields;
  const to = EMAIL_DESTINATION;
  const subject = _subject.length > 0 ? _subject : `New Message From ${name}`;
  const text = `New Message From ${name}\n\n${message}`;

  const mailOptions = {
    from: user,
    to,
    replyTo,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (test) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    res.status(200).send(undefined);
  } catch {
    res.status(500).json({ message: "Sorry, something went wrong!" });
  }
}

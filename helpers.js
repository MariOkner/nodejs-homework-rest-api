const nodemailer = require('nodemailer');

const {EMAIL_USER, EMAIL_PASS} = process.env;

async function sendMail({ to, subject, html }) {
  const email = {
    from: "info@gmail.com",
    to,
    subject,
    html,
  };
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    }
  });

  await transport.sendMail(email);
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  sendMail,
  HttpError,
};



const sendGrid = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_KEY } = process.env;

async function sendMail({ to, subject, html }) {
  sendGrid.setApiKey(SEND_GRID_KEY);
  const email = {
    to,
    subject,
    html,
    from: "rirenko20.83@gmail.com",
  };

  try {
    const response = await sendGrid.send(email);
    console.log(response);
  } catch (error) {}
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

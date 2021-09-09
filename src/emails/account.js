const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "jaacevedo204@misena.edu.co",
    subject: `Welcome to Task Manager App ${name}`,
    html: `It's nice to have you around, have fun! <strong>${name}</strong>`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "jaacevedo204@misena.edu.co",
    subject: `Sorry to see you go! ${name}`,
    html: `Is a bad new you leave our app, Good bye ${name}!. It was a beautiful travel!`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};

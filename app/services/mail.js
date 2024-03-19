const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const otpSend = (email, otp) => {
  const mailDetail = {
    to: email,
    subject: 'OTP for new Password',
    html:
      '<h3>OTP for new password is </h3>' +
      '<h1 style=`font-weight:bold;`>' +
      otp +
      '</h1>',
  };

  const mailSending = transport.sendMail(mailDetail, (error) => {
    if (error) throw error;
    else {
      Logger.log('email has been sent');
    }
  });

  return mailSending;
};

module.exports = { otpSend };

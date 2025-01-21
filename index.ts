import express, { Application, Request, Response } from "express";
const app: Application = express();

import cron from "node-cron";
import nodemailer from "nodemailer";

//implementing mail sending functionality

function sendMailThroughCron() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harikrishnantestmail@gmail.com",
      pass: "yghi kkom genq odvc",
    },
  });

  const mailOptions = {
    from: "harikrishnantestmail@gmail.com",
    to: "harikrishnanv.rko@gmail.com",
    subject: "Sending Email using Node.js",
    text: "If this message finds you, the mail is working fine",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

//Scheduling a cronjob

cron.schedule("* */15 * * * *", () => {
  sendMailThroughCron();
  console.log("rsending a mail every 30 seconds");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

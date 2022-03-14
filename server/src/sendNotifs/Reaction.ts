import axios from 'axios';
import { Services } from 'src/Entity/services.entity';
const nodemailer = require('nodemailer');

const sendMail = async (service: Services, email: string, value: number) => {
  const sender = 'pikasBot@gmail.com';
  const senderPassword = 'yhcopphcjxaqodzk';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    from: sender,
    to: email,
    subject: `AREA YOUR ACTION HAS BEEN TRIGGERED`,
    text: `Hello, ${service.action} has been triggered. The value is ${value} at ${service.actionparams}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const notification = async (service: Services, email: string, value: number) => {
  const req = await axios.patch("http://localhost:8080/users/setNotification", 
  {
    "email": email,
    "notification": `${service.action} has been triggered. The value is ${value} at ${service.actionparams}`
  })
  
  console.log(req.data)
}

const door = async (service: Services, value: number) => {
  await axios.get(`https://epi-logue.eu/api/doors_open?login=${service.reactionparams}&door_name=hub`)
}

export async function checkReaction(
  service: Services,
  action: number,
): Promise<string> {
  switch ((service.reaction).toLowerCase().split(' ').join('')) {
    case 'gmail':
      sendMail(service, service.reactionparams, action);
      return 'gmail';
    case 'notification':
      notification(service, service.reactionparams, action);
      return 'notification';
    case 'door':
      door(service, action);
      return 'door';
    default:
      return service.reaction;
  }
}

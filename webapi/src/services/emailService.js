import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

class EmailService {
  transporter = nodemailer.createTransport({
    service: 'gmail', // or other services
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  constructor(){
    this.verifyConnection()
  }
   async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('Email server connection verified');
    } catch (error) {
      console.error('Email connection failed:', error.message);
    }
  }
}
const emailService = new EmailService()
export default emailService
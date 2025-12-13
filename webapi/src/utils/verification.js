import TimeUtils from "./timeUtils.js"

class Verification {
  pendingVerifications = new Map()
  generateVerficationCode = (userId, type = 'email_verification') => {
    const code = this.generateNumbericCode()
    const expiresAt = TimeUtils.currentHKT()
    const verifyData = {
      userId,
      code,
      expiresAt,
      attempts: 0,
      maxAttempts: 3
    }
    this.pendingVerifications.set(userId + ':' + type, verifyData)
    console.log(this.pendingVerifications)
    setTimeout(() => {
      this.pendingVerifications.delete(userId + ':' + type);
      console.log(this.pendingVerifications)
    }, 10 * 60000);
    return { code, expiresAt }
  }

  verifyCode = (userId, submittedCode, type = 'email_verification') => {
    const key = userId + ':' + type
    const verifyData = this.pendingVerifications.get(key)
    if (!verifyData) {
      return { success: false, message: "No verification found" }
    }
    const currentTime = TimeUtils.currentHKT()
    if (verifyData.expiresAt >= currentTime) {
      this.pendingVerifications.delete(key)
      return { success: false, message: "The code is expired" }
    }
    if (verifyData.attempts > verifyData.maxAttemps) {
      this.pendingVerifications.delete(key)
      return { success: false, message: "Too many attempts" }
    }
    verification.attempts++;
    if (verifyData.code.trim() === submittedCode.trim()) {
      this.pendingVerifications.delete(key)
      return { success: true, message: "Success attempt" }
    }
    return { success: false, message: "Incorrect code", attemptsLeft: verification.maxAttempts - verification.attempts }
  }

  generateNumbericCode = (length = 6) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }
  getMailFormat = (code) => {
    return {
      subject: "Password Reset Verification Code",
      text: `Your password reset code is: ${code}
  
This code will expire in 10 minutes.
If you didn't request this reset, please ignore this email.`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
    .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
    .code { 
      font-size: 32px; 
      font-weight: bold; 
      letter-spacing: 5px; 
      color: #4F46E5;
      background: #F3F4F6;
      padding: 15px;
      text-align: center;
      margin: 20px 0;
      border-radius: 8px;
    }
    .footer { color: #6B7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div style="padding: 20px;">
      <p>You requested to reset your password. Use the verification code below:</p>
      
      <div class="code">${code}</div>
      
      <p>Enter this code on the password reset page to continue.</p>
      <p><strong>This code expires in 10 minutes.</strong></p>
      
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      
      <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
        <p>© ${new Date().getFullYear()} PromptJet. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`


    }
  }

}
const verification = new Verification()
export default verification
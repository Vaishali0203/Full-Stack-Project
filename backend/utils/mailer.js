const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInviteEmail = async (toEmail, hiveName, inviteLink) => {
  const mailOptions = {
    from: `"Hive Queen" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🐝 You're invited to join the Hive: ${hiveName}!`,
    html: `
      <p>Hello Explorer,</p>
      <p>You’ve been invited to join <strong>${hiveName}</strong> on HiveVerse.</p>
      <p><a href="${inviteLink}" style="padding: 8px 12px; background: #6366f1; color: white; text-decoration: none; border-radius: 4px;">Accept Invite</a></p>
      <p>See you in the stars ✨</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendInviteEmail };

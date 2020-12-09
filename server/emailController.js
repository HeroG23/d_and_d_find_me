const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;
module.exports={
email: async (req, res) => {
  // nodemailer backend function/layout
  const { name, message, email, title } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    let info = await transporter.sendMail(
      {
        from: `'${name}' <${email}>`,
        to: EMAIL,
        subject: title,
        text: message,
        html: `<div>${message}</div>
            <img src="cid:unique@nodemailer.com"/>`,
        attachments: [
          {
            filename: "license.txt",
            path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
          },
        ],
      },
      (err, res) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("res", res);
          res.status(200).send(info);
        }
      }
    );
  } catch (err) {
    console.log("err on nodemailer", err);
    res.sendStatus(502);
  }
}
}
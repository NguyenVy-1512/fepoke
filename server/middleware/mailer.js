const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS
    }
})

const mailOptions = {
    from: robot,
    to: email,
    subject: 'Account Verification',
    html: 'click: '
}
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transportObj = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

function updateContent(templateContent, credentials){
    return Object.keys(credentials).reduce((updatedContent, key)=>{
        return updatedContent.replace(new RegExp(`#{${key}}`, 'g'), credentials[key]);
    }, templateContent);
}

async function emailHelper(templateName, receiverEmail, credentials){
    //try{
        const templatePath = path.join(__dirname, 'email_templates', templateName);
        const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
        const updatedContent = updateContent(templateContent, credentials);
        let subject = (templateName == "otp.html") ? "OTP for resetting password of your MyDayMyShow account" : "Booking Confirmation from My Day My Show";
        await transportObj.sendMail({
            to: receiverEmail,
            from: process.env.GMAIL_USER,
            subject: subject,
            html: updatedContent,
        });
        console.log("email sent");
    //}
    /* catch(err){
        if(err.code == "ENOENT")
            console.log("Template file not found: ", err.message);
        else if(err.response && err.response.body)
            console.log("Error sending email: ", err.response.body);
        else
            console.log("Error occurred: ", err.message);
    } */
}

module.exports = emailHelper;
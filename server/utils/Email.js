const { text } = require("express");
const nodemailer=require("nodemailer")

module.exports=class Email{
    constructor(user,url){
        this.to=user,
        this.firstname=user.name.split(' ')[0]
        this.from=process.env.FROM,
        this.url=url
    }


     newTransport(){
        if(process.env.NODE_ENV==='production')return 1;

        return nodemailer.createTransport({
            host:process.env.HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        })
     }

     async send(template,subject){
      
        const mailoptions={
            from:this.from,
            to:this.to,
            subject:subject,
            text
        }

      await this.newTransport().sendMail(mailoptions);  
     }

     async sendWelcome(){
        await this.send('welcome',"Welcome to TaskForge Family");
     }

     async sendPasswordReset(){
        await this.send('password','Your password Reset Token(valid for short time only)')
     }

}
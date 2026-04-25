const nodemailer=require("nodemailer");
const htmlToText=require("html-to-text");


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
       //some pending
        const html=`<p style="color:black; font-size:20px;">Forgot your password? send a patch request to this url to reset your password-<a href=${this.url}>RESET PASSWORD🔁</a>.
        </br>If you didnt forget ,please ignore this.</p></br>`
        const mailoptions={
            from:this.from,
            to:this.to,
            subject:subject,
            html,
            text:htmlToText(html),
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
const nodemailer=require("nodemailer");
const htmlToText=require("html-to-text");


module.exports=class Email{
    constructor(user,url){
        this.name=user.name;
        this.to=user.email,
        this.firstname=user.name.split(' ')[0]
        this.from=process.env.FROM,
        this.url=url
    }


     newTransport(){
        // if(process.env.NODE_ENV==='production')return 1; use brevo for production

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
        // const html=template.startsWith("w")?`<p style="color:black">Hey ${this.name},${subject}</p>`:`<p style="color:black;background-color:red-blue; font-size:20px;">Forgot your password? send a patch request to this url to reset your password-${this.url}.
        // </br>If you didnt forget ,please ignore this.</p></br>
        // <a href=${this.url}>RESET PASSWORD</a>.`

        const html = template.startsWith("w")
  ? `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2563eb;">Welcome!</h2>
      <p>Hey ${this.name},</p>
      <p>${subject}</p>
    </div>
  `
  : `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
      <h2 style="color: #dc2626;">Password Reset Request</h2>

      <p>Hi ${this.name},</p>

      <p>
        We received a request to reset your password. Click the button below to set a new password.
      </p>

      <div style="margin: 30px 0;">
        <a href="${this.url}"
           style="
             background-color: #2563eb;
             color: white;
             padding: 12px 24px;
             text-decoration: none;
             border-radius: 6px;
             display: inline-block;
             font-weight: bold;
           ">
          Reset Password
        </a>
      </div>

      <p>
        This link will expire shortly for security reasons.
      </p>

      <p>
        If you didn't request a password reset, you can safely ignore this email.
      </p>

      <hr style="border:none;border-top:1px solid #ddd;">

      <p style="font-size:12px;color:#666;">
        If the button doesn't work, copy and paste this URL into your browser:
      </p>

      <p style="font-size:12px;word-break:break-all;">
        ${this.url}
      </p>
    </div>
  `;
        const mailoptions={
            from:this.from,
            to:this.to,
            subject:subject,
            html,
            text:htmlToText.convert(html),
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
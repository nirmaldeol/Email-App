# Email-app


Email application sends email through senmail or mailgun API's with your credentials.
Steps:
#1.Clone the repo:
#2.RUN npm install
#3.add you keys under postman mailgun.js and sendgrid.js
#4.change URL for Mailgun queries inside mailgun.js as it contains your domain specific information

open browser if locally on http://localhost:3000 and send emails

If on server then you process env variables to set key and URL
You need to set three environment variables on server:
SENDGRID_KEY, MAINGUN_KEY,MAILGUN_URL

Send emails and emjoy.

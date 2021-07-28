namespace API.Utils
{
    public static class EmailHTMLTemplates
    {
        public static string HtmlRegisterTemplate =
            @"
        <html lang=""en"">
        <head>    
        <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">

        <style type=""text/css"">
        .font{
            font-family: 'Courier New'; 
            color: #005266; 
            text-align: center}
        .image{  
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;}
        </style>
        </head>

        <body>
        <div class=""font"">
        <h2>Hi! It's TeamCool here</h2>
        <h3>Good to see you in our community!<br>
        We' ve currently registered user on this Email adress<br><br>
        If you haven't registered account on our site, please contact with administrator on:</h3>
        <h2>TeamCoolJLRDMG@gmail.com</h2>
        <h1>Enjoy using our app!</h1>
        <h2>Best regards<h2>
        <h3>RD MG JL</h3>
        </div>
        <img src='https://image.freepik.com/free-vector/corporate-meeting-employees-cartoon-characters-discussing-business-strategy-planning-further-actions-brainstorming-formal-communication-seminar-concept-illustration_335657-2035.jpg' class=""image"">
        </body>
        </html>";
    }
}
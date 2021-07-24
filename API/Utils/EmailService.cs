using System;
using System.Net;
using System.Net.Mail;

namespace API.Utils
{
    public class EmailService
    {
        public static async void SendEmailConfirmation(
            string clientEmail,
            string emailBody)
        {
            MailMessage message = new MailMessage("TeamCoolJLRDMG@gmail.com", clientEmail)
            {
                Subject = "Register confirmation", Body = emailBody, IsBodyHtml = false,
            };
            SmtpClient client = new SmtpClient
            {
                Port = 587,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Host = "smtp.gmail.com",
                EnableSsl = true,
            };

            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("TeamCoolJLRDMG@gmail.com", "Testowy`123");

            try
            {
                client.Send(message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
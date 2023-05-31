import dayjs from 'dayjs';
import nodemailer from 'nodemailer';

export const COMPANY_TITLE = 'Beauty Salon';

export const COMPANY_ADDRESS_LINK = 'https://go.2gis.com/iyai8';
export const COMPANY_ADDRESS_NAME = 'г. Бишкек, ж/м Ак-Бата, 32/1';
export const COMPANY_EMAIL = 'beauty_salon@mail.com';

export default {
  SEND_EMAIL: async (email: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.VERIFY_EMAIL_USER,
        pass: process.env.VERIFY_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${COMPANY_TITLE}" <${COMPANY_EMAIL}>`,
      to: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
  },

  APPOINTMENT_APPROVAL_EMAIL: (
    name: string,
    date: string,
    time: string,
    service: string,
    master: string,
  ) => {
    return `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${name}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0">
          <h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Настоящим письмом подтверждаем вашу запись к мастеру ${master} на услугу: ${service}.
            
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h2 style="margin-top:10px;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
          <h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
       Будем ждать вас ${dayjs(date).format(
         'DD.MM.YYYY',
       )} г., к ${time}, по адресу:     
</h2>
      
       <a style="color: #d77bb3;" href=${COMPANY_ADDRESS_LINK} target="_blank" rel="noopener noreferrer">
            ${COMPANY_ADDRESS_NAME}
       </a>
          </h2></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`;
  },

  APPOINTMENT_REJECTION_EMAIL: (
    name: string,
    date: string,
    time: string,
    service: string,
    master: string,
  ) => {
    return `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${name}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0">
          <h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Настоящим письмом cообщаем, что ваша запись к мастеру ${master} на услугу: ${service} отменена!
          </h2></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`;
  },

  EMAIL_VERIFICATION: (token: string, name: string) => {
    return `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table class="m_67968070139110097mail-sections" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${name}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Вы зарегистрировали аккаунт на ${COMPANY_TITLE}. Прежде чем начать пользоваться своей учетной записью, Вам необходимо подтвердить, что это Ваш адрес электронной почты, нажав на кнопку:
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><a rel="noopener noreferrer" href="${process.env.APP_URL}/verify-email/${token}" style="margin-top:0;margin-bottom:0;color:white;text-decoration:none;display:inline-block;font-size:16px;font-weight:400;line-height:24px;text-transform:initial;letter-spacing:initial;background-color:#974ec0;border-radius:4px;padding:0;border-color:#974ec0;border-style:solid;border-width:10px 20px" target="_blank">Подтвердить email</a></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`;
  },
};

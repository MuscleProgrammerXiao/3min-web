import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface ContactFormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // QQ邮箱授权码
      },
    });
  }

  async sendContactEmail(formData: ContactFormData): Promise<boolean> {
    try {
      const { name, phone, subject, message } = formData;
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `${process.env.WEBSITE_NAME} - 新的联系消息: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              来自${process.env.WEBSITE_NAME}的新消息
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">联系信息</h3>
              <p><strong>姓名:</strong> ${name}</p>
              <p><strong>手机号:</strong> ${phone}</p>
              <p><strong>主题:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">消息内容</h3>
              <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; text-align: center;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                此邮件来自 <strong>${process.env.WEBSITE_NAME}</strong> 联系表单
              </p>
              <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 12px;">
                发送时间: ${new Date().toLocaleString('zh-CN')}
              </p>
            </div>
          </div>
        `,
        // 纯文本版本
        text: `
来自${process.env.WEBSITE_NAME}的新消息\n\n联系信息:\n姓名: ${name}\n手机号: ${phone}\n主题: ${subject}\n\n消息内容:\n${message}\n\n发送时间: ${new Date().toLocaleString('zh-CN')}
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('邮件发送成功');
      return true;
    } catch (error) {
      console.error('邮件发送失败:', error);
      return false;
    }
  }

  // 验证邮件配置
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('邮件服务连接成功');
      return true;
    } catch (error) {
      console.error('邮件服务连接失败:', error);
      return false;
    }
  }
}

export default new EmailService();
import { Request, Response } from 'express';
import emailService from '../services/emailService';

interface ContactRequest extends Request {
  body: {
    name: string;
    phone: string;
    subject: string;
    message: string;
  };
}

export const sendContactMessage = async (req: ContactRequest, res: Response) => {
  try {
    const { name, phone, subject, message } = req.body;

    // 验证必填字段
    if (!name || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: '请填写所有必填字段'
      });
    }

    // 发送邮件
    const emailSent = await emailService.sendContactEmail({
      name,
      phone,
      subject,
      message
    });

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: '消息发送成功，我会尽快回复您！'
      });
    } else {
      res.status(500).json({
        success: false,
        message: '消息发送失败，请稍后重试'
      });
    }
  } catch (error) {
    console.error('联系表单处理错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
};
import { http } from '../request';
import type { ApiResponse, ContactFormData } from '../types/api';

// 联系表单相关API
export class ContactService {
  // 发送联系消息
  static async sendMessage(data: ContactFormData): Promise<ApiResponse> {
    return http.post('/contact', data);
  }

  // 获取联系信息（如果需要）
  static async getContactInfo(): Promise<ApiResponse> {
    return http.get('/contact/info');
  }
}

// 导出默认实例
export default ContactService;
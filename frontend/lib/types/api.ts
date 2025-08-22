// API 响应基础类型
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: number;
}

// 请求配置类型
export interface RequestConfig extends RequestInit {
  timeout?: number;
  baseURL?: string;
  params?: Record<string, any>;
}

// HTTP 方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 请求错误类型
export interface RequestError extends Error {
  code?: number;
  status?: number;
  response?: Response;
}

// 联系表单数据类型
export interface ContactFormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}
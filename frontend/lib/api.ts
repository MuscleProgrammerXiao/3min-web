// 统一导出所有API服务
export { default as ContactService } from './services/contactService';

// 导出请求工具
export { http, HttpClient, HttpError } from './request';

// 导出类型
export type {
  ApiResponse,
  RequestConfig,
  RequestError,
  ContactFormData,
  HttpMethod,
} from './types/api';
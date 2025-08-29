import type { ApiResponse, RequestConfig, HttpMethod, RequestError } from './types/api';

// 默认配置
const DEFAULT_CONFIG: RequestConfig = {
  timeout: 10000,
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

// HTTP错误类
class HttpError extends Error implements RequestError {
  code?: number;
  status?: number;
  response?: Response;

  constructor(message: string, status?: number, response?: Response) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.response = response;
  }
}

// HTTP客户端类
class HttpClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private timeout: number;

  constructor(config: RequestConfig = {}) {
    this.baseURL = config.baseURL || DEFAULT_CONFIG.baseURL!;
    this.defaultHeaders = { ...DEFAULT_CONFIG.headers, ...config.headers };
    this.timeout = config.timeout || DEFAULT_CONFIG.timeout!;
  }

  // 构建完整URL
  private buildURL(url: string, params?: Record<string, unknown>): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    if (!params) return fullURL;
    
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `${fullURL}?${queryString}` : fullURL;
  }

  // 请求拦截器
  private async requestInterceptor(config: RequestConfig): Promise<RequestConfig> {
    // 可以在这里添加认证token等
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
    
    return config;
  }

  // 响应拦截器
  private async responseInterceptor<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 如果响应不是JSON格式，使用默认错误信息
      }
      
      throw new HttpError(errorMessage, response.status, response);
    }

    try {
      const data = await response.json();
      return data as ApiResponse<T>;
    } catch {
      throw new HttpError('响应数据解析失败', response.status, response);
    }
  }

  // 通用请求方法
  private async request<T = unknown>(
    method: HttpMethod,
    url: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      // 应用请求拦截器
      const processedConfig = await this.requestInterceptor(config);
      
      // 构建请求URL
      const requestURL = this.buildURL(url, processedConfig.params);
      
      // 构建请求选项
      const requestOptions: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...processedConfig.headers,
        },
        body: processedConfig.body,
      };

      // 创建AbortController用于超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      requestOptions.signal = controller.signal;

      try {
        // 发送请求
        const response = await fetch(requestURL, requestOptions);
        clearTimeout(timeoutId);
        
        // 应用响应拦截器
        return await this.responseInterceptor<T>(response);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      // 统一错误处理
      if (error instanceof HttpError) {
        throw error;
      }
      
      throw new HttpError(
        error instanceof Error ? error.message : '网络请求失败',
        0
      );
    }
  }

  // GET 请求
  async get<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('GET', url, config);
  }

  // POST 请求
  async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, {
      ...config,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT 请求
  async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, {
      ...config,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE 请求
  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url, config);
  }

  // PATCH 请求
  async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', url, {
      ...config,
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// 导出默认实例
export const http = new HttpClient();

// 导出类和类型
export { HttpClient, HttpError };
export type { ApiResponse, RequestConfig, HttpMethod, RequestError };
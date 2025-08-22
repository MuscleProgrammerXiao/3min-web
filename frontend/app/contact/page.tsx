'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Send, Phone } from 'lucide-react'
import { ContactService } from '@/lib/api'
import type { ContactFormData } from '@/lib/api'

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })
  const [phoneError, setPhoneError] = useState('')

  // 手机号验证函数
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })
    setPhoneError('')
    
    // 前端验证手机号
    if (!validatePhone(formData.phone)) {
      setPhoneError('请输入正确的手机号格式（11位数字，以1开头）')
      setIsSubmitting(false)
      return
    }
    
    try {
      const result = await ContactService.sendMessage(formData)
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        })
        // 清空表单
        setFormData({
          name: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        })
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || '网络错误，请检查后端服务是否启动'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // 实时验证手机号
    if (name === 'phone') {
      if (value && !validatePhone(value)) {
        setPhoneError('请输入正确的手机号格式')
      } else {
        setPhoneError('')
      }
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我</h1>
          <p className="text-xl text-gray-600">
            欢迎与我交流，期待听到您的想法
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className=" h-5 w-5 text-blue-600" />
                <span className='hover:text-blue-600 transition-colors'>895422334@qq.com</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-700" />
                <span className="hover:text-blue-600 transition-colors">
                  185 9803 9775
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">关于我</h3>
              <p className="text-gray-600 leading-relaxed">
                我是一名热爱技术和产品的开发者，目前专注于前端开发和用户体验设计。
                如果您有任何项目合作或技术交流的想法，欢迎随时联系我。
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
            
            {/* 状态提示 */}
            {submitStatus.type && (
              <div className={`mb-4 p-3 rounded-md ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  手机号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="请输入11位手机号"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${
                    phoneError ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  主题
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  消息内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting || !!phoneError}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? '发送中...' : '发送消息'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
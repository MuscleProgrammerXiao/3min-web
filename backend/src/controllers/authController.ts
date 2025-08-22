import { Request, Response } from 'express';
import User from '../models/User';
import { JWTUtils } from '../utils/jwt';
import { IUserLogin } from '../types/user';

export class AuthController {
  // 用户登录
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: IUserLogin = req.body;

      // 验证输入
      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: '用户名和密码不能为空'
        });
        return;
      }

      // 查找用户
      const user = await User.findOne({ 
        $or: [{ username }, { email: username }] 
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: '用户名或密码错误'
        });
        return;
      }

      // 验证密码
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: '用户名或密码错误'
        });
        return;
      }

      // 生成JWT令牌
      const token = JWTUtils.generateToken({
        userId: (user._id as any).toString(),
        username: user.username,
        role: user.role
      });

      res.json({
        success: true,
        message: '登录成功',
        data: {
          token,
          user: {
            id: (user._id as any).toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar
          }
        }
      });
    } catch (error: any) {
      console.error('登录失败:', error);
      res.status(500).json({
        success: false,
        message: '登录失败，请稍后重试'
      });
    }
  }

  // 验证令牌
  static async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        res.status(401).json({
          success: false,
          message: '未提供访问令牌'
        });
        return;
      }

      const decoded = JWTUtils.verifyToken(token);
      if (!decoded) {
        res.status(401).json({
          success: false,
          message: '无效的访问令牌'
        });
        return;
      }

      // 查找用户
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(401).json({
          success: false,
          message: '用户不存在'
        });
        return;
      }

      res.json({
        success: true,
        data: {
          user: {
            id: (user._id as any).toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar
          }
        }
      });
    } catch (error: any) {
      console.error('令牌验证失败:', error);
      res.status(401).json({
        success: false,
        message: '令牌验证失败'
      });
    }
  }

  // 用户登出
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // 这里可以实现令牌黑名单逻辑
      res.json({
        success: true,
        message: '登出成功'
      });
    } catch (error: any) {
      console.error('登出失败:', error);
      res.status(500).json({
        success: false,
        message: '登出失败'
      });
    }
  }

  // 初始化管理员账户
  static async initAdmin(req: Request, res: Response): Promise<void> {
    try {
      // 检查是否已存在管理员
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        res.status(400).json({
          success: false,
          message: '管理员账户已存在'
        });
        return;
      }

      // 创建默认管理员账户
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });

      await admin.save();

      res.json({
        success: true,
        message: '管理员账户创建成功',
        data: {
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error: any) {
      console.error('创建管理员失败:', error);
      res.status(500).json({
        success: false,
        message: '创建管理员失败'
      });
    }
  }
}
import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// 公开路由
router.post('/login', AuthController.login);
router.post('/init-admin', AuthController.initAdmin); // 仅开发环境使用

// 需要认证的路由
router.get('/verify', authenticateToken, AuthController.verifyToken);
router.post('/logout', authenticateToken, AuthController.logout);

export default router;
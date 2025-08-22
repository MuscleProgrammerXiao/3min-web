import { Router } from 'express';
import { sendContactMessage } from '../controllers/contactController';

const router = Router();

// POST /api/contact - 发送联系消息
router.post('/', sendContactMessage);

export default router;
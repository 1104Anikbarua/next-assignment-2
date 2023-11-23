import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();

router.get('/', userControllers.getAllUser);
router.post('/create-user', userControllers.setUser);
router.get('/:userId', userControllers.getUser);
export const userRoutes = router;
